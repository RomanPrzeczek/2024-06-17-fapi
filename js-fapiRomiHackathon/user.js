function saveUser(){
    let usersList = JSON.parse(localStorage.getItem('LSusersList')); 
    let givenNewName = document.getElementById('inputNewUserName').value;
    var id; 

    if (usersList) {
        usersList.forEach(function (value, i) {
            if(value.userName==givenNewName){   // control of same name existence
                alert("Given name already exists. Please choose another one.");
                document.getElementById("formRegister").reset();   // clearing of form
            }
            else {
                newUser(id,usersList);
                document.getElementById("formRegister").reset();   // clearing of form
                location.replace("./fapiRomiHackathon.html") // switch page after ok registration
            }
        });
    } else {
        usersList=[]; // creating of usersList of not existing (1st user ever)
        newUser(id,usersList);
        location.replace("./fapiRomiHackathon.html") // switch page after ok registration
    }
}

function newUser(nUserId,nUsersList){ // supporting function of new user set up (parametres id and list)
    nUsersList.length != 0 ? nUsersList.findLast((item) => nUserId = item.userId) : nUserId = 0; 
    var user = {    
        userId          : nUserId + 1, 
        userName       : document.getElementById('inputNewUserName').value, 
        userPswrd       : document.getElementById('inputNewUserPswrd').value, 
        userItemsList   : []
    };
    nUsersList.push(user);  
    localStorage.setItem('LSusersList', JSON.stringify(nUsersList)); 
}