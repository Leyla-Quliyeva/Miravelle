//   let form = document.getElementById("commentForm");
//   let commentList = document.getElementById("commentList");
//   let submitBtn = document.getElementById("submitBtn");

//   let comments = JSON.parse(localStorage.getItem("comments")) || [];
//   let editIndex = null;

//   function displayComments() {
//     commentList.innerHTML = "";

//     comments.forEach((c, i) => {
//       commentList.innerHTML += `
//         <div class="p-3 mt-3" style="border:1px solid #ccc; border-radius:10px; position:relative;">
//           <h5>${c.name}</h5>
//           <p>${c.email}</p>
//           <p>${c.text}</p>

//           <button onclick="editComment(${i})"
//             style="position:absolute; top:10px; right:70px; background:#ffc107; border:none; padding:5px 10px; border-radius:6px;">
//             Edit
//           </button>

//           <button onclick="deleteComment(${i})"
//             style="position:absolute; top:10px; right:10px; background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:6px;">
//             Delete
//           </button>
//         </div>
//       `;
//     });
//   }

//   displayComments();

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     let name = author.value.trim();
//     let email = document.getElementById("email").value.trim();
//     let text = comment.value.trim();

//     if (!name || !email || !text) {
//       alert("All fields required!");
//       return;
//     }

//     if (editIndex === null) {
//       comments.push({ name, email, text });
//     } else {
//       comments[editIndex] = { name, email, text };
//       editIndex = null;
//       submitBtn.textContent = "SUBMIT";
//     }

//     localStorage.setItem("comments", JSON.stringify(comments));
//     displayComments();
//     form.reset();
//   });

//   function deleteComment(index) {
//     comments.splice(index, 1);
//     localStorage.setItem("comments", JSON.stringify(comments));
//     displayComments();
//   }

//   function editComment(index) {
//     let c = comments[index];

//     author.value = c.name;
//     document.getElementById("email").value = c.email;
//     comment.value = c.text;

//     editIndex = index;
//     submitBtn.textContent = "UPDATE";
//   }

//   function displayComments() {
//   commentList.innerHTML = "";

//   comments.forEach((c, i) => {
//     let div = document.createElement("div");
//     div.classList.add("single-comment");
//     div.style.cssText = "border:1px solid #ccc; border-radius:10px; padding:10px; margin-top:10px; position:relative;";

//     div.innerHTML = `
//       <h5>${c.name}</h5>
//       <p>${c.email}</p>
//       <p>${c.text}</p>
//       <button onclick="editComment(${i})" style="position:absolute; top:10px; right:70px; background:#ffc107; border:none; padding:5px 10px; border-radius:6px;">Edit</button>
//       <button onclick="deleteComment(${i})" style="position:absolute; top:10px; right:10px; background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:6px;">Delete</button>
//     `;

//     commentList.appendChild(div); // append → yeni comment altda görünəcək
//   });

//   // commentList-in scrollunu ən aşağı gətir
//   commentList.scrollTop = commentList.scrollHeight;
// }
