import React from "react";
import "./Help.css";
import {Link} from "react-router-dom";

const Help = () => {
    const help = [
        {name: "How to get involved", link: "how-to-get-involved"},
        {name: "FAQ", link: "FAQ"},
        {name: "About us", link: "about-us"},
        {name: "Acknowledgements", link: "acknowledgements"}
    ];
    return(
        <div>
            {help.map((el, i) => (
                <div key={i + 1} className="help">
                    <Link href={{pathname: `${el.link}`}} className="help_item">{el.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default Help;