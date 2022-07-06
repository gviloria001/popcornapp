import Axios from "axios";
import { useEffect, useState } from "react"

export default function DB() {
    const [queryState, setQueryState] = useState('Inventory');
    const [inventoryState, setInventoryState] = useState('Location');



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
    const [productName, setProductName] = useState("All");
    const [inventoryList, setInventoryList] = useState([]);
    const [inventoryListLocations, setInventoryListLocations] = useState([]);
    const [theaterList, setTheaterList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [locationName, setLocationName] = useState("");

    const editProduct = (key) => {
        const quantity = prompt('Change quantity to: ')
        Axios.post("http://localhost:3001/updateProduct", {
            locationID: key.locationID,
            productID: key.productID,
            quantity: quantity
        }).then((res) => {
            
        })
    }

    useEffect(()=>{
        Axios.get('http://localhost:3001/theaterList').then((res) => {
            setTheaterList(res.data);
        })
    },[])


    const countLocations = (paramTheater) => {
        Axios.get(`http://localhost:3001/${paramTheater}/locationList`).then((res) => {
            setLocationList(res.data);
        })
    }

    const handleLocationChange = (paramLocation) => {
        setLocationName(paramLocation);
    }

    const handleProductChange = (paramProductName) => {
        switch (paramProductName) {
            case '':
                return setProductName(' ');
            default:
                return setProductName(paramProductName)
        }
    }

    const handleTheaterChange = (paramTheater) => {
        setTheaterName(paramTheater);
        countLocations(paramTheater);
    }

    const queryShowAll = () => {
        setQueryState('Inventory');
        setInventoryState('Show All Inventory');
        Axios.get(`http://localhost:3001/inventory/ShowAll`).then((res) => {
            setInventoryList(res.data);
        })
    }

    const queryInventory = () => {
        setQueryState('Inventory');
        setInventoryState('Inventory');
        if (theaterName === 'Select Theater' || theaterName === '') {
            alert("Please select a theater.");
        }
        else {
            Axios.get(`http://localhost:3001/${productName}/${locationName}/${theaterName}`).then((res) => {
                setInventoryListLocations(res.data);
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
        setQueryState('Users');
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

                {queryState === 'Users' && <button onClick={() => { setQueryState('Inventory'); setInventoryState('Inventory') }}>Inventory
                </button>}

                {queryState === 'Inventory' && <button onClick={() => { setQueryState('Users'); setInventoryState('Users') }}>Users
                </button>}

                {queryState === 'Inventory' &&
                    <div>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    handleProductChange(event.target.value);
                                }}
                            />
                            <label>Location:</label>

                            <select onChange={e => setLocationName(e.target.value)}>
                                <option value=''>Select Location</option>
                                <option>All</option>
                                {locationList.map((val) => {
                                    return (
                                        <option key={val.locationName} value={val.locationName}>{val.locationName}</option>
                                    );
                                })}
                            </select>

                            <label>Theater:</label>
                            <select onChange={e => handleTheaterChange(e.target.value)}>
                                <option onChange={e => { handleTheaterChange('') }}>Select Theater</option>
                                {theaterList.map((val) => {
                                    return (
                                        <option key={val.theaterName} value={val.theaterName}>{val.theaterName}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <div>
                            <button onClick={() => { queryInventory(); setInventoryState('Location') }}>New Report</button>
                            <button onClick={() => { queryShowAll(); setInventoryState('Show All Inventory') }}>Show All Inventory</button>
                        </div>
                    </div>
                }


                {queryState === 'Users' &&
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
                {inventoryState === 'Location' &&
                            
                            <table>{locationList.map((keyLocation) => {
                                if (keyLocation.locationName === locationName || locationName === 'All'){
                                    return (
                                        <tbody>
                                        <tr key={keyLocation.locationName}>
                                            <th colSpan="3">
                                                {keyLocation.locationName}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Edit</th>
                                        </tr>
                                        {inventoryListLocations.map((key) => {
                                            if (key.locationName === keyLocation.locationName){
                                                return (
                                                    <tr>    
                                                        {key.locationName === keyLocation.locationName && 
                                                            <td> 
                                                                {key.productName}
                                                            </td>
                                                        }
                                                        {key.locationName === keyLocation.locationName && 
                                                            <td>    
                                                                {key.quantity}                                                               
                                                            </td>
                                                        }
                                                        <td><button onClick={() => editProduct(key)}>Edit</button></td>
                                                    </tr>
                                                )
                                            }
                                            return null
                                        })}
                                        <br></br>
                                        <br></br>
                                    </tbody>
                                )
                                }
                                return null
                            })}
                        </table>
                

                }

                {inventoryState === 'Show All Inventory' &&
                            <table>{theaterList.map((theaterName) => {
                                return (
                                    <tbody>
                                        <tr key={theaterName.theaterName}>
                                            <th colSpan="3">
                                                {theaterName.theaterName}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Total Quantity</th>
                                            <th>Edit</th>
                                        </tr>
                                        {inventoryList.map((key) => {
                                            if (key.theaterName === theaterName.theaterName){
                                                return (
                                                    <tr>    
                                                        {key.theaterName === theaterName.theaterName && 
                                                            <td> 
                                                                {key.productName} 
                                                            </td>}
                                                        {key.theaterName === theaterName.theaterName && 
                                                            <td>
                                                                {key.totalQuantity}
                                                            </td>
                                                        }
                                                        <td><button>Edit</button></td>
                                                    </tr>
                                                )
                                            }
                                            return null
                                        })}
                                        <br></br>
                                    </tbody>
                                );
                            })}
                        </table>
                }

                {inventoryState === 'Users' &&
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