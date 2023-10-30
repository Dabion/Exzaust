import React from "react";
import { useState } from "react";


import { Link } from "react-router-dom";
import Logo from "../images/Logo.png"

import { useGlobalContext } from "./Store/Context/cart_context";
import "./StyleSheets/NavBar.css";
/*{isUser ? (
                <button
                className="login"
                onClick={() => logout({ returnTo: window.location.origin })}
                >
                Log out
                </button>
            ) : (
                <button className="login" onClick={loginWithRedirect}>
                Log in
                </button>
            )} */



export default function Navbar() {

    const { amount } = useGlobalContext();
    const [active, setActive] =useState("")

    function toggle(){
        if (active === ""){
            setActive("active")
        }
        else{
            setActive("")
        }
    }

    return (
        <header id="header" className={active}>
            <Link to="/">
            <h1><img src={Logo} alt="EXZA" width="60" height="72"></img></h1>
            </Link>

            <ul>
            <Link to="/Store">
                <li onClick={toggle} >Store</li>
            </Link>
            <Link to="/Home">
                <li onClick={toggle} >Home</li>
            </Link>
            <Link to="/NFT">
                <li onClick={toggle} >NFT</li>
            </Link>
            </ul>

            <div className="user">
            
            <Link to="/Cart">
                <i className="fa fa-shopping-cart fa-2x cart-icon"></i>{" "}
            </Link>
            <div className="nav-item">
                
                <div className="amount-container">
                <p className="total-amount">{amount}</p>
                </div>
            </div>
            </div>
            <div className="toggle" onClick={toggle} ></div>
        </header>
        
    );
}
