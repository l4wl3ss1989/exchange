import React from 'react';

import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    debugger;
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {props.isAuth ? 
                <NavigationItem link={`/item/${props.userId}`} exact>User Items</NavigationItem>
            : null}
            <NavigationItem link="/item-form" exact>Add Item</NavigationItem>
            <NavigationItem link="/about" exact>About</NavigationItem>
            <NavigationItem link="/auth" exact>Sign In</NavigationItem>
        </ul>
    );
};

export default navigationItems;