import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EntryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/entries`)
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.error('Error getting entries:', error);
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
            {String(entry.billed)}{" "}
            {entry.entry_type}{" "}
            {entry.category_id}{" "}
            {entry.account_id}{" "}
            {console.log("entry.billed:", entry.billed)}

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
