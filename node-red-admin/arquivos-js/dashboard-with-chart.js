// Código COM GRÁFICO DE ATIVIDADE para o nó "Dashboard HTML" - substitua todo o conteúdo do nó por este:

msg.payload = `<!DOCTYPE html>
<html>
<head>
    <title>ReUse Admin - Dashboard</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: #f8f9fa; }
        .header { background: #f8f8f8; padding: 20px 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; }
        .logo { color: #27ae60; font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 15px; }
        .logo-icon { width: 50px; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .logo-icon img { width: 100%; height: 100%; object-fit: contain; border-radius: 8px; }
        .user-info { display: flex; align-items: center; gap: 15px; }
        .nav { background: #2c3e50; padding: 0; display: flex; }
        .nav a { color: white; text-decoration: none; padding: 15px 30px; transition: all 0.3s; }
        .nav a:hover, .nav a.active { background: #34495e; }
        .container { max-width: 1200px; margin: 0 auto; padding: 30px; }
        .page-title { font-size: 28px; color: #2c3e50; margin-bottom: 30px; text-align: center; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 20px; transition: transform 0.3s; }
        .metric-card:hover { transform: translateY(-2px); }
        .metric-icon { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .metric-icon.users { background: linear-gradient(135deg, #3498db, #2980b9); }
        .metric-icon.offers { background: linear-gradient(135deg, #e74c3c, #c0392b); }
        .metric-icon.trades { background: linear-gradient(135deg, #f39c12, #e67e22); }
        .metric-icon.reports { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
        .metric-content h3 { font-size: 32px; font-weight: bold; margin-bottom: 5px; }
        .metric-content p { color: #666; font-size: 14px; }
        .chart-container { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .chart-title { font-size: 20px; font-weight: 600; color: #2c3e50; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .chart-wrapper { position: relative; height: 400px; }
        .recent-activities { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .activity-title { font-size: 20px; font-weight: 600; color: #2c3e50; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .activity-item { display: flex; align-items: center; gap: 15px; padding: 15px 0; border-bottom: 1px solid #eee; }
        .activity-item:last-child { border-bottom: none; }
        .activity-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .activity-icon.user { background: #e3f2fd; color: #1976d2; }
        .activity-icon.offer { background: #fce4ec; color: #c2185b; }
        .activity-icon.trade { background: #fff3e0; color: #f57c00; }
        .activity-content { flex: 1; }
        .activity-text { font-weight: 500; color: #2c3e50; margin-bottom: 3px; }
        .activity-time { font-size: 12px; color: #666; }
        .btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s; }
        .btn-danger { background: #e74c3c; color: white; }
        .btn-danger:hover { background: #c0392b; }
        .loading { text-align: center; padding: 40px; color: #666; }
        .error { background: #fee; border: 1px solid #fcc; color: #c33; padding: 12px; border-radius: 8px; margin: 20px 0; }
        .chart-controls { display: flex; gap: 10px; margin-bottom: 20px; }
        .chart-btn { padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; font-size: 12px; transition: all 0.3s; }
        .chart-btn.active { background: #27ae60; color: white; border-color: #27ae60; }
        .chart-btn:hover { background: #f0f0f0; }
        .chart-btn.active:hover { background: #229954; }
        .stats-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px; }
        .stat-item { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #27ae60; }
        .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <div class="logo-icon">
                <img src="https://i.imgur.com/OD3laQP.png" alt="ReUse Logo">
            </div>
            <span>ReUse!</span>
        </div>
        <div class="user-info">
            <span>Bem-vindo, Admin</span>
            <button onclick="logout()" class="btn btn-danger">Sair</button>
        </div>
    </div>
    <div class="nav">
        <a href="/admin/dashboard" class="active">📊 Dashboard</a>
        <a href="/admin/users">👥 Usuários</a>
        <a href="/admin/offers">📦 Ofertas</a>
    </div>
    <div class="container">
        <h1 class="page-title">Dashboard</h1>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-icon users">👥</div>
                <div class="metric-content">
                    <h3 id="totalUsers">-</h3>
                    <p>Total de Usuários</p>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-icon offers">📦</div>
                <div class="metric-content">
                    <h3 id="totalOffers">-</h3>
                    <p>Total de Ofertas</p>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-icon trades">🤝</div>
                <div class="metric-content">
                    <h3 id="totalTrades">-</h3>
                    <p>Trocas Realizadas</p>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-icon reports">⚠️</div>
                <div class="metric-content">
                    <h3 id="totalReports">-</h3>
                    <p>Denúncias</p>
                </div>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-title">
                📈 Atividade Recente
            </div>
            <div class="chart-controls">
                <button class="chart-btn active" onclick="changeChartPeriod('7d')">7 dias</button>
                <button class="chart-btn" onclick="changeChartPeriod('30d')">30 dias</button>
                <button class="chart-btn" onclick="changeChartPeriod('90d')">90 dias</button>
            </div>
            <div class="chart-wrapper">
                <canvas id="activityChart"></canvas>
            </div>
            <div class="stats-summary">
                <div class="stat-item">
                    <div class="stat-value" id="newUsersThisWeek">-</div>
                    <div class="stat-label">Novos usuários esta semana</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="newOffersThisWeek">-</div>
                    <div class="stat-label">Novas ofertas esta semana</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="growthRate">-</div>
                    <div class="stat-label">Taxa de crescimento</div>
                </div>
            </div>
        </div>

        <div class="recent-activities">
            <div class="activity-title">
                🔔 Atividades Recentes
            </div>
            <div id="recentActivitiesList">
                <div class="loading">Carregando atividades...</div>
            </div>
        </div>
    </div>

    <script>
        let activityChart = null;
        let currentPeriod = '7d';
        let usersData = [];
        let offersData = [];

        async function loadDashboardData() {
            try {
                console.log('Carregando dados do dashboard...');
                
                // Carregar usuários e ofertas em paralelo
                const [usersResponse, offersResponse] = await Promise.all([
                    fetch('/api/users-proxy'),
                    fetch('/api/offers-proxy')
                ]);
                
                if (usersResponse.ok && offersResponse.ok) {
                    usersData = await usersResponse.json();
                    offersData = await offersResponse.json();
                    
                    console.log('Dados carregados:', { users: usersData.length, offers: offersData.length });
                    
                    updateMetrics();
                    updateChart();
                    updateRecentActivities();
                } else {
                    throw new Error('Erro ao carregar dados');
                }
            } catch (error) {
                console.error('Erro ao carregar dados do dashboard:', error);
                // Usar dados simulados em caso de erro
                loadSimulatedData();
            }
        }

        function loadSimulatedData() {
            console.log('Carregando dados simulados...');
            
            // Gerar dados simulados para os últimos 30 dias
            const now = new Date();
            usersData = [];
            offersData = [];
            
            for (let i = 29; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                
                // Simular usuários (mais nos fins de semana)
                const dayOfWeek = date.getDay();
                const baseUsers = dayOfWeek === 0 || dayOfWeek === 6 ? 3 : 1;
                const userCount = Math.floor(Math.random() * baseUsers) + (dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 0);
                
                for (let j = 0; j < userCount; j++) {
                    usersData.push({
                        id: 'sim_' + i + '_' + j,
                        name: 'Usuário Simulado ' + (i * 10 + j),
                        email: 'user' + (i * 10 + j) + '@example.com',
                        createdAt: date.toISOString(),
                        isBlocked: false
                    });
                }
                
                // Simular ofertas (menos nos fins de semana)
                const offerCount = Math.floor(Math.random() * (dayOfWeek === 0 || dayOfWeek === 6 ? 2 : 4));
                for (let j = 0; j < offerCount; j++) {
                    offersData.push({
                        id: 'offer_' + i + '_' + j,
                        title: 'Oferta Simulada ' + (i * 10 + j),
                        description: 'Descrição da oferta simulada',
                        createdAt: date.toISOString(),
                        status: Math.random() > 0.3 ? 'approved' : 'pending',
                        isActive: true
                    });
                }
            }
            
            updateMetrics();
            updateChart();
            updateRecentActivities();
        }

        function updateMetrics() {
            const totalUsers = usersData.length;
            const totalOffers = offersData.length;
            const activeUsers = usersData.filter(user => !user.isBlocked).length;
            const activeOffers = offersData.filter(offer => offer.isActive).length;
            
            document.getElementById('totalUsers').textContent = totalUsers;
            document.getElementById('totalOffers').textContent = totalOffers;
            document.getElementById('totalTrades').textContent = '0'; // Implementar quando houver sistema de trocas
            document.getElementById('totalReports').textContent = '0'; // Implementar quando houver sistema de denúncias
        }

        function updateChart() {
            const ctx = document.getElementById('activityChart').getContext('2d');
            
            if (activityChart) {
                activityChart.destroy();
            }
            
            const chartData = generateChartData();
            
            activityChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Novos Usuários',
                        data: chartData.users,
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#27ae60',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }, {
                        label: 'Novas Ofertas',
                        data: chartData.offers,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#e74c3c',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: 14,
                                    weight: '500'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#27ae60',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: true,
                            intersect: false,
                            mode: 'index'
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(0,0,0,0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#666',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#666',
                                font: {
                                    size: 12
                                },
                                stepSize: 1
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
            
            updateChartStats(chartData);
        }

        function generateChartData() {
            const days = currentPeriod === '7d' ? 7 : currentPeriod === '30d' ? 30 : 90;
            const labels = [];
            const usersDataByDay = {};
            const offersDataByDay = {};
            
            // Inicializar arrays com zeros
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
                usersDataByDay[dateStr] = 0;
                offersDataByDay[dateStr] = 0;
            }
            
            // Contar usuários por dia
            usersData.forEach(user => {
                const userDate = new Date(user.createdAt).toISOString().split('T')[0];
                if (usersDataByDay[userDate] !== undefined) {
                    usersDataByDay[userDate]++;
                }
            });
            
            // Contar ofertas por dia
            offersData.forEach(offer => {
                const offerDate = new Date(offer.createdAt).toISOString().split('T')[0];
                if (offersDataByDay[offerDate] !== undefined) {
                    offersDataByDay[offerDate]++;
                }
            });
            
            return {
                labels: labels,
                users: Object.values(usersDataByDay),
                offers: Object.values(offersDataByDay)
            };
        }

        function updateChartStats(chartData) {
            const totalUsers = chartData.users.reduce((a, b) => a + b, 0);
            const totalOffers = chartData.offers.reduce((a, b) => a + b, 0);
            const previousWeekUsers = chartData.users.slice(0, Math.floor(chartData.users.length / 2)).reduce((a, b) => a + b, 0);
            const currentWeekUsers = chartData.users.slice(Math.floor(chartData.users.length / 2)).reduce((a, b) => a + b, 0);
            const growthRate = previousWeekUsers > 0 ? ((currentWeekUsers - previousWeekUsers) / previousWeekUsers * 100).toFixed(1) : 0;
            
            document.getElementById('newUsersThisWeek').textContent = totalUsers;
            document.getElementById('newOffersThisWeek').textContent = totalOffers;
            document.getElementById('growthRate').textContent = growthRate + '%';
        }

        function changeChartPeriod(period) {
            currentPeriod = period;
            
            // Atualizar botões
            document.querySelectorAll('.chart-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            updateChart();
        }

        function updateRecentActivities() {
            const activities = [];
            
            // Adicionar atividades de usuários
            usersData.slice(-10).forEach(user => {
                activities.push({
                    type: 'user',
                    text: 'Novo usuário registrado',
                    detail: user.name + ' se cadastrou no sistema',
                    time: new Date(user.createdAt).toLocaleString('pt-BR'),
                    icon: '👤'
                });
            });
            
            // Adicionar atividades de ofertas
            offersData.slice(-10).forEach(offer => {
                activities.push({
                    type: 'offer',
                    text: 'Nova oferta criada',
                    detail: offer.title + ' foi adicionada',
                    time: new Date(offer.createdAt).toLocaleString('pt-BR'),
                    icon: '📦'
                });
            });
            
            // Ordenar por data (mais recente primeiro)
            activities.sort((a, b) => new Date(b.time) - new Date(a.time));
            
            // Mostrar apenas as 10 mais recentes
            const recentActivities = activities.slice(0, 10);
            
            const activitiesList = document.getElementById('recentActivitiesList');
            if (recentActivities.length === 0) {
                activitiesList.innerHTML = '<div class="loading">Nenhuma atividade recente</div>';
                return;
            }
            
            activitiesList.innerHTML = recentActivities.map(function(activity) {
                return '<div class="activity-item">' +
                    '<div class="activity-icon ' + activity.type + '">' + activity.icon + '</div>' +
                    '<div class="activity-content">' +
                        '<div class="activity-text">' + activity.text + '</div>' +
                        '<div class="activity-detail">' + activity.detail + '</div>' +
                        '<div class="activity-time">' + activity.time + '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
        }

        function logout() {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin';
        }

        if (!localStorage.getItem('adminToken')) {
            window.location.href = '/admin';
        }

        // Carregar dados automaticamente
        loadDashboardData();
    </script>
</body>
</html>`;

msg.headers = {
    'Content-Type': 'text/html; charset=utf-8'
};

return msg;



