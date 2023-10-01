import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EntryForm = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0.0);
  const [date, setDate] = useState('');
  const [billed, setBilled] = useState(false);
  const [entry_type, setEntryType] = useState('revenue');
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

  const containerStyle = {
    maxWidth: '700px',
    margin: '0 auto',
  };

  const handleButtonClick = () => {
    navigate('/entries');
  };

  return (
    <div className="container-lg mt-5" style={containerStyle}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mt-3 mb-4">Criar Nova Entrada</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="description" className="col-sm-3 col-form-label">
                Descrição:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  placeholder="Descrição da entrada"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="value" className="col-sm-3 col-form-label">
                Valor:
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  value={value}
                  onChange={e => setValue(parseFloat(e.target.value))}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="date" className="col-sm-3 col-form-label">
                Data:
              </label>
              <div className="col-sm-6">
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="billed" className=" form-check-label col-sm-2">
                Efetuado:
              </label> 
              <div className="col-sm-1">
                <input
                  type="checkbox"
                  checked={billed}
                  onChange={e => setBilled(e.target.checked)}
                  className="form-check-input"
                />
              </div>
            
              <label htmlFor="entry_type" className="col-sm-2 form-label">
                Tipo:
              </label>
              <div className="col-sm-3">
                <select
                  value={entry_type}
                  onChange={e => setEntryType(e.target.value)}
                  className="form-select"
                >
                  <option value="revenue">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="category_id" className="col-sm-3 col-form-label">
                Categoria:
              </label>
              <div className="col-sm-6">
                <select
                  value={category_id}
                  onChange={e => setCategoryId(e.target.value)}
                  className="form-select"
                >
                  <option value="">Selecione uma Categoria</option>
                    {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.description}
                  </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="account_id" className="col-sm-3 col-form-label">
                Conta:
              </label>
              <div className="col-sm-6">
                <select
                  value={account_id}
                  onChange={e => setAccountId(e.target.value)}
                  className="form-select"
                >
                  <option value="">Selecione uma Conta</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-sm-10 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">Enviar</button>
                <button className="btn btn-warning" onClick={handleButtonClick}>Voltar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
