let draggeableEle = document.querySelectorAll(".dragList");
let cliquableCategories = Array.from(document.querySelectorAll('.category'));
let cliquableSubCategories = Array.from(document.querySelectorAll('.subCategory'));
let productDisplayBtn = document.getElementById('displayProductsBtn');
let mainBlocks = document.querySelector('#Main');
let posX, xOffset, startingPoint, xScrollOffset ;
let removeSelectionBtns = document.querySelectorAll('.removeSelection');
let tableRows = document.querySelectorAll('#Selection tr');
let categoryIndex, subCategoryIndex, sameSubCategoryList;
let products = document.querySelectorAll('.product');
let categorySelected = Boolean(false) ;
let subCategorySelected = Boolean(false) ;

//--------------------------------------------------------
//DISPLAY AND HIDE PRODUCTS BLOCK
productDisplayBtn.addEventListener('click', ()=>{
    mainBlocks.classList.toggle('newGrid');
    if(mainBlocks.classList.contains('newGrid')){

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
            row.style.gridTemplateColumns= "20% 1fr repeat(4,10%) auto";
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

//--------------------------------------------------------
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


//--------------------------------------------------------
//CATEGORY DISPLAY CLICK EVENT
cliquableCategories.forEach(category => {
    category.addEventListener('click', categoriesHandle);
});
cliquableSubCategories.forEach(subCategory => {
    subCategory.addEventListener('click', subCategoriesHandle);
});

//CATEGORIES
function categoriesHandle(){
    if((categorySelected) && (this.classList.contains('selected'))){
        // console.log("CASE 3");
        this.classList.remove('selected');
        hideAllSubCategories();
        hideAllProducts();
        categorySelected = Boolean(false);
        subCategorySelected = Boolean(false);
    }
    else if((categorySelected) && !(this.classList.contains('selected'))){
        // console.log("CASE 2");
        cliquableCategories.forEach(category=>{
            category.classList.remove('selected');
        });
        this.classList.add('selected');
        hideAllProducts();
        resetAllSubCategories();
        showRelatedSubCategories(this);
        categorySelected = Boolean(true);
    }
    else{
        // console.log("CASE 1");
        this.classList.add('selected');
        resetAllSubCategories();
        showRelatedSubCategories(this);
        categorySelected = Boolean(true);
    }
}

//SUBCATEGORIES
function subCategoriesHandle(){
    if((subCategorySelected) && (this.classList.contains('selected'))){
         console.log("CASE 6");
        this.classList.remove('selected');
        hideAllProducts();
        subCategorySelected = Boolean(false);
    }
    else if((subCategorySelected) && !(this.classList.contains('selected'))){
        console.log("CASE 5");
        cliquableSubCategories.forEach(subCategory=>{
            subCategory.classList.remove('selected');
        });
        this.classList.add('selected');
        showRelatedProducts(this);
        subCategorySelected = Boolean(true);
    }
    else{
        console.log("CASE 4");
        this.classList.add('selected');
        showRelatedProducts(this);
        subCategorySelected = Boolean(true);
    }
}

function resetAllSubCategories(){
    cliquableSubCategories.forEach(subCategory=>{
        subCategory.classList.remove('selected');
    });
}

// //HIDE SUBS AND PRODUCTS
function hideAllSubCategories(){
    cliquableSubCategories.forEach(subCategory =>{
        subCategory.style.display = 'none';
        // console.log(subCategory);
    });
}
function hideAllProducts(){
    products.forEach(product =>{
        product.style.display = 'none';
    });
}
// //SHOW SUBS AND PRODUCTS
function showRelatedSubCategories(categoryButton){
    categoryIndex = cliquableCategories.indexOf(categoryButton);
    cliquableSubCategories.forEach(subCategory =>{
        subCategory.style.display = 'none';
    });
    let toBeDisplayed = document.querySelectorAll(`#Cat${categoryIndex+1}Subs li`);
    toBeDisplayed.forEach(element => {
        // console.log(element);
        element.style.display = 'flex';
    });
}
function showRelatedProducts(categoryButton){
    let parent = categoryButton.parentElement.id;
    let list = Array.from(document.querySelectorAll(`#${parent} li`));
    subCategoryIndex = list.indexOf(categoryButton);
    products.forEach(product =>{
        product.style.display = 'none';
    });
    let listToBeDisplayed = document.querySelectorAll(`#ProductListC${categoryIndex+1}S${subCategoryIndex+1} li`);
    listToBeDisplayed.forEach(element => {
        element.style.display = 'flex';
    });
}

setInterval(updateDateAndTime,500);

function updateDateAndTime(){
    let todayDateAndTime = new Date();
    document.getElementById('Date').innerText = todayDateAndTime.toLocaleDateString("fr-FR");
    document.getElementById('Time').innerText = todayDateAndTime.toLocaleTimeString("fr-FR");
    console.log('exe');
}