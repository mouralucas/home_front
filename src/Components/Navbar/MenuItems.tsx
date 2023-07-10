import Dropdown from './Dropdown';
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import React from 'react';

const MenuItems = ({items, depthLevel}: {items: any, depthLevel: any}) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    useEffect(() => {
        const handler = (event: { target: any; }) => {
            // @ts-ignore
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };


    return (
        // @ts-ignore
        <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu"
                            aria-expanded={dropdown ? "true" : "false"}
                            onClick={() => setDropdown((prev) => !prev)}>
                        {items.title}{" "}
                        {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/>
                </>
            ) : (
                <Link to={items.url}>{items.title}</Link>
            )}
        </li>
    );
};

export default MenuItems;