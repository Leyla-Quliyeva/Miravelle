let form = document.querySelector("form");
let allInputs = document.querySelectorAll(".form-element");
let users = JSON.parse(localStorage.getItem("users")) || [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let bool = users.some(
    (item) =>
      item.name === allInputs[0].value || item.email === allInputs[1].value
  );
  if (!bool) {
    let userObj = {
      name: allInputs[0].value,
      email: allInputs[1].value,
      password: allInputs[2].value,
      id: Date.now(),
    };
    users.push(userObj);
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    window.alert("Name Or Email Already Used");
  }
  allInputs.forEach((item) => {
    item.value = "";
  });
  window.location.href = "/assets/html/login.html";
});


