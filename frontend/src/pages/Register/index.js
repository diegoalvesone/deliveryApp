import React, {useState} from 'react';
import {Link, useHistory} from  'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.png';



export default function Register() {
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nomeFantasia,
            telefone,
            email,
            login,
            senha,
        };
        try {
            await api.post('loja', data);

            alert(`Loja cadastrada com sucesso, login de acesso: ${data.login}`);
            history.push('/');
        }
        catch(err) {
            alert('Erro no cadastro, tente novamente!');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Delivery" />
                    <h1>Cadastro</h1>
                    <p>Faça o cadastro de sua Loja no Delivery App PF</p>

                    <Link className="black-link" to="/">
                        <FiArrowLeft size={16} color="#0000FF"/>
                        Já tenho cadastro
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Loja"
                    value={nomeFantasia}
                    onChange={e => setNomeFantasia(e.target.value)}
                    />
                    <input placeholder="Telefone"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    />
                    <input type="email" placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Login"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    />
                    <input type="password" placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />

                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}