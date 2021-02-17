const groupSchema:any = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    creator_id: {
        type: String,
        required: true,
    },
    admin_ids: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    hashed_state: {
        type: String,
        required: true
    }
});

const GroupsModel:any = module.exports = mongoose.model('groups', groupSchema);
module.exports.get = (callback:object, limit:number):void => {
    GroupsModel.find(callback).limit(limit);
};