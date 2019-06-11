import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Items.module.scss';
import * as actions from '../../store/actions/index';
import Item from '../../components/Item/Item';


class Items extends Component {
    
    componentDidMount() {
        this.props.onRecivedItems();
    }

    render() {
        return (
            <div className={styles.Items}>
                {this.props.storedItems.map((item, index) => {
                    return (
                        <Item key={index}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            content={item.content}
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