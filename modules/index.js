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
function init() {
  for (let i = 0; i < c.length; i++) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", i);
    document.querySelector(".container").appendChild(createDiv);
    var createItem = document.createElement("p");
    createItem.innerHTML = c[i].Name + "-" + " Price: " + c[i].Price;
    document.querySelector(".container").appendChild(createItem);
    var createImg = document.createElement("img");
    createImg.src = c[i].img;
    document.querySelector(".container").appendChild(createImg);
    var createBtn = document.createElement("button");
    createBtn.setAttribute("id", "button" + i);
    createBtn.innerHTML = "Add product to cart";
    document.querySelector(".container").appendChild(createBtn);
    document.getElementById("button" + i).onclick = function fetchitem() {
      fetch("http://localhost:8000/varukorg?id=" + c[i].id, {
        mode: "no-cors",
        method: "post"
      });
      };
  }
}
