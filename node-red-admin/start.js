#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Iniciando ReUse Admin Panel...\n');

// Verificar se o Node-RED está instalado (Windows)
const nodeRedPath = path.join(__dirname, 'node_modules', '.bin', 'node-red.cmd');
if (!fs.existsSync(nodeRedPath)) {
    console.error('❌ Node-RED não encontrado. Execute "npm install" primeiro.');
    process.exit(1);
}

// Verificar se a API do ReUse está rodando
const http = require('http');
const checkApi = () => {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:3000/api/users', (res) => {
            resolve(true);
        });
        req.on('error', () => {
            resolve(false);
        });
        req.setTimeout(2000, () => {
            req.destroy();
            resolve(false);
        });
    });
};

// Função para iniciar o Node-RED
const startNodeRed = () => {
    console.log('✅ Iniciando ReUse Admin Panel...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🌐 PAINEL ADMINISTRATIVO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Acesse o painel web em:');
    console.log('   → http://localhost:1880/ui');
    console.log('');
    console.log('🔐 Credenciais padrão:');
    console.log('   Email: admin@reuse.com');
    console.log('   Senha: admin123');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🛠️  EDITOR NODE-RED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('⚙️  Editor de fluxos:');
    console.log('   → http://localhost:1880');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📡 ENDPOINTS DA API');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('GET  /api/admin/metrics   - Métricas gerais');
    console.log('GET  /api/admin/users     - Lista de usuários');
    console.log('GET  /api/admin/offers    - Lista de anúncios');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⏹️  Para parar: Ctrl+C');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const nodeRed = spawn(nodeRedPath, ['--userDir', './data'], {
        stdio: 'inherit',
        cwd: __dirname,
        shell: true
    });

    nodeRed.on('error', (err) => {
        console.error('❌ Erro ao iniciar Node-RED:', err.message);
        process.exit(1);
    });

    nodeRed.on('close', (code) => {
        console.log(`\n👋 Node-RED finalizado com código ${code}`);
        process.exit(code);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Finalizando Node-RED...');
        nodeRed.kill('SIGINT');
    });
};

// Verificar API do ReUse
console.log('🔍 Verificando API do ReUse...');
checkApi().then((isApiRunning) => {
    if (isApiRunning) {
        console.log('✅ API do ReUse encontrada em http://localhost:3000');
        startNodeRed();
    } else {
        console.log('⚠️  API do ReUse não encontrada em http://localhost:3000');
        console.log('💡 Certifique-se de que a aplicação ReUse está rodando');
        console.log('🚀 Iniciando Node-RED mesmo assim...\n');
        startNodeRed();
    }
});
