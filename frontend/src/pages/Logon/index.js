import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.png'
import deliveryImg from '../../assets/delivery.png'

export default function Logon() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {login, senha});

            localStorage.setItem('login', login);
            localStorage.setItem('senha', senha);
            localStorage.setItem('nomeLoja', response.data.nomeFantasia);
            localStorage.setItem('idLoja', response.data.idLoja);

            history.push('/profile');
        }

        catch (err) {
            alert('Login ou senha incorreta, tente novamente!');
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Delivery App"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Seu Login"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    />
                    <input type="password" placeholder="Sua senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="black-link" to="/register">
                        <FiLogIn size={16} color="#0000FF" />
                        Não tenho cadastro
                    </Link>

                </form>
            </section>
            <img src={deliveryImg} alt="Delivery" width="600" height="300" />
        </div>
    );
}