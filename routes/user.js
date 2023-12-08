const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(Users => res.json(Users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log('hhhhhhh')
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.password;;

  const newUser = new User({
    email,
    password,
    name,
  });

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
      User.password = req.body.password;
      User.name = req.body.name;

      User.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

 User.findOne({email,password})
  .then((User) => {
      res.status(200).json('Login sucessfull')
  }).catch(err => res.status(401).json('Unauthorised : '+err))

  
});

module.exports = router;