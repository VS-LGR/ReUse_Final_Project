const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simulação de banco de dados de administradores
// Em produção, isso deveria estar em um banco de dados real
const admins = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@reuse.com',
        password: '$2a$08$EUoUWZV.5UMNpVDMLOHPru5aKX5BUS/inhVa/ttP8vpA8e8kaMqmq', // 'admin123'
        name: 'Administrador',
        role: 'super_admin',
        permissions: ['*'],
        createdAt: new Date(),
        lastLogin: null
    },
    {
        id: 2,
        username: 'moderator',
        email: 'moderator@reuse.com',
        password: '$2a$08$zZWtXTja0fBQpWc4c0UZCOYQ6Yy4kZQ0kZQ0kZQ0kZQ0kZQ0kZQ0kZQ', // 'mod123'
        name: 'Moderador',
        role: 'moderator',
        permissions: ['users.read', 'offers.read', 'offers.update', 'metrics.read'],
        createdAt: new Date(),
        lastLogin: null
    }
];

const JWT_SECRET = 'reuse-admin-jwt-secret-2024';
const JWT_EXPIRES_IN = '24h';

class AdminAuth {
    static async login(username, password) {
        try {
            // Buscar administrador por username ou email
            const admin = admins.find(a => a.username === username || a.email === username);
            
            if (!admin) {
                throw new Error('Administrador não encontrado');
            }

            // Verificar senha
            const isValidPassword = await bcrypt.compare(password, admin.password);
            if (!isValidPassword) {
                throw new Error('Senha incorreta');
            }

            // Atualizar último login
            admin.lastLogin = new Date();

            // Gerar token JWT
            const token = jwt.sign(
                { 
                    id: admin.id, 
                    username: admin.username, 
                    role: admin.role,
                    permissions: admin.permissions
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            // Retornar dados do admin (sem senha)
            const { password: _, ...adminWithoutPassword } = admin;
            
            return {
                success: true,
                admin: adminWithoutPassword,
                token,
                expiresIn: JWT_EXPIRES_IN
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const admin = admins.find(a => a.id === decoded.id);
            
            if (!admin) {
                throw new Error('Administrador não encontrado');
            }

            return {
                success: true,
                admin: {
                    id: admin.id,
                    username: admin.username,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                    permissions: admin.permissions
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async createAdmin(adminData) {
        try {
            const { username, email, password, name, role, permissions } = adminData;

            // Verificar se já existe
            const existingAdmin = admins.find(a => a.username === username || a.email === email);
            if (existingAdmin) {
                throw new Error('Administrador já existe');
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 8);

            // Criar novo admin
            const newAdmin = {
                id: admins.length + 1,
                username,
                email,
                password: hashedPassword,
                name,
                role: role || 'moderator',
                permissions: permissions || ['users.read', 'offers.read'],
                createdAt: new Date(),
                lastLogin: null
            };

            admins.push(newAdmin);

            const { password: _, ...adminWithoutPassword } = newAdmin;
            return {
                success: true,
                admin: adminWithoutPassword
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async updateAdmin(id, updateData) {
        try {
            const adminIndex = admins.findIndex(a => a.id === id);
            if (adminIndex === -1) {
                throw new Error('Administrador não encontrado');
            }

            const admin = admins[adminIndex];
            
            // Atualizar dados
            Object.keys(updateData).forEach(key => {
                if (key !== 'password' && key !== 'id') {
                    admin[key] = updateData[key];
                }
            });

            // Se a senha foi fornecida, fazer hash
            if (updateData.password) {
                admin.password = await bcrypt.hash(updateData.password, 8);
            }

            admin.updatedAt = new Date();

            const { password: _, ...adminWithoutPassword } = admin;
            return {
                success: true,
                admin: adminWithoutPassword
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async deleteAdmin(id) {
        try {
            const adminIndex = admins.findIndex(a => a.id === id);
            if (adminIndex === -1) {
                throw new Error('Administrador não encontrado');
            }

            // Não permitir deletar o super admin
            if (admins[adminIndex].role === 'super_admin') {
                throw new Error('Não é possível deletar o super administrador');
            }

            admins.splice(adminIndex, 1);

            return {
                success: true,
                message: 'Administrador deletado com sucesso'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async getAllAdmins() {
        return {
            success: true,
            admins: admins.map(admin => {
                const { password: _, ...adminWithoutPassword } = admin;
                return adminWithoutPassword;
            })
        };
    }
}

module.exports = AdminAuth;
