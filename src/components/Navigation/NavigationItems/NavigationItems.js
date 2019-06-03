import React from 'react';

import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Items</NavigationItem>
            <NavigationItem link="/item-form" exact>Add Item</NavigationItem>
            <NavigationItem link="/about" exact>About</NavigationItem>
            <NavigationItem link="/" exact>Home</NavigationItem>
        </ul>
    );
};

export default navigationItems;