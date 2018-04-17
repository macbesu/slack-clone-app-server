import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import { addErrorLoggingToSchema } from 'graphql-tools';

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id']),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },    
  );

  return [createToken, createRefreshToken];
  
};

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
  const user = await models.User.findOne({ where: { email }, raw: true });
  if (!user) {
    // user with provided email not found
    return {
      ok: false,
      errors: [{ path: 'email', message: 'User with this email not found!' }],
    };
    // throw new Error('Invalid login');
  }

  const valid = await compareSync(password, user.password);
  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password!' }],
    };
    // throw new Error('Invalid login!');
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

  return {
    ok: true,
    token, 
    refreshToken,
  };
};