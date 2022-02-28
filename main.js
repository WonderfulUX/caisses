let draggeableEle = document.querySelectorAll(".dragList");
let cliquableCategories = document.querySelectorAll('.itemList li');
let cliquableProducts = document.querySelectorAll('.itemList li');
let productDisplayBtn = document.getElementById('displayProductsBtn');
let selectionBlock = document.getElementById('Selection');
let productBlock = document.querySelector('#Main #Produits');
let posX, xOffset, startingPoint, xScrollOffset ;
let productBlockDiplay = false;


//DISPLAY PRODUCTS
productDisplayBtn.addEventListener('click', ()=>{
    if(productBlockDiplay){
        productBlock.style.width = "0%";
        productBlock.style.opacity = "0";
        selectionBlock.style.width = "100%";
        productBlockDiplay = false;
    }
    else{
        productBlock.style.width = '70%';
        productBlock.style.opacity = "1";
        selectionBlock.style.width = "30%";
        productBlockDiplay = true;
    }
});


//CATEGORY SCROLL
draggeableEle.forEach(element => {
    element.addEventListener('mousedown', getScrollStart);
}); 

function getScrollStart(e){
    // console.log(this);
    // console.log(this.offsetLeft);
    startingPoint = e.clientX ;
    this.addEventListener('mousemove',scrollLeftRight);
    this.addEventListener('mouseup', cancelbehaviour);
}

function scrollLeftRight(ele){
    xScrollOffset = ele.clientX - startingPoint;
    // console.log(xScrollOffset);
    this.scrollLeft = -xScrollOffset;
}

function cancelbehaviour(){
    this.removeEventListener('mousemove',scrollLeftRight);
}

//SELECTION
cliquableCategories.forEach(category => {
    category.addEventListener('click', select);
});

function select(){
    let list = this.parentElement.querySelectorAll('li');
    if(this.classList.contains('selected')){
        this.classList.remove('selected');
    }
    else{
        list.forEach(li =>{
            li.classList.remove('selected');
        });
        this.classList.add('selected');
    }
}