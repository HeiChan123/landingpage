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

interface AgentLoginResponse {
    status: LoginResponseCode;

    userId: number;
    username: string;
    tokenKind: number;

    // A JWT carrying an AgentLoginResponsePayload.
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

    storedAgentId = localStorage.getItem("agentId");

    @observable
    agentId: number | undefined = this.storedAgentId ? Number.parseInt(this.storedAgentId) : undefined;

    // The logged-in entity kind, harvested from the login token.
    tokenKind: TokenKind = -1;

    doLogin = async (username: string, password: string) => {
        const response = await fetch(getBaseUri() + "/api/authenticate_player", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const loginResponse: AgentLoginResponse = await response.json();
        if (loginResponse.status !== LoginResponseCode.OK) {
            return false;
        }
        localStorage.setItem("token", loginResponse.token!);
        this.currentUser = loginResponse.username;
        this.agentId = loginResponse.userId;
        this.tokenKind = loginResponse.tokenKind;
        localStorage.setItem("currentUser", this.currentUser);
        localStorage.setItem("agentId", this.agentId + "");

        return true;
    }
    
    doLogout() {
        console.log("this: ", this)
        localStorage.removeItem("token");
        this.currentUser = undefined;
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    set agent(agentId: number | undefined) {
        this.agentId = agentId;
    }

}
