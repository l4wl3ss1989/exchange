import React from 'react';

import * as styles from './Item.module.scss';

const Item = (props) => {
    return (
        <div className={styles.Item}>
            <img src={props.imageUrl} alt={props.title}/>
            <div className={styles.item_body}>
                <h5>{props.title}</h5>
                <p>{props.content}</p>
                <p>{props.creatorEmail}</p>
                <p>{props.created}</p>
                <p>{props.updated}</p>
                {props.tlf ? `<p>${props.tlf}</p>` : null}
            </div>
        </div>
    );
};

export default Item;