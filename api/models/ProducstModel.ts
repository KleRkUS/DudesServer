const productSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: "Low"
    },
    user: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

const ProductsModel:any = module.exports = mongoose.model('products', productSchema);
module.exports.get = (callback:object, limit:number):void => {
    ProductsModel.find(callback).limit(limit);
};