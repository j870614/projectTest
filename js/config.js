axios.defaults.baseURL = 'http://localhost:3000/';
const token =  `Bearer ${localStorage.getItem("token")}`;
axios.defaults.headers.common['Authorization'] = token;

const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");

const nav = document.querySelector("nav");

function renderNavBar(){
  nav.setAttribute("class", "navbar navbar-light bg-light")
  let navbar = `
  <div class="container">
    <a class="navbar-brand" href="./index.html">LOGO</a>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a class="nav-link text-secondary" href="./login.html">登入</a>
      </li>
      <li class="nav-item">
        <a type="button" class="btn btn-primary" href="./register.html">免費註冊</a>
      </li>
    </ul>
  </div>
  `;

  nav.innerHTML = navbar;

  const navUl = document.querySelector("ul");
  let navlist = ``;
  if(role === "admin"){
    navlist += `
    <li class="nav-item">
    <a class="nav-link text-secondary" href="./admin/desk.html">前往後台</a>
    </li>`;
  }

  if(isLogin()){
    navlist += `
    <li class="nav-item">
      <a class="nav-link text-secondary" href="./likedList.html">收藏列表</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-secondary" type="button">Hello</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-secondary" type="button" id="logout">登出</a>
    </li>`;
    navUl.innerHTML = navlist;
    const logoutBtn = document.querySelector("#logout");
    logoutBtn.addEventListener("click", ()=>{
      logout();
    })
    
  }
  
  

  
}

function logout(){
  localStorage.setItem("token","");
  localStorage.setItem("role","");
  localStorage.setItem("userId","");
  location.href = "./index.html";
}

function isLogin(){
  return userId ? true : false;
}

function allInit(){
  renderNavBar();
}

allInit();
