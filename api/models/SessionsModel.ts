const sessionSchema:any = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  expires_in: {
    type: Number,
    required: true
  },
  created_at: {
    type: Number,
    default: Date.now()
  },
  updated_at: {
    type: Number,
    default: Date.now()
  },
  temporary: {
    type: Boolean,
    default: false
  }
});

const SessionsModel:any = module.exports = mongoose.model('session', sessionSchema);
module.exports.get = function (callback:object, limit:number) {
  SessionsModel.find(callback).limit(limit);
}