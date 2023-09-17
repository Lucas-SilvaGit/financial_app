import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../Api'; 

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/v1/accounts')
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      });
  }, []);

  const handleDeleteClick = (accountId) => {
    if (window.confirm('Tem certeza de que deseja excluir esta conta?')) {
      axios
        .delete(`http://localhost:3001/v1/accounts/${accountId}`)
        .then(() => {
          setAccounts(accounts.filter(account => account.id !== accountId));
        })
        .catch(error => {
          console.error('Error deleting account:', error);
        });
    }
  };

  return (
    <div>
      <h2>Lista de Contas</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            {account.name}{" "}
            <Link to={`/accounts/edit/${account.id}`} className="btn btn-primary">
              Editar
            </Link>

            <button onClick={() => handleDeleteClick(account.id)} className="btn btn-danger">
              Deletar
            </button>
          </li>
        ))}
      </ul>

      <Link to="/accounts/create" className="btn btn-success mt-3">
        Criar Nova Conta
      </Link>
    </div>
  );
};

export default AccountList;
