module.exports = {
    // Configurações do Node-RED
    uiPort: process.env.PORT || 1880,
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,
    debugMaxLength: 1000,
    debugUseColors: true,
    userDir: './data',
    flowFile: 'flows.json',
    credentialSecret: "reuse-admin-secret-key-2024",
    
    // Configurações de segurança
    adminAuth: {
        type: "credentials",
        users: [
            {
                username: "admin",
                password: "$2a$08$zZWtXTja0fBQpWc4c0UZCOYQ6Yy4kZQ0kZQ0kZQ0kZQ0kZQ0kZQ0kZQ",
                permissions: "*"
            }
        ]
    },
    
    // Configurações do dashboard
    ui: {
        path: "ui",
        middleware: function(req, res, next) {
            // Middleware para autenticação
            next();
        }
    },
    
    // Configurações de logging
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    
    // Configurações de editor
    editorTheme: {
        projects: {
            enabled: false
        },
        palette: {
            editable: true
        },
        header: {
            title: "ReUse Admin Panel",
            image: "/absolute/path/to/header/image", // opcional
            url: "http://localhost:3000" // link para o site principal
        }
    },
    
    // Configurações de contexto
    contextStorage: {
        default: {
            module: "localfilesystem"
        }
    },
    
    // Configurações de exportação
    exportGlobalContextKeys: false,
    
    // Configurações de segurança adicionais
    httpAdminRoot: '/admin',
    httpNodeRoot: '/api',
    
    // Configurações de CORS
    httpAdminCors: {
        origin: "*",
        methods: "GET,PUT,POST,DELETE"
    },
    
    httpNodeCors: {
        origin: "*",
        methods: "GET,PUT,POST,DELETE"
    }
};
