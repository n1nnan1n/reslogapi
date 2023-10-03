const User = require('../models/User');
const mongoose = require('mongoose');

async function deleteAccount(req, res) {
  try {
    const userId = req.session.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send('User not found');
    }

    const user = await User.findById(userId);

    // Call the `remove` method on the user document
    await User.deleteOne({ _id: userId });

    // Redirect to a page after account deletion (e.g., a thank you page)
    res.redirect('/index');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { deleteAccount };
