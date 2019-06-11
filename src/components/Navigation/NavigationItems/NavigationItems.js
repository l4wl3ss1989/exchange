import React from 'react';

import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/item-form" exact>Add Item</NavigationItem>
            <NavigationItem link="/about" exact>About</NavigationItem>
            <NavigationItem link="/auth" exact>Sign In</NavigationItem>
        </ul>
    );
};

export default navigationItems;