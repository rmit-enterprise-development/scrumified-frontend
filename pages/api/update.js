import cookie from 'cookie';

const update = async (req, res) => {
  // if method POST is used for logging in
  if (req.method === 'POST') {
    // set cookie for successfully loggoed in user
    const updateCookie = cookie.serialize('auth', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24,
      sameSite: 'strict',
      path: '/',
    });
    res.setHeader('Set-Cookie', updateCookie);

    res.json({
      statusCode: 200,
      loggedIn: true,
      message: 'Update Confirmed - Token Updated',
    });
  } else {
    res.json({
      statusCode: 405,
      loggedIn: false,
      message: 'Only POST for Updating',
    });
  }
};

export default update;
