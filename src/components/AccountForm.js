import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AccountForm = () => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0.0);
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:3001/v1/accounts', { name, balance })
      .then(response => {
        console.log('Account created:', response.data);
        navigate('/accounts');
        setName('');
        setBalance(0.0);
      })
      .catch(error => {
        console.error('Error creating account:', error);
      });
  };

  return (
    <div>
      <h2>Criar Nova Conta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome da Conta:</label>
          <input
            type="text"
            id="name"
            placeholder="Nome da Conta"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="balance">Saldo:</label>
          <input
            type="number"
            id="balance"
            step="0.01"
            placeholder="Saldo"
            value={balance}
            onChange={e => setBalance(parseFloat(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Criar</button>

        <Link to="/accounts" className="btn btn-warning mt-3">
          Voltar
        </Link>
      </form>
    </div>
  );
};

export default AccountForm;
