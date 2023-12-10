const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const UserDTO = require('../dtos/UserDTO');

class AuthService {
    _generateToken(user) {
        const payload = {
            id: user.id,
            username: user.username
        };
        const options = {
            expiresIn: '1h'
        };
        return jwt.sign(payload, config.jwtSecret, options);
    }

    async register(login, password, avatar = null, phone = null, name, role = 'customer') {
        return await User.create({
            login,
            password,
            avatar,
            phone,
            name,
            role,
        });
    }
    async login(username, password) {
        return new Promise((resolve) => {
            User.findOne({ login: username, password })
                .then(user => {
                    if (user) {
                        const token = this._generateToken(user);
                        resolve({ token, data: new UserDTO(user) });
                    } else {
                        resolve(401);
                    }
                })
                .catch(error => {
                    resolve(500);
                });
        });
    }
}

module.exports = new AuthService();