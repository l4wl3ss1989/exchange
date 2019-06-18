import React from 'react';

import exchangeLogo from '../../../assets/images/logo.png';
import styles from './Toolbar.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <nav className={styles.DesktopOnly}>
            <div className={styles.Logo}>
                <img src={exchangeLogo} alt="exchange"></img>
            </div>
            <NavigationItems 
                isAuth={props.isAuth}
                userId={props.userId}
            />
        </nav>
    </header>
);

export default toolbar;