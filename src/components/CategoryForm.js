import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CategoryForm = () => {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:3001/v1/categories', { description })
      .then(response => {
        console.log('Category created:', response.data);
        navigate('/categories');
        setDescription('');
      })
      .catch(error => {
        console.error('Error creating category:', error);
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
    <div>
      <h2>Criar Nova Categoria</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Nome da Categoria:</label>
          <input
            type="text"
            id="description"
            placeholder="Nome da Categoria"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Criar</button>

        <Link to="/categories" className="btn btn-warning mt-3">
          Voltar
        </Link>
      </form>
    </div>
  );
};

export default CategoryForm;
