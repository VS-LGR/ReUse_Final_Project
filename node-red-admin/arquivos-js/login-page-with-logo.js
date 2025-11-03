// Código COM LOGO DO REUSE para o nó "Admin HTML" (Login) - substitua todo o conteúdo do nó por este:

msg.payload = `<!DOCTYPE html>
<html>
<head>
    <title>ReUse Admin - Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; 
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        .logo-section {
            margin-bottom: 30px;
        }
        .logo-icon { 
            width: 80px; 
            height: 80px; 
            border-radius: 16px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background: white; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin: 0 auto 20px;
        }
        .logo-icon img { 
            width: 100%; 
            height: 100%; 
            object-fit: contain; 
            border-radius: 16px; 
        }
        .login-title {
            font-size: 28px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .login-subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        .form-label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 500;
        }
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
            box-sizing: border-box;
        }
        .form-input:focus {
            outline: none;
            border-color: #27ae60;
        }
        .login-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
            margin-top: 10px;
        }
        .login-btn:hover {
            transform: translateY(-2px);
        }
        .login-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        .error-message {
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 8px;
            margin-top: 15px;
            border: 1px solid #fcc;
            display: none;
        }
        .success-message {
            background: #e8f5e8;
            color: #27ae60;
            padding: 12px;
            border-radius: 8px;
            margin-top: 15px;
            border: 1px solid #27ae60;
            display: none;
        }
        .loading {
            display: none;
            color: #666;
            margin-top: 15px;
        }
        .footer {
            margin-top: 30px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo-section">
            <div class="logo-icon">
                <img src="https://i.imgur.com/OD3laQP.png" alt="ReUse Logo">
            </div>
            <h1 class="login-title">ReUse Admin</h1>
            <p class="login-subtitle">Painel Administrativo</p>
        </div>
        
        <form id="loginForm">
            <div class="form-group">
                <label class="form-label" for="username">Usuário</label>
                <input type="text" id="username" class="form-input" placeholder="Digite seu usuário" required>
            </div>
            
            <div class="form-group">
                <label class="form-label" for="password">Senha</label>
                <input type="password" id="password" class="form-input" placeholder="Digite sua senha" required>
            </div>
            
            <button type="submit" class="login-btn" id="loginBtn">
                Entrar
            </button>
            
            <div class="loading" id="loading">
                Verificando credenciais...
            </div>
            
            <div class="error-message" id="errorMessage">
                Usuário ou senha incorretos
            </div>
            
            <div class="success-message" id="successMessage">
                Login realizado com sucesso!
            </div>
        </form>
        
        <div class="footer">
            <p>© 2025 ReUse - Sistema de Reutilização</p>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            const loading = document.getElementById('loading');
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');
            
            // Limpar mensagens anteriores
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';
            
            // Mostrar loading
            loginBtn.disabled = true;
            loading.style.display = 'block';
            
            // Simular verificação de credenciais
            setTimeout(() => {
                // Credenciais de exemplo (em produção, verificar com servidor)
                if (username === 'admin' && password === 'admin123') {
                    // Login bem-sucedido
                    successMessage.style.display = 'block';
                    
                    // Salvar token de autenticação
                    localStorage.setItem('adminToken', 'admin-token-' + Date.now());
                    
                    // Redirecionar para dashboard após 1 segundo
                    setTimeout(() => {
                        window.location.href = '/admin/dashboard';
                    }, 1000);
                } else {
                    // Login falhou
                    errorMessage.style.display = 'block';
                    loginBtn.disabled = false;
                    loading.style.display = 'none';
                }
            }, 1500);
        });

        // Verificar se já está logado
        if (localStorage.getItem('adminToken')) {
            window.location.href = '/admin/dashboard';
        }
    </script>
</body>
</html>`;

msg.headers = {
    'Content-Type': 'text/html; charset=utf-8'
};

return msg;



