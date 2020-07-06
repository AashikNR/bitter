let express = require('express');
let router = express.Router();
let mysql = require('mysql');
const jwt = require('jsonwebtoken')
const util = require('util');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bitter"
});

const query = util.promisify(con.query).bind(con);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.get('/home',authenticateToken,async function (req, res) {
    try {
      let sql = 'SELECT `tweetid`, `content`, `userid` FROM `tweets` WHERE 1';
      const results = await query(sql);
      return res.status(200).json({err: false, msg: '', data: results});
    }catch (e) {
       console.log(e)
       return res.status(500).json({err: true, msg: 'Internal error happend'});
    }
})

router.post('/user',authenticateToken,async function (req, res) {
    let userid = req.body.userid;
    let sql = 'SELECT `username` FROM `login` WHERE `userid` ="'+userid+'"';
  try {
    const results = await query(sql);
    return res.status(200).json({err: false, msg: '', data: results});
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
})

router.post('/following',authenticateToken,async function (req, res) {
    let userid = req.body.userid;
    let sql = "SELECT `username` , `userid` FROM `login` WHERE userid IN (SELECT `followingid` FROM `following` WHERE userid ='"+userid+"')"
    try {
      const results = await query(sql);
      return res.status(200).json({err: false, msg: '', data: results});
    }catch (e) {
       console.log(e)
       return res.status(500).json({err: true, msg: 'Internal error happend'});
    }
})

router.post('/followers',authenticateToken,async function (req, res) {
    let userid = req.body.userid;
    let sql = "SELECT `username` , `userid` FROM `login` WHERE userid IN (SELECT `followersid` FROM `followers` WHERE userid = '"+userid+"')"
    try {
      const results = await query(sql);
      return res.status(200).json({err: false, msg: '', data: results});
    }catch (e) {
       console.log(e)
       return res.status(500).json({err: true, msg: 'Internal error happend'});
    }
})

router.post('/likes',authenticateToken,async function (req, res) {
    let tweetid = req.body.tweetid;
    let sql = 'SELECT `likeid` FROM `tweetlikes` WHERE `tweetid` ="'+tweetid+'"';
    try {
      const results = await query(sql);
      return res.status(200).json({err: false, msg: '', data: results});
    }catch (e) {
       console.log(e)
       return res.status(500).json({err: true, msg: 'Internal error happend'});
    }
})

router.post('/likecounts',authenticateToken,async function (req, res) {
  let tweetid = req.body.tweetid;
  let sql = "SELECT COUNT(likeid) as count FROM tweetlikes WHERE tweetid ='"+tweetid+"';"
  try {
    const results = await query(sql);
    return res.status(200).json({err: false, msg: '', data: results});
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
})

router.post('/tweetupload', authenticateToken,async function(req, res){
  console.log(req.body)
    let userid = req.body.userid;
    let content = req.body.content;
    let sql = "INSERT INTO `tweets`(`content` ,`userid`) VALUES ('"+ content +"','"+ userid +"')";
    try {
      const results = await query(sql);
      return res.status(200).json({err: false, msg: '', data: results});
    }catch (e) {
       console.log(e)
       return res.status(500).json({err: true, msg: 'Internal error happend'});
    }
});


router.post('/newfollow',authenticateToken,async function(req, res){
    let userid = req.body.userid;
    let followid = req.body.followid;
    // let sql1 = "INSERT INTO `following`(`userid` ,`followingid`) VALUES ('"+ userid +"','"+ followid +"')";
    let sql1 = "INSERT INTO following (userid,followingid) SELECT * FROM (SELECT '"+userid+"', '"+followid+"') AS tmp WHERE NOT EXISTS (SELECT userid , followingid  FROM following WHERE userid = '"+userid+"' AND followingid = '"+followid+"') LIMIT 1;"
    // let sql2 = "INSERT INTO `followers`(`userid` ,`followersid`) VALUES ('"+ followid +"','"+ userid +"')";
    let sql2 = "INSERT INTO followers (userid,followersid) SELECT * FROM (SELECT '"+followid+"', '"+userid+"') AS tmp WHERE NOT EXISTS (SELECT userid , followersid  FROM followers WHERE userid = '"+followid+"' AND followersid = '"+userid+"') LIMIT 1;"
    try {
      const results1 = await query(sql1);
      const results2 = await query(sql2);
      return res.status(200).json({err: false, msg: '', data1 : results1 ,  data2: results2});
    }catch (e) {
       console.log(e)
       return res.status(500).json({err: true, msg: 'Internal error happend'});
    }
});

router.post('/newlike',authenticateToken , async function(req, res){
    let userid = req.body.userid;
    let tweetid = req.body.tweetid;
    console.log(req.body)
    // let sql = "INSERT IGNORE INTO `tweetlikes`(`tweetid` ,`likeid`) VALUES ('"+ tweetid +"','"+ userid +"')";
    let sql = "INSERT INTO tweetlikes (tweetid,likeid) SELECT * FROM (SELECT '"+tweetid+"', '"+userid+"') AS tmp WHERE NOT EXISTS (SELECT tweetid , likeid   FROM tweetlikes WHERE tweetid = '"+tweetid+"' AND likeid = '"+userid+"') LIMIT 1;"
    try {
      const results = await query(sql);
      return res.status(200).json({err: false, msg: '', data: results});
    }catch (e) {
       console.log(e)
       return res.status(500).json({err: true, msg: 'Internal error happend'});
    }
});

router.post('/liked',authenticateToken , async function(req, res){
  let tweetid = req.body.tweetid;
  console.log(req.body)
  let sql = "SELECT `userid`, `username` FROM `login` NATURAL JOIN `tweetlikes` WHERE likeid = userid AND tweetid = '"+tweetid+"'"
  try {
    const results = await query(sql);
    return res.status(200).json({err: false, msg: '', data: results});
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
});

router.post('/profile',authenticateToken , async function(req, res){
  let userid = req.body.userid;
  console.log(req.body)
  let sql = "SELECT `userid`, `username`  FROM `login` WHERE userid ='"+userid+"'"
  let sql1 = "SELECT `tweetid`, `content`  FROM `tweets` WHERE userid ='"+userid+"'"
  try {
    const results = await query(sql);
    const results1 = await query(sql1);
    console.log(results1)
    return res.status(200).json({err: false, msg: '', data: results ,data1:  results1});
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
});

router.get('/user',authenticateToken , async function(req, res){
  let sql = "SELECT `userid`, `username`  FROM `login` WHERE 1"
 try {
    const results = await query(sql);
    console.log(results)
    return res.status(200).json({err: false, msg: '', data: results });
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
});

router.post('/usersearch',authenticateToken , async function(req, res){
  let username = req.body.username;
  console.log(username)
  let sql = "SELECT `userid`, `username`  FROM `login` WHERE username = '" + username + "'"
 try {
    const results = await query(sql);
    return res.status(200).json({err: false, msg: '', data: results });
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
});

router.post('/singletweet',authenticateToken , async function(req, res){
  let tweetid = req.body.tweetid;
  let sql = "SELECT `tweetid`, `content`, `userid` , `username` FROM `tweets` NATURAL  join login  WHERE tweetid = '" +tweetid+ "' and tweets.userid = login.userid"
 try {
    const results = await query(sql);
    return res.status(200).json({err: false, msg: '', data: results });
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
});

router.post('/mysingletweet',authenticateToken , async function(req, res){
  let tweetid = req.body.tweetid;
  // let sql = "SELECT `tweetid`, `content`, `userid` FROM `tweets` NATURAL  join login  WHERE tweets.userid = '"+userid+"'"
 let sql = "SELECT `tweetid`, `content`, `userid` FROM `tweets` WHERE tweetid = '"+tweetid+"'"
  try {
    const results = await query(sql);
    return res.status(200).json({err: false, msg: '', data: results });
  }catch (e) {
     console.log(e)
     return res.status(500).json({err: true, msg: 'Internal error happend'});
  }
});

module.exports = router;