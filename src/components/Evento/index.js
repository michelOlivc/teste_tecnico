import React, { Component } from 'react';
import api from "../../services/api";

import './style.css';

export default class Evento extends Component {
    render() {
        return <div className="container"> 
            <div className="row">
                <div className="col-4-lg col-4-md col-4-sm">
                    <img src={'./check.svg'} />
                </div>
                <div className="col-8-lg col-8-md col-8-sm">
                    <div className="speech-bubble event-box">
                        <div className="row event-header">
                            <div className="col-3-lg col-3-md col-3-sm">
                                <div id="item-data">22/09/2019</div>
                            </div>
                            <div className="col-3-lg col-3-md col-3-sm">
                                <div id="item-data">13:57</div>
                            </div>
                            <div className="col-3-lg col-3-md col-3-sm">
                                <div id="item-data">Patio Savassi</div>
                            </div>
                            <div className="col-3-lg col-3-md col-3-sm">
                                <div id="item-data">250,00</div>
                            </div>
                        </div>
                        <div className="row products">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th id="produto">Produto</th>
                                        <th id="preco">Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Camisa Azul</td>
                                        <td>120,00</td>
                                    </tr>
                                    <tr>
                                        <td>Calça Jeans Preta</td>
                                        <td>130,00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}