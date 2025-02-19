const cookiesConfig = require('../config/cookiesConfig');
const UserService = require('../services/Auth.services');
const AuthValidator = require('../utils/Auth.validator');
const formatResponse = require('../utils/formatResponse');
const bcrypt = require('bcrypt');
// const generateTokens = require('../utils/generateTokens')
// const cookiesConfig = require('../config/cookiesConfig')

class AuthController {
  // static async refreshTokens(req, res) {
  //     try {
  //       const { user } = res.locals;

  //       const { accessToken, refreshToken } = generateTokens({ user });

  //       res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
  //         formatResponse(200, 'Successfully regenerate tokens', {
  //           user,
  //           accessToken,
  //         })
  //       );
  //     } catch ({ message }) {
  //       console.error(message);
  //       res
  //         .status(500)
  //         .json(formatResponse(500, 'Internal server error', null, message));
  //     }
  //   }

  static async signUp(req, res) {
    const { username, email, password } = req.body;

    const { isValid, error } = AuthValidator.validateSignUp({
      email,
      username,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();
    try {
      const userFound = await UserService.getByEmail({ email });

      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'User with this email is already registered',
              null,
              'User with this email is already registered'
            )
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        username,
        password: hashedPassword,
        email: normalizedEmail,
      });

      if (!newUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Registration error',
              null,
              'Registration error'
            )
          );
      }

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      //   const { accessToken, refreshToken } = generateTokens({ user: plainUser});
      res
        .status(201)
        //   .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(201, 'Registration successful', {
            user: plainUser,
            //accessToken,
          })
        );
    } catch ({ message }) {
      console.log(message);
      return res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = await AuthValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }
    const normalizedEmail = email.toLowerCase();

    try {
      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        return res
          .status(400)
          .json(formatResponse(400, 'User not found', null, 'User not found'));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Password incorrect',
              null,
              'Password incorrect'
            )
          );
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      //   const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(200)
        //   .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(200, 'Login OK', {
            user: plainUser,
            // accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = AuthController;
