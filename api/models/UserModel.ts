const userSchema:any = mongoose.Schema({
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
  refresh_token: {
    type: String,
    required: true
  },
  create_date: {
    type: Number,
    default: Date.now()
  },
  groups: {
    type: Array,
    default: []
  }
});

const UserModel:any = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback:object, limit:number) {
  UserModel.find(callback).limit(limit);
}