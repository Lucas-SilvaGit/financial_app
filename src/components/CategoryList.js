import React,  { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import DataTable from "./DataTable";

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

  const columns = [
    { key: 'description', title: 'Descrição' },
    {
      key: 'edit',
      title: 'Editar',
      render: (category) => (
        <Link to={`/categories/edit/${category.id}`} className="btn btn-primary">
          Editar
        </Link>
      ),
    },
    {
      key: 'delete',
      title: 'Deletar',
      render: (category) => (
        <button onClick={() => handleDeleteClick(category.id)} className="btn btn-danger">
          Deletar
        </button>
      ),
    },
  ]

  return (
    <div className="container-lg mt-3 mb-3">
      <h2>Lista de Categorias</h2>
      <DataTable data={categories} columns={columns} />

      <Link to="/categories/create" className="btn btn-success mt-3 mx-3">
        Criar Categoria
      </Link>

      <Link to="/" className="btn btn-warning mt-3">
        Voltar
      </Link>
    </div>
  );
};

export default CategoryList;