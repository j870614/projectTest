const form = document.querySelector("form");


let postObj = JSON.parse(localStorage.getItem("editPost"));



function render(postObj){
  let template = `
  <div class="col">
    <input type="text" class="form-control" id="title" placeholder="標題" value="${postObj.title}">
  </div>
  <div class="col">
    <input type="text" class="form-control" id="body" placeholder="景點內容" value="${postObj.body}">
  </div>
  <div class="col">
    <input type="text" class="form-control" id="pictureURL" placeholder="圖片網址" value="${postObj.pictureURL}">
  </div>
  <div class="col">
    <button type="button" class="btn btn-primary send">送出</button>
  </div>`;

  form.innerHTML = template;

  form.addEventListener("change", (e) => {
    postObj[e.target.id] = e.target.value;
  });

  const sendBtn = document.querySelector(".send");
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
      editPost(postObj);
    }
  });
}

function editPost(postObj){
  axios
    .put(`660/posts/${postObj.id}`, postObj)
    .then(function (res) {
      location.href = "./desk.html";
    })
    .catch(function (error) {
      console.log(error);
      alert("編輯景點失敗！");
    });
}

function init(){
  render(postObj);
}

init();