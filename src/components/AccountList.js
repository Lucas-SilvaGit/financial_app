import React, { useEffect, useState } from 'react';
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

  return (
    <div>
      <h2>Lista de Contas</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>{account.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
