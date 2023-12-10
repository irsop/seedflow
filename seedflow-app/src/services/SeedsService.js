import $api from '../http/index';

export default class SeedsService {
    static async get(sort, season, size) {
        return await $api.get(`/get?sort=${sort}&season=${season}&size=${size}`);
    }
    static async getAction() {
        return await $api.get(`/get-action`);
    }
    static async getRandom() {
        return await $api.get(`/get-random?count=${20}`);
    }
    static async all() {
        const result = await $api.get(`/all-seeds`);
        return result.data;
    }
    static async create(data) {
        const body = new FormData();
        body.append('seedName', data.seedName);
        body.append('price', data.price);
        body.append('description', data.description);
        body.append('sort', data.sort);
        body.append('season', data.season);
        body.append('bigSeeds', data.bigSeeds);
        body.append('weight', data.weight);
        body.append('action', data.action);
        body.append('count', data.count);
        body.append('image', data.image);
        const result = await $api.post(`/create-seed`, body);
        return result.data;
    }
    static async update(data, id) {
        const body = new FormData();
        body.append('id', id);
        body.append('seedName', data.seedName);
        body.append('price', data.price);
        body.append('description', data.description);
        body.append('sort', data.sort);
        body.append('season', data.season);
        body.append('action', data.action);
        body.append('bigSeeds', data.bigSeeds);
        body.append('weight', data.weight);
        body.append('count', data.count);
        if (data.image) {
            body.append('image', data.image);
        }
        const result = await $api.put(`/update-seed`, body);
        return result.data;
    }
    static async remove(id) {
        await $api.post('/delete-seed', { id });
    }
}