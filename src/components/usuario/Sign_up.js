import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
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
      // Envia os dados de registro para a API
      const response = await axios.post('http://localhost:3001//users/sign_up', formData);

      // Lide com a resposta da API, por exemplo, redirecione o usuário para a página de login
      if (response.status === 200) {
        // Redirecione ou faça algo com base na resposta
        console.log('Usuário cadastrado com sucesso!');
      }
    } catch (error) {
      // Lide com erros, por exemplo, mostre mensagens de erro para o usuário
      console.error('Erro ao cadastrar o usuário:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
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
        <div>
          <label>Confirme a senha:</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Signup;
