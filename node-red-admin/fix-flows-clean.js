const fs = require('fs');
const path = require('path');

// Ler o arquivo flows.json atual
const flowsPath = path.join(__dirname, 'data', 'flows.json');
let flows = JSON.parse(fs.readFileSync(flowsPath, 'utf8'));

// Filtrar apenas os nós únicos (remover duplicatas)
const uniqueNodes = new Map();
const cleanFlows = [];

// Adicionar o tab primeiro
cleanFlows.push(flows[0]);

// Processar cada nó
for (let i = 1; i < flows.length; i++) {
    const node = flows[i];
    if (!uniqueNodes.has(node.id)) {
        uniqueNodes.set(node.id, true);
        cleanFlows.push(node);
    } else {
        console.log(`Removendo nó duplicado: ${node.id}`);
    }
}

// Salvar o arquivo limpo
fs.writeFileSync(flowsPath, JSON.stringify(cleanFlows, null, 2));

console.log('✅ Arquivo flows.json limpo!');
console.log(`📊 Nós originais: ${flows.length}`);
console.log(`📊 Nós únicos: ${cleanFlows.length}`);
console.log(`🗑️ Duplicatas removidas: ${flows.length - cleanFlows.length}`);
console.log('');
console.log('🔄 Reinicie o Node-RED para aplicar as mudanças');



