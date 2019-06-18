import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Items.module.scss';
import * as actions from '../../store/actions/index';
import Item from '../../components/Item/Item';

class ItemsUser extends Component {

    componentDidMount() {        
        this.props.onRecivedItems(this.props.isAuthenticated,this.props.match.params.id);
    }

    render() {
        let items = <h5>You have no items yet.</h5>;
        if(this.props.storedItems && this.props.storedItems.length > 0) {
            items = this.props.storedItems.map((item, index) => {
                return (
                    <Item key={index}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        content={item.content}
                        // creator info
                    />
                )
            });
            
        }

        return (
            <div className={styles.Items}>
                {items}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedItems: state.items.items,
        storedTotalItems: state.items.totalItems,
        storedMessage: state.items.message,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRecivedItems: (auth,userId) => dispatch(actions.getItemsUser(auth,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsUser);