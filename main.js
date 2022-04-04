//--------------------------------------------------------
//VARIABLES
//Draglist
let draggeableEle = document.querySelectorAll(".dragList");
let posX, xOffset, startingPoint, xScrollOffset ;
//Blocks display
let mainBlocks = document.querySelector('#Main');
let productsBlock = document.querySelector('.productsBlock');
let selectionsBlock = document.querySelector('.selectionsBlock');
//Product display
let cliquableCategories = Array.from(document.querySelectorAll('.category'));
let cliquableSubCategories = Array.from(document.querySelectorAll('.subCategory'));
let productDisplayBtn = document.getElementById('displayProductsBtn');
let removeSelectionBtns = document.querySelectorAll('.removeSelection');
let categoryIndex, subCategoryIndex, sameSubCategoryList;
let products = document.querySelectorAll('.product');
let categorySelected = Boolean(false) ;
let subCategorySelected = Boolean(false) ;
let SearchInput = document.getElementById('SearchInput');
let filteredList = document.getElementById('FilteredList');
let clearSearch = document.querySelector('.clearSearch');
//Modal
let minusBtn = document.getElementById('minusBtn');
let plusBtn = document.getElementById('plusBtn');
let modalQuantity = document.getElementById('Quantity');
let modalSubTotal = document.getElementById('modalSubTotal');
let modalProductImg = document.getElementById('modaleImg');
let modalProductName = document.getElementById('modalProductName');
let modalProductPrice = document.getElementById('modalProductPrice');
let modalContainer = document.getElementById('modalContainer');
let modalCancel = document.querySelector('.cancel');
let modalAdd = document.querySelector('.add');
let totalValue = document.getElementById('TotalValue');
//Selection
let alreadySelected = Boolean(false) ;
//ScreenLock
let pwdIsWrong = Boolean(false);
let ScreenLockInterface = document.getElementById('ScreenLock');
let lockInputField = document.getElementById('lockInputField');
let UnlockScreenBtn = document.getElementById('UnlockScreenBtn');
let lockInputForm = document.getElementById('lockInput');
//--------------------------------------------------------
//DISPLAY AND HIDE PRODUCTS BLOCK
productDisplayBtn.addEventListener('click', ()=>{
    (filteredList.innerHTML!=='')?clearSearch.classList.remove('d-none'):'';
    let tableRows = document.querySelectorAll('#Selection tr');
    productsBlock.classList.toggle('productsBlockNewWidth');
    selectionsBlock.classList.toggle('selectionsBlockNewWidth');
    let cells = document.querySelectorAll('.toHide');
    if(productsBlock.classList.contains('productsBlockNewWidth')){
        cells.forEach(cell=>{
            cell.style.display= 'none';
        })
        tableRows.forEach(row=>{
            row.style.gridTemplateColumns= "50% 50%";
        });
        productDisplayBtn.style.backgroundColor = "#b30068";
    }
    else{
        (filteredList.innerHTML!=='')?clearSearch.classList.add('d-none'):'';
        tableRows.forEach(row=>{
            row.style.gridTemplateColumns= "20% 1fr repeat(4,10%) auto";
        });
        cells.forEach(cell=>{
            cell.style.display= 'block';
        });
        productDisplayBtn.style.backgroundColor = "#940548";
    }
});

removeSelectionBtns.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
        e.target.parentElement.parentElement.remove();
    });
});
//--------------------------------------------------------
//DRAG CATEGORIES
draggeableEle.forEach(element => {
    element.addEventListener('mousedown', getScrollStart);
}); 

//--------------------------------------------------------
//SEARCH PRODUCT
// SearchInput.addEventListener('focusin',clearBlock);
SearchInput.addEventListener('input',filterResults);

//--------------------------------------------------------
//CATEGORY DISPLAY CLICK EVENT
cliquableCategories.forEach(category => {
    category.addEventListener('click', categoriesHandle);
});
cliquableSubCategories.forEach(subCategory => {
    subCategory.addEventListener('click', subCategoriesHandle);
});


//TIME AND DATE
setInterval(updateDateAndTime,1);

//--------------------------------------------------------
//MODALE
products.forEach(product=>{
    product.addEventListener('click',openModal);
})


minusBtn.addEventListener('click',()=>{
    if(parseInt(modalQuantity.innerText)>=2){
        modalQuantity.innerText = parseInt(modalQuantity.innerText)-1;
        updateSubTotal();
    }
})
plusBtn.addEventListener('click',()=>{
    modalQuantity.innerText = parseInt(modalQuantity.innerText)+1;
    updateSubTotal();
})


modalCancel.addEventListener('click',()=>{
    modalContainer.style.display = "none";
});
modalAdd.addEventListener('click',()=>{
    modalContainer.style.display = "none";
    if(alreadySelected){
        updateSelectionLine();
    }
    else{
        addNewLine();
    }
    updateTotal();
});

lockInputForm.addEventListener("submit", (e)=>{
    e.preventDefault();
  });