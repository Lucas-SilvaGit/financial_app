import React, { useState, useEffect } from 'react';

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam de 0

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/v1/dashboard/${year}/${month}`);
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error('Erro ao buscar dados da visao geral');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da visao geral', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [year, month]);

  const handleFilterClick = () => {
    fetchDashboardData();
  };

  return (
    <div className='card shadow mb-3 col-4 mx-auto'>
      <div className="card-body">
        <div>
          <h2 className="card-title">Visão Geral</h2>
          <label htmlFor="month" className="col-form-label">
            Mês:
          </label>
          <div className="col-sm-6">
            <input
              type="number"
              placeholder="Ano"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-control"
            />
          </div>
          <input
            type="number"
            placeholder="Mês"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <button onClick={handleFilterClick}>Filtrar</button>
        </div>
        {dashboardData && (
          <div>
            <h2>Dados do Painel de Controle</h2>
            <p>Total de Receitas: {dashboardData.totalReceitas}</p>
            <p>Total de Despesas: {dashboardData.totalDespesas}</p>
            <p>Saldo Total: {dashboardData.saldoTotal}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
