import jsonwebtoken from 'jsonwebtoken';
const JWT_SECRET = 'MyVeryLongSeceetKeyCouldBeGeneratedBySomeGenerator';

const login = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const b64credentials = authHeader.slice(6);
    const credentials = atob(b64credentials);
    const [username, password] = credentials.split(':');

    if (password === 'default') {
      const jwt = jsonwebtoken.sign(
        {
          username: username,
          verified: true,
        },
        JWT_SECRET
      );

      res.status(200).json({
        ok: true,
        token: jwt,
      });
    } else {
      res.status(401).json({
        ok: false,
        message: 'Invalid credentials',
      });
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.slice(7);

    const payload = jsonwebtoken.verify(token, JWT_SECRET);

    res.status(200).json({
      ok: true,
      user: {
        username: payload.username,
        isVerified: payload.verified,
      },
    });
  } catch (err) {
    res.status(401).json({
      ok: false,
      message: 'Not authorized',
    });
  }
};

export { login, getUser };
