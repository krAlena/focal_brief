import React, {useState, useEffect} from 'react';
// import './Navbar.css';
// // import '../../global.css';
// import { Link } from "react-router-dom";

// import '../../public/img/health_care.png';

const AppHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail]=useState("");

    // useEffect(() => { 
    //   const storedemail = sessionStorage.getItem("email");

    //   if (storedemail) {
    //         setIsLoggedIn(true);
    //         let name = storedemail;
    //         const atIndex = storedemail.indexOf('@');

    //         if (atIndex !== -1) {
    //             name = storedemail.slice(0, atIndex);
    //         }
    //         setUsername(name);
    //       }
    //     }, []
    // );

    // const handleLogout = () => {
    //     sessionStorage.removeItem("auth-token");
    //     sessionStorage.removeItem("name");
    //     sessionStorage.removeItem("email");
    //     sessionStorage.removeItem("phone");
    //     // remove email phone
    //     localStorage.removeItem("doctorData");
    //     setIsLoggedIn(false);
    //     // setUsername("");

    //     // Remove the reviewFormData from local storage
    //     for (let i = 0; i < localStorage.length; i++) {
    //       const key = localStorage.key(i);
    //       if (key.startsWith("reviewFormData_")) {
    //         localStorage.removeItem(key);
    //       }
    //     }
    //     setEmail('');
    //     window.location.reload();
    // }
    return(
        <header className="main-header big">
            <div className="container main flex-row space-between center full-width">
                <div className="left-block logo-part">
                    <img className="main-logo btn"
                        src={'/images/logo_big.svg'}
                        alt="FocalBrief Logo"
                    />
                </div>
                <div className="right-block mebu-part">
                    <div className="menu flex-row center">
                        <div className="active tab">Analysis</div>
                        <div className="tab-separator"></div>
                        <div className="tab">Settings</div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default AppHeader;
