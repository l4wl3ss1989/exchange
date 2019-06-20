import React from 'react';

import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import styles from './ItemCard.module.scss';

const Item = (props) => {
    let controlls = <button onClick={props.onShow} >Show</button>;

    if(props.editMode) {
        controlls = (
            <Auxiliar>
                {controlls}
                <button
                    onClick={props.onEdit}
                >Edit</button>
                <button
                    onClick={props.onDelete}
                >Delete</button>
            </Auxiliar>
        );
    }

    return (
        <div className={styles.ItemCard}>
            <img src={props.imageUrl} alt={props.title}/>
            <div className={styles.item_body}>
                <h5>{props.title}</h5>
                <p>{props.content}</p>
                {controlls}
            </div>
        </div>
    );
};

export default Item;