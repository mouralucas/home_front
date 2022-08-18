import React from 'react'
import Styles from '../Assets/Header/Header.module.css'

function Header() {
    return (
        <header className={Styles.Header}>
            <span className={Styles.HeaderTitle}>
                Header
            </span>
        </header>
    );
}

export default Header;