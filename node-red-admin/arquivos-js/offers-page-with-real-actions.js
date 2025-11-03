msg.payload = `<!DOCTYPE html>
<html>
<head>
    <title>ReUse Admin - Gerenciar Ofertas</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: #f8f9fa;
        }

        .header {
            background: #f8f8f8;
            padding: 20px 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            color: #27ae60;
            font-size: 24px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .logo-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-danger {
            background: #e74c3c;
            color: white;
        }

        .btn-danger:hover {
            background: #c0392b;
            transform: translateY(-2px);
        }

        .nav {
            background: #2c3e50;
            padding: 0;
            display: flex;
        }

        .nav a {
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            transition: all 0.3s;
        }

        .nav a:hover, .nav a.active {
            background: #34495e;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px;
        }

        .page-title {
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 30px;
        }

        .search-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .search-icon {
            width: 20px;
            height: 20px;
            opacity: 0.5;
        }

        .search-input {
            flex: 1;
            border: none;
            outline: none;
            font-size: 16px;
            color: #333;
        }

        .search-input::placeholder {
            color: #999;
        }

        .offers-list {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .offer-item {
            display: flex;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
            transition: all 0.3s;
        }

        .offer-item:hover {
            background: #f8f9fa;
        }

        .offer-item:last-child {
            border-bottom: none;
        }

        .offer-image {
            width: 80px;
            height: 80px;
            border-radius: 8px;
            object-fit: cover;
            margin-right: 20px;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
        }

        .offer-info {
            flex: 1;
        }

        .offer-title {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .offer-description {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
            line-height: 1.4;
        }

        .offer-status {
            font-size: 14px;
            color: #666;
        }

        .offer-status.pending {
            color: #f39c12;
        }

        .offer-status.approved {
            color: #27ae60;
        }

        .offer-status.rejected {
            color: #e74c3c;
        }

        .offer-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .action-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            cursor: pointer;
            padding: 10px;
            border-radius: 6px;
            transition: all 0.3s;
        }

        .action-btn:hover {
            background: #f0f0f0;
        }

        .action-icon {
            width: 24px;
            height: 24px;
        }

        .action-text {
            font-size: 12px;
            color: #666;
        }

        .loading {
            text-align: center;
            padding: 3rem;
            color: #7f8c8d;
            font-size: 1.1rem;
        }

        .error {
            text-align: center;
            padding: 3rem;
            color: #e74c3c;
            font-size: 1.1rem;
        }

        /* Modal personalizado com dropShadow e tons de verde */
        .modal { 
            display: none; 
            position: fixed; 
            z-index: 1000; 
            left: 0; 
            top: 0; 
            width: 100%; 
            height: 100%; 
            background-color: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
        }
        .modal-content { 
            background: white; 
            margin: 0 auto; 
            padding: 0; 
            border-radius: 20px; 
            width: 90%; 
            max-width: 600px; 
            box-shadow: 
                0 25px 50px rgba(39, 174, 96, 0.15),
                0 15px 35px rgba(39, 174, 96, 0.1),
                0 5px 15px rgba(0,0,0,0.1);
            animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(39, 174, 96, 0.1);
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        @keyframes modalSlideIn {
            from { 
                transform: translate(-50%, -50%) scale(0.9); 
                opacity: 0; 
            }
            to { 
                transform: translate(-50%, -50%) scale(1); 
                opacity: 1; 
            }
        }
        .modal-header { 
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white; 
            padding: 25px 30px; 
            border-radius: 20px 20px 0 0;
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        .modal-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
            animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .modal-title { 
            font-size: 22px; 
            font-weight: 700; 
            margin: 0;
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 1;
        }
        .modal-icon {
            width: 28px;
            height: 28px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .close { 
            color: white; 
            font-size: 32px; 
            font-weight: bold; 
            cursor: pointer; 
            opacity: 0.8;
            transition: all 0.3s;
            position: relative;
            z-index: 1;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        .close:hover { 
            opacity: 1; 
            background: rgba(255,255,255,0.2);
            transform: rotate(90deg);
        }
        .modal-body { 
            padding: 35px 30px; 
            max-height: 500px;
            overflow-y: auto;
        }
        .modal-actions { 
            display: flex; 
            gap: 15px; 
            justify-content: flex-end; 
            padding: 25px 30px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 0 0 20px 20px;
            border-top: 1px solid rgba(39, 174, 96, 0.1);
        }
        
        /* Estilos para detalhes da oferta */
        .offer-details {
            display: grid;
            gap: 20px;
        }
        .detail-section {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
        }
        .detail-label {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .detail-value {
            color: #666;
            font-size: 14px;
            line-height: 1.4;
        }
        .detail-image {
            width: 100%;
            max-width: 200px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            margin: 10px 0;
        }

        .btn-primary {
            background: #27ae60;
            color: white;
        }

        .btn-primary:hover {
            background: #229954;
        }

        .btn-secondary {
            background: #95a5a6;
            color: white;
        }

        .btn-secondary:hover {
            background: #7f8c8d;
        }

        /* Toast notifications */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 
                0 10px 25px rgba(39, 174, 96, 0.15),
                0 5px 15px rgba(0,0,0,0.1);
            color: white;
            font-weight: 500;
            animation: toastSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            backdrop-filter: blur(10px);
        }
        .toast.success { 
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            border: 1px solid rgba(39, 174, 96, 0.3);
        }
        .toast.error { 
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            border: 1px solid rgba(231, 76, 60, 0.3);
        }
        .toast.warning { 
            background: linear-gradient(135deg, #f39c12, #e67e22);
            border: 1px solid rgba(243, 156, 18, 0.3);
        }
        @keyframes toastSlideIn {
            from { 
                transform: translateX(100%) scale(0.8); 
                opacity: 0; 
            }
            to { 
                transform: translateX(0) scale(1); 
                opacity: 1; 
            }
        }
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
        <a href="/admin/dashboard">📊 Dashboard</a>
        <a href="/admin/users">👥 Usuários</a>
        <a href="/admin/offers" class="active">📦 Ofertas</a>
    </div>
    <div class="container">
        <h1 class="page-title">Gerenciar ofertas</h1>
        <div class="search-container">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDE5TDEzIDEzTTE1IDhBNyA3IDAgMSAxIDE1IDhBNyA3IDAgMSAxIDE1IDh6IiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" class="search-icon" alt="Buscar">
            <input type="text" class="search-input" placeholder="buscar oferta" id="searchInput">
            <button onclick="loadOffers()" class="refresh-btn">🔄 Atualizar</button>
        </div>
        <div class="offers-list" id="offersList">
            <div class="loading">Carregando ofertas da API...</div>
        </div>
    </div>

    <!-- Modal para detalhes da oferta -->
    <div id="detailsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">
                    <svg class="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Detalhes da Oferta
                </h3>
                <span class="close" onclick="closeDetailsModal()">&times;</span>
            </div>
            <div class="modal-body" id="detailsContent">
                <!-- Conteúdo será preenchido dinamicamente -->
            </div>
            <div class="modal-actions">
                <button onclick="closeDetailsModal()" class="btn btn-primary">Fechar</button>
            </div>
        </div>
    </div>

    <!-- Modal para confirmação -->
    <div id="confirmModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="modalTitle">
                    <svg class="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Confirmar ação
                </h3>
                <span class="close" onclick="closeConfirmModal()">&times;</span>
            </div>
            <div class="modal-body">
                <p id="modalMessage">Tem certeza que deseja realizar esta ação?</p>
            </div>
            <div class="modal-actions">
                <button onclick="closeConfirmModal()" class="btn btn-secondary">Cancelar</button>
                <button onclick="confirmAction()" class="btn btn-danger" id="confirmBtn">Confirmar</button>
            </div>
        </div>
    </div>


    <script>
        let offers = [];
        let currentOfferId = null;

        async function loadOffers() {
            try {
                console.log('Carregando ofertas via proxy Node-RED...');
                const response = await fetch('/api/offers-proxy', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                console.log('Response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Dados recebidos via proxy:', data);
                    
                    offers = data.map((offer, index) => {
                        // Gerar título dinamicamente se não existir
                        let title = offer.title;
                        if (!title || title.trim() === '') {
                            if (offer.description && offer.description.trim() !== '') {
                                title = offer.description.substring(0, 50) + (offer.description.length > 50 ? '...' : '');
                            } else if (offer.category && offer.category.trim() !== '') {
                                title = 'Oferta de ' + offer.category;
                            } else {
                                title = 'Oferta #' + offer.id;
                            }
                        }
                        
                        return {
                            id: offer.id,
                            safeId: 'offer_' + index,
                            title: title,
                            description: offer.description || 'Sem descrição',
                            category: offer.category || 'Sem categoria',
                            image: offer.image || offer.images?.[0] || 'https://via.placeholder.com/300x200?text=Sem+Imagem',
                            status: offer.status || 'pending',
                            isActive: offer.isActive !== false,
                            createdAt: offer.createdAt || new Date().toISOString(),
                            author: offer.author || offer.user || 'Usuário desconhecido'
                        };
                    });
                    
                    console.log('Ofertas processadas:', offers);
                    renderOffers();
                } else {
                    throw new Error('Erro na API: ' + response.status);
                }
            } catch (error) {
                console.error('Erro ao carregar ofertas:', error);
                document.getElementById('offersList').innerHTML = '<div class="error">Erro ao carregar ofertas: ' + error.message + '</div>';
            }
        }

        function renderOffers(offersToRender) {
            if (!offersToRender) offersToRender = offers;
            const offersList = document.getElementById('offersList');
            
            if (offersToRender.length === 0) {
                offersList.innerHTML = '<div class="loading">Nenhuma oferta encontrada</div>';
                return;
            }
            
            offersList.innerHTML = offersToRender.map(function(offer) {
                const statusClass = offer.isActive ? 'approved' : (offer.status === 'rejected' ? 'rejected' : 'pending');
                const statusText = offer.isActive ? 'Ativa' : (offer.status === 'rejected' ? 'Rejeitada' : 'Pendente');
                
                return '<div class="offer-item">' +
                    '<div class="offer-image">' +
                        (offer.image ? '<img src="' + offer.image + '" alt="' + offer.title + '" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">' : '📦') +
                    '</div>' +
                    '<div class="offer-info">' +
                        '<div class="offer-title">' + offer.title + '</div>' +
                        '<div class="offer-description">' + offer.description.substring(0, 100) + (offer.description.length > 100 ? '...' : '') + '</div>' +
                        '<div class="offer-status ' + statusClass + '">' + statusText + ' • Criada em ' + new Date(offer.createdAt).toLocaleDateString('pt-BR') + '</div>' +
                    '</div>' +
                    '<div class="offer-actions">' +
                        '<div class="action-btn" onclick="viewDetails(\\'' + offer.safeId + '\\')">' +
                            '<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2">' +
                                '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>' +
                                '<circle cx="12" cy="12" r="3"></circle>' +
                            '</svg>' +
                            '<span class="action-text">Ver detalhes</span>' +
                        '</div>' +
                        '<div class="action-btn" onclick="deleteOffer(\\'' + offer.safeId + '\\')">' +
                            '<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2">' +
                                '<polyline points="3,6 5,6 21,6"></polyline>' +
                                '<path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>' +
                            '</svg>' +
                            '<span class="action-text">Remover</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
        }

        function viewDetails(offerSafeId) {
            const offer = offers.find(function(o) { return o.safeId === offerSafeId; });
            
            const detailsContent = document.getElementById('detailsContent');
            detailsContent.innerHTML = '<div class="offer-details">' +
                '<div class="detail-section">' +
                    '<div class="detail-label">📦 Título</div>' +
                    '<div class="detail-value">' + offer.title + '</div>' +
                '</div>' +
                '<div class="detail-section">' +
                    '<div class="detail-label">📝 Descrição</div>' +
                    '<div class="detail-value">' + offer.description + '</div>' +
                '</div>' +
                (offer.image ? '<div class="detail-section">' +
                    '<div class="detail-label">🖼️ Imagem</div>' +
                    '<img src="' + offer.image + '" alt="' + offer.title + '" class="detail-image">' +
                '</div>' : '') +
                '<div class="detail-section">' +
                    '<div class="detail-label">🏷️ Categoria</div>' +
                    '<div class="detail-value">' + offer.category + '</div>' +
                '</div>' +
                '<div class="detail-section">' +
                    '<div class="detail-label">👤 Autor</div>' +
                    '<div class="detail-value">' + offer.author + '</div>' +
                '</div>' +
                '<div class="detail-section">' +
                    '<div class="detail-label">📊 Status</div>' +
                    '<div class="detail-value">' + (offer.isActive ? '✅ Ativa' : '❌ Inativa') + '</div>' +
                '</div>' +
                '<div class="detail-section">' +
                    '<div class="detail-label">📅 Data de Criação</div>' +
                    '<div class="detail-value">' + new Date(offer.createdAt).toLocaleString('pt-BR') + '</div>' +
                '</div>' +
            '</div>';
            
            document.getElementById('detailsModal').style.display = 'block';
        }


        function deleteOffer(offerSafeId) {
            const offer = offers.find(function(o) { return o.safeId === offerSafeId; });
            if (!offer) return;
            
            currentOfferId = offer.id;
            
            const offerTitle = offer.title;
            
            document.getElementById('modalTitle').innerHTML = 
                '<svg class="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                    '<polyline points="3,6 5,6 21,6"></polyline>' +
                    '<path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>' +
                '</svg>' +
                'Remover Oferta';
            
            document.getElementById('modalMessage').textContent = 'Tem certeza que deseja remover permanentemente a oferta "' + offerTitle + '"? Esta ação não pode ser desfeita.';
            document.getElementById('confirmBtn').textContent = 'Remover';
            document.getElementById('confirmBtn').className = 'btn btn-danger';
            
            document.getElementById('confirmModal').style.display = 'block';
        }

        function confirmAction() {
            confirmOfferAction();
            closeConfirmModal();
        }

        async function confirmOfferAction() {
            try {
                const response = await fetch('/api/offer/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        offerId: currentOfferId
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showToast('Oferta removida com sucesso!', 'success');
                    loadOffers(); // Recarregar lista
                } else {
                    showToast('Erro ao remover oferta: ' + result.error, 'error');
                }
            } catch (error) {
                console.error('Erro ao remover oferta:', error);
                showToast('Erro de rede ao remover oferta', 'error');
            }
        }

        function closeDetailsModal() {
            document.getElementById('detailsModal').style.display = 'none';
        }

        function closeConfirmModal() {
            document.getElementById('confirmModal').style.display = 'none';
            currentOfferId = null;
        }

        function showToast(message, type) {
            const toast = document.createElement('div');
            toast.className = 'toast ' + type;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(function() {
                toast.remove();
            }, 4000);
        }

        function logout() {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin';
        }

        // Event listeners
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredOffers = offers.filter(function(offer) {
                return offer.title.toLowerCase().includes(searchTerm) || 
                       offer.description.toLowerCase().includes(searchTerm) ||
                       offer.category.toLowerCase().includes(searchTerm);
            });
            renderOffers(filteredOffers);
        });

        // Fechar modais ao clicar fora
        window.onclick = function(event) {
            const detailsModal = document.getElementById('detailsModal');
            const confirmModal = document.getElementById('confirmModal');
            
            if (event.target === detailsModal) {
                closeDetailsModal();
            }
            if (event.target === confirmModal) {
                closeConfirmModal();
            }
        }

        // Verificar autenticação
        if (!localStorage.getItem('adminToken')) {
            window.location.href = '/admin';
        }

        // Carregar ofertas ao inicializar
        loadOffers();
    </script>
</body>
</html>`;

msg.headers = {
    'Content-Type': 'text/html; charset=utf-8'
};

return msg;
