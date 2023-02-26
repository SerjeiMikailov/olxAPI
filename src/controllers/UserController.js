const State = require('../models/state')

module.exports = {
  async getStates(req, res) {
    try {
      const states = await State.find({});
      res.json(states);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao buscar estados' });
    }
  },
    info: async (req, res) => {

    },
    editAction: async (req, res) => {

    }
}