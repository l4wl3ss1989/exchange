import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as styles from './Item.module.scss';
import ItemDisplay from '../../components/Item/Item';
import * as actions from '../../store/actions/index';

class Item extends Component {

    componentDidMount() {      
        let itemId = null;
        if (this.props.location.query){
            itemId = this.props.location.query.itemId
            this.props.onRecivedItem(itemId);
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        let item = null;
        const storedItem = this.props.storedItem;
        if(storedItem) {
            debugger;
            item = (<ItemDisplay 
                title={storedItem.title}
                imageUrl={storedItem.imageUrl}
                content={storedItem.content}  
                creatorTlf={storedItem.content.tlf ? storedItem.content.tlf : null }           
                creatorEmail= {storedItem.creator.email}     
                created={storedItem.creator.createdAt}
                updated={storedItem.creator.updatedAt}          
            />);
        }
        return (
            <div className={styles.ItemContainer}>
                {item}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedItem: state.items.item,
        storedMessage: state.items.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRecivedItem: (itemId) => dispatch(actions.getItem(itemId)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);