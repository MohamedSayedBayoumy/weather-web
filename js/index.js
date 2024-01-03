// localStorage.clear();

var get = localStorage.getItem("users");

console.log("Get User " + get);

var userArray = [];

if (get == null) {
  console.log("No Data");
  var arrayString = JSON.stringify(userArray);
  localStorage.setItem("users", arrayString);
} else {
  console.log("Have Data");
}

var userObject = {};
var dataBase = [];
var response;

var emailRegex = /@.*\.com/;

function login() {
  if (
    emailRegex.test(document.getElementById("userName").value.toLowerCase())
  ) {
    userObject = {
      user: document.getElementById("userName").value.toLowerCase().trim(),
      password: document.getElementById("password").value.toLowerCase().trim(),
    };

    dataBase = JSON.parse(localStorage.getItem("users"));

    response = checkUser(userObject, true);

    console.log("response is ()=> " + typeof response);

    if (response == false) {
      document.getElementById("error").innerHTML =
        "User Name or Password not found";
    } else {
      window.location.href = "home.html";
    }
  } else {
    document.getElementById(
      "error"
    ).innerHTML = `Email is not valid. It should contain "@" and end with ".com".`;
  }
}

function register() {
  if (
    emailRegex.test(document.getElementById("userName").value.toLowerCase())
  ) {
    userObject = {
      user: document.getElementById("userName").value.toLowerCase().trim(),
      password: document.getElementById("password").value.toLowerCase().trim(),
      phone: document.getElementById("phone").value.toLowerCase().trim(),
    };

    if (get == null) {
      addNewUser(userObject);
    } else {
      dataBase = JSON.parse(localStorage.getItem("users"));

      response = checkUser(userObject, false);

      if (response == true) {
        document.getElementById("error").innerHTML = "User Name already exists";
      } else {
        addNewUser(userObject);
        window.location.href = "home.html";
      }
    }
  } else {
    document.getElementById(
      "error"
    ).innerHTML = `Email is not valid. It should contain "@" and end with ".com".`;
  }
}

function checkUser(userObj, isCheckLogin) {
  if (isCheckLogin == true) {
    return dataBase.some(function (obj) {
      return obj.user === userObj.user && obj.password === userObj.password;
    });
  } else {
    return dataBase.some(function (obj) {
      return obj.user === userObj.user;
    });
  }
}

function addNewUser(user) {
  console.log("User registration Done");

  dataBase.push(user);

  localStorage.setItem("users", JSON.stringify(dataBase));

  console.log("Local Storage" + localStorage.getItem("users"));
}

function logout() {
  window.location.href = "index.html";
}
