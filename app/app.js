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

    console.log(userObj)

    $("#fname").val("");
    $("#lname").val("");
    $("#DoB").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#addClasses").val("");

    addUser(userObj);
  });
}

function addUser(user) {
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  allUsers.push(user);

  localStorage.setItem("Classes", JSON.stringify(allUsers));
}

function connectToStorage() {
  if(localStorage) {
    console.log("Yes storage");
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