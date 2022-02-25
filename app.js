var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));


let serverUserArray = [];
let serverReviewArray = [];


let userObject = function(ID, name, password) {
    this.ID = ID;
    this.name = name;
    this.password=password;
}

serverUserArray.push(new userObject(0, "bob", "bobisgreat"));
serverUserArray.push(new userObject(1, "sarah", "sarahisgreat"));
serverUserArray.push(new userObject(2, "billy", "billyisgreat"));

let reviewObject = function(ID, userID, reviewType, title, score, text) {
    this.ID = ID;
    this.userID = userID;
    this.reviewType = reviewType;
    this.title = title;
    this.score = score;
    this.text = text;
}

serverReviewArray.push(new reviewObject(0, 0, "movie", "Titanic", 4, "Much very good"));
serverReviewArray.push(new reviewObject(1, 0, "tv", "Lost in Space", 3, "I like space"));
serverReviewArray.push(new reviewObject(2, 1, "movie", "Terminator", 1, "totemo kowai, kowai eiga ga kirai"));
serverReviewArray.push(new reviewObject(3, 1, "movie", "Titanic", 5, "ii kimochi dane"));
serverReviewArray.push(new reviewObject(4, 2, "tv", "Startrek", 1, "Not as good as next gen"));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* GET reviewList. */
app.get('/reviewList', function(req, res) {
    res.json(serverReviewArray);
});

/* GET userList. */
app.get('/userList', function(req, res) {
    res.json(serverUserArray);
});

/* POST to addMovie */
app.post('/addReview', function(req, res) {
    console.log(req.body);
    serverReviewArray.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
  });

  app.post('/addUser', function(req, res) {
    console.log(req.body);
    serverUserArray.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
  });


// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject ={
        status: "this is real bad",
        stack: "somebody called #$% somebody who called somebody <awful>"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: errorObject
    });
});



app.listen(3000);  // not setting port number in www.bin, simple to do here
console.log('3000 is the magic port');

module.exports = app;
