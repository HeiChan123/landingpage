import React, { useEffect, useState } from 'react';
import logo from "../resources/logo.png";

import T_doller_icon from "../resources/T_doller_icon.png";
import refresh from "../resources/refresh.png";
import usericon from "../resources/usericon.png";
import volume from "../resources/volume.png";
import menu from "../resources/menu.png";
import bg from "../resources/lobby-BG.png"
import ALL from "../resources/all.png";
import BACCARAT from "../resources/BACCARAT.png";
import ROULETTE from "../resources/ROULETTE.png";
import DT from "../resources/DT.png";
import AUTOBETBACCARAT from "../resources/AUTOBETBACCARAT.png";
import SLOTGAME from "../resources/slotgame.png";
import FISHING from "../resources/fishinmg.png";

import { Modal, Typography } from 'antd';
import { observer } from 'mobx-react';
import { AppState, getBaseUri } from '../AppState';
import "./Lobby.less"

const LandingPage = observer(({ appState }: { appState: AppState }) => {
    const [url, setUrl] = useState("");
    const [balance, setBalance] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getPlayerBalance();
        loginSa();
    }, [])

    const getPlayerBalance = async () => {
        const response = await fetch(getBaseUri() + "/api/get_player_balance", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const playerBalance = await response.json();
        setBalance(+playerBalance?.balance)
        return true;
    }

    const loginSa = async () => {
        const response = await fetch(getBaseUri() + "/api/player_login_sa", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const saResponse = await response.json();
        setUrl(saResponse.url)
        return true;
    }


    return (
        <div style={{ width: "100%", backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
            <div style={{ background: "#4cd6c7" }}>
                <div style={{ display: "flex", placeContent: "flex-end" }}>
                    <img src={T_doller_icon} style={{ margin: "1rem", blockSize: "30px" }}></img>
                    <Typography style={{ color: "white", alignSelf: "center" }}>{`${balance}`}</Typography>
                    <img src={refresh} style={{ margin: "1rem", blockSize: "30px", cursor: "pointer" }} onClick={getPlayerBalance}></img>
                    <img src={usericon} style={{ margin: "1rem", blockSize: "30px" }}></img>
                    <img src={volume} style={{ margin: "1rem", blockSize: "30px" }}></img>
                    <img src={menu} style={{ margin: "1rem", blockSize: "30px", cursor: "pointer" }} onClick={appState.doLogout}></img>
                </div>
            </div>
            <div style={{ display: "flex", margin: "1rem", placeContent: "center" }}>
                <div style={{ textAlign: "center", padding: "0 30px", borderRight: "1px solid #4cd6c7" }}>
                    <img src={ALL}></img>
                    <Typography><b>ALL PROVIDERS</b></Typography>
                </div>

                <div style={{ textAlign: "center", padding: "0 30px" }}>
                    <img src={BACCARAT} style={{ margin: "9px" }}></img>
                    <Typography><b>BACCARAT</b></Typography>
                </div>

                <div style={{ textAlign: "center", padding: "0 30px" }}>
                    <img src={ROULETTE} style={{ margin: "9px" }}></img>
                    <Typography><b>ROULETTE</b></Typography>
                </div>

                <div style={{ textAlign: "center", padding: "0 30px" }}>
                    <img src={DT} style={{ margin: "9px" }}></img>
                    <Typography><b>DRAGON TIGER</b></Typography>
                </div>

                <div style={{ textAlign: "center", padding: "0 30px" }}>
                    <img src={AUTOBETBACCARAT} style={{ margin: "9px" }}></img>
                    <Typography><b>AUTOBET BACCARAT</b></Typography>
                </div>

                <div style={{ textAlign: "center", padding: "0 30px" }}>
                    <img src={SLOTGAME} style={{ margin: "9px" }}></img>
                    <Typography><b>SLOT GAME</b></Typography>
                </div>

                <div style={{ textAlign: "center", padding: "0 30px" }}>
                    <img src={FISHING} style={{ margin: "9px" }}></img>
                    <Typography><b>FISHING GAME</b></Typography>
                </div>
            </div>
            <div className="container">
                <iframe src={url} className="responsive-iframe"></iframe>
            </div>
        </div>
    )
});


export default LandingPage;
