import React from 'react';

import exchangeLogo from '../../assets/images/logo.png'
import {WARNING, TEXT_1, TEXT_2, TEXT_3, TEXT_4} from '../../configurations/about';
import * as styles from './About.module.scss';

const About = () => {
    return (
        <div className={styles.About}>
            <img src={exchangeLogo} alt="exchange"></img>
            <h1>Wellcome to Exchange</h1>
            <p className={styles.warnign}>{WARNING}</p>
            <p>{TEXT_1}</p>
            <p>{TEXT_2}</p>
            <p>{TEXT_3}</p>
            <p>{TEXT_4}</p>
        </div>
    );
};

export default About;