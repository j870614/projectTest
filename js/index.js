let postsData = [];

function getAllPosts(){
  axios.get(`posts`)
  .then(function (res) {
    postsData = res.data;
    render(postsData);

  })
  .catch(function (error) {
    console.log(error);
  })
}

const postsList = document.querySelector(".postsList");

function render(postsData){
  let template = ``;
  postsData.forEach(post =>{
    template += `
    <div class="col">
      <div class="card h-100" >
        <div class="card-body">
          <p class="text-end m-0 fs-5">
            <a  class="postBtn" data-id="${post.id} " role="button">延伸閱讀</a>
          </p>
          <h2 class="card-title fw-bold fs-3">${post.title}</h2>
          <p class="card-text">
            ${post.body}
          </p>
        </div>
      </div>
    </div>`;
  });

  postsList.innerHTML = template;

  const postBtns = document.querySelectorAll(".postBtn");
  postBtns.forEach(btn =>{
    btn.addEventListener("click", e=>{
      e.preventDefault();
      const id = Number(e.target.dataset.id);
      const index = postsData.findIndex(item => item.id === id);
      localStorage.setItem("targetPost", JSON.stringify(postsData[index]));
      location.href = "./post.html";
    })
  })
}

function init(){
  getAllPosts();
}

init();