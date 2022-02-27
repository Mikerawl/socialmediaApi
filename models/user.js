const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
   
        username: {
        type: String,
        Unique: true,
        Required: true,
        Trim: true,
    }
      email {
        type: String,
        Required: true,
        Unique: true
        mattch: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "You must enter a valid email address",
      ],
        },
      Thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "thought",
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  

  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  

  const User = model("User", userSchema);
  
  
  module.exports = User; 