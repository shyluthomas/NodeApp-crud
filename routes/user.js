const router = require('express').Router();
let bcrypt = require('bcryptjs');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(Users => res.json(Users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 12);
  const name = req.body.name;;

  const newUser = new User({
    email,
    password,
    name,
  });

  const oldUser = User.findOne({email: email});

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  newUser.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(User => res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(User => {
      User.email = req.body.email;
      User.password = bcrypt.hash(req.body.password);
      User.name = req.body.name;

      User.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req, res) => {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 12);

 User.findOne({email,password})
  .then((User) => {
    if(User) {
      res.status(200).json(User)
    } else {
      res.status(401);
    }
     
  }).catch(err => res.status(401).json('Unauthorised : '+err))

  
});

module.exports = router;