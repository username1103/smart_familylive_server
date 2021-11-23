const httpStatus = require('http-status');
const axios = require('axios');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config = require('../config/config');

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const requestKakaoToken = async (code) => {
  try {
    const result = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: config.kakao.restApiKey,
        redirect_uri: 'http://192.168.0.12:9850/v1/auth/kakao/login',
        code,
        client_secret: config.kakao.client_secret,
      },
    });

    return result.data;
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, err.data.error);
  }
};

const getKakaoUserData = async (accessToken) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        property_keys: ['kakao_account.birthday'],
      },
    });

    return data;
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, err.data.error);
  }
};
module.exports = {
  logout,
  refreshAuth,
  requestKakaoToken,
  getKakaoUserData,
};
