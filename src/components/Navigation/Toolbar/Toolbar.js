import React from 'react';

import exchangeLogo from '../../../assets/images/logo.png';
import styles from './Toolbar.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div className={styles.Logo}>
            <img src={exchangeLogo} alt="exchange"></img>
            <div>Exchange</div>
        </div>
        <DrawerToggle clicked={props.drawerToggleClicked}/>        
        <nav className={styles.DesktopOnly}>            
            <NavigationItems 
                isAuth={props.isAuth}
                userId={props.userId}
            />
        </nav>
    </header>
);

export default toolbar;