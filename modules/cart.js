window.addEventListener('load', async loadData => {
  const myRequest = new Request('http://localhost:8000/product', {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
  });
  fetch(myRequest)
  .then(Response => Response.json())
  .then(data => (c = data))
  .then(function() {
    init();
  })
  .catch(error => error);
})

window.addEventListener('load', async loadData => {
  const myRequest = new Request('http://localhost:8000/varukorg', {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
  });
  fetch(myRequest)
  .then(Response => Response.json())
  .then(data => (c = data))
  .then(function() {
    raw();
  })
  .catch(error => error);
})
  
function raw() {
  for (let i = 0; i < c.length; i++) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", i);
    document.querySelector(".container").appendChild(createDiv);
    var createText = document.createElement("p");
    createText.innerHTML = c[i].Name;
    document.querySelector(".container").appendChild(createText);
    var createImg = document.createElement("img");
    createImg.src = c[i].img;
    document.querySelector(".container").appendChild(createImg);
    var createPrice = document.createElement("p");
    createPrice.innerHTML = c[i].Price;
    document.querySelector(".container").appendChild(createPrice);
    var createBtn = document.createElement("button");
    createBtn.setAttribute("id", "button" + i);
    createBtn.innerHTML = "Remove product from cart";
    document.querySelector(".container").appendChild(createBtn);
    
document.getElementById("button" + i).onclick = function deleteProduct() {
  fetch("http://localhost:8000/varukorg?id=" + c[i].id, {
    mode: "cors",
    method: "delete"
    });
    };
  }
}
  