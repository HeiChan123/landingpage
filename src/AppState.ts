import { observable } from "mobx";
import packageJson from '../package.json';

enum LoginResponseCode {
    OK = 0,
    INVALID_CREDENTIALS = 1
}

enum TokenKind {
    AGENT = 0,
    PLAYER = 1,
    ADMIN = 2
}

interface PlayerLoginResponse {
    status: LoginResponseCode;

    userId: number;
    username: string;
    tokenKind: number;

    // A JWT carrying an PlayerLoginResponsePayload.
    token?: string;
}

// Slightly evil hack to make the APIs work in production and develpoment mode. This could probably done better
// by doing something clever with react-dev-middleware.
export function getBaseUri() {
    const baseUri = process.env.NODE_ENV !== 'production' ? "http://localhost:1114" : "";

    // Canonicalise to not end with a `/`
    return baseUri.slice(0, baseUri.length - ((baseUri.endsWith('/') ? 1 : 0)));
}


/**
 * State global to the application
 */
export class AppState {
    @observable
    currentUser: string | undefined = localStorage.getItem("currentUser") ?? undefined;

    storedPlayerId = localStorage.getItem("playerId");

    @observable
    playerId: number | undefined = this.storedPlayerId ? Number.parseInt(this.storedPlayerId) : undefined;

    // The logged-in entity kind, harvested from the login token.
    tokenKind: TokenKind = -1;

    balance: number = 0;

    saUrl: string = "";

    doLogin = async (username: string, password: string) => {
        const response = await fetch(getBaseUri() + "/api/authenticate_player", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const loginResponse: PlayerLoginResponse = await response.json();
        if (loginResponse.status !== LoginResponseCode.OK) {
            return false;
        }
        localStorage.setItem("token", loginResponse.token!);
        this.currentUser = loginResponse.username;
        this.playerId = loginResponse.userId;
        this.tokenKind = loginResponse.tokenKind;
        localStorage.setItem("currentUser", this.currentUser);
        localStorage.setItem("playerId", this.playerId + "");
        // this.getPlayerBalance();
        // this.loginSa();
        return true;
    }

    // getPlayerBalance = async () => {
    //     const response = await fetch(getBaseUri() + "/api/get_player_balance", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem("token")}`
    //         }
    //     });

    //     const playerBalance = await response.json();
    //     this.balance = +playerBalance?.balance;
    //     return true;
    // }

    // loginSa = async () => {
    //     const response = await fetch(getBaseUri() + "/api/player_login_sa", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem("token")}`
    //         }
    //     });

    //     const saResponse = await response.json();
    //     this.saUrl = saResponse.url;
    //     return saResponse.url;
    // }


    doLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        this.currentUser = undefined;
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    set agent(playerId: number | undefined) {
        this.playerId = playerId;
    }

}
