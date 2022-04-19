const express = require('express');
const { request } = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const Users = require('./model/users.js');
const Posts = require('./model/posts.js');
const bcrypt = require ('bcryptjs');
const connectDB = require('./database/database');
const { getUsers, getUserById, createUser, updateUser } = require('./controllers/userController');
const { getPosts, createPost, getPostsByUser, deletePost } = require('./controllers/postController');

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);

app.get('/posts', getPosts);
app.post('/posts', createPost);
app.delete('/posts/:id', deletePost);

app.get('/profile/:id', getPostsByUser);

/* function userExists(userToFind){
  return new Promise ((resolve, reject) =>{
      model.Users.find({email: userToFind}).then(
          function(results){
              if(results.length > 0){
                  console.log(results);
                  resolve (results[0].password);
              }else{
                  reject ("");
              }
          }
      );
  });
  
}; */

/*function reloadStudentData(response){
  model.Posts.find().then(function(postLists){
      response.render("postlist",{
          title: 'Class List',
          students: studentLists,
  
      });
  });
};

app.post('/register', function(request, response){
  let username = request.body.username;
  let password = request.body.password;
  let email = request.body.email;
  let hashPassword = bcrypt.hashSync(password);
  let userData = {
      username: username,
      password: password,
      hashPassword: hashPassword,
      email: email
  }
  //.then is for resolve
  userExists(username).then(result =>{
      //User already exist
      response.render('register',{
          title: 'Register',
          errorMessage: 'Username in use'
      });

  }).catch( error=> { //.catch for reject
      let newUser = new model.User(userData);
      newUser.save(function(error){
          if(error){
              response.render('register',{
                  title: 'Register',
                  errorMessage: 'Unable to save user'
              });
          }else{
              response.render('loginConfirmed',{
                  title: "Login successful",
                  username: username
              });
          }
      });
  });
  
  

});

app.post('/addAndUpdateStudent', function(request, response){
  console.log("Add student");
  let studentData={
      sid: request.body.sid,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      gpa: request.body.gpa
  };
  

  model.Student.find({sid: request.body.sid}).then(function(student){
      if(student.length >0){
          //There is an student with that sid
          model.Student.updateOne(
              {sid: request.body.sid},
              studentData,function(error, numAffected){
                  if (error||numAffected!=1){
                      console.error('Unable to update student:',error);
                      reloadStudentData(response);
                  }else{
                      reloadStudentData(response);
                  }
              });
      }else{
          //Create new student
          let newStudent = new model.Student(studentData);
          newStudent.save( function(error){
              if(error){
                  console.error('Unable to add student: ', error);
              } else{
                  console.log('New student was added successfully');
                  reloadStudentData(response);
              }
          });
      }
  });
});

app.get('/listStudent', function(request, response){
  reloadStudentData(response);
});  
  /*
  studentLists =[
      {sid:"1",firstName:"Ammar",lastName:"Hatiy"},
      {sid:"2",firstName:"Samuel",lastName:"Jones"},
  ];
  response.render("studentlist",{
      title: 'Class List',
      students: studentLists,
  });


app.get('/simple', function(req, res){
  res.render('simple',{
      title: "A sample for Pug",
      message: "This is a basic page",
      hiddenMessage: "This is hidden from default page"
  });
});

app.get('/login', function(req, res){
  
  res.render('login',{
      title: "Login page"
  });
});

app.post('/login', function(request, res){
  //Check the login info form database.
  console.log(request.body);
  let username = request.body.username;
  let password = request.body.password;
  userExists(username).then(result => {
      //Success
      console.log(`savedpassword: ${result}`);
      if (bcrypt.compareSync(result, password)){
          res.render('loginConfirmed',{
              title: "Login successful",
              username: username
          });
      }else{
          res.render('login',{
              title: "Login page",
              errorMessage: "Login failed please try agian!!"
          });
      }
     
  }).catch(error => {
      res.render('login',{
          title: "Login page",
          errorMessage: "Login failed please try agian!!"
      });
  });
  
  
});

 */



app.get('/', (req,res) => {
  console.log("jj");
  //res.send(users);
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//app.route('/users').get(getUsers);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => res.sendFile(path.resolve('../client', 'dist', 'index.html')));
