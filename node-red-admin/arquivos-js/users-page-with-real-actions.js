msg.payload = `<!DOCTYPE html>
<html>
<head>
    <title>ReUse Admin - Gerenciar Usuários</title>
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

        .users-list {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .user-item {
            display: flex;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
            transition: all 0.3s;
        }

        .user-item:hover {
            background: #f8f9fa;
        }

        .user-item:last-child {
            border-bottom: none;
        }

        .user-avatar {
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

        .user-info {
            flex: 1;
        }

        .user-name {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .user-status {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
            line-height: 1.4;
        }

        .user-status.active {
            color: #27ae60;
        }

        .user-status.blocked {
            color: #e74c3c;
        }

        .user-actions {
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

        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s;
        }

        .btn-success {
            background: #27ae60;
            color: white;
        }

        .btn-success:hover {
            background: #229954;
        }

        .btn-danger {
            background: #e74c3c;
            color: white;
        }

        .btn-danger:hover {
            background: #c0392b;
        }

        .btn-warning {
            background: #f39c12;
            color: white;
        }

        .btn-warning:hover {
            background: #e67e22;
        }

        .btn-primary {
            background: #3498db;
            color: white;
        }

        .btn-primary:hover {
            background: #2980b9;
        }

        .btn-secondary {
            background: #95a5a6;
            color: white;
        }

        .btn-secondary:hover {
            background: #7f8c8d;
        }

        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }

        .error {
            background: #fee;
            border: 1px solid #fcc;
            color: #c33;
            padding: 12px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .success {
            background: #e8f5e8;
            border: 1px solid #27ae60;
            color: #27ae60;
            padding: 12px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .refresh-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin-left: 10px;
        }

        .refresh-btn:hover {
            background: #2980b9;
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
            max-width: 500px; 
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
        
        /* Formulário de trocar senha */
        .form-group {
            margin-bottom: 20px;
        }
        .form-label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 600;
            font-size: 14px;
        }
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s;
            box-sizing: border-box;
        }
        .form-input:focus {
            outline: none;
            border-color: #27ae60;
            box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
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

        /* Toast Notifications */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c3e50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            animation: toastSlideIn 0.3s ease;
        }

        .toast.success {
            background: #27ae60;
        }

        .toast.error {
            background: #e74c3c;
        }

        @keyframes toastSlideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
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
        <a href="/admin/users" class="active">👥 Usuários</a>
        <a href="/admin/offers">📦 Ofertas</a>
    </div>
    <div class="container">
        <h1 class="page-title">Gerenciar usuários</h1>
        <div class="search-container">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDE5TDEzIDEzTTE1IDhBNyA3IDAgMSAxIDE1IDhBNyA3IDAgMSAxIDE1IDh6IiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" class="search-icon" alt="Buscar">
            <input type="text" class="search-input" placeholder="buscar usuário" id="searchInput">
            <button onclick="loadUsers()" class="refresh-btn">🔄 Atualizar</button>
        </div>
        <div class="users-list" id="usersList">
            <div class="loading">Carregando usuários da API...</div>
        </div>
    </div>

    <!-- Modal para trocar senha -->
    <div id="changePasswordModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">
                    <svg class="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Trocar Senha
                </h3>
                <span class="close" onclick="closeChangePasswordModal()">&times;</span>
            </div>
            <div class="modal-body">
                <form id="changePasswordForm">
                    <div class="form-group">
                        <label class="form-label" for="newPassword">Nova Senha</label>
                        <input type="password" id="newPassword" class="form-input" placeholder="Digite a nova senha" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="confirmPassword">Confirmar Nova Senha</label>
                        <input type="password" id="confirmPassword" class="form-input" placeholder="Confirme a nova senha" required>
                    </div>
                </form>
            </div>
            <div class="modal-actions">
                <button onclick="closeChangePasswordModal()" class="btn btn-secondary">Cancelar</button>
                <button onclick="confirmChangePassword()" class="btn btn-primary">Alterar Senha</button>
            </div>
        </div>
    </div>

    <!-- Modal para bloquear/desbloquear usuário -->
    <div id="blockUserModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="blockModalTitle">
                    <svg class="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    Bloquear Usuário
                </h3>
                <span class="close" onclick="closeBlockUserModal()">&times;</span>
            </div>
            <div class="modal-body">
                <p id="blockModalMessage">Tem certeza que deseja bloquear este usuário?</p>
            </div>
            <div class="modal-actions">
                <button onclick="closeBlockUserModal()" class="btn btn-secondary">Cancelar</button>
                <button onclick="confirmBlockUser()" class="btn btn-danger" id="blockConfirmBtn">Bloquear</button>
            </div>
        </div>
    </div>


    <script>
        let users = [];
        let currentAction = null;
        let currentUserId = null;

        async function loadUsers() {
            try {
                console.log('Carregando usuários via proxy Node-RED...');
                const response = await fetch('/api/users-proxy', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                console.log('Response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Dados recebidos via proxy:', data);
                    
                    users = data.map((user, index) => ({
                        id: user.id,
                        safeId: 'user_' + index,
                        name: user.name || user.fullName || 'Usuário',
                        email: user.email,
                        avatar: user.avatar || user.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'U') + '&background=27ae60&color=fff',
                        status: user.isBlocked ? 'blocked' : 'active',
                        statusText: user.isBlocked ? 'Inativo - pelo administrador' : 'Ativo desde ' + new Date(user.createdAt || Date.now()).toLocaleDateString('pt-BR'),
                        joinDate: user.createdAt || new Date().toISOString(),
                        isBlocked: user.isBlocked || false
                    }));
                    
                    console.log('Usuários processados:', users);
                    renderUsers();
                } else {
                    throw new Error('Erro na API: ' + response.status);
                }
            } catch (error) {
                console.error('Erro ao carregar usuários:', error);
                document.getElementById('usersList').innerHTML = '<div class="error">Erro ao carregar usuários: ' + error.message + '</div>';
            }
        }

        function renderUsers(usersToRender) {
            if (!usersToRender) usersToRender = users;
            const usersList = document.getElementById('usersList');
            
            if (usersToRender.length === 0) {
                usersList.innerHTML = '<div class="loading">Nenhum usuário encontrado</div>';
                return;
            }
            
            usersList.innerHTML = usersToRender.map(function(user) {
                return '<div class="user-item">' +
                    '<img src="' + user.avatar + '" alt="' + user.name + '" class="user-avatar">' +
                    '<div class="user-info">' +
                        '<div class="user-name">' + user.name + '</div>' +
                        '<div class="user-status ' + user.status + '">' + user.statusText + '</div>' +
                    '</div>' +
                    '<div class="user-actions">' +
                        '<div class="action-btn" onclick="changePassword(\\'' + user.safeId + '\\')">' +
                            '<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" stroke-width="2">' +
                                '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>' +
                                '<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' +
                            '</svg>' +
                            '<span class="action-text">Trocar senha</span>' +
                        '</div>' +
                        '<div class="action-btn" onclick="toggleUserStatus(\\'' + user.safeId + '\\', ' + user.isBlocked + ')">' +
                            '<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2">' +
                                '<circle cx="12" cy="12" r="10"></circle>' +
                                '<line x1="15" y1="9" x2="9" y2="15"></line>' +
                                '<line x1="9" y1="9" x2="15" y2="15"></line>' +
                            '</svg>' +
                            '<span class="action-text">' + (user.status === 'active' ? 'Bloquear' : 'Ativar') + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
        }

        function changePassword(userSafeId) {
            const user = users.find(function(u) { return u.safeId === userSafeId; });
            if (!user) return;
            
            currentUserId = user.id;
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            document.getElementById('changePasswordModal').style.display = 'block';
        }

        async function confirmPasswordChange() {
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!newPassword || !confirmPassword) {
                showToast('Por favor, preencha todos os campos', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showToast('As senhas não coincidem', 'error');
                return;
            }
            
            if (newPassword.length < 6) {
                showToast('A senha deve ter pelo menos 6 caracteres', 'error');
                return;
            }
            
            try {
                const response = await fetch('/api/user/password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUserId,
                        newPassword: newPassword
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showToast('Senha alterada com sucesso!', 'success');
                    closeChangePasswordModal();
                } else {
                    showToast('Erro ao alterar senha: ' + result.error, 'error');
                }
            } catch (error) {
                console.error('Erro ao alterar senha:', error);
                showToast('Erro de rede ao alterar senha', 'error');
            }
        }

        function toggleUserStatus(userSafeId, currentIsBlocked) {
            const user = users.find(function(u) { return u.safeId === userSafeId; });
            if (!user) return;
            
            currentUserId = user.id;
            currentAction = currentIsBlocked ? 'unblock' : 'block';
            
            const action = currentIsBlocked ? 'ativar' : 'bloquear';
            const userName = user.name;
            
            document.getElementById('blockModalTitle').innerHTML = 
                '<svg class="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                    '<circle cx="12" cy="12" r="10"></circle>' +
                    '<line x1="15" y1="9" x2="9" y2="15"></line>' +
                    '<line x1="9" y1="9" x2="15" y2="15"></line>' +
                '</svg>' +
                action.charAt(0).toUpperCase() + action.slice(1) + ' Usuário';
            
            document.getElementById('blockModalMessage').textContent = 'Tem certeza que deseja ' + action + ' o usuário "' + userName + '"?';
            document.getElementById('blockConfirmBtn').textContent = action.charAt(0).toUpperCase() + action.slice(1);
            document.getElementById('blockConfirmBtn').onclick = confirmUserAction;
            
            document.getElementById('blockUserModal').style.display = 'block';
        }

        async function confirmUserAction() {
            try {
                const response = await fetch('/api/user/block', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUserId,
                        action: currentAction
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    const action = currentAction === 'block' ? 'bloqueado' : 'ativado';
                    showToast('Usuário ' + action + ' com sucesso!', 'success');
                    closeBlockUserModal();
                    loadUsers(); // Recarregar lista
                } else {
                    showToast('Erro ao ' + currentAction + ' usuário: ' + result.error, 'error');
                }
            } catch (error) {
                console.error('Erro ao ' + currentAction + ' usuário:', error);
                showToast('Erro de rede ao ' + currentAction + ' usuário', 'error');
            }
        }

        function closeChangePasswordModal() {
            document.getElementById('changePasswordModal').style.display = 'none';
        }

        function closeBlockUserModal() {
            document.getElementById('blockUserModal').style.display = 'none';
            currentUserId = null;
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
            const filteredUsers = users.filter(function(user) {
                return user.name.toLowerCase().includes(searchTerm) || 
                       user.email.toLowerCase().includes(searchTerm);
            });
            renderUsers(filteredUsers);
        });

        // Fechar modais ao clicar fora
        window.onclick = function(event) {
            const changePasswordModal = document.getElementById('changePasswordModal');
            const blockUserModal = document.getElementById('blockUserModal');
            
            if (event.target === changePasswordModal) {
                closeChangePasswordModal();
            }
            if (event.target === blockUserModal) {
                closeBlockUserModal();
            }
        }

        // Verificar autenticação
        if (!localStorage.getItem('adminToken')) {
            window.location.href = '/admin';
        }

        // Carregar usuários ao inicializar
        loadUsers();
    </script>
</body>
</html>`;

msg.headers = {
    'Content-Type': 'text/html; charset=utf-8'
};

return msg;
