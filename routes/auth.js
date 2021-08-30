var express = require('express');
var router = express.Router();

let dataUsers = [
  {
    'username': 'wildan',
    'password': 'admin'
  },
  {
    'username': 'daffa',
    'password': 'admin'
  }
]

let msg;

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', msg })
});

router.post('/login', (req, res) => {
  dataUsers.map((item, index) => {
    if (item.username === req.body.username && item.password === req.body.password) {
      // res.json({
      //   status: '404',
      //   'msg': 'data berhasil di upload',
      //   data: {
      //     username: req.body.username,
      //     password: req.body.password
      //   }
      // })
      res.redirect('/game?isLogin=true')
    } else {
      res.render('login', {
        title: 'Login',
        msg: 'data yang anda masukkan salah'
      })
    }
  })
})

// CRUD USER

// get all user
router.get('/user', (req, res) => {
  res.json({
    msg: 'get all dataUser',
    data: dataUsers
  })
})

module.exports = router;
