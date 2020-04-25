import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.png';


export default function Profile() {
    const [entregas, setEntregas] = useState([]);
    const [numeroEntregas, setNumeroEntregas] = useState();
    const [nomeEntregador, setNomeEntregador] = useState('');
    const [valorPagar, setValorPagar] = useState();
    const frete = 2;

    const history = useHistory();
    
    const loja_id = localStorage.getItem('idLoja');
    const nomeLoja = localStorage.getItem('nomeLoja');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: loja_id,
            }
        }).then(response => {
            setEntregas(response.data);
            setNumeroEntregas(response.data.length);

        })
    }, [loja_id]);
    

    async function handleDeleteEntregas(idEntrega) {
        try {
            await api.delete(`entrega/${idEntrega}`, {
                headers: {
                    Authorization: loja_id,
                }
            });
            setEntregas(entregas.filter(entrega => entrega.idEntrega !== idEntrega ));
            setNumeroEntregas(numeroEntregas - 1);
        } catch(err) {
            alert('Erro ao deletar entrega, tente novamente.')
        }
    }
    async function handleBuscaEntregadores(e) {
        e.preventDefault();
        try {
            await api.get('entrega', {
                headers: {
                    Authorization: loja_id,
                }
            });
            setEntregas(entregas.filter(entrega => entrega.nome === nomeEntregador));
            setNumeroEntregas(entregas.filter(entrega => entrega.nome === nomeEntregador).length)
            setValorPagar(entregas.filter(entrega => entrega.nome === nomeEntregador).length * frete);
        } catch(err) {
            alert('Erro ao buscar entregador')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Delivery App" />
                <span>Bem vinda, {nomeLoja} </span>
                <Link className="button" to="/entrega/new">Cadastrar nova entrega</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#0000FF" />
                </button>
            </header>

            <h1>Entregas cadastradas:</h1>
            <h2>Total: {numeroEntregas}</h2>
            <form onSubmit={handleBuscaEntregadores}>
            <input 
            placeholder="Digite o nome do Entregador"
            value={nomeEntregador}
            onChange={e => setNomeEntregador(e.target.value)}
            />
            <button className="button">Buscar</button>
            </form>            
            <ul>
                {entregas.map(entrega =>(
                    <li key={entrega.idEntrega}>
                        <strong>Endereço:</strong>
                        <p>{entrega.endereco}</p>
                        <strong>Valor a receber:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(entrega.valorReceber)}</p>
                        <strong>Troco:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(entrega.troco)}</p>
                        <strong>Frete:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(entrega.frete)}</p>
                        <strong>Data:</strong>
                        <p>{entrega.data}</p>
                        <strong>Entregador:</strong>
                        <p>{entrega.nome}</p>

                        <button onClick={() => handleDeleteEntregas(entrega.idEntrega)}>
                            <FiTrash2 size={20} color="#0000FF" />
                        </button>
                    </li>
                ))}
            </ul>
                <h2>Valor a pagar: {valorPagar}</h2>
        </div>
    );
}