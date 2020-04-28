import React, {useState, useEffect} from 'react';
import './styles.css';

import api from '../../services/api'

import {Link, useHistory} from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi';

import logoImg from '../../assets/logo.png';

export default function NewEntrega() {
    const [endereco, setEndereco] = useState('');
    const [valorReceber, setValorReceber] = useState('');
    const [troco, setTroco] = useState('');
    const frete = 1;
    const [entregadores, setEntregadores] = useState([]);
    const [entregador_id, setEntregadorId] = useState('');


    const loja_id = localStorage.getItem('idLoja');
    localStorage.setItem('entregador_id', entregador_id);
    


    const history = useHistory();

    useEffect(() => {
        api.get('entregador')
        .then(res =>  {
            setEntregadores(res.data);
        });
    }, []);

    async function handleNewEntrega(e) {
        e.preventDefault();

        const dados = {
            endereco,
            valorReceber,
            troco,
            frete,
            entregador_id,
        };
        try {
            await api.post('entrega', dados, {
                headers: {
                    Authorization: loja_id,
                }
            })
            history.push('/profile');
        } catch(err) {
            alert('Erro ao cadastrar entrega, tente novamente.')
        }


    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Delivery App"/>
                    <h1>Cadastrar nova entrega:</h1>
                    <p>Preencha os dados da entrega</p>

                    <Link className="black-link" to="/profile">
                        <FiArrowLeft size={16} color="#0000FF" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewEntrega}>
                    <input
                        placeholder="Endereço"
                        value={endereco}
                        onChange={e => setEndereco(e.target.value)}
                    />
                    <input
                        placeholder="Valor a Receber"
                        value={valorReceber}
                        onChange={e => setValorReceber(e.target.value)}
                    />
                    <input
                        placeholder="Troco"
                        value={troco}
                        onChange={e => setTroco(e.target.value)}
                    />
                    <select onChange={e => setEntregadorId(e.target.value)}>
                        <option>Selecione o Entregador</option>
                        {entregadores.map(entregador =>
                        <option value={entregador.idEntregador}>
                            {entregador.nome}
                        </option>)
                        }
                    </select>
                    <label>Frete: {frete}</label>
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}