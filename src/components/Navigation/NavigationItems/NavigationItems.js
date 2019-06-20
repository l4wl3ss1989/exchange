import React from 'react';

import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';

const navigationItems = (props) => {
    const userItems = props.isAuth ? 
        <Auxiliar>
            <NavigationItem link={`/item/${props.userId}`} exact>User Items</NavigationItem>
            <NavigationItem link="/item-form" exact>Add Item</NavigationItem> 
        </Auxiliar>
        : null;  
    const auth = !props.isAuth ? 
        <NavigationItem link="/auth" exact>Sign In</NavigationItem> :
        <NavigationItem link="/logout" exact>Log Out</NavigationItem>;
        
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {userItems}            
            <NavigationItem link="/about" exact>About</NavigationItem>
            {auth}
        </ul>
    );
};

export default navigationItems;