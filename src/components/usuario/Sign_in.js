import React, { useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia os dados de login para a API
      const response = await axios.post('http://localhost:3001/users/sign_in', formData);

      // Lide com a resposta da API, por exemplo, redirecione o usuário para o painel ou faça algo com base na resposta
      if (response.status === 200) {
        // Redirecione ou faça algo com base na resposta, por exemplo, armazene o token JWT
        console.log('Usuário logado com sucesso!');
      }
    } catch (error) {
      // Lide com erros, por exemplo, mostre mensagens de erro para o usuário
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Signin;
