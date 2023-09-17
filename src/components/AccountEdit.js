import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AccountEdit = () => {
  const { id } = useParams();
  const [account, setAccount] = useState({});
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0.0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/accounts/${id}`)
      .then(response => {
        const { name, balance } = response.data;
        setAccount(response.data);
        setName(name);
        setBalance(balance);
      })
      .catch(error => {
        console.error('Error fetching account:', error);
      });
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();

    axios.put(`http://localhost:3001/v1/accounts/${id}`, { name, balance })
      .then(response => {
        console.log('Account updated:', response.data);
        navigate('/accounts');
      })
      .catch(error => {
        console.error('Error updating account:', error);
      });
  };

  return (
    <div>
      <h2>Editar Conta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Conta"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Saldo da Conta"
          value={balance}
          onChange={e => setBalance(parseFloat(e.target.value))}
        />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default AccountEdit;
