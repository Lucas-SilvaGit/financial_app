import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1> Bem-vindo a pagina inicial</h1>

      <Link to="/accounts" className="btn btn-primary mt-3">
        Acessar Contas
      </Link>

      <Link to="/categories" className="btn btn-primary mt-3">
        Acessar Categorias
      </Link>

      <Link to="/entries" className="btn btn-primary mt-3">
        Acessar Receitas e Despesas
      </Link>
    </div>
  );
};

export default Home;
