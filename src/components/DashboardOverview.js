import React, { useState, useEffect } from 'react';
import { Grid, Card, Container } from 'tabler-react';

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [topEntries] = useState(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const [accountBalance] = useState();
  const [accountBalanceExpected] = useState();

  const [economyPercentage] = useState();

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/v1/dashboard/${year}/${month}`);
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data, topEntries, accountBalance, accountBalanceExpected, economyPercentage);
      } else {
        console.error('Erro ao buscar dados da visão geral');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da visão geral', error);
    }
  };

  const getEconomyMessage = (percentage) => {
    const roundedPercentage = Math.round(percentage);
  
    if (roundedPercentage >= 80) {
      return "Você sabe economizar mesmo!";
    } else if (roundedPercentage >= 50) {
      return "Você está no caminho certo, continue batalhando!";
    } else if (roundedPercentage >= 20) {
      return "Você está aprendendo, continue firme!";
    } else if (roundedPercentage > 0) {
      return "Você deve rever seus gastos e se planejar melhor, não desista!";
    } else {
      return "Você ainda não economizou esse mês!";
    }
  };

  const getStylesBasedOnPercentage = (percentage) => {
    const roundedPercentage = Math.round(percentage);
  
    let circleStyle = {};
    let valueStyle = {};
  
    if (roundedPercentage >= 80) {
      circleStyle = { borderColor: '#4B9419' };
      valueStyle = { color: '#4B9419' };
    } else if (roundedPercentage >= 50) {
      circleStyle = { borderColor: '#f1c40f' };
      valueStyle = { color: '#f1c40f' };
    } else if (roundedPercentage >= 20) {
      circleStyle = { borderColor: '#e67e22' };
      valueStyle = { color: '#e67e22' };
    } else {
      circleStyle = { borderColor: '#AC1C1A' };
      valueStyle = { color: '#AC1C1A' };
    }
  
    return { circleStyle, valueStyle };
  };

  useEffect(() => {
    fetchDashboardData();
  }, [year, month]);

  const { circleStyle, valueStyle } = getStylesBasedOnPercentage(dashboardData?.economyPercentage || 0);

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

      <Grid.Row className='mt-5'>
        <Grid.Col sm={12} md={12} lg={4}>
          <Card>
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

        <Grid.Col sm={12} md={12} lg={8}>
          <Card>
            <Card.Header>
              <Card.Title>Contas</Card.Title>
            </Card.Header>
            <Card.Body>
              {dashboardData && dashboardData.accountBalance && (
                <div className='px-4'>
                  {Object.keys(dashboardData.accountBalance).map((accountName) => (
                    <div key={accountName}>
                      <div className="d-flex justify-content-between">
                        <h3 className="mb-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-bank me-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 21l18 0"></path>
                            <path d="M3 10l18 0"></path>
                            <path d="M5 6l7 -3l7 3"></path>
                            <path d="M4 10l0 11"></path>
                            <path d="M20 10l0 11"></path>
                            <path d="M8 14l0 3"></path>
                            <path d="M12 14l0 3"></path>
                            <path d="M16 14l0 3"></path>
                          </svg>
                          {accountName}</h3>
                        <h4 className="mb-0">R$ {dashboardData.accountBalance[accountName].toFixed(2)}</h4>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p>Previsto</p> 
                        <p className="mt-0">R$ {dashboardData.accountBalanceExpected[accountName].toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <span>Saldo Total de Contas</span>
                <span>
                  {dashboardData?.balanceTotal ? `R$ ${dashboardData.balanceTotal.toFixed(2)}` : 'Carregando...'}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Previsto</span>
                <span>
                  {dashboardData?.balanceTotalExpected ? `R$ ${dashboardData.balanceTotalExpected.toFixed(2)}` : 'Carregando...'}
                </span>
              </div>
            </Card.Footer>
          </Card>
        </Grid.Col>          
      </Grid.Row>

      <Grid.Row>
        <Grid.Col sm={12} md={12} lg={12}>
          <Card className='mt-5'>
            <Card.Header>
              <Card.Title>Economia Mensal</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='d-flex flex-column flex-lg-row justify-content-between'>
                {dashboardData && dashboardData.economyPercentage !== undefined && (
                  <div className="col-lg-6 col-12 mb-6 mb-lg-0">
                    <div className='col-12 d-flex justify-content-center'>
                      <div className="economy-circle" style={circleStyle}>
                        {parseFloat(dashboardData.economyPercentage).toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="col-12 economy-value pt-3" style={valueStyle}>
                        R$ {dashboardData.balanceTotal.toFixed(2)}
                      </div>
                      <span>valor Economizado</span>
                    </div>
                  </div>
                )}

                {dashboardData && (
                  <div className="col-lg-6 col-12">
                    <div>
                      <h6 className='mb-0'>Receitas Consideradas</h6>
                      <span className='revenue-considered-value'>
                        R$ {dashboardData.totalRevenues.toFixed(2)}
                      </span>
                    </div>

                    <div className='mt-2 mt-lg-6'>
                      <h6 className='mb-0'>Despesas Consideradas</h6>
                      <span className='expense-considered-value'>
                        R$ {dashboardData.totalExpenses.toFixed(2)}
                      </span>
                    </div>

                    <div className='card-star mx-auto mt-5'>
                      {dashboardData && dashboardData.economyPercentage !== undefined && (
                        <div className="text-center">
                          {getEconomyMessage(dashboardData.economyPercentage)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row className='d-flex flex-column flex-lg-row justify-content-between'>
        <Grid.Col className='col-lg-6 col-12 mb-3 mb-lg-0'>
          <Card className='mt-5'>
            <Card.Header>
              <Card.Title>Top 5 Receitas</Card.Title>
            </Card.Header>
            <Card.Body>
              {dashboardData && dashboardData.topEntriesRevenues && (
                <div className="row g-3">
                  {dashboardData.topEntriesRevenues.map((entry, index) => (
                    <div className="col-6" key={index}>
                      <div className="row g-3 align-items-center">
                        <div className="col text-truncate">
                          <a className="text-reset d-block text-truncate text-capitalize">
                            {entry.description}
                          </a>
                          <div className="text-secondary text-truncate mt-n1">
                            R$ {entry.value.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Grid.Col>

        <Grid.Col className='col-lg-6 col-12'>
          <Card className='mt-0 mt-lg-5'>
            <Card.Header>
              <Card.Title>Top 5 Despesas</Card.Title>
            </Card.Header>
            <Card.Body>
              {dashboardData && dashboardData.topEntriesExpenses && (
                <div className="row g-3">
                {dashboardData.topEntriesExpenses.map((entry, index) => (
                  <div className="col-6" key={index}>
                    <div className="row g-3 align-items-center">
                      <div className="col text-truncate">
                        <a className="text-reset d-block text-truncate text-capitalize">
                          {entry.description}
                        </a>
                        <div className="text-secondary text-truncate mt-n1">
                          R$ {entry.value.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
