import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import { observer } from 'mobx-react';
import bg from "../resources/BG.png"
import trynow from "../resources/trynow-BG-image.png"

const LandingPage = observer(() => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const goToLogin = () => {
        setShowLogin(true);
    };
    const goToRegister = () => {
        setShowRegister(true);
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", background: `url(${bg})`, backgroundSize: "cover" }}>
            <div style={{ margin: "auto", width: "30%", textAlign: "center" }}>
                <div >Sign in your account</div>
                <br />
                <Input placeholder="Username" />
                <br />
                <br />
                <Input placeholder="Password" />
                <div style={{ textAlign: "right" }}>Forget Password?</div>
                <br />
                <div>
                    <Button type="primary" style={{ width: "45%", marginRight: "5%" }}>
                        LOGIN
                    </Button>
                    <Button type="default" style={{ width: "45%", marginLeft: "5%" }}>
                        VOICE LOGIN
                    </Button>
                </div>
            </div>
            <div style={{ bottom: "0", margin: "0 auto", padding:"1rem" }}>
                <Typography>{"Copyright © 2020 GENTERA, All Rights Reserved."}</Typography>
            </div>
            {/* <div style={{ margin: "auto 0 0 auto", textAlign:"right" }}>
                <img src={trynow} style={{width:"50%", position: "absolute", zIndex:10}}></img>
            </div> */}
        </div>
    )
});


export default LandingPage;
