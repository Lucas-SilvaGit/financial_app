import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AccountEdit = () => {
  const { id } = useParams();
  const [account, setAccount] = useState({});
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0.0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/accounts/${id}`)
      .then(response => {
        const { name, balance } = response.data;
        setAccount(response.data);
        setName(name);
        setBalance(balance);
      })
      .catch(error => {
        console.error('Error fetching account:', error);
      });
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();

    axios.put(`http://localhost:3001/v1/accounts/${id}`, { name, balance })
      .then(response => {
        console.log('Account updated:', response.data);
        navigate('/accounts');
      })
      .catch(error => {
        console.error('Error updating account:', error);
      });
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '0 auto',
  };

  const handleButtonClick = () => {
    navigate('/accounts');
  };

  return (
    <div className="container-lg mt-5" style={containerStyle}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mt-3 mb-4">Editar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="name" className="col-sm-3 col-form-label">
                Nome da Conta:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  id="name"
                  placeholder="Nome da Conta"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="balance" className="col-sm-3 col-form-label">
                Saldo:
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  placeholder="Saldo"
                  value={balance}
                  onChange={() => {}}
                  disabled
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-sm-10 offset-sm-4">
                <button type="submit" className="btn btn-primary me-3">Atualizar</button>

                <button className="btn btn-warning" onClick={handleButtonClick}>Voltar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountEdit;
