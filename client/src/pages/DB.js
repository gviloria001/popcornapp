import  Axios  from "axios";
import { useState } from "react"

export default function DB() {
    const [visible, setVisible] = useState(false);


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
        <div className='site-layout'>
<<<<<<< HEAD
      <div className='header'>
        Popcorn Theaters
      </div>
      <div className='report-bar'> 
        <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}
        </button>
        {visible && 
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
        </div>
        }
      </div>
      <div className='site-content'> 
            <table>
                <tr>
                    <th>
                        Last Name
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Email Address
                    </th>
                    <th>
                        Phone Number
                    </th>
                </tr>
                {userList.map((val) => {
                    return (
                        <tr key={val.userID}>
                            <td>{val.userLastName} </td>
                            <td>{val.userFirstName} </td>
                            <td>{val.userEmail} </td>
                            <td>{val.userPhoneNumber} </td>
                            <button onClick={() => { deleteUser(val.userID) }}> Delete User </button>
                        </tr>
                    );
                })}
            </table>
      </div>
      <div className='footer'>
        All Rights Reversed
      </div>
    </div>
=======
            <div className='header'>
                Popcorn Theaters
            </div>
            <div className='report-bar'>
                <button onClick={() => setVisible(!visible)}>{visible ? 'Show' : 'Hide'}
                </button>
                {visible &&
                    <button>
                        My element
                    </button>
                }
            </div>
            <div className='site-content'>

            </div>
            <div className='footer'>
                All Rights Reversed
            </div>
        </div>
>>>>>>> 45738e2f03579eee7b824ec8fc32413a8b8452da
    )
}