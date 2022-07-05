import Axios from "axios";
import { useState } from "react"

export default function DB() {
    const [visible, setVisible] = useState(false);
    const [queryState, setQueryState] = useState(false);



    // CRUD USERS //////////////////////////////////////////////////
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userAccountName, setUserAccountName] = useState("");
    const [userAccountPassword, setUserAccountpassword] = useState("");
    const [userList, setUserList] = useState([]);
    const [theaterName, setTheaterName] = useState("");


    // CRUD USERBELONGSTO /////////////////////////////////////////
    const [theaterID, setTheaterID] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [isManager, setIsManager] = useState();
    // Inventory Queries ///////////////////////////////////////////
    const [productName, setProductName] = useState("");
    const [productID, setProductID] = useState("");
    const [productIsFood, setProductIsFood] = useState();
    const [productIsContainer, setProductIsContainer] = useState();
    const [inventoryList, setInventoryList] = useState([]);
    const [inventoryListLocations, setInventoryListLocations] = useState([]);

    const [locationList, setLocationList] = useState([]);
    const [locationName, setLocationName] = useState("");


    const countLocations = (paramTheater) => {
        console.log('inside countlocations')
        Axios.get(`http://localhost:3001/${paramTheater}/locationList`).then((res) => {
            console.log(res.data);
            setLocationList(res.data);
        })
    }

    const handleTheaterChange = (paramTheater) => {
        setTheaterName(paramTheater);
        countLocations(theaterName)
    }

    const queryInventory = () => {
        setQueryState(false);
        if (theaterName === 'Select Theater' || theaterName === '') {
            alert("Please select a theater.");
        }
        else {
            Axios.get(`http://localhost:3001/inventory/${theaterName}`).then((res) => {
                console.log(res.data);
                setInventoryList(res.data);
                console.log(inventoryList);
            })

            Axios.get(`http://localhost:3001/inventory/Product=${productName}/Location=${locationName}/Theater=${theaterName}`).then((res) => {
                console.log("Inside Locations Query");
                setInventoryListLocations(res.data);
                console.log(inventoryListLocations);
            })
        }
    }


    const addUser = () => {
        Axios.post("http://localhost:3001/addUser", {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            userPhoneNumber: userPhoneNumber,
            userAccountName: userAccountName,
            userAccountPassword: userAccountPassword,
            theaterID: theaterID,
            isAdmin: isAdmin,
            isManager: isManager,

        }).then(() => {
            setUserList([
                ...userList,
                {
                    userFirstName: userFirstName,
                    userLastName: userLastName,
                    userEmail: userEmail,
                    userPhoneNumber: userPhoneNumber,
                    theaterName: theaterName,
                    isAdmin: isAdmin,
                    isManager: isManager,

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
        setQueryState(true);
        Axios.get("http://localhost:3001/users").then((res) => {
            setUserList(res.data);
        })
    }



    ///////////////////////////////////////////////////////////////

    return (
        <div className='site-layout'>
            <div className='header'>
                Popcorn Theaters
            </div>
            <div className='report-bar'>
                <button onClick={() => setVisible(!visible)}>{visible ? 'Inventory' : 'Users'}
                </button>

                {!visible &&
                    <div>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setProductName(event.target.value);
                                }}
                            />
                            <label>Location:</label>

                            <select onChange={e => setTheaterName(e.target.value)}>
                                <option onChange={e => { setTheaterName(''); countLocations('') }}>Select Theater</option>
                                <option onChange={e => { setTheaterName('Del Amo'); countLocations('Del Amo') }}>Del Amo</option>
                                <option onChange={e => { setTheaterName('Rolling Hills'); countLocations('Rolling Hills') }}>Rolling Hills</option>
                                <option onChange={e => { setTheaterName('South Bay Galleria'); countLocations('South Bay Galleria') }}>South Bay Galleria</option>
                                <option onChange={e => { setTheaterName('South Bay Pavilion'); countLocations('South Bay Pavilion') }}>South Bay Pavilion</option>
                            </select>

                            <label>Theater:</label>
                            <select onChange={e => handleTheaterChange(e.target.value)}>
                                <option onChange={e => { handleTheaterChange('') }}>Select Theater</option>
                                <option onChange={e => { handleTheaterChange('Del Amo') }}>Del Amo</option>
                                <option onChange={e => { handleTheaterChange('Rolling Hills') }}>Rolling Hills</option>
                                <option onChange={e => { handleTheaterChange('South Bay Galleria') }}>South Bay Galleria</option>
                                <option onChange={e => { handleTheaterChange('South Bay Pavilion') }}>South Bay Pavilion</option>
                            </select>
                        </div>

                        <div>
                            <button onClick={() => { queryInventory() }}>New Report</button>
                        </div>
                    </div>
                }


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
                            <label>Theater ID</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setTheaterID(event.target.value);
                                }}
                            />
                            <label>isAdmin</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setIsAdmin(event.target.value);
                                }}
                            />
                            <label>isManager</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setIsManager(event.target.value);
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
                {!queryState &&
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    Product Name
                                </th>
                                <th>
                                    Total Quantity
                                </th>
                                <th>
                                    Theater
                                </th>
                            </tr>
                            {inventoryList.map((val) => {
                                return (
                                    <tr key={val.productName}>
                                        <td>{val.productName} </td>
                                        <td>{val.totalQuantity}</td>
                                        <td>{val.theaterName}</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                }

                {queryState &&
                    <table>
                        <tbody>
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
                                <th>
                                    Theater
                                </th>
                                <th>
                                    ID
                                </th>
                            </tr>
                            {userList.map((val) => {
                                return (
                                    <tr key={val.userID}>
                                        <td>{val.userLastName} </td>
                                        <td>{val.userFirstName} </td>
                                        <td>{val.userEmail} </td>
                                        <td>{val.userPhoneNumber} </td>
                                        <td>{val.theaterName} </td>
                                        <td>{val.userID}</td>
                                        <td><button onClick={() => { deleteUser(val.userID) }}> Delete User </button></td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                }
            </div>

            <div className='footer'>
                All Rights Reversed
            </div>
        </div>
    )
}