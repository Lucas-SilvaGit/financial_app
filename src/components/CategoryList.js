import React,  { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import api from "../Api";

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;