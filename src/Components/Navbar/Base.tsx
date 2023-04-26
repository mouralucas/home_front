import {items} from './Items';
import MenuItems from './MenuItems';
import React from 'react';

// Project reference:
// https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
const getMenuItens = (): any => {
    let items_list;

    items_list = items.map((menu, index) => {

        const depthLevel = 0;

        return <MenuItems items={menu} key={index} depthLevel={depthLevel}/>;
    })

    return items_list
}

const Navbar = () => {
    return (
        <nav>
            <ul className="menus">
                {getMenuItens()}
            </ul>
        </nav>
    );
};

export default Navbar;