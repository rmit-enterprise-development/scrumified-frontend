import cookie from 'cookie';

const login = async (req, res) => {
  // if method POST is used for logging in
  if (req.method === 'POST') {
    // set cookie for successfully loggoed in user
    const loginCookie = cookie.serialize('auth', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60,
      sameSite: 'strict',
      path: '/',
    });
    res.setHeader('Set-Cookie', loginCookie);

    res.json({
      statusCode: 200,
      loggedIn: true,
      message: 'Login Authenticated - Token Saved',
    });
  } else {
    res.json({
      statusCode: 405,
      loggedIn: false,
      message: 'Only POST for Login',
    });
  }
};

export default login;
