let userArray = [];
let reviewArray = [];
let isLoginInfoCorrect = false;

let userObject = function(ID, name, password) {
    this.ID = ID;
    this.name = name;
    this.password=password;
}

userArray.push(new userObject(0, "bob", "bobisgreat"));
userArray.push(new userObject(1, "sarah", "sarahisgreat"));
userArray.push(new userObject(2, "billy", "billyisgreat"));

let reviewObject = function(ID, userID, reviewType, title, score, text) {
    this.ID = ID;
    this.userID = userID;
    this.reviewType = reviewType;
    this.title = title;
    this.score = score;
    this.text = text;
}

reviewArray.push(new reviewObject(0, 0, "movie", "Titanic", 4, "Much very good"));
reviewArray.push(new reviewObject(1, 0, "tv", "Lost in Space", 3, "I like space"));
reviewArray.push(new reviewObject(2, 1, "movie", "Terminator", 1, "totemo kowai, kowai eiga ga kirai"));
reviewArray.push(new reviewObject(3, 1, "movie", "Titanic", 5, "ii kimochi dane"));
reviewArray.push(new reviewObject(4, 2, "tv", "Startrek", 1, "Not as good as next gen"));

//homepage functions

//adjusts visibility of login section
function displayLogin(){
    let x = "Your login info will be displayed here";
    document.getElementById("homeResponse").innerHTML = x;
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "block";
}

//adjusts visibility of register section
function displayRegister(){
    let x = "Your login info will be displayed here";
    document.getElementById("homeResponse").innerHTML = x;
    document.getElementById("register").style.display = "block";
    document.getElementById("login").style.display = "none";
}

//checks if log in credentials match existing user
function logMeIn() {
    let x = "output";
    let ID = document.getElementById("userID").value;
    let password = document.getElementById("userPassword").value;
    let count = 0;
    while (count < userArray.length) {
        if (ID == userArray[count].ID && password == userArray[count].password) {
            x = "Name: " + userArray[count].name + ", ID: " + userArray[count].ID;
            isLoginInfoCorrect = true;
            //updates leave review page if log in is correct
            youAreNotLoggedIn();
            break
        }
        x = "Login Information is Incorrect";
        //updates leave review page if log in is incorrect
        isLoginInfoCorrect = false;
        youAreNotLoggedIn();
        count++;
    }
    document.getElementById("homeResponse").innerHTML = x;
}

//pushes a new user object to the user array
function registerMe() {
    let x = "output";
    let ID = userArray.length;
    let password = document.getElementById("newUserPassword").value;
    let name = document.getElementById("newUserName").value;
    userArray.push(new userObject(ID, name, password));
    x = name + ", Your userID is: " + ID;
    document.getElementById("homeResponse").innerHTML = x;
}

//put in a location in html and an array, 
//and it will append array to unordered list
//at the specified locatioin in the html
function arrayToList(mrArray, divPart) {
    let ul = document.createElement('ul');
    document.getElementById(divPart).appendChild(ul);
    for(i = 0; i < mrArray.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = mrArray[i];
    }
}

//matches user ID to a user name
function matchUserToReview(IDin) {
    let x = "User Name Not Found";
    let length = userArray.length;
    //for whatever reason, chrome crashes when I try this with a for loop
    //I don't even fucking know
    let y = 0;
    while (y < length) {
        if (IDin == userArray[y].ID) {
            x = userArray[y].name;
        }
        y++;
    }    
    return x;
}

//displays reviews
function printReviews () {
    let x = "Reviews Listed Below: ";
    document.getElementById("displayReview").innerHTML = x;
    let findReviewArray = [];
    let reviewID = document.getElementById("findReviewID").value;
    let userID = document.getElementById("findReviewUserID").value;
    let reviewType = document.getElementById("findReviewTVOrMovie").value;
    let reviewScore = document.getElementById("findReviewScore").value;
    let title = document.getElementById("findReviewTitle").value;
    let userName = document.getElementById("findReviewUserName").value;


    for (i = 0; i < reviewArray.length; i++) {
        findReviewArray.push(reviewArray[i]);
    }
    //checks if reviewID input box is empty
    if (reviewID !== null && reviewID !== '') {
        //if not empty, incriment through database of reviews
        for (i = 0; i < findReviewArray.length; i++) {
            //if review does not have the desired ID, 
            //remove it from the list of reviews to be displayed
            if (reviewID != findReviewArray[i].ID) {
                findReviewArray.splice(i, 1);
                i--;
            }          
        }              
    }

    if (userID !== null && userID !== '') {
        for (i = 0; i < findReviewArray.length; i++) {
            if (userID != findReviewArray[i].userID) {
                findReviewArray.splice(i, 1);
                i--;
            }          
        } 
    }

    if (reviewType !== null && reviewType !== '') {
        for (i = 0; i < findReviewArray.length; i++) {
            if (reviewType != findReviewArray[i].reviewType) {
                findReviewArray.splice(i, 1);
                i--;
            }          
        } 
    }

    if (reviewScore !== null && reviewScore !== '') {
        for (i = 0; i < findReviewArray.length; i++) {
            if (reviewScore != findReviewArray[i].score) {
                findReviewArray.splice(i, 1);
                i--;
            }          
        } 
    }

    if (title !== null && title !== '') {
        for (i = 0; i < findReviewArray.length; i++) {
            if (title.toLowerCase() != findReviewArray[i].title.toLowerCase()) {
                findReviewArray.splice(i, 1);
                i--;
            }          
        } 
    }

    if (userName !== null && userName !== '') {
        for (i = 0; i < findReviewArray.length; i++) {
            if (userName.toLowerCase() != matchUserToReview(findReviewArray[i].userID).toLowerCase()) {
                findReviewArray.splice(i, 1);
                i--;
            }          
        } 
    }

    

    //pushes all elements intended for display into their own array
    //then appends them to an unordered list
    let displayArray =[];
    for (i = 0; i < findReviewArray.length; i++) {
        displayArray.push("Review ID: " + findReviewArray[i].ID);
        displayArray.push("Reviewer User ID: " + findReviewArray[i].userID);
        displayArray.push("Reviewer User Name: " + matchUserToReview(findReviewArray[i].userID));
        displayArray.push("Type of Media: " + findReviewArray[i].reviewType);
        displayArray.push("Title: " + findReviewArray[i].title);
        displayArray.push("Score: " + findReviewArray[i].score);
        displayArray.push("Comments: " + findReviewArray[i].text);
        displayArray.push("");  
    }  
    arrayToList(displayArray, "displayReview")
}

//leave review page functions

//changes visibility of leave review page depending if a user is logged in
function youAreNotLoggedIn() {
    let ID = document.getElementById("userID").value;
    if (isLoginInfoCorrect) {
        document.getElementById("leaveReviewVisibility").style.display = "block";
        document.getElementById("AreLoggedIn").innerHTML = 
        "Welcome " + userArray[ID].name + ". What would you like to review today?";
    } else {
        document.getElementById("AreLoggedIn").style.display = "block";
        document.getElementById("leaveReviewVisibility").style.display = "none";
        document.getElementById("AreLoggedIn").innerHTML = "You are not logged in";
    }
}

//once a user has logged in, the leave review button will be displayed
//Once the button is pressed, a review with the user's current logged in ID
//will be pushed into the review array
function submitReview() {
    let userID = document.getElementById("userID").value;
    let ID = reviewArray.length;
    let type = document.getElementById("leaveReviewTVOrMovie").value;
    let score = document.getElementById("leaveReviewScore").value;
    let title = document.getElementById("leaveReviewTitle").value;
    let comments = document.getElementById("leaveReviewText").value;;
    reviewArray.push(new reviewObject(ID, userID, type, title, score, comments));
    document.getElementById("AreLoggedIn").innerHTML = "Your review has been uploaded. Review ID: " + ID;
}

document.addEventListener("DOMContentLoaded", youAreNotLoggedIn)

document.addEventListener("DOMContentLoaded", function () {
    //homepage buttons
    document.getElementById("toLogin").addEventListener("click", displayLogin);
    document.getElementById("toRegister").addEventListener("click", displayRegister);
    document.getElementById("logMeIn").addEventListener("click", logMeIn);
    document.getElementById("registerMe").addEventListener("click", registerMe);

    //view review button
    document.getElementById("findReview").addEventListener("click", printReviews);

    //leave review button
    document.getElementById("leaveReviewButton").addEventListener("click", submitReview);

});


