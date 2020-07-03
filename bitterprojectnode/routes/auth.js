let express = require('express');
let router = express.Router();
let mysql = require('mysql');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const util = require('util');
require('dotenv').config()

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bitter"
});

const query = util.promisify(con.query).bind(con);

router.post('/login', async (req, res) => {
  try {
      let name = req.body.username;
      const results = await query('SELECT `userid`,`password` FROM `login` WHERE `username` ="'+name+'"');
      if(await bcrypt.compare(req.body.password, results[0].password)){
        const userid = { userid : results[0].userid}
        const accessToken = jwt.sign(userid , process.env.ACCESS_TOKEN_SECRET)
        console.log("done")
        return res.status(200).json({err: false, msg: '', data: results.userid, accesstoken : accessToken, userid :  results[0].userid});
      } else {
        console.log("no match pass")
        return res.status(500).json({err: false, msg: 'Password dont match'});
      }
  } catch (e) {
      console.log("username dont match")
      return res.status(500).json({err: true, msg: 'Username dont match'});
  }
})

router.post('/signup', async (req, res) => {
  try {
    const salt =await bcrypt.genSalt()
    const hasedPassword = await bcrypt.hash(req.body.password, salt)
    let name = req.body.username;
    const results = await query("INSERT INTO `login`(`username` ,`password`) VALUES ('"+ name +"','"+ hasedPassword +"')");
    return res.status(200).json({err: false, msg: '', data: results});
  } catch (e) {
      console.log(e)
      return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
})

module.exports = router;