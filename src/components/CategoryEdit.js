import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryEdit = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/categories/${id}`)
      .then(response => {
        const { description } = response.data;
        setCategory(response.data);
        setDescription(description);
      })
      .catch(error => {
        console.error('Error fetching category:', error);
      });
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();

    axios.put(`http://localhost:3001/v1/categories/${id}`, { description })
      .then(response => {
        console.log('Category updated successfully:', response.data);
        navigate('/categories');
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  return (
    <div>
      <h2>Editar Categoria</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default CategoryEdit;
