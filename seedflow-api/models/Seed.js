const { Schema, model } = require('mongoose');
const Order = require('../models/Order');

const ALL_SEASONS = [
    'early',
    'mid-early',
    'mid-ripe',
];

const ALL_SORTS = [
    'green',
];

const FILTERED_SEASONS = {
    'green': ['early', 'mid-early', 'mid-ripe'],
};

const SeedSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false, default: '' },
    image: { type: String, required: false },
    sort: { type: String, required: true, enum: ALL_SORTS },
    season: { type: String, required: true, enum: ALL_SEASONS },
    big_seeds: { type: Boolean, required: false },
    weight: { type: Number, required: false },
    count: { type: Number, required: false },
    action: { type: Boolean, required: false },
});

SeedSchema.pre('deleteOne', async function (next) {
    try {
        const orders = await Order.deleteMany({ products: [this._conditions._id] });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = {
    SeedSchema,
    SeedModel: model('Seed', SeedSchema),
    FILTERED_SEASONS,
};