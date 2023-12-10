const seedsService = require('../services/SeedService');

class SeedsController {
    async all(request, response) {
        const result = await seedsService.all();
        response.json(result);
    }
    async getAction(request, response) {
        const result = await seedsService.getAction();
        response.json(result);
    }
    async getRandom(request, response) {
        const { count } = request.query;
        const result = await seedsService.getRandom(count);
        response.json(result);
    }
    async get(request, response) {
        const {
            sort,
            season,
            size,
        } = request.query;
        const operation = await seedsService.getFilteredSeeds(
            sort,
            season,
            size,
        );
        if (operation.data) {
            response.status(500).json({
                message: operation.message,
            });
            return false;
        }
        response.status(200).json(operation);
    }
    async create(request, response) {
        const {
            seedName,
            price,
            description,
            sort,
            season,
            bigSeeds,
            action,
            weight,
            count,
        } = request.body;
        const serviceResponse = await seedsService.create(
            seedName,
            price,
            description,
            sort,
            season,
            bigSeeds,
            weight,
            count,
            request.files[0]?.filename || null,
            action,
        );
        if (!serviceResponse.result) {
            response.status(500).json({
                result: false,
                message: serviceResponse.message,
                seed: serviceResponse.data,
            });
            return false;
        }
        response.status(200).json({
            result: true,
            message: serviceResponse.message,
            seed: serviceResponse.data,
        });
    }
    async delete(request, response) {
        const { id } = request.body;
        const operation = await seedsService.delete(id);
        if (!operation.result) {
            response.status(500).json(operation);
            return false;
        }
        if (!operation.result) {
            response.status(500).json({
                message: operation.message,
            });
            return false;
        }
        response.status(200).json({
            message: operation.message,
        });
    }
    async update(request, response) {
        const {
            id,
            seedName,
            price,
            description,
            sort,
            season,
            bigSeeds,
            weight,
            count,
            image,
            action,
        } = request.body;
        const serviceResponse = await seedsService.update(
            id,
            seedName,
            price,
            description,
            sort,
            season,
            bigSeeds,
            weight,
            count,
            image,
            action,
        );
        if (!serviceResponse.result) {
            response.status(500).json({
                message: serviceResponse.message,
                seed: serviceResponse.data,
            });
            return false;
        }
        response.status(200).json({
            message: serviceResponse.message,
            seed: serviceResponse.data,
        });
    }
}

module.exports = new SeedsController();