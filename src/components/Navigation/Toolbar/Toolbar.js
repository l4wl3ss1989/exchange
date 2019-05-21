import React from 'react';

import styles from './Toolbar.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        drawer
        <div className={styles.Logo}>
            LOGO
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;