import React, { Component } from 'react';
import api from "../../services/api";

import './style.css';

export default class Evento extends Component {
    render() {
        return <div className="row">
            <div className="col-2-lg col-2-md">
                <img id="check-icon" src="check.svg" />
            </div>
            <div className="col-10-lg col-10-md">
                B
            </div>
        </div>
    }
}