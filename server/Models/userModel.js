const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      id: {type: Number},
      name: {
        type: String,
      },
      username: String,
      email: String,
      address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
          lat: String,
          lng: String,
        },
      },
      phone: String,
      website: String,
      company: {
        name: String,
        catchPhrase: String,
        bs: String,
      },
    },
    {
      collection: "users",
    }
  );

  module.exports  = mongoose.model("User", UserSchema);