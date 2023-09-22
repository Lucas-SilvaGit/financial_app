import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EntryEdit = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0.0);
  const [date, setDate] = useState('');
  const [billed, setBilled] = useState(false);
  const [entry_type, setEntryType] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [account_id, setAccountId] = useState('');
  
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/entries/${id}`)
      .then(response => {
        const { description, value, date, billed, entry_type, category_id, account_id } = response.data;
        setEntry(response.data);
        setDescription(description);
        setValue(value);
        setDate(date);
        setBilled(billed);
        setEntryType(entry_type);
        setCategoryId(category_id);
        setAccountId(account_id);
      })
      .catch(error => {
        console.error('Error fetching entry:', error);
      });
  }, [id]);

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
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    axios.put(`http://localhost:3001/v1/entries/${id}`, { description, value, date, billed, entry_type, category_id, account_id })
      .then(response => {
        console.log('Entry updated:', response.data);
        navigate('/entries');
      })
      .catch(error => {
        console.error('Error updating entry:', error);
      });
  };

  return (
    <div>
      <h2>Editar Conta</h2>
      <form onSubmit={handleSubmit}>
        {dataLoaded ? (
          <div>
            <div>
              <label htmlFor="description">Descrição:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
  
            <div>
              <label htmlFor="value">Valor:</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
              />
            </div>
  
            <div>
              <label htmlFor="date">Data:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
  
            <div>
              <label htmlFor="billed">Quitado:</label>
              <input
                type="checkbox"
                checked={billed}
                onChange={(e) => setBilled(e.target.checked)}
              />
            </div>
  
            <div>
              <label htmlFor="entry_type">Tipo:</label>
              <select
                value={entry_type}
                onChange={(e) => setEntryType(e.target.value)}
              >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>
  
            <div>
              <label htmlFor="category_id">Categoria:</label>
              <select
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
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
                onChange={(e) => setAccountId(e.target.value)}
              >
                <option value="">Selecione uma conta</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>
  
            <button type="submit" className="btn btn-primary mt-3">
              Atualizar
            </button>
  
            <Link to="/entries" className="btn btn-warning mt-3">
              Voltar
            </Link>
          </div>
        ) : (
          <p>Carregando dados...</p>
        )}
      </form>
    </div>
  );
};

export default EntryEdit;
