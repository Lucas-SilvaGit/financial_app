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

  return (
    <div className='col-lg-12'>
      <div className='d-flex justify-content-center'>
        <div className="col-lg-1">
          <label htmlFor="month" className="col-form-label">
            Mês:
          </label>
          <input
            type="number"
            placeholder="Mês"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-lg-1">
          <label htmlFor="year" className="col-form-label">
            Ano:
          </label>
          <input
            type="number"
            placeholder="Ano"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      
      <div className='card shadow mt-5 mb-3 col-md-12 col-lg-4'>
        <div className='card-header'>
          <h2 className="card-title">Visão Geral</h2>
        </div>
        <div className="card-body">  
          {dashboardData && (
            <div>
              <div>
                <span className="circle green-circle mt-1">
                  <span className="symbol">+</span>
                </span>

                <p className='titles mb-0 mt-1'>
                  Receitas R${dashboardData.totalRevenues.toFixed(2)}
                </p>

                <p>Previsto R${dashboardData.totalRevenuesExpected.toFixed(2)}</p>
              </div>
              
              <div>
                <span className="circle red-circle mt-1">
                  <span className="symbol">-</span>
                </span>
                
                <p className='titles mb-0 mt-1'>  
                  Despesas R${dashboardData.totalExpenses.toFixed(2)}
                </p>

                <p>Previsto R${dashboardData.totalExpensesExpected.toFixed(2)}</p>
              </div>

              <div>
                <span className="circle blue-circle mt-1">
                  <span className="symbol">T</span>
                </span>

                <p className='titles mb-0 mt-1'>
                  Saldo Total R${dashboardData.balanceTotal.toFixed(2)}
                </p>

                <p>Previsto R${dashboardData.balanceTotalExpected.toFixed(2)}</p>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
