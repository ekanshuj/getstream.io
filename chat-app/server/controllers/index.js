const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid')
const StreamChat = require('stream-chat').StreamChat;
const { connect } = require('getstream');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const API_ID = process.env.ID;

class AuthControllers {

  static sign_up = asyncHandler(async (req, res) => {
    const { fullName, username, number, password } = req.body;
    try {
      const client = connect(
        API_KEY,
        API_SECRET,
        API_ID
      );

      const userId = uuidv4();
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const token = client.createUserToken(userId);

      res.status(200).json({
        fullName,
        username,
        number,
        hashPassword,
        token,
        userId

      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  static sign_in = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
      const client = connect(
        API_KEY,
        API_SECRET,
        API_ID
      );
      const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

      const { users } = await serverClient.queryUsers({ name: username });
      if (!users.length) return res.status(401).json({ message: 'No User found' });

      const activePass = await bcrypt.compare(password, users[0].hashPassword);
      const token = client.createUserToken(users[0].id);

      if (users && activePass) {
        res.status(200).json({
          fullName: users[0].fullName,
          username: users[0].username,
          token,
          userId: users[0].id
        })
      }
      else {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      // console.log(error);
    }

  })

};



module.exports = AuthControllers;