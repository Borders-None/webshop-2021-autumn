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
  let cart = [];  
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

    var add = document.createElement('button');
    box.appendChild(add);
    add.classList.add('buttn');
    add.innerText = 'Add To Cart';
    add.setAttribute('id', 'shoes' + data.id);
    add.addEventListener('click', function () {
    cart.push(data.id);
    localStorage.setItem('userCart', JSON.stringify(cart));
    let items = JSON.parse(localStorage.getItem('userCart'));
    let num = document.getElementById('cart-btn');
    num.innerText = items.length;
    add.setAttribute('disabled', 'disabled');
    getCartItems();
  });

    var boxs = document.getElementById('shoebox');
    var image = document.createElement('div');
    image = new Image();
    image.src = data.images;
    image.setAttribute('id', 'pictuer');
    boxs.appendChild(image);
    image.innerText = data.images;

    var slider = document.getElementById('slider');
    var sliderDiv = document.createElement('div');
    sliderDiv = new Image();
    sliderDiv.src = data.images[0];
    sliderDiv.classList.add('sliderImg');
    sliderDiv.addEventListener('click', () => {
      selectedImg(data.images[0]);
    });
    slider.appendChild(sliderDiv);
    sliderDiv.innerText = data.images[0];

    var sliderOne = document.createElement('div');
    sliderOne = new Image();
    sliderOne.src = data.images[1];
    sliderOne.addEventListener('click', () => {
      selectedImg(data.images[1]);
    });
    sliderOne.classList.add('sliderImg');
    slider.appendChild(sliderOne);
    sliderOne.innerText = data.images[1];

    var sliderTwo = document.createElement('div');
    sliderTwo = new Image();
    sliderTwo.src = data.images[2];
    sliderTwo.addEventListener('click', () => {
      selectedImg(data.images[2]);
    });
    sliderTwo.classList.add('sliderImg');
    slider.appendChild(sliderTwo);
    sliderTwo.innerText = data.images[2];

    var sliderThree = document.createElement('div');
    sliderThree = new Image();
    sliderThree.src = data.images[3];
    sliderThree.addEventListener('click', () => {
      selectedImg(data.images[3]);
    });
    sliderThree.classList.add('sliderImg');
    slider.appendChild(sliderThree);
    sliderThree.innerText = data.images[3];

    var sliderFour = document.createElement('div');
    sliderFour = new Image();
    sliderFour.src = data.images[4];
    sliderFour.addEventListener('click', () => {
      selectedImg(data.images[4]);
    });
    sliderFour.classList.add('sliderImg');
    slider.appendChild(sliderFour);
    sliderFour.innerText = data.images[4];

    var sliderFive = document.createElement('div');
    sliderFive = new Image();
    sliderFive.src = data.images[5];
    sliderFive.addEventListener('click', () => {
      selectedImg(data.images[5]);
    });
    sliderFive.classList.add('sliderImg');
    slider.appendChild(sliderFive);
    sliderFive.innerText = data.images[5];

    var sliderSix = document.createElement('div');
    sliderSix = new Image();
    sliderSix.src = data.images[6];
    sliderSix.addEventListener('click', () => {
      selectedImg(data.images[6]);
    });
    sliderSix.classList.add('sliderImg');
    slider.appendChild(sliderSix);
    sliderSix.innerText = data.images[6];
  }

  // show details of the shoe and slide left right
  function selectedImg(image) {
    document.getElementById('pictuer').src = image;

    var arrowRight = document.getElementById('sliderright');
    var arrowLeft = document.getElementById('sliderleft');

    arrowLeft.addEventListener('click', function () {
      document.getElementById('slider').scrollLeft -= 190;
    });

    arrowRight.addEventListener('click', function () {
      document.getElementById('slider').scrollLeft += 190;
    });
  }
}
function hiddeShow() {
  document.getElementById('slider-wrapper').style.visibility = 'visible';
}
setTimeout('hiddeShow()', 3000);
