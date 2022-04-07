const router = require('express').Router();
const { Account, User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const accountData = await Account.create(req.body);

    const userData = await User.create({
      account_id: accountData.id,
    });

    req.session.save(() => {
      req.session.account_id = accountData.id;
      req.session.logged_in = true;
      req.session.user_id = userData.id
      res.status(200).json(accountData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log('test');
  try {
    const accountData = await Account.findOne({
      where: { email: req.body.email },
    });
    const validPassword = await accountData.checkPassword(req.body.password);

    if (!accountData || !validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.account_id = accountData.id;
      req.session.logged_in = true;

      res.json({ account: accountData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
