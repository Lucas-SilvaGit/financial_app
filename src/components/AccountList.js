import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from './DataTable';
import ReactPaginate from 'react-paginate';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/v1/accounts',
          {
            params: {
              'page[number]': currentPage,
              'page[size]': perPage,
            },
          }
        );
        setAccounts(response.data);

        const totalPagesHeader = response.headers['x-total-pages'];
        setTotalPages(parseInt(totalPagesHeader, 10));
    
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
  
    loadAccounts();
  }, [currentPage]);
  

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

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <div className='container-lg'>
      <h2>Lista de Contas</h2>
      <DataTable data={accounts} columns={columns} />

      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Próximo'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

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
