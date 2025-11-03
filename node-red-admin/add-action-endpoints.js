const fs = require('fs');
const path = require('path');

// Ler o arquivo flows.json atual
const flowsPath = path.join(__dirname, 'data', 'flows.json');
let flows = JSON.parse(fs.readFileSync(flowsPath, 'utf8'));

// Ler os fluxos de ação
const userActionsPath = path.join(__dirname, 'flows', 'user-actions-flow.json');
const offerActionsPath = path.join(__dirname, 'flows', 'offer-actions-flow.json');

const userActions = JSON.parse(fs.readFileSync(userActionsPath, 'utf8'));
const offerActions = JSON.parse(fs.readFileSync(offerActionsPath, 'utf8'));

// Adicionar os nós de ação ao fluxo principal
flows = flows.concat(userActions);
flows = flows.concat(offerActions);

// Salvar o arquivo atualizado
fs.writeFileSync(flowsPath, JSON.stringify(flows, null, 2));

console.log('✅ Endpoints de ação adicionados ao flows.json');
console.log('📋 Endpoints adicionados:');
console.log('   - POST /api/user/block');
console.log('   - POST /api/user/password');
console.log('   - POST /api/offer/status');
console.log('   - POST /api/offer/delete');
console.log('');
console.log('🔄 Reinicie o Node-RED para aplicar as mudanças');



