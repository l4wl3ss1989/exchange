import React from 'react';

import styles from './Item.module.scss';

const Item = (props) => {
    return (
        <div className={styles.Item}>
            <img src={props.imageUrl} />
            <div className={styles.item_body}>
                <h5>{props.title}</h5>
                <p>{props.content}</p>
            </div>
        </div>
    );
};

export default Item;