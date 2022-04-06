document.addEventListener('DOMContentLoaded', async () => {
  await web();
});

async function web() {
  const wait = document.getElementById('mainbox');
  const letterWait = document.createElement('h2');
  wait.appendChild(letterWait);
  letterWait.innerText = 'Loading...';

  const response = await fetch('http://localhost:3000/api/shoes/');
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
  click.innerText = 'Add Cart';
  click.classList.add('buttn');
  click.setAttribute('id', 'shoes' + shoes.id);
  click.onclick = addToCart;
  return click;
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

  let gettheid = getElementId(shoes);
  element.appendChild(gettheid);
  return element;
}

function getShoes(data) {
  for (let i = 0; i < data.result.length; i++) {
    let shoes = data.result[i];
    let row = createShoesRowElement(shoes);
    let box = document.getElementById('mainbox');
    box.appendChild(row);
  }
}

function addToCart(data) {
  for (let i = 0; i < data.result.length; i++) {
    let = data.result[i];
  }
}
