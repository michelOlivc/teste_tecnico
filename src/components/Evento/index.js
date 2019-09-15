import React, { Component } from 'react';
import api from "../../services/api";
import Util from '../../util/util';

import Check from '../../icons/Check';
import Calendar from '../../icons/Calendar';
import Clock from '../../icons/Clock';
import Money from '../../icons/Money';
import Place from '../../icons/Place';

import './style.css';

export default class Evento extends Component {
    state = {
        events: [],
        generatedId: 1,
    }
    
    componentDidMount() {
        this.carregarEventos()
    }
    
    carregarEventos = async () => {
        const response = await api.get('https://storage.googleapis.com/dito-questions/events.json');

        const compras = [];
        const produtos = []; 
        
        await response.data.events.map(item => {
            if(item.event === 'comprou')
                compras.push(item);
            else if(item.event === 'comprou-produto')
                produtos.push(item);
        });        
        
        const resultado = this.prepararResultadoJSON(compras, produtos);  

        this.setState({ events: resultado });
    };

    prepararResultadoJSON = (compras, produtos) => {
        const id = this.state.generatedId;
        const resultado = [];
        
        compras.map(item => {
            const transaction_id = Util.obterValorPorChave("transaction_id", item.custom_data);
            const compra = {
                id: `${id}`,
                loja: Util.obterValorPorChave("store_name", item.custom_data),
                data: Util.obterDataTimestamp(item.timestamp),
                horas: Util.obterHorasTimestamp(item.timestamp),
                produtos: this.buscarProdutosPorTransactionID(produtos, transaction_id),
                valorTotal: 0
            }

            compra.produtos.map(produto => {
                compra.valorTotal += produto.preco;
            });
            compra.valorTotal = Util.doubleParaMonetario(compra.valorTotal);
                
            resultado.push(compra);
        });
        
        resultado.sort((a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            
            return 0;
        });
        
        this.setState({ generatedId: generatedId + 1 });
        return resultado;
    }

    buscarProdutosPorTransactionID = (produtos, transactionID) => {
        const id = this.state.generatedId;
        const produtosPorID = [];        
        produtos.map(item => {
            const itemID = Util.obterValorPorChave("transaction_id", item.custom_data);
            
            if(transactionID === itemID) {
                const valor = Util.obterValorPorChave("product_price", item.custom_data)

                const produto = {
                    id: `${id}`,
                    nome: Util.obterValorPorChave("product_name", item.custom_data),
                    preco: Util.monetarioParaDouble(valor)
                }

                produtosPorID.push(produto);
                ;
            }
        });

        this.setState({ generatedId: generatedId + 1 });
        return produtosPorID;
    }

    render() {
        return <div className="container">
            {this.state.events.map(compra => (
                <div className="row element">
                    <div className="col-4-lg col-4-md col-4-sm">
                        <div className="check-icons">
                            <Check viewBox='0 0 22 22' height="75px" width="40px" />
                        </div>
                    </div>
                    <div className="col-8-lg col-8-md col-8-sm">
                        <div className="speech-bubble event-box">
                            <div className="row event-header">
                                <div className="col-3-lg col-3-md col-3-sm">
                                    <div id="item-data">
                                        <Calendar viewBox='0 -2 8 8' width='20px' height='100%' />
                                        {compra.data}
                                    </div>
                                </div>
                                <div className="col-3-lg col-3-md col-3-sm">
                                    <div id="item-data">
                                        <Clock viewBox='0 -2.5 9 9' width='20px' height='100%' />
                                        {compra.hora}
                                    </div>
                                </div>
                                <div className="col-3-lg col-3-md col-3-sm">
                                    <div id="item-data">
                                        <Place viewBox='0 -1.5 9 9' width='20px' height='100%' />
                                        {compra.loja}
                                    </div>
                                </div>
                                <div className="col-3-lg col-3-md col-3-sm">
                                    <div id="item-data">
                                        <Money viewBox='0 -1.5 9 9' width='20px' height='100%' />
                                        {compra.valorTotal}
                                    </div>
                                </div>
                            </div>
                            <div className="row products">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th className="produto">Produto</th>
                                            <th className="preco">Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {compra.produtos.map(produto => (
                                            <tr key={produto.id}>
                                                <td>{produto.nome}</td>
                                                <td className="preco">{produto.preco}</td>
                                            </tr>
                                        ))}                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    }
}