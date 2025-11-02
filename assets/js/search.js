const searchIcon = document.querySelector('.search-icon');
const searchBox = document.querySelector('.search-box');

searchIcon.addEventListener('click', () => {
  searchBox.classList.toggle('active');
  if (searchBox.classList.contains('active')) {
    searchBox.focus();
  }
});
// searchBox.addEventListener("input", function (event) {
//   let filtered = users.filter((item) =>
//     item.username
//       .toLocaleLowerCase()
//       .includes(event.target.value.toLocaleLowerCase())
//   );
//   darwTable(filtered);
// });