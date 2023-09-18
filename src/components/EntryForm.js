import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const EntryForm = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0.0);
  const [date, setDate] = useState('');
  const [billed, setBilled] = useState(false);
  const [entry_type, setEntryType] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [account_id, setAccountId] = useState('');
  
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/v1/accounts')
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      });

    axios.get('http://localhost:3001/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); 

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      description,
      value,
      date,
      billed,
      entry_type: entry_type,
      category_id: category_id,
      account_id: account_id
    };

    axios.post('http://localhost:3001/v1/entries', formData)
      .then(response => {
        console.log('Entry created:', response.data);
        navigate('/entries');
        setDescription('');
        setValue(0.0);
        setDate('');
        setBilled(false);
        setEntryType('');
        setCategoryId('');
        setAccountId('');
      })
      .catch(error => {
        console.error('Error creating entry:', error);
      });
  };

  return (
    <div>
      <h2>Criar Nova Entrada</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            value={value}
            onChange={e => setValue(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="billed">Quitado:</label>
          <input
            type="checkbox"
            checked={billed}
            onChange={e => setBilled(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="entry_type">Tipo:</label>
          <select
            value={entry_type}
            onChange={e => setEntryType(e.target.value)}
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>

        <div>
          <label htmlFor="category_id">Categoria:</label>
          <select
            value={category_id}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
              {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.description}
            </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="account_id">Conta:</label>
          <select
            value={account_id}
            onChange={e => setAccountId(e.target.value)}
          >
            <option value="">Selecione uma conta</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">Enviar</button>
        
        <Link to="/entries" className="btn btn-warning mt-3">
          Voltar
        </Link>
      </form>
    </div>
  );
};

export default EntryForm;
