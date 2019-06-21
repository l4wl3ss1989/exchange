import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.scss';
//import Auxiliar from '../Auxiliar/Auxiliar';
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
            <div className={styles.Container}>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    userId={this.props.userId}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerColseHandler}
                />
                <main className={styles.Content}>                                
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Layout);