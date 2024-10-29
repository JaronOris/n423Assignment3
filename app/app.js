// const { fn } = require ("jquery");

function initListeners() {
  $("#submitStudentInfo").on("click", (e) => {
    e.preventDefault();
    let fn = $("#fname").val();
    let ln = $("#lname").val();
    let DoB = $("#DoB").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let cs = $("#addClasses").val();

    let newArrayClass = cs.split(",");
    let finalClassArray = [];

    let userObj = {
      fname : fn,
      lname: ln,
      DoB: DoB,
      phone: phone,
      email: email,
      classes: [],
    };

    $.each(newArrayClass, (idx, newClass) => {
      if (newClass != "") {
        let cl = {
          className: newClass.trim()
        };
        finalClassArray.push(cl);
      }
    });

    userObj.classes = finalClassArray;

    $("#fname").val("");
    $("#lname").val("");
    $("#DoB").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#addClasses").val("");

    addUser(userObj);
  });

  $("#getUsers").on("click", (e) => {
    getAllUsers();
  })
}

function addUser(user) {
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  allUsers.push(user);

  localStorage.setItem("Classes", JSON.stringify(allUsers));
}

function getAllUsers() {
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  $.each(allUsers, (idx, user) => {
    $("#userName").html(`Name: ${user.fname} ${user.lname}`)
    $("#userDoB").html(`Date of Birth: ${user.DoB}`)
    $("#userEmail").html(`Email: ${user.email}`)
    $("#userPhone").html(`Phone: ${user.phone}`)
    $("#userClasses").html(" ")
    $("#userClasses").html("Classes:")
      $.each(user.classes, (idx, cls) => {
        $("#userClasses").append(`<span>${cls.className}, </span>`);
      });
  });
}

function connectToStorage() {
  if(localStorage) {
    let classes = localStorage.getItem("Classes");

    if(classes){
      console.log("exist yes" , classes)
    }else{
      localStorage.setItem("Classes", "[]");
    }
  }else{
    console.log("No storage");
  }
}

$(document).ready(function () {
initListeners();
connectToStorage();
});