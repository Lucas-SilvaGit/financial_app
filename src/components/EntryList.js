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
    <div className='container-fluid'>
      <h2>Lista de Receitas e Despesas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Conta</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.description}</td>
              <td>{entry.value}</td>
              <td>{entry.date}</td>
              <td>{entry.billed ? 'Faturado' : 'Não Faturado'}</td>
              <td>{entry.entry_type === 'revenue' ? 'Receita' : 'Despesa'}</td>
              <td>{categoryDescriptions[entry.category_id] || 'N/A'}</td>
              <td>{accountDescriptions[entry.account_id] || 'N/A'}</td>
              <td>
                <Link to={`/entries/edit/${entry.id}`} className="btn btn-primary">
                  Editar
                </Link>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(entry.id)} className="btn btn-danger">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
