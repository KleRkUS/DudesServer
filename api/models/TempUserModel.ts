const tempUserSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: {
        type: String,
        required: true,
        unique : true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Number,
        default: Date.now()
    },
    expires_in: {
        type: Number,
        default: 86400000
    },
    confirmation_token: {
        type: String,
        required: true
    }
});

const TempUserModel:any = module.exports = mongoose.model('temp_user', tempUserSchema);
module.exports.get = function (callback:object, limit:number) {
    TempUserModel.find(callback).limit(limit);
}