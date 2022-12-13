const express = require('express');
const cors = require('cors')
var parseUrl = require('body-parser');
var mysql = require('mysql2');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 4000;

let encodeUrl = parseUrl.urlencoded({ extended: false });

var con = mysql.createConnection({
    host: "sql9.freesqldatabase.com",
    user: "sql9584350", // my username
    password: "ahNjT2udcp", // my password
    database: "sql9584350"
});

app.listen(PORT,()=>{
    console.log('message: server started')
});

app.use(cors())
app.use(express.json());
// app.use(sessions({
//   secret: 'T5xvXlHhNeUCfa6u2WFq',
//   saveUninitialized:true,
//   cookie: { maxAge: 1 * 60 * 60 * 1000 },
//   resave: false 
// }));

const io = new Server(server, {
  cors : {
      origin: "http://localhost:3000",
      methods : ["GET","POST"]
  }
});

io.on("connection", (socket) =>{
  console.log(`User connected: ${socket.id}`);

  socket.on("join_subject", (data) => {
      socket.join(data)
      console.log(`User with ID: ${socket.id} is in subject : ${data}`)
  })

  socket.on("send_message", (data) =>{
      socket.to(data.subject).emit("receive_message",data);
  });
  socket.on("disconnect", () => {
      console.log("User disconnected",socket.id);
  })
})



server.listen(3001, () =>{
  console.log("Server Running");
});

app.post('/register', encodeUrl, (req, res) => {
    var firstName = req.body.User_FirstName;
    var lastName = req.body.User_LastName;
    var email = req.body.User_Email;
    var password = encrypt(req.body.User_Password);
    var encrypted_password = password['iv']+"/"+password['content']
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO users (email, firstname, lastname, password) VALUES ('${email}', '${firstName}', '${lastName}', '${encrypted_password}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");

        });
      });
    
    
    
});

app.post('/login', encodeUrl, (req, res) => {
    var email = req.body.User_Email;
    var password = req.body.User_Password;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `SELECT password FROM users WHERE email = '${email}'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          if (result.length > 0) 
          {
            hash = {}
            hash['iv'] = result[0]['password'].split("/")[0]
            hash['content'] = result[0]['password'].split("/")[1]
            if(decrypt(hash) === password)
            {
              // req.session.userid=email;
              res.send('correct')
            }
            else
            {
              res.send('incorrect')
            }
          }
          else
          {
            res.send('no user exists')
          }
        });
      });
});

app.post('/dashboard', encodeUrl, (req, res) => {
  var user_email = req.body.user_email;
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT coursename FROM courses WHERE courseid in (SELECT courseid FROM enrollment WHERE userid = (SELECT userid FROM users WHERE email = '${user_email}') )`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });  
});

encrypt = function(text){
  const crypto = require('crypto')

  const algorithm = 'aes-256-ctr'
  const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  }
}

decrypt = function(hash){
  const crypto = require('crypto')

  const algorithm = 'aes-256-ctr'
  const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

  return decrpyted.toString()
}


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'yashwant74@gmail.com',
    pass: 'Tiger@12345678',
    clientId: '654501095340-u7gda07evqin2s8hj86v51jkia3hrh1o.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04kh3BDWTB1GxCgYIARAAGAQSNwF-L9IrSb_tymxyP0fWTdu2dOWOEJnziyYk_lSsXuQVMXrUFtacP1YF8HSLTy2mb8UEn91hEZ8'
  }
});

var generated_otp = String(Math.floor(1000 + Math.random() * 9000))

app.post('/sendotp', encodeUrl, (req, res) => {
  var mailOptions = {
    from: 'yashwant74@gmail.com',
    to: req.body.Email,
    subject: 'Your OTP is included in the mail',
    text: generated_otp
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send()
})

app.post('/confirmotp', encodeUrl, (req, res) => {
  var entered_otp = req.body.OTP;
  if(generated_otp == entered_otp){
    res.redirect(200 ,'/resetpassword')
  }
})

app.post('/resetpassword', encodeUrl, (req, res) => {
  var new_password = req.body.newpassword;
  var sql = `UPDATE users SET password = '${new_password}' WHERE email = "vicky@daiya"`;
  con.query(sql,function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.send()
    }
  });
})

app.get('/gethomepage', encodeUrl, (req, res) => {
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT coursename FROM courses WHERE courseid in (SELECT courseid FROM enrollment WHERE userid = 1)`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });  
});

app.get('/logout', encodeUrl, (req, res) => {
  // req.session.destroy();
});

app.post('/courseannouncements',encodeUrl, (req, res) => {
  var course = req.body.course
  var user_email = req.body.user
  console.log("here")
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT * FROM announcements, (SELECT role FROM enrollment WHERE courseid = (SELECT courseid FROM courses WHERE coursename = '${course}') AND userid = (SELECT userid FROM users WHERE email = '${user_email}')) as role WHERE Course = (SELECT courseid FROM courses WHERE coursename = '${course}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });  
});

app.post('/isteacher',encodeUrl, (req, res) => {
  var course = req.body.course
  var user_email = req.body.user
  console.log("here")
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT role FROM enrollment WHERE courseid = (SELECT courseid FROM courses WHERE coursename = '${course}') AND userid = (SELECT userid FROM users WHERE email = '${user_email}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result)
        res.send(result);
      });
    });  
});

app.get('/courses', encodeUrl, (req, res) => {
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT coursename FROM courses`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });  
});

app.get('/adminrequests', encodeUrl, (req, res) => {
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT * FROM admin_requests`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result)
        res.send(result);
      });
    });  
});

app.post('/enrollcourse',encodeUrl, (req, res) => {
  console.log('Enrolling....')
  var course = req.body.course
  var type = req.body.type
  var description = "Enroll for "+course
  if(type === "enroll")
  {
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = `INSERT INTO admin_requests (userid, description) VALUES ((SELECT userid FROM users WHERE email = '${session.userid}'), '${description}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.send()
      });
  });
  }

});

app.post('/currassignments',encodeUrl, (req, res) => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  var course = req.body.course
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT id, assignment_title, maxpoints, convert_tz(availabletilldate,'+00:00', @@GLOBAL.time_zone) as availabletilldate, convert_tz(duedate,'+00:00', @@GLOBAL.time_zone) as duedate, description FROM assignments WHERE courseid = (SELECT courseid FROM courses WHERE coursename = '${course}') AND duedate > NOW() AND releasedate <= NOW()`;
      // var sql = `SELECT convert_tz(availabletilldate,'+00:00', @@GLOBAL.time_zone) as availabletilldate FROM assignments`;
      console.log(sql)
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('why')
        console.log(result);
        res.send(result);
      });
    });  
});

app.post('/dueassignments',encodeUrl, (req, res) => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  var course = req.body.course
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT id, assignment_title, maxpoints, convert_tz(availabletilldate,'+00:00', @@GLOBAL.time_zone) as availabletilldate, convert_tz(duedate,'+00:00', @@GLOBAL.time_zone) as duedate FROM assignments WHERE courseid = (SELECT courseid FROM courses WHERE coursename = '${course}') AND availabletilldate < NOW() AND releasedate <= NOW()`;
      console.log(sql)
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    });  
});

app.get('/calendardata',encodeUrl, (req, res) => {
  // let date_ob = new Date();
  // let date = ("0" + date_ob.getDate()).slice(-2);
  // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // let year = date_ob.getFullYear();
  // let hours = date_ob.getHours();
  // let minutes = date_ob.getMinutes();
  // let seconds = date_ob.getSeconds();
  // datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  // var course = req.body.course
  con.connect(function(err) {
      if (err) throw err;
      // var sql = `SELECT id, maxpoints,  convert_tz(availabletilldate,'+00:00', @@GLOBAL.time_zone) as availabletilldate, convert_tz(duedate,'+00:00', @@GLOBAL.time_zone) as duedate FROM assignments WHERE courseid = (SELECT courseid FROM courses WHERE coursename = '${course}') AND availabletilldate < NOW()`;
      var sql = `SELECT assignments.id, assignments.assignment_title, courses.coursename, convert_tz(assignments.duedate,'+00:00', @@GLOBAL.time_zone) as duedate FROM assignments left join courses on assignments.courseid = courses.courseid`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    });  
});

app.post('/createassignment', encodeUrl, (req, res) => {
  const convertTime = timeStr => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    if (hours === '12') {
       hours = '00';
    }
    if (modifier === 'PM') {
       hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:${seconds}`;
 };
 const convertDate = dateStr => {
  let [month, day, year] = dateStr.split('/');
  if(parseInt(day)<10){
    day = '0'+day
  }
  if(parseInt(month)<10){
    month = '0'+month
  }
  return `${year}/${month}/${day}`;
};
  var assignment_name = req.body.assignment_name;
  var points = req.body.points;
  var due_date = req.body.due_date;
  var release_date = req.body.release_date;
  var available_till_date = req.body.available_till_date;
  var course = req.body.course
  var description = req.body.description;
  
  due_date = convertDate(due_date.split(/,| /)[0]) + " " + convertTime(due_date.split(/,| /)[2]+" "+due_date.split(/,| /)[3])
  release_date = convertDate(release_date.split(/,| /)[0]) + " " + convertTime(release_date.split(/,| /)[2]+" "+release_date.split(/,| /)[3])
  available_till_date = convertDate(available_till_date.split(/,| /)[0]) + " " + convertTime(available_till_date.split(/,| /)[2]+" "+available_till_date.split(/,| /)[3])
  
  if(req.body.isTextEntry == false){
    var isTextEntry = 0;
  }
  else{
    isTextEntry = 1;
  }
  if(req.body.isFileUpload == false){
    var isFileUpload = 0;
  }
  else{
    isFileUpload = 1;
  }
  con.connect(function(err) {
      if (err) throw err;
      var sql = `INSERT INTO assignments (assignment_title, maxpoints, duedate, releasedate, availabletilldate, courseid, description, isTextEntry, isFileUpload) VALUES ('${assignment_name}', '${points}', '${due_date}', '${release_date}', '${available_till_date}', (SELECT courseid FROM courses WHERE coursename = '${course}'), '${description}', '${isTextEntry}', '${isFileUpload}')`;
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Assignment created!");
        res.sendStatus(200)
      });
    });
  
  
  
});

app.post('/getassignmentinfo', encodeUrl, (req, res) => {
  var id = req.body.id
  con.connect(function(err) {
    if (err) throw err;
    var sql = `SELECT description, isTextEntry, isFileUpload FROM assignments WHERE id = '${id}'`;
    console.log(sql)
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result)
    });
  });
});


app.post('/postannouncement', encodeUrl, (req, res) => {
 const convertDate = dateStr => {
  let [month, day, year] = dateStr.split('/');
  if(parseInt(day)<10){
    day = '0'+day
  }
  if(parseInt(month)<10){
    month = '0'+month
  }
  return `${year}/${month}/${day}`;
};
  var title = req.body.title;
  var description = req.body.description;
  var post_date = req.body.postdate;
  var course = req.body.course;
  
  post_date = convertDate(post_date.split(/,| /)[0])

  con.connect(function(err) {
      if (err) throw err;
      var sql = `INSERT INTO announcements (DatePosted, subj, announcement, Course) VALUES ('${post_date}', '${title}', '${description}', (SELECT courseid FROM courses WHERE coursename = '${course}'))`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Announcement Posted!");
        res.sendStatus(200)
      });
    });
  
  
  
});

app.post('/editcoursehome', encodeUrl, (req, res) => {
   var title = req.body.title;
   var description = req.body.description.replaceAll('\'','\\\'');
   var course = req.body.course;
   con.connect(function(err) {
       if (err) throw err;
       var sql = `UPDATE courses SET home_title = '${title}', home_description = '${description}' WHERE coursename = '${course}';`;
       con.query(sql, function (err, result) {
         if (err) throw err;
         console.log("Homepage edited!");
         res.sendStatus(200)
       });
     });
   
   
   
 });

 app.post('/gethomepage', encodeUrl, (req, res) => {
  var course = req.body.course;
  var user_email = req.body.user
  con.connect(function(err) {
      if (err) throw err;
      var sql = `SELECT home_title, home_description,(SELECT role FROM enrollment WHERE courseid = (SELECT courseid FROM courses WHERE coursename = '${course}') AND userid = (SELECT userid FROM users WHERE email = '${user_email}')) as role FROM courses WHERE coursename = '${course}';`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result)
      });
    });
  
  
  
});
