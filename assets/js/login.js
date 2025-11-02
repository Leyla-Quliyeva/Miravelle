let form = document.querySelector("form");
let allInputs = document.querySelectorAll(".form-element");
let users = JSON.parse(localStorage.getItem("users")) || [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = allInputs[0].value;
  let password = allInputs[1].value;
  let user = users.find((u) => u.email === email);
  if (!user) {
    alert("İstifadəçi tapılmadı! Əvvəlcə qeydiyyatdan keçin.");
    window.location.href = "/assets/html/sign.html";
  } else if (user.password !== password) {
    alert(" Parol yanlışdır!");
  } else {
    // alert(" Uğurla daxil oldunuz!");
    window.location.href = "/project.html";
  }
});

