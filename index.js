document.addEventListener('DOMContentLoaded', async () => {
  await web();
});

let currentPag = 1;

let shoesPerPage = 10;

function nextPage() {
  currentPag = currentPag + 1;
  /*if (currentPag * 10 > 1) {
    currentPag = currentPag - 1;
  }*/

  web();
}

function pageNumbered() {
  var pageNumberInput = document.getElementsByClassName('number').value;
  currentPag = pageNumberInput;
  web();
}
function otherPage() {
  currentPag = currentPag - 1;

  web();
}

/*function nextPage() {
  currentPag = currentPag + 1;
  web();
}*/

async function web() {
  const wait = document.getElementById('mainbox');
  const letterWait = document.createElement('h2');
  wait.appendChild(letterWait);
  letterWait.innerText = 'Loading...';

  const response = await fetch('http://localhost:3000/api/shoes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pageSize: shoesPerPage,
      pageNumber: currentPag,
    }),
  });
  const data = await response.json();
  wait.removeChild(letterWait);
  console.log(data);
  getShoes(data);
}

function createImgShoesElement(shoes) {
  let image = new Image();
  image.src = shoes.imageUrl;
  image.classList.add('iamge');
  return image;
}

function createTitle(shoes) {
  let titleshoes = document.createElement('p');
  titleshoes.classList.add('title');
  titleshoes.innerText = shoes.title;
  return titleshoes;
}

function createPrice(shoes) {
  let priceamount = document.createElement('p');
  priceamount.innerText = '$' + shoes.price;
  priceamount.classList.add('title');
  return priceamount;
}

function getElementId(shoes) {
  let click = document.createElement('button');
  click.innerText = 'Add To Cart';
  click.classList.add('buttn');
  click.setAttribute('id', 'shoes' + shoes.id);

  return click;
}

function getCliked(shoes) {
  let clicked = document.createElement('button');
  clicked.innerText = 'View More';
  clicked.classList.add('buttn');
  clicked.setAttribute('id', 'shoes' + shoes.id);
  clicked.onclick = onClicked;
  return clicked;
}

function createBrandElement(shoes) {
  let brand = document.createElement('p');
  brand.innerText = shoes.brand;
  return brand;
}

function createShoesRowElement(shoes) {
  let element = document.createElement('div');
  element.classList.add('shoesrow');

  let image = createImgShoesElement(shoes);
  element.appendChild(image);

  let title = createTitle(shoes);
  element.appendChild(title);

  let price = createPrice(shoes);
  element.appendChild(price);

  let brand = createBrandElement(shoes);
  element.appendChild(brand);

  let getMore = getCliked(shoes);
  element.appendChild(getMore);

  let gettheid = getElementId(shoes);
  element.appendChild(gettheid);
  return element;
}

function onClicked(event) {
  var clicked = event.target.id.substring(5);
  window.open(`./shoes-details.html?id=${clicked}`, '_self');
}

function getShoes(data) {
  for (let i = 0; i < data.result.length; i++) {
    let shoes = data.result[i];
    let row = createShoesRowElement(shoes);
    let box = document.getElementById('mainbox');
    box.appendChild(row);
  }
}
