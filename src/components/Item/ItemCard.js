import React from 'react';

import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import styles from './ItemCard.module.scss';

const Item = (props) => {
    let controlls = <button className={styles.default} onClick={props.onShow} >Show</button>;

    if(props.editMode) {
        controlls = (
            <Auxiliar>
                {controlls}
                <button
                    className={styles.warning}
                    onClick={props.onEdit}
                >Edit</button>
                <button
                    className={styles.danger}
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
            </div>
            <div className={styles.item_controlls}>
                {controlls}
            </div>
        </div>
    );
};

export default Item;