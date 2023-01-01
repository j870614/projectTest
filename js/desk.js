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

const postsList = document.querySelector("tbody");

function render(postsData){
  let template = ``;
  postsData.forEach(post =>{
    template += `
    <tr>
      <th width="5%" scope="row">${post.id}</th>
      <td width="15%">${post.title}</td>
      <td width="60%">${post.body}</td>
      <td width="10%">
        <button type="button" class="btn btn-outline-danger deleteBtn" data-id="${post.id}">刪除</button>
        <button type="button" class="btn btn-warning editBtn" data-id="${post.id}">編輯</button>
      </td>
    </tr>`;
  });

  postsList.innerHTML = template;

  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach( deleteBtn =>{
    deleteBtn.addEventListener("click", e =>{
      const id = e.target.dataset.id;
      removePost(id);
    })
  });

  const editBtns = document.querySelectorAll(".editBtn");
  editBtns.forEach( editBtn =>{
    editBtn.addEventListener("click", e =>{
      const id = Number(e.target.dataset.id);
      const index = postsData.findIndex( item => item.id === id);
      localStorage.setItem("editPost", JSON.stringify(postsData[index]));
      location.href = "./editPost.html";
    })
  });
  
}

function removePost(id){
  axios
    .delete(`660/posts/${id}`)
    .then(function (res) {
      init();
    })
    .catch(function (error) {
      console.log(error);
      alert("刪除景點失敗！");
    });
}

function init(){
  getAllPosts();
}

init();