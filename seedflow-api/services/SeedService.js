const { FILTERED_SEASONS, SeedModel } = require('../models/Seed');
const fs = require('fs');
const path = require('path');

function filterSeason(season, sort) {
    return FILTERED_SEASONS[sort]?.includes(season) ? season : null;
}

async function getRandomRecords(n) {
    return await SeedModel.aggregate([
        { $sample: { size: n } }
    ]);
}

class SeedService {
    async all() {
        try {
            const data = await SeedModel.find({});
            return data;
        } catch (e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async getAction() {
        try {
            const data = await SeedModel.find({ action: true });
            return data;
        } catch (e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async getRandom(count = 10) {
        try {
            const data = await getRandomRecords(Number(count));
            return data;
        } catch (e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async getFilteredSeeds(
        sort,
        season,
        size,
    ) {
        try {
            const sizesFilter = {
                $or: [
                    { $and: [{ big_seeds: true }, { count: { $exists: true, $ne: null, $in: [size] } }] }, // Якщо bigSeeds === true, взяти count
                    { $and: [{ big_seeds: false }, { weight: { $exists: true, $ne: null, $in: [size] } }] } // Якщо bigSeeds === false, взяти weight
                ]
            };
            const filterData = {
                sort,
                season,
                ...sizesFilter,
            };
            const data = await SeedModel.find(filterData);
            return data;
        } catch (e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async create(
        name,
        price,
        description,
        sort,
        season,
        bigSeeds,
        weight = false,
        count = false,
        image,
        action = false,
    ) {
        const config = {};

        config.name = name;
        config.price = price;
        config.description = description;
        config.sort = sort;
        config.season = filterSeason(season, sort);
        config.big_seeds = bigSeeds;
        config.image = image ?? null;
        config.action = action;

        if (!bigSeeds) {
            config.count = count;
            config.weight = null;
        } else {
            config.weight = weight;
            config.count = null;
        }

        try {
            const data = await SeedModel.create(config);
            return { message: 'Seed was created', data, result: true, };
        } catch (e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async delete(id) {
        try {
            const seedToDelete = await SeedModel.findOneAndDelete({ _id: id });
            const file = path.join(__dirname, `../public/images/${seedToDelete.image}`);
            if (seedToDelete && fs.existsSync(file)) {
                let result = {};
                fs.unlink(file, () => { });
                return { message: 'Seed and image was removed', data: seedToDelete, result: true, };
            } else {
                return { message: 'Seed was removed', data: seedToDelete, result: true, };
            }
        } catch (e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async update(
        id,
        name,
        price,
        description,
        sort,
        season,
        bigSeeds,
        weight = false,
        count = false,
        image,
    ) {
        const config = {};

        config.name = name || undefined;
        config.price = price || undefined;
        config.description = description || undefined;
        config.sort = sort || undefined;
        config.season = filterSeason(season, sort) || undefined;
        config.big_seeds = bigSeeds;
        config.image = image ?? null;
        config.action = action;

        if (bigSeeds) {
            config.count = count;
            config.weight = null;
        } else {
            config.weight = weight;
            config.count = null;
        }

        try {
            const data = await SeedModel.findOneAndUpdate({ _id: id }, config);
            return { message: 'Seed was updated', data, result: true, };
        } catch (e) {
            return { message: 'Error', data: e, result: false };
        }
    }

}

module.exports = new SeedService();