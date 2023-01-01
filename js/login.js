const form = document.querySelector("form");
const loginBtn = document.querySelector(".login");

let loginObj = {};
form.addEventListener("change", (e) => {
  loginObj[e.target.id] = e.target.value;
});

loginBtn.addEventListener("click", () => {
  if (!Object.keys(loginObj).length) {
    alert("資料不得為空！");
  } else if (!loginObj.email) {
    alert("請輸入信箱！");
  } else if (!loginObj.password) {
    alert("請輸入密碼！");
  }

  login(loginObj);
});

function login(loginObj) {
  axios
    .post(`login`, loginObj)
    .then(function (res) {
      const userInfo = res.data;
      localStorage.setItem("token", userInfo.accessToken);
      localStorage.setItem("userId", userInfo.user.id);
      localStorage.setItem("role", userInfo.user.role);
      userInfo.user.role === "admin"? location.href = "./admin/desk.html" : location.href = "./index.html";
    })
    .catch(function (error) {
      if(error){
        alert("登入失敗，請檢查帳密是否輸入錯誤。")
      }
    });
}
