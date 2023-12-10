import $api from '../http/index';

export default class AuthService {
    static async login(username, password) {
        const response = await $api.post('/login', { username, password });
        if (response.data.message) {
            alert('Неправильні дані паролю або логіна');
            return {
                token: '',
                data: {},
                role: 'guest',
            }
        }
        const result = response.data;
        return {
            token: result.token,
            data: result.data,
            role: result.data.role,
        };
    }
    static async register(login, name, password, phone, avatarImageFile) {
        await $api.post('/register', {
            login,
            name,
            password,
            phone,
            avatar: avatarImageFile,
        });
        return await AuthService.login(login, password);
    }
}