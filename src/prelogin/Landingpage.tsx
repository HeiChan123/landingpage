import React, { useState } from 'react';
import { Input, Button, Typography, Alert, Form } from 'antd';
import { observer } from 'mobx-react';
import bg from "../resources/BG.png"
import trynow from "../resources/trynow-BG-image.png"
import { AppState } from '../AppState';
import { useHistory, useLocation } from 'react-router-dom';

const LandingPage = observer(({ appState }: { appState: AppState }) => {
    const [failed, setFailed] = useState(false);

    // Figure out where we should go if the login is successful.
    // If we got here by clicking a link to `/bo/whatever`, we want to go there post-login.
    let history = useHistory();
    let location = useLocation<{ from?: { pathname: string } }>();

    // If we were sent here from one of the protected routes, we'll go back there when we're done.
    let target = "/lobby";
    if (location.state && location.state.from) {
        // const pathname = location.state.from.pathname;
        const pathname = "";
        if (pathname.startsWith("/lobby/")) {
            target = pathname
        }
    }

    // Go to the BO home screen after login, if nothing else is specified.
    // let { from } = location.state || { from: { pathname: "/bo/" } };

    // Invoke the login validator and either display the error, or action the login.
    let handleLogin = async (values: any) => {
        const loggedIn = await appState.doLogin(values.username, values.password);
        if (loggedIn) {
            history.replace(target);         
        } else {
            setFailed(true);
        }
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
            <Form
                    name="basic"
                    initialValues={{}}
                    onFinish={handleLogin}
                >
                    {failed && <Alert message="Wrong username or password" type="error" closable onClose={() => setFailed(false)} />}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username' }]}
                    >
                        <Input placeholder={"Username"} name="username" autoFocus={true} size={"large"} />
                    </Form.Item>
                    &nbsp;
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input.Password placeholder={"Password"} name="password" size={"large"} />
                    </Form.Item>
                    &nbsp;
                    <Form.Item>
                        <Button type="primary" size={"large"} shape={"round"} htmlType="submit">
                            Login
                    </Button>
                    </Form.Item>
                </Form>
            {/* <div style={{ margin: "auto 0 0 auto", textAlign:"right" }}>
                <img src={trynow} style={{width:"50%", position: "absolute", zIndex:10}}></img>
            </div> */}
        </div>
    )
});


export default LandingPage;
