import React, { useState } from 'react';
import axios from 'axios';

const AccountForm = () => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0.0);

  const handleSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:3001/v1/accounts', { name, balance })
      .then(response => {
        console.log('Account created:', response.data);
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
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default AccountForm;
