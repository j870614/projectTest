axios.defaults.baseURL = 'https://json-server-projecttest.onrender.com/';
const token =  `Bearer ${localStorage.getItem("token")}`;
axios.defaults.headers.common['Authorization'] = token;

const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");

const nav = document.querySelector("nav");

function renderNavBar(){
  nav.setAttribute("class", "navbar navbar-dark bg-dark")
  let navbar = `
  <div class="container">
    <a class="navbar-brand" href="../admin/desk.html">這是主控台</a>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="../index.html">回到首頁</a>
        </li>
    </ul>
  </div>
  `;

  nav.innerHTML = navbar;
}

function isAdmin(){
  if(!(role === "admin")){
    alert("權限不足，將跳轉回首頁。");
    location.href = "../index.html";
  }
  
}

function allInit(){
  renderNavBar();
  isAdmin();
}

allInit();
