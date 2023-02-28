const { checkSchema } = require("express-validator");

module.exports = {
  signup: checkSchema({
    name: {
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
        errorMessage: "O nome deve ter pelo menos 2 caracteres",
      },
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "E-mail inválido"
    },
    password: {
        isLength: {
            options: {
                min: 3
            },
            errorMessage: "Sua senha deve ter pelo menos 3 caracteres"
        }
    },
    state: {
        notEmpty: true,
        errorMessage: "Estado não preenchido"
    }
  }),
  
  signin: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido"
  },
  password: {
      isLength: {
          options: {
              min: 3
          },
          errorMessage: "Sua senha deve ter pelo menos 3 caracteres"
      }
  }
  })
};
