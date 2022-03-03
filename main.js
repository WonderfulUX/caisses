let draggeableEle = document.querySelectorAll(".dragList");
let cliquableCategories = document.querySelectorAll('.itemList li');
let cliquableProducts = document.querySelectorAll('.itemList li');
let productDisplayBtn = document.getElementById('displayProductsBtn');
let selectionBlock = document.getElementById('Selection');
let productBlock = document.querySelector('#Main');
let posX, xOffset, startingPoint, xScrollOffset ;
let productBlockDiplay = false;
let removeSelectionBtns = document.querySelectorAll('.removeSelection');
let tableRows = document.querySelectorAll('#Selection tr');


//DISPLAY PRODUCTS
productDisplayBtn.addEventListener('click', ()=>{
    productBlock.classList.toggle('newGrid');
    if(productBlock.classList.contains('newGrid')){

        cells = document.querySelectorAll('.toHide');
        cells.forEach(cell=>{
            cell.style.display= 'none';
        })
        tableRows.forEach(row=>{
            row.style.gridTemplateColumns= "50% 50%";
        });
    }
    else{
        tableRows.forEach(row=>{
            row.style.gridTemplateColumns= "20% 30% 10% 10% 15% 15% 40px";
        });
        cells.forEach(cell=>{
            cell.style.display= 'block';
        })
    }
});

removeSelectionBtns.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
        e.target.parentElement.parentElement.remove();
    });
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