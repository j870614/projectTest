const form = document.querySelector("form");
const sendBtn = document.querySelector(".send");

let postObj = {};
form.addEventListener("change", (e) => {
  postObj[e.target.id] = e.target.value;
});

sendBtn.addEventListener("click", ()=>{
  if (!Object.keys(postObj).length) {
    alert("資料不得為空！");
  } else if (!postObj.title) {
    alert("請輸入標題！");
  } else if (!postObj.body) {
    alert("請輸入景點內容！");
  } else if (!postObj.pictureURL) {
    alert("請輸入圖片網址！");
  } else {
    postObj.userId = Number(userId);
    console.log(postObj);
    addPost(postObj);
  }
})

function addPost(postObj){
  axios
    .post(`660/posts`, postObj)
    .then(function (res) {
      location.href = "./desk.html";
    })
    .catch(function (error) {
      console.log(error);
      alert("新增景點失敗！");
    });
}