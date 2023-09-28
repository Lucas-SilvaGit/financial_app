import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from './DataTable';

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]); // Estado para armazenar entradas filtradas
  const [categoryDescriptions, setCategoryDescriptions] = useState({});
  const [accountDescriptions, setAccountDescriptions] = useState({});
  const [descriptionFilter, setDescriptionFilter] = useState('');

  useEffect(() => {
    // Função para buscar descrições de categorias e contas
    const fetchDescriptions = async () => {
      try {
        const [categoriesResponse, accountsResponse] = await Promise.all([
          axios.get('http://localhost:3001/v1/categories'),
          axios.get('http://localhost:3001/v1/accounts')
        ]);

        const categoryDesc = {};
        categoriesResponse.data.forEach(category => {
          categoryDesc[category.id] = category.description;
        });

        const accountDesc = {};
        accountsResponse.data.forEach(account => {
          accountDesc[account.id] = account.name;
        });

        setCategoryDescriptions(categoryDesc);
        setAccountDescriptions(accountDesc);
      } catch (error) {
        console.error('Error fetching descriptions:', error);
      }
    };

    // Função para buscar todas as entradas (sem filtro)
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/v1/entries');
        setEntries(response.data);
      } catch (error) {
        console.error('Error getting entries:', error);
      }
    };

    // Inicialmente, busca descrições e todas as entradas
    fetchDescriptions();
    fetchEntries();
  }, []);

  // Função para filtrar entradas com base na descrição
  useEffect(() => {
    const filtered = entries.filter(entry =>
      entry.description.toLowerCase().includes(descriptionFilter.toLowerCase())
    );
    setFilteredEntries(filtered);
  }, [descriptionFilter, entries]);

  const handleDeleteClick = (entryId) => {
    if (window.confirm('Tem certeza de que deseja excluir esta entrada?')) {
      axios
        .delete(`http://localhost:3001/v1/entries/${entryId}`)
        .then(() => {
          setEntries(entries.filter(entry => entry.id !== entryId));
        })
        .catch(error => {
          console.error('Error deleting entry:', error);
        });
    }
  };

  const columns = [
    { key: 'description', title: 'Descrição' },
    { key: 'value', title: 'Valor' },
    { key: 'date', title: 'Data' },
    { key: 'billed', title: 'Status', render: (entry) => (entry.billed ? 'Faturado' : 'Não Faturado') },
    { key: 'entry_type', title: 'Tipo', render: (entry) => (entry.entry_type === 'revenue' ? 'Receita' : 'Despesa') },
    { key: 'category_id', title: 'Categoria', render: (entry) => categoryDescriptions[entry.category_id] || 'N/A' },
    { key: 'account_id', title: 'Conta', render: (entry) => accountDescriptions[entry.account_id] || 'N/A' },
    {
      key: 'edit',
      title: 'Editar',
      render: (entry) => (
        <Link to={`/entries/edit/${entry.id}`} className="btn btn-primary">
          Editar
        </Link>
      ),
    },
    {
      key: 'delete',
      title: 'Deletar',
      render: (entry) => (
        <button onClick={() => handleDeleteClick(entry.id)} className="btn btn-danger">
          Deletar
        </button>
      ),
    },
  ];

  return (
    <div className='container-lg'>
      <h2>Lista de Receitas e Despesas</h2>
      
      <form className='row g-3 mt-3 mb-3 align-items-center'>
        <div className='col-auto'>
          <input
            type="text"
            placeholder="Descrição"
            value={descriptionFilter}
            onChange={(e) => setDescriptionFilter(e.target.value)}
            className='form-control'
          />
        </div>
      </form>

      <DataTable data={filteredEntries} columns={columns} />

      <Link to="/entries/create" className="btn btn-success mt-3">
        Criar Nova Entrada
      </Link>

      <Link to="/" className="btn btn-warning mt-3">
        Voltar
      </Link>
    </div>
  );
};

export default EntryList;
