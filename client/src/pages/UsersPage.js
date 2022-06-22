import React, { useState } from 'react';
import Axios from "axios";

export default function UsersPage() {
    // CRUD USERS //////////////////////////////////////////////////
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userAccountName, setUserAccountName] = useState("");
    const [userAccountPassword, setUserAccountpassword] = useState("");
    const [userList, setUserList] = useState([]);

    const addUser = () => {
        Axios.post("http://localhost:3001/addUser", {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            userPhoneNumber: userPhoneNumber,
            userAccountName: userAccountName,
            userAccountPassword: userAccountPassword,
        }).then(() => {
            setUserList([
                ...userList,
                {
                    userFirstName: userFirstName,
                    userLastName: userLastName,
                    userEmail: userEmail,
                    userPhoneNumber: userPhoneNumber,
                },
            ])
        })
    }


    const deleteUser = (userID) => {
        Axios.delete(`http://localhost:3001/delete/${userID}`).then((response) => {
            setUserList(
                userList.filter((val) => {
                    return val.userID !== userID;
                })
            );
        });
    };


    const getUsers = () => {
        Axios.get("http://localhost:3001/users").then((res) => {
            setUserList(res.data);
        })
    }

    ///////////////////////////////////////////////////////////////






    return (
        <div>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUserFirstName(event.target.value);
                    }}
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUserLastName(event.target.value);
                    }}
                />
                <label>Email:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUserEmail(event.target.value);
                    }}
                />
                <label>Phone Number:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUserPhoneNumber(event.target.value);
                    }}
                />
                <label>Account Name:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUserAccountName(event.target.value);
                    }}
                />
                <label>Account Password:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setUserAccountpassword(event.target.value);
                    }}
                />
                <button onClick={addUser}>Add User</button>
            </div>

            <div>
                <button onClick={getUsers}>Show Users</button>
            </div>

            <div>
                {userList.map((val) => {
                    return (
                        <div key={val.userID}>
                            {val.userFirstName}
                            {val.userLastName}
                            {val.userEmail}
                            {val.userPhoneNumber}
                            <button onClick={() => { deleteUser(val.userID) }}> Delete User </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}