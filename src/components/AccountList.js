import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from './DataTable';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [balanceFilter, setBalanceFilter] = useState('');

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/v1/accounts', {
          params: {
            name: nameFilter,
            balance: balanceFilter,
          },
        });
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    loadAccounts();
  }, [nameFilter, balanceFilter]);

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

  const handleClearFilters = () => {
    setNameFilter('');
    setBalanceFilter('');
  };

  const columns = [
    { key: 'name', title: 'Nome da Conta' },
    { key: 'balance', title: 'Saldo' },
    {
      key: 'edit',
      title: 'Editar',
      render: (account) => (
        <Link to={`/accounts/edit/${account.id}`} className="btn btn-primary">
          Editar
        </Link>
      ),
    },
    {
      key: 'delete',
      title: 'Deletar',
      render: (account) => (
        <button onClick={() => handleDeleteClick(account.id)} className="btn btn-danger">
          Deletar
        </button>
      ),
    },
  ];


  return (
    <div className='container-lg'>
      <h2>Lista de Contas</h2>

      <div>
        <input
          type="text"
          placeholder="Nome"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Saldo"
          value={balanceFilter}
          onChange={(e) => setBalanceFilter(e.target.value)}
        />
        <button onClick={handleClearFilters}>Limpar Filtros</button>
      </div>
      
      <DataTable data={accounts} columns={columns} />

      <Link to="/accounts/create" className="btn btn-success mt-3">
        Criar Nova Conta
      </Link>

      <Link to="/" className="btn btn-warning mt-3">
        Voltar
      </Link>
    </div>
  );
};

export default AccountList;
