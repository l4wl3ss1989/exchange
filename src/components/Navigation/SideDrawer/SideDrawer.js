import React from 'react';

import exchangeLogo from '../../../assets/images/logo.png';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';

const sideDrawer = (props) => {

    let attachedStyles = `${styles.SideDrawer} ${styles.Close}`;
    
    if(props.open){
        attachedStyles = `${styles.SideDrawer} ${styles.Open}`;
    }
    return (
        <Auxiliar>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedStyles}>
                <div className={styles.Logo}>
                    <img src={exchangeLogo} alt="exchange"></img>
                    <div>Exchange</div>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliar>        
    );
};

export default sideDrawer;