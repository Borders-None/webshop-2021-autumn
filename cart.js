document.addEventListener('DOMContentLoaded' , async () =>{
   await web();
})

let products;

async function web(){
    const response = await fetch('http://localhost:3000/api/shoes/',{
        method : 'post',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(),
    })
    const data = await response.json();
    console.log(data);
    products = data.result;
    getCartItems();
}


function getCartItems(){
    let choseen_products = [];
    let items = JSON.parse(localStorage.getItem('userCart'));
    for(let i=0; i < items.length; i++){
        choseen_products.push(products.find((products)=> products.id == items[i]))
    }
    console.log(choseen_products);
    addCartItemsToDom(choseen_products);
}

function addCartItemsToDom(items){
    let total = 0;
    for(let i=0; i< items.length ; i++){
        let mainRow = document.getElementById('cart-');
        let frow = document.createElement('div');
        mainRow.appendChild(frow);
        mainRow.classList.add('mainrow');
        frow.classList.add('frow');
        
        let img = new Image();
        img.src = items[i].imageUrl;
        frow.appendChild(img);

        let brnShoe = document.createElement('h2');
        frow.appendChild(brnShoe);
        brnShoe.classList.add('brnshoe');
        brnShoe.innerText = items[i].brand;


        let rebtn = document.createElement('button')
        frow.appendChild(rebtn);
        rebtn.innerText = 'Remove';
        rebtn.classList.add('rebtn');


        let select = document.createElement('select');
        frow.appendChild(select);


        let prcshoes = document.createElement('h4');
        frow.appendChild(prcshoes);
        prcshoes.classList.add('prcshoes');
        prcshoes.innerText = items[i].price + '$';


        total += items[i].price;
    }
    let showTotal = document.getElementById('total');
    showTotal.innerText = 'TOTAL :' + total + '$';
   
}

function itsDone(){
    alert('Payment Completed Successfully');
}
