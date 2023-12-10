const UserService = require('../services/UserService');

class AdminsController {
    async registerAdmin(request, response) {
        const { login, name, password, image } = request.body;
        const result = await UserService.create(login, name, password, image, "admin");
        response.json({
            message: 'Admin was created',
            data: result,
        });
    }
    async get(request, response) {
        const result = await UserService.get();
        response.json(result);
    }
}

module.exports = new AdminsController();