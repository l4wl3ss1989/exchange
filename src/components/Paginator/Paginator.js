import React from 'react';

import styles from './Paginator.module.scss';

const Paginator = (props) => {
    return (
        <div className={styles.Paginator}>
            <div className={styles.paginator__controls}>
            {props.currentPage > 1 && (
                <button className={styles.paginator__control} onClick={props.onPrevious}>
                Previous
                </button>
            )}
            {props.currentPage < props.lastPage && (
                <button className={styles.paginator__control} onClick={props.onNext}>
                Next
                </button>
            )}
            </div>
        </div>
    );
};

export default Paginator;