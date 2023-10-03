const bcrypt = require('bcrypt');
const User = require('../models/User');

async function editPassword(req, res) {
  try {
    const { newfname,newlname,newnname,newaddress} = req.body;
    const userId = req.session.userId;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }
    if (newfname) {
      user.fname = newfname;
    }

    if (newlname) {
      user.lname = newlname;
    }

    if (newnname) {
      user.nname = newnname;
    }

    if (newaddress) {
      user.address = newaddress;
    }
    await user.save();
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = { editPassword };