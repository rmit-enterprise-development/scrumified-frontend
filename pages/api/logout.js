import cookie from 'cookie';

const logout = async (req, res) => {
  // if method POST is used for logging in
  if (req.method === 'POST') {
    // set cookie for successfully loggoed in user
    const logoutCookie = cookie.serialize('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    });
    res.setHeader('Set-Cookie', logoutCookie);

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
