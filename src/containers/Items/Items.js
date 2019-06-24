import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Items.module.scss';
import * as actions from '../../store/actions/index';
import { shortenText } from '../../utilities';
import Auxiliary from '../../hoc/Auxiliar/Auxiliar';
import ItemCard from '../../components/Item/ItemCard';
import Paginator from '../../components/Paginator/Paginator';


class Items extends Component {
        
    componentDidMount() {
        this.props.onRecivedItems(1);
    }

    showItem = (itemId) => {
        this.props.history.push({ 
            pathname: `item/${itemId}`,
            query: { itemId: itemId }
        });
    }

    loadItems (direction) {
        let page = this.props.storedItemsPage;
        if (direction === 'next') {
            page++;
        }
        if (direction === 'previous') {
            page--;
        }
        this.props.onRecivedItems(page);
    }

    render() {
        return (
                <Auxiliary>
                <div className={styles.Items}>
                    {this.props.storedItems.map((item, index) => {
                        return (
                            <ItemCard key={index}
                                category={item.category}
                                title={shortenText(item.title, 55)}
                                imageUrl={item.imageUrl}
                                content={shortenText(item.content, 150)}
                                onShow={() => this.showItem(item._id)}
                                // creator info
                            />
                        )
                    })}                
                </div>
                <Paginator 
                    onPrevious={() => this.loadItems('previous')}
                    onNext={() => this.loadItems('next')}
                    lastPage={Math.ceil(this.props.storedTotalItems / 12)}
                    currentPage={this.props.storedItemsPage}
                />
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedItems: state.items.items,
        storedTotalItems: state.items.totalItems,
        storedItemsPage: state.items.itemsPage,
        storedMessage: state.items.message,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRecivedItems: (page) => dispatch(actions.getItems(page)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items); 