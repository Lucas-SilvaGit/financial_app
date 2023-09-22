import React,  { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleDeleteClick = (categoryId) => {
    if (window.confirm('Tem certeza de que deseja excluir esta categoria?')) {
      axios
        .delete(`http://localhost:3001/v1/categories/${categoryId}`)
        .then(() => {
          setCategories(categories.filter(category => category.id !== categoryId));
        })
        .catch(error => {
          console.error('Error deleting category:', error);
        });
    }
  };

  return (
    <div>
      <h2>Lista de Categorias</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.description}{" "}
            <Link to={`/categories/edit/${category.id}`} className="btn btn-primary">
              Editar
            </Link>

            <button onClick={() => handleDeleteClick(category.id)} className="btn btn-danger">
              Deletar
            </button>
          </li>
        ))}
      </ul>

      <Link to="/categories/create" className="btn btn-success mt-3">
        Criar Nova Categoria
      </Link>

      <Link to="/" className="btn btn-warning mt-3">
        Voltar
      </Link>
    </div>
  );
};

export default CategoryList;