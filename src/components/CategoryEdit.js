import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

  const containerStyle = {
    maxWidth: '700px',
    margin: '0 auto',
  };

  const handleButtonClick = () => {
    navigate('/categories');
  };

  return (
    <div className="container-lg mt-5" style={containerStyle}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mt-3 mb-4">Editar Categoria</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 d-flex justify-content-center">
              <label htmlFor="description" className="col-sm-4 col-form-label">
                Nome da Categoria:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  placeholder="Nome da Categoria"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className='form-control'
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-11 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                <button className="btn btn-warning" onClick={handleButtonClick}>Voltar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
