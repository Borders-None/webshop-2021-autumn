document.addEventListener('DOMContentLoaded', async () => {
  await web();
});

let currentPag = 1;
let shoesPerPage = 12;
let Allcategories = [];
let search = '';

// to dispaly every pag 10 item
function nextPage() {
  currentPag = currentPag + 1;

  web();
}

// to back to previos page
function prevPage() {
  currentPag = currentPag - 1;

  web();
}

// search by category

function searchValue() {
  search = 'women';
}
// function to fetch data from server
async function web() {
  const wait = document.getElementById('mainbox');
  const letterWait = document.createElement('h2');
  wait.classList.add('loading');
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
      categories: Allcategories,
      search: search,
    }),
  });

  // fetch data of the categoris
  const response1 = await fetch('http://localhost:3000/api/categories');
  const categories = await response1.json();
  console.log(categories);
  var categorey = categories[1];
  for (let i = 0; i < categorey.subCategories.length; i++) {
    displayCategory(categories[categorey.subCategories[i]], 0);
  }

  function displayCategory(category, level) {
    let string = '';
    for (let i = 0; i < level; i++) {
      string += '-';
      showGategorie();
    }

    console.log(string + category.name);
    for (let i = 0; i < category.subCategories.length; i++) {
      let currentSubcategoryId = category.subCategories[i];
      displayCategory(categories[currentSubcategoryId], level + 1);
    }

    function showGategorie() {
      const gate = document.getElementById('dropdown');
      const getGate = document.createElement('a');
      getGate.id = categorey.name;
      gate.appendChild(getGate);
      getGate.innerText = category.name;
    }
  }

  const data = await response.json();
  wait.removeChild(letterWait);
  console.log(data);
  products=data;
  getShoes(data);
}

// function to display image from arry
function createImgShoesElement(shoes) {
  let image = new Image();
  image.src = shoes.imageUrl;
  image.classList.add('iamge');
  return image;
}

function createPrice(shoes) {
  let priceamount = document.createElement('p');
  priceamount.innerText = '$' + shoes.price;
  priceamount.classList.add('title');
  return priceamount;
}

// function to display button to add to cart
let cart = [];
function getElementId(shoes) {
  let click = document.createElement('button');
  click.innerText = 'Add To Cart';
  click.classList.add('buttn');
  click.setAttribute('id', 'shoes' + shoes.id);
  click.addEventListener('click' , function(){
    cart.push(shoes.id);
    localStorage.setItem('userCart' , JSON.stringify(cart));
    let items = JSON.parse(localStorage.getItem('userCart'));
    let num = document.getElementById('cart-btn');
    num.innerText = items.length;
    click.setAttribute('disabled' , 'disabled');
    getCartItems();
  });
  return click;
}

// function to view the datails of the shoes

function getCliked(shoes) {
  let clicked = document.createElement('button');
  clicked.innerText = 'View More';
  clicked.classList.add('buttn');
  clicked.setAttribute('id', 'shoes' + shoes.id);
  return clicked;
}

// function to display brand of the shoes
function createBrandElement(shoes) {
  let brand = document.createElement('h2');
  brand.innerText = shoes.brand;
  return brand;
}

// function to append the all childern

function createShoesRowElement(shoes) {
  let element = document.createElement('div');
  element.classList.add('shoesrow');

  let image = createImgShoesElement(shoes);
  element.appendChild(image);

  let brand = createBrandElement(shoes);
  element.appendChild(brand);

  /*let title = createTitle(shoes);
  element.appendChild(title);*/

  let price = createPrice(shoes);
  element.appendChild(price);

  let getMore = getCliked(shoes);
  element.appendChild(getMore);

  let gettheid = getElementId(shoes);
  element.appendChild(gettheid);
  return element;
}

// function to link to shoe details once we click on the view more button
function onClicked(event) {
  var clicked = event.target.id.substring(5);
  window.open(`./shoes-details.html?id=${clicked}`, '_self');
}

// loop of all the shoes
function getShoes(data) {
  for (let i = 0; i < data.result.length; i++) {
    let shoes = data.result[i];
    let row = createShoesRowElement(shoes);
    let box = document.getElementById('mainbox');
    box.appendChild(row);
  }
}

// visibliti of the pagination

function hiddeShow() {
  document.getElementById('pagination').style.visibility = 'visible';
  document.getElementById('slider-wrapper').style.visibility = 'visible';
}
setTimeout('hiddeShow()', 4000);

// add to cart 
