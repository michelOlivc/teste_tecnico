import React, { Component } from 'react';
import api from '../../services/api';

import Eventos from '../Eventos';

import './style.css';

export default class Timeline extends Component {
    render() {
        return <div className="wrap-box">
            <div className="left-line">
                <Eventos />
            </div>
        </div>
    }
}