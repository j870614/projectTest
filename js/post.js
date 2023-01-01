const like = document.querySelector(".like");
const content = document.querySelector(".content");
const post = JSON.parse(localStorage.getItem("targetPost"));
const postId = post.id;

let liked = false;
let likeData = {};

function render(){
  if(isLogin()){
    
    like.innerHTML = `
    <p>${liked?"已收藏" : "未收藏"}</p>
    <button type="button" class="btn btn-outline-secondary" id="likeBtn">${liked?"取消收藏" : "加入收藏"}</button>`;

    
  }
  
  const objStr = JSON.stringify(post,null,4);
  content.textContent = objStr ;

  const likeBtn = document.querySelector("#likeBtn");
  likeBtn.addEventListener("click", () =>{
    
    liked ? removeLike(likeData.id) : addLike();
  })
}

function getLiked(){
  axios.get(`600/users/${userId}/likes?postId=${postId}`, token)
    .then((res) => {
      res.data.length ? liked =  true : liked =  false;
      likeData = res.data[0];
      render();
    }).catch((err) => {
      liked =  false;
      render();
      console.log(err);
    });
}

function addLike(){
  axios.post(`600/post/${postId}/likes`,
    {
      userId : userId
    }, token)
    .then((res) => {
      alert("收藏成功");
      init();
    }).catch((err) => {
      console.log(object);
      alert("收藏失敗");
    });
}

function removeLike(likeId){
  axios.delete(`600/likes/${likeId}`)
    .then((res) => {
      console.log(res);
      alert("取消收藏成功");
      init();
    }).catch((err) => {
      console.log(err);
      alert("取消收藏失敗");
    });
}

function init(){
  getLiked();
}

init();