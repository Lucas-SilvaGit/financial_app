import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [categoryDescriptions, setCategoryDescriptions] = useState({});
  const [accountDescriptions, setAccountDescriptions] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/entries`)
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.error('Error getting entries:', error);
      });

    axios.get(`http://localhost:3001/v1/categories`)
      .then(response => {
        const descriptions = {};
        response.data.forEach(category => {
          descriptions[category.id] = category.description;
        });
        setCategoryDescriptions(descriptions);
      })
      .catch(error => {
        console.error('Error getting categories:', error);
      });

    axios.get(`http://localhost:3001/v1/accounts`)
      .then(response => {
        const descriptions = {};
        response.data.forEach(account => {
          descriptions[account.id] = account.name;
        });
        setAccountDescriptions(descriptions);
      })
      .catch(error => {
        console.error('Error getting categories:', error);
      });
  }, []);

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

  return (
    <div>
      <h2>Lista de Receitas e Despesas</h2>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            {entry.description}{" "}
            {entry.value}{" "}
            {entry.date}{" "}
            {entry.billed ? 'Faturado' : 'Não Faturado'}
            {entry.entry_type === 'revenue' ? 'Receita' : 'Despesa'}{" "}
            {categoryDescriptions[entry.category_id] || 'N/A'}{" "}
            {accountDescriptions[entry.account_id] || 'N/A'}{" "}

            <Link to={`/entries/edit/${entry.id}`} className="btn btn-primary">
              Editar
            </Link>

            <button onClick={() => handleDeleteClick(entry.id)} className="btn btn-danger">
              Deletar
            </button>
          </li>
        ))}
      </ul>

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
