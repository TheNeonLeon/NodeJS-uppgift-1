const cors = require('cors')
app.use(cors())
window.addEventListener('load', loadData => {
    const myRequest = new Request('http://localhost:8000/product', {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    });
    fetch(myRequest)
    .then(Response => Response.json())
    .then(data => {
        let html = '';
        data.forEach(element => {
            html += `
            <li>
                <img src="${element.name}">
                <br> ${element}
                <br> Capital: ${element}
                <br> Population: ${element}
            </li>
            `;
            console.log(data);
    })
    document.getElementById('list').innerHTML = html;
  })
})
