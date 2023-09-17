import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CategoryForm;
