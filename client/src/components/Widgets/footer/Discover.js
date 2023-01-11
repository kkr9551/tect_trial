import React from "react";
import "./Discover.css";
import {Link} from "react-router-dom";

const Discover = () => {
    const discover = [
        {name: "Project", link: "project"},
        {name: "Booklist", link: "booklist"},
        {name: "Cooperation", link: "cooperation"},
        {name: "Publications", link: "publications"}
    ];

    return (
        <div>
            {discover.map((el, i) => (
                <div key={i + 1} className="discover">
                    <Link href={{pathname: `${el.link}`}} className="discover_item">{el.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default Discover;

