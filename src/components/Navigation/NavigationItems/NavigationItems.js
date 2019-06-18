import React from 'react';

import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const userItems = props.isAuth ? <NavigationItem link={`/item/${props.userId}`} exact>User Items</NavigationItem> : null;  
    const auth = !props.isAuth ? 
        <NavigationItem link="/auth" exact>Sign In</NavigationItem> :
        <NavigationItem link="/logout" exact>Log Out</NavigationItem>;
        
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {userItems}
            <NavigationItem link="/item-form" exact>Add Item</NavigationItem>
            <NavigationItem link="/about" exact>About</NavigationItem>
            {auth}
        </ul>
    );
};

export default navigationItems;