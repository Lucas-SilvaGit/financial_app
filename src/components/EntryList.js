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
