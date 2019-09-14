import React, { Component } from 'react';
import api from '../../services/api';

import Evento from '../Evento';

import './style.css';

export default class Timeline extends Component {
    state = {
        events : []
    }
    
    /*
    componentDidMount() {
        this.loadEvents();
    }

    loadEvents = async () => {
        const response = await api.get('/events.json');
        this.setState({ events : response.events })
    };
    */

    render() {
        return <div className="container">
            <div className="left-line">
                <Evento />
            </div>
        </div>
    }
}