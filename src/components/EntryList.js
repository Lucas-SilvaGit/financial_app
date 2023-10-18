import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from './DataTable';

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [categoryDescriptions, setCategoryDescriptions] = useState({});
  const [accountDescriptions, setAccountDescriptions] = useState({});
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [valueFilter, setValueFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [billedFilter, setBilledFilter] = useState('all');
  const [entryTypeFilter, setEntryTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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


  // Função para filtrar entradas em um range de datas inicial e final.
  const filterEntriesByDateRange = (entries, startDate, endDate) => {
    if (!startDate || !endDate) {
      return entries; // Se as datas de início ou fim não estiverem definidas, retorne todas as entradas.
    }
  
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= new Date(startDate) && entryDate <= new Date(endDate); //verifica se a data da entrada esta entre a data inicial e menor que a data final.
    });
  }
  
  // hook para alterar os estados quando houver alteração em entries, startdate, enddate
  useEffect(() => {
    const filteredByDateRange = filterEntriesByDateRange(entries, startDate, endDate);
    setFilteredEntries(filteredByDateRange);
  }, [startDate, endDate, entries]);
  

  // Função para filtrar entradas com base na descrição
  useEffect(() => {
    const filteredDescription = entries.filter(entry =>
      entry.description.toLowerCase().includes(descriptionFilter.toLowerCase())
    );
    setFilteredEntries(filteredDescription);
  }, [descriptionFilter, entries]);

  // Função para filtrar entradas com base na valor
  useEffect(() => {
    const filteredValue = entries.filter(entry =>
      entry.value.toString().includes(valueFilter)
    );
    setFilteredEntries(filteredValue);
  }, [valueFilter, entries]);

  // Função para filtrar entradas com base no status de billed
  useEffect(() => {
    const filteredBilled = entries.filter(entry => {
      if (billedFilter === 'all') {
        return true;
      } else if (billedFilter === 'billed') {
        return entry.billed === true;
      } else if (billedFilter === 'not-billed') {
        return entry.billed === false;
      }
      return false;
    });

    setFilteredEntries(filteredBilled);
  }, [billedFilter, entries]);

  // Função para filtrar entradas com base no tipo da entrada receita ou despesa
  useEffect(() => {
    const filteredEntryType = entries.filter(entry => {
      if (entryTypeFilter === 'all') {
        return true;
      } else {
        return entry.entry_type === entryTypeFilter;
      }
    });

    setFilteredEntries(filteredEntryType);
  }, [entryTypeFilter, entries]);

  // Função para filtrar entradas com base na categoria
  useEffect(() => {
    const filteredCategory = entries.filter(entry => {
      if (categoryFilter === 'all') {
        return true;
      } else {
        return entry.category_id.toString() === categoryFilter;
      }
    });

    setFilteredEntries(filteredCategory);
  }, [categoryFilter, entries]);

  // Função para filtrar entradas com base na conta vinculada a entrada
  useEffect(() => {
    const filteredAccount = entries.filter(entry => {
      if (accountFilter === 'all') {
        return true;
      } else {
        return entry.account_id.toString() === accountFilter;
      }
    });

    setFilteredEntries(filteredAccount);
  }, [accountFilter, entries]);

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

  const handleClearFilters = () => {
    setDescriptionFilter('');
    setValueFilter('');
    setStartDate('');
    setEndDate('');
    setBilledFilter('');
    setEntryTypeFilter('');
    setCategoryFilter('');
    setAccountFilter('');
  };

  const columns = [
    { key: 'description', title: 'Descrição' },
    { key: 'value', title: 'Valor' },
    { key: 'formatted_date', title: 'Data' },
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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className='container-lg mb-3'>
      <h2>Lista de Receitas e Despesas</h2>
      <button className='btn btn-primary mt-3 mb-3' onClick={toggleFilters}>
        {showFilters ? 'Esconder Filtros' : 'Filtrar'}
      </button>
      
      {showFilters && (
      <form className='row g-3 mb-3 px-3'>
        <div className='col-2'>
          <input
            type="text"
            placeholder="Descrição"
            value={descriptionFilter}
            onChange={(e) => setDescriptionFilter(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='col-2'>
          <input
            type="text"
            placeholder="Valor"
            value={valueFilter}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value) || value === "") {
                setValueFilter(value);
              }
            }}
            className='form-control'
          />
        </div>

        <div className='col-2'>
          <input
            type="date"
            placeholder="Data"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='col-2'>
          <input
            type="date"
            placeholder="Data"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='col-2'>
          <select
            value={billedFilter}
            onChange={(e) => setBilledFilter(e.target.value)}
            className='form-select'
          >
            <option value='all'>Todos Status</option>
            <option value='billed'>Faturado</option>
            <option value='not-billed'>Não Faturado</option>
          </select>
        </div>

        <div className='col-2'>
          <select
            value={entryTypeFilter}
            onChange={(e) => setEntryTypeFilter(e.target.value)}
            className='form-select'
          >
            <option value='all'>Todos Tipos</option>
            <option value='revenue'>Receita</option>
            <option value='expense'>Despesa</option>
          </select>
        </div>

        <div className='col-2'>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='form-select'
          >
            <option value='all'>Todas Categorias</option>
            {Object.keys(categoryDescriptions).map((categoryId) => (
              <option key={categoryId} value={categoryId}>
                {categoryDescriptions[categoryId]}
              </option>
            ))}
          </select>
        </div>

        <div className='col-2'>
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className='form-select'
          >
            <option value='all'>Todas Contas</option>
            {Object.keys(accountDescriptions).map((accountId) => (
              <option key={accountId} value={accountId}>
                {accountDescriptions[accountId]}
              </option>
            ))}
          </select>
        </div>

        <div className='col-auto'>
          <button className="btn btn-primary" onClick={handleClearFilters}>Limpar Filtros</button>
        </div>
      </form>)}

      <DataTable data={filteredEntries} columns={columns} />

      <Link to="/entries/create" className="btn btn-success mt-3 mx-3">
        Criar Nova Entrada
      </Link>

      <Link to="/" className="btn btn-warning mt-3">
        Voltar
      </Link>
    </div>
  );
};

export default EntryList;
