import { useState } from "react";
import { Link } from "react-router-dom"
import Axios from "axios";
export default function SignInPage() {
    const [tempAccountName, setTempAccountName] = useState("");
    const [tempAccountPassword, setTempAccountPassword] = useState("");

    const getCredentials = () => {

    }

    const AuthenticateLogin = () => {
        Axios.get("http://localhost:3001/accountinfo").then((res) => {

        })
    }

    return (
        <div>
            <label>Username:</label>
            <input
                type="text"
                onChange={(event) => {
                    setTempAccountName(event.target.value);
                }}
            />
            <label>Password:</label>
            <input
                type="text"
                onChange={(event) => {
                    setTempAccountPassword(event.target.value);
                }}
            />
            <button onClick={AuthenticateLogin}>Login</button>
        </div>
    )
}