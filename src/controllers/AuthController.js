const { validationResult, matchedData } = require("express-validator");
const User = require("../models/user");
const State = require("../models/state");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports = {

  signin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    const user = await user.findOne({email: data.email});

    if(!user) {
      
    }
  },


  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }

    const data = matchedData(req);

    const user = await User.findOne({
      email: data.email,
    });
    if (user) {
      res.json({
        error: {
          msg: "E-mail já existe",
        },
      });
      return;
    }

    if (mongoose.Types.ObjectId.isValid(data.state)) {
      const stateItem = await State.findById(data.state);
      if (!stateItem) {
        res.json({
          error: {
            state: {
              msg: "Estado não existe",
            },
          },
        });
        return;
      }
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payLoad = Date.now() + Math.random().toString();
    const token = await bcrypt.hash(payLoad, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state,
    });
    await newUser.save();

    res.json({
      token,
    });

    res.json({ success: true, data });
  },
};
