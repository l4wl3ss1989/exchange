import React from 'react';

import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={styles.NAvigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/" exact>Posts</NavigationItem>
            <NavigationItem link="/" exact>About</NavigationItem>
        </ul>
    );
};

export default navigationItems;