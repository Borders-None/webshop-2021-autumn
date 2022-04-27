document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  shoeId = urlParams.get('id');
  await showDetails();
});
async function showDetails() {
  const wait = document.getElementById('shoebox');
  const letterWait = document.createElement('h2');
  wait.appendChild(letterWait);
  letterWait.innerText = 'Loading...';

  var url = 'http://localhost:3000/api/shoes/' + shoeId;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      wait.removeChild(letterWait);
      console.log(data);
      showShoeDetails(data);
    });
  function showShoeDetails(data) {
    var box = document.getElementById('titel');
    var brand = document.createElement('h1');
    brand.classList.add('second');
    box.appendChild(brand);
    brand.innerText = data.brand;

    var title = document.createElement('p');
    title.classList.add('second');
    box.appendChild(title);
    title.innerText = data.title;

    var pric = document.createElement('p');
    pric.classList.add('second');
    box.appendChild(pric);
    pric.innerText = '$' + data.price;

    var matria = document.createElement('p');
    matria.classList.add('second');
    box.appendChild(matria);
    matria.innerText = data.features;

    var add = document.createElement('button');
    box.appendChild(add);
    add.classList.add('buttn');
    add.innerText = 'Add To Cart';

    var boxs = document.getElementById('shoebox');
    var image = document.createElement('div');
    image = new Image(6);
    image.src = data.images;
    image.classList.add('picture');
    boxs.appendChild(image);
    image.innerText = data.images;
  }
}
