const axios = require('axios');

// Configuração da API do ReUse
const REUSE_API_BASE_URL = 'http://localhost:3000/api';

class ReUseAPI {
    constructor() {
        this.api = axios.create({
            baseURL: REUSE_API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Métodos para usuários
    async getUsers() {
        try {
            const response = await this.api.get('/users');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getUserById(id) {
        try {
            const response = await this.api.get(`/users/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async updateUser(id, userData) {
        try {
            const response = await this.api.put(`/users/${id}`, userData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async deleteUser(id) {
        try {
            const response = await this.api.delete(`/users/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async blockUser(id, reason = '') {
        try {
            const response = await this.api.post(`/users/${id}/block`, { reason });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async unblockUser(id) {
        try {
            const response = await this.api.post(`/users/${id}/unblock`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Métodos para ofertas/anúncios
    async getOffers() {
        try {
            const response = await this.api.get('/offers');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getOfferById(id) {
        try {
            const response = await this.api.get(`/offers/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async updateOffer(id, offerData) {
        try {
            const response = await this.api.put(`/offers/${id}`, offerData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async deleteOffer(id) {
        try {
            const response = await this.api.delete(`/offers/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async approveOffer(id) {
        try {
            const response = await this.api.post(`/offers/${id}/approve`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async rejectOffer(id, reason = '') {
        try {
            const response = await this.api.post(`/offers/${id}/reject`, { reason });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Métodos para métricas
    async getMetrics() {
        try {
            const [usersResponse, offersResponse] = await Promise.all([
                this.api.get('/users'),
                this.api.get('/offers')
            ]);

            const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
            const offers = Array.isArray(offersResponse.data) ? offersResponse.data : [];

            // Calcular métricas detalhadas
            const metrics = {
                users: {
                    total: users.length,
                    active: users.filter(user => !user.isBlocked).length,
                    blocked: users.filter(user => user.isBlocked === true).length,
                    newThisMonth: this.countNewThisMonth(users)
                },
                offers: {
                    total: offers.length,
                    active: offers.filter(offer => offer.isActive === true || offer.status === 'approved').length,
                    pending: offers.filter(offer => offer.status === 'pending').length,
                    approved: offers.filter(offer => offer.status === 'approved').length,
                    rejected: offers.filter(offer => offer.status === 'rejected').length
                },
                trades: {
                    ongoing: 0, // Implementar quando houver sistema de trocas
                    completed: 0,
                    cancelled: 0
                },
                reports: {
                    total: 0, // Implementar quando houver sistema de denúncias
                    pending: 0,
                    resolved: 0
                }
            };

            return {
                success: true,
                data: metrics
            };
        } catch (error) {
            // Retornar métricas simuladas em caso de erro
            console.error('Erro ao obter métricas:', error.message);
            return {
                success: true,
                data: {
                    users: { total: 0, active: 0, blocked: 0, newThisMonth: 0 },
                    offers: { total: 0, active: 0, pending: 0, approved: 0, rejected: 0 },
                    trades: { ongoing: 0, completed: 0, cancelled: 0 },
                    reports: { total: 0, pending: 0, resolved: 0 }
                },
                warning: 'Dados simulados - API não disponível'
            };
        }
    }

    // Método auxiliar para contar novos registros neste mês
    countNewThisMonth(items) {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        return items.filter(item => {
            if (!item.createdAt) return false;
            const createdDate = new Date(item.createdAt);
            return createdDate >= firstDayOfMonth;
        }).length;
    }

    async getUsersByDateRange(startDate, endDate) {
        try {
            const response = await this.api.get('/users', {
                params: {
                    startDate,
                    endDate
                }
            });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getOffersByDateRange(startDate, endDate) {
        try {
            const response = await this.api.get('/offers', {
                params: {
                    startDate,
                    endDate
                }
            });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Métodos para relatórios
    async generateReport(type, startDate, endDate) {
        try {
            let data = {};
            
            switch (type) {
                case 'users':
                    data = await this.getUsersByDateRange(startDate, endDate);
                    break;
                case 'offers':
                    data = await this.getOffersByDateRange(startDate, endDate);
                    break;
                case 'metrics':
                    data = await this.getMetrics();
                    break;
                default:
                    throw new Error('Tipo de relatório inválido');
            }

            if (!data.success) {
                throw new Error(data.error);
            }

            return {
                success: true,
                data: {
                    type,
                    startDate,
                    endDate,
                    generatedAt: new Date(),
                    data: data.data
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = ReUseAPI;
