let NameInput = document.getElementById("NameInput");
let EmailInput = document.getElementById("EmailInput");
let quantity = document.getElementById("quantity");
let PeopleInput = document.getElementById("PeopleInput");
let DateInput = document.getElementById("DateInput");
let TimeInput = document.getElementById("TimeInput");
let TextInput = document.getElementById("TextInput");
let form = document.getElementById("userForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    NameInput.value !== "" &&
    EmailInput.value !== "" &&
    quantity.value !== "" &&
    PeopleInput.value !== "" &&
    DateInput.value !== "" &&
    TimeInput.value !== "" &&
    TextInput.value !== ""
  ) {
    let user = {
      name: NameInput.value,
      email: EmailInput.value,
      quantity: quantity.value,
      people: PeopleInput.value,
      date: DateInput.value,
      time: TimeInput.value,
      text: TextInput.value,
    };
    console.log(user);
  }
});
