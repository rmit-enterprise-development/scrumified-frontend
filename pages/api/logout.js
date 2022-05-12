import cookie from 'cookie';

const logout = async (req, res) => {
  // if method POST is used for logging out
  if (req.method === 'POST') {
    // set cookie for successfully logged out user
    const logoutCookie = cookie.serialize('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    });

    const clearJumpFrom = cookie.serialize('jump-from', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    });

    res.setHeader('Set-Cookie', [logoutCookie, clearJumpFrom]);

    res.json({
      statusCode: 200,
      loggedIn: true,
      message: 'Logout Confirmed - Token Cleared',
    });
  } else {
    res.json({
      statusCode: 405,
      loggedIn: false,
      message: 'Only POST for Logout',
    });
  }
};

export default logout;
