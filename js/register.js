const form = document.querySelector("form");
const singUpBtn = document.querySelector(".singUp");

let signUpObj = {};
form.addEventListener("change", e =>{
  signUpObj[e.target.id] = e.target.value;
  console.log(signUpObj);
});

singUpBtn.addEventListener("click", () => {
  if(!Object.keys(signUpObj).length){
    alert("資料不得為空！");
  }else if(!signUpObj.email){
    alert("請輸入信箱！");
  }else if(!signUpObj.password){
    alert("請輸入密碼！");
  }
  signUpObj.role = "user";
  login(signUpObj);
});

function login(signUpObj){
  axios.post(`register`, signUpObj)
  .then(function (response) {
    location.href = "./login.html";
  })
  .catch(function (error) {
    console.log(error);
  });
}