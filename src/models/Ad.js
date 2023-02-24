const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser: string,
    state: string,
    category: string,
    images: [Object],
    dateCreated: Date,
    title: string,
    price: Number,
    priceNegotiable: Boolean, 
    description: string,
    views: Number,
    status: string
})

const modelName = 'Ad';

if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}