import React from 'react';
import FontAwesome from 'react-fontawesome';

import * as styles from './Item.module.scss';
import {formateDate} from '../../utilities';

const Item = (props) => {

    let category = null;
    
    if(props.category) {
        category = (
            <div className={styles.item_category}>
                <FontAwesome name="star" />
                <div>{props.category}</div> 
            </div>
        );
    }

    return (
        <div className={styles.Item}>
            {category}
            <img src={props.imageUrl} alt={props.title}/>
            <div className={styles.item_body}>
                <h5>{props.title}</h5>
                <p>{props.content}</p>
                <div className={styles.item_contact}>
                    { props.creatorTlf ?
                        <div><FontAwesome name="phone-square"/>{props.creatorTlf}</div>
                    : null }                    
                    <div><FontAwesome name="envelope"/>{props.creatorEmail}</div>
                    <div><FontAwesome name="clock-o"/>{formateDate(props.updated)}</div>
                </div>
            </div>
        </div>
    );
};

export default Item;