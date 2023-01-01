let likedListData = [];

function getLikedList(){
  axios.get(`600/likes?_expand=post`)
  .then(function (res) {
    console.log(res.data);
    likedListData = res.data;
    render(likedListData);
  })
  .catch(function (error) {
    console.log(error);
    likedList.innerHTML = `<h2 class="my-5">查無已收藏的景點 <a class="btn btn-outline-primary" href="./index.html" role="button">回首頁</a></h2>`;
  })
}

const likedList = document.querySelector(".likedList");

function render(likedListData){
  let template = ``;
  likedListData.forEach(item =>{
    template += `
    <div class="col">
      <div class="card h-100" >
        <div class="card-body">
          <p class="text-end m-0 fs-5">
            <button type="button" class="btn btn-secondary removeBtn" data-id="${item.id}">已收藏</button>
          </p>
          <h2 class="card-title fw-bold fs-3">${item.post.title}</h2>
          <p class="card-text">
            ${item.post.body}
          </p>
        </div>
      </div>
    </div>`;
  });

  likedList.innerHTML = template;

  const removeBtns = document.querySelectorAll(".removeBtn");
  removeBtns.forEach(btn =>{
    btn.addEventListener("click", e=>{
      console.log(e.target.dataset.id);
      removeLike(e.target.dataset.id);
    })
  })
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
  getLikedList();
}

init();