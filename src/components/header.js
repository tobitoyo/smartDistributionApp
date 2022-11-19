import React from "react";
import HeaderLink from "./headerLinks";
import Button from "./button";
import Trail from "./trail";
import "../styles/header.css"



const Header = (props) => {

    return (
        <div>
            <div className="header-div">
                <div className="header-left">
                <h1 className="company-name">Smart<span style={{color: "#AD4C4C"}}>Distribution</span> </h1>
                    <HeaderLink href="#" title="Tools" color="#AD4C4C" />
                    <HeaderLink href="#" title="Services" color="#AD4C4C" />
                    <HeaderLink href="#" title="Pricing" color="#AD4C4C" />
                    <HeaderLink href="#" title="Updates" color="#AD4C4C" />
                </div>
                

                <div className="header-right">
                                       
                    <Button className="header-btn" title="Android app" />
                    <Button className="header-btn" title="iOS app" />
                </div>
 
            </div>

            <Trail grey={props.grey} bold={props.bold} />

        </div>
    )
}

export default Header;