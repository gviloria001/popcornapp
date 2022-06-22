import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
export default function SignInPage() {
    const [tempAccountName, setTempAccountName] = useState("");
    const [tempAccountPassword, setTempAccountPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            return navigate("/db");
        }
    }, [loggedIn, navigate]);


    const getCredentials = (res) => {
        if (res.data[0].userAccountName === tempAccountName && res.data[0].userAccountPassword === tempAccountPassword) {
            setLoggedIn(true);
        }
    }

    const AuthenticateLogin = () => {
        Axios.post("http://localhost:3001/accountinfo", {
            tempAccountName: tempAccountName,
            tempAccountPassword: tempAccountPassword,
        }).then((res) => {
            getCredentials(res);
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