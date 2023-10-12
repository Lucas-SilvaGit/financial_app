import React, { useState, useEffect } from 'react';
import { Grid, Card, Container } from 'tabler-react';

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

    <Container>
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

      <Grid.Row>
        <Grid.Col sm={12} md={12} lg={4}>
          <Card className='mt-5'>
            <Card.Header>
              <Card.Title>Visão Geral</Card.Title>
            </Card.Header>
            <Card.Body>
              {dashboardData && (
                <div>
                  <div>
                    <span className="circle green-circle">
                      <span className="symbol">+</span>
                    </span>

                    <div className="mt-2">
                      <h3 className="mb-0">
                        Receitas R$ {dashboardData.totalRevenues.toFixed(2)}
                      </h3>

                      <p>Previsto R$ {dashboardData.totalRevenuesExpected.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <span className="circle red-circle">
                      <span className="symbol">-</span>
                    </span>

                    <div className="mt-2">
                      <h3 className="mb-0">
                        Despesas R$ {dashboardData.totalExpenses.toFixed(2)}
                      </h3>

                      <p>Previsto R$ {dashboardData.totalExpensesExpected.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <span className="circle blue-circle">
                      <span className="symbol">C</span>
                    </span>

                    <div className="mt-2">
                      <h3 className="mb-0">
                        Contas R$ {dashboardData.balanceTotal.toFixed(2)}
                      </h3>

                      <p>Previsto R$ {dashboardData.balanceTotalExpected.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </Container>
  );
};

export default DashboardOverview;
