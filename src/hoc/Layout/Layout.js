import React, { Component } from 'react';

import styles from './Layout.module.scss';
import Auxiliar from '../Auxiliar/Auxiliar';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    sideDrawerColseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    
    render() {
        return (
            <Auxiliar>
                <Toolbar />
                <SideDrawer />
                <main className={styles.Content}>
                    MAIN Content
                    {this.props.children}
                </main>
                <Footer />
            </Auxiliar>
        );
    }
}

export default Layout;