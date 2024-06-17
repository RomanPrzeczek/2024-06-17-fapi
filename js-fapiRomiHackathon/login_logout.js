function login(){
    let givenName = document.getElementById('inputUserName').value;
    let givenPsswrd = document.getElementById('inputUserPswrd').value;
    let usersList = JSON.parse(localStorage.getItem('LSusersList')); 

    let logedUser = {
        userId: "",
        userName : "",
        userPswrd : ""
    };

    // control of id+pswrd field emptiness
    if (givenName =="" || givenPsswrd == "") alert("Loging credentials cant be empty. Please fill in id and password.")
    else {
        if (usersList) {
            usersList.forEach(function (value) {
                if(givenName==value.userName){
                    if(givenPsswrd==value.userPswrd){
                        logedUser = {
                            userId: value.userId,
                            userName : value.userName,
                            userPswrd : value.userPswrd
                        };
                        localStorage.setItem("LSlogedUserID",JSON.stringify(value.userId));
                        location.replace("./product.html"); // switch page after ok login
                    }
                }
            })
        } else {
            console.log("login() / usersList not loaded. usresList " + JSON.stringify(usersList)); // control of user list upload
            alert("Login credential either wrong or not existing. Please correct or register.");
            }
        // control of id+pswrd field uncorectness (after control of emptiness)
        if (logedUser.userId=="") alert("Login credential are wrong or you are not yet registered.");
    }
    document.getElementById("formLogin").reset(); // clearing of form
}

function logout() {
    localStorage.setItem("LSlogedUserID",JSON.stringify(""));
    location.replace("./fapiRomiHackathon.html");
}

function getLogedUser() { // supporting function for displaying loged user on product page
    let logedUserID = JSON.parse(localStorage.getItem("LSlogedUserID"));

    if (logedUserID) { // control of logeduser object loading
        let usersList = JSON.parse(localStorage.getItem('LSusersList')); 
        console.log(`loged user: ${JSON.stringify(usersList[logedUserID-1])}`);
        document.getElementById("logedUserElement").innerHTML=(usersList[logedUserID-1]).userName;
    }
    // error log if logeduser object not loaded
    else console.log("getLogedUser() error, loged username: ");
}