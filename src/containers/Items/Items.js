import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Items.module.scss';
import * as actions from '../../store/actions/index';
import ItemCard from '../../components/Item/ItemCard';


class Items extends Component {
    
    componentDidMount() {
        this.props.onRecivedItems();
    }

    showItem = (itemId) => {
        this.props.history.push({ 
            pathname: `item/${itemId}`,
            query: { itemId: itemId }
        });
    }

    render() {
        return (
            <div className={styles.Items}>
                {this.props.storedItems.map((item, index) => {
                    return (
                        <ItemCard key={index}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            content={item.content}
                            onShow={() => this.showItem(item._id)}
                            // creator info
                        />
                    )
                })}
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
        onRecivedItems: () => dispatch(actions.getItems()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items); 