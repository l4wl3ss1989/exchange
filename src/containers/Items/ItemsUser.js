import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styles from './Items.module.scss';
import ItemCard from '../../components/Item/ItemCard';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';
import { shortenText } from '../../utilities';

class ItemsUser extends Component {

    componentDidMount() {        
        this.props.onRecivedItems(this.props.isAuthenticated,this.props.match.params.id);
    }

    showItem = (itemId) => {
        this.props.history.push({ 
            pathname: `/item/${itemId}`,
            query: { itemId: itemId }
        });        
    }

    editItem = (item) => {
        this.props.history.push({ 
            pathname: `/item-form/${item._id}`,
            query: { 
                id: item._id,
                title: item.title,
                category: item.category,
                content: item.content,
                imageUrl: item.imageUrl
            }
        });
    }
    deleteItem = (itemId, auth) => {
        this.props.removeUserItem(itemId,auth);
        //websockets or redirect.        
    }

    alertCancelHandler = () => {
        this.props.removeAlert();
        this.props.history.push('/'); 
    }

    render() {
        let items = <h5>You have no items yet.</h5>;
        if(this.props.storedItems && this.props.storedItems.length > 0) {
            items = this.props.storedItems.map((item, index) => {
                return (
                    <ItemCard key={index}
                        category={item.category}
                        title={shortenText(item.title, 55)}
                        imageUrl={item.imageUrl}
                        content={shortenText(item.content, 150)}
                        editMode={true}
                        onShow={() => this.showItem(item._id)}
                        onEdit={() => this.editItem(item)}
                        onDelete={() => this.deleteItem(item._id, this.props.isAuthenticated)}
                    />
                )
            });            
        }
        return (
            <div className={styles.Items}>
                <Modal 
                    show={this.props.storedMessage && this.props.storedMessage !== '' ? true : false} 
                    modalClosed={this.alertCancelHandler}
                >     
                    {this.props.storedMessage}
                </Modal>
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
        isAuthenticated: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRecivedItems: (auth,userId) => dispatch(actions.getItemsUser(auth,userId)),
        removeUserItem: (itemId,auth) => dispatch(actions.deleteItem(itemId,auth)),
        removeAlert: () => dispatch(actions.itemAlertClean())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemsUser));