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
let SearchInput = document.getElementById('SearchInput');
let filteredList = document.getElementById('FilteredList');
let minusBtn = document.getElementById('minusBtn');
let plusBtn = document.getElementById('plusBtn');
let modalQuantity = document.getElementById('Quantity');
let modalSubTotal = document.getElementById('modalSubTotal');
let modalProductImg = document.getElementById('modaleImg');
let modalProductName = document.getElementById('modalProductName');
let modalProductPrice = document.getElementById('modalProductPrice');
let modalContainer = document.getElementById('modalContainer');
let modalCancel = document.querySelector('.cancel');

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
//SEARCH PRODUCT
SearchInput.addEventListener('focusin',clearBlock);
SearchInput.addEventListener('focusout',resetBlock);
SearchInput.addEventListener('keyup',filterResults);

function clearBlock(){
    clearFilteredList();
    hideAllCategories();
    hideAllSubCategories();
    hideAllProducts();
    console.log(this);
    this.style.backgroundColor = "#fff";
}

function clearFilteredList(){
    filteredList.innerHTML = "";
}

function hideAllCategories(){
    cliquableCategories.forEach(category=>{
        category.style.display = "none";
    });
}
function resetBlock(){
    clearFilteredList();
    hideAllProducts();
    hideAllSubCategories();
    cliquableCategories.forEach(category=>{
        category.classList.remove('selected');
        category.style.display = "flex";
    });
    this.style.backgroundColor = "#e4e4e4";
}

function filterResults(){
    filteredList.innerHTML = "";
    let productObjectsList = [];
    let mainList = allProductsList(productObjectsList);
    let newList = mainList.filter(obj =>{
        obj[1] = (obj[1]).toLowerCase();
        return obj[1].includes(this.value);
    });
    newList.forEach(element=>{
        let newEle = document.createElement('li');
        newEle.classList.add('mb-3','product');
        newEle.style.backgroundImage = `url(./ressources/${element[0]})`;
        newEle.style.backgroundSize = `cover`;
        newEle.style.position = `relative`;
        newEle.style.display = `flex`;
        newEle.innerHTML = `<div class="productDetails d-flex flex-column pe-2 align-items-end" >
        <p class="text-right pname">${element[1]}</p>
        <p class="text-right pprice">${element[2]}</p>
        </div>`
        filteredList.appendChild(newEle);
    });
    document.getElementById('ProductList').appendChild(filteredList);
    console.log(newList);
}

function allProductsList(list){
    products.forEach(product=>{
        // list.push({image : product.style.backgroundImage.slice(18,-2), pname : product.children[0].children[0].innerText, pprice : product.children[0].children[1].innerText});
        list.push([product.style.backgroundImage.slice(18,-2),product.children[0].children[0].innerText,product.children[0].children[1].innerText]);
    });
    return (list);
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
    console.log(categoryIndex);
    console.log(subCategoryIndex);
    products.forEach(product =>{
        product.style.display = 'none';
    });
    let listToBeDisplayed = document.querySelectorAll(`#ProductListC${categoryIndex+1}S${subCategoryIndex+1} li`);
    console.log(listToBeDisplayed);
    listToBeDisplayed.forEach(element => {
        element.style.display = 'flex';
    });
}

setInterval(updateDateAndTime,1);

function updateDateAndTime(){
    let todayDateAndTime = new Date();
    document.getElementById('Date').innerText = todayDateAndTime.toLocaleDateString("fr-FR");
    document.getElementById('Time').innerText = todayDateAndTime.toLocaleTimeString("fr-FR");
}


//--------------------------------------------------------
//MODALE

products.forEach(product=>{
    product.addEventListener('click',openModal);
})

function openModal(){
    modalContainer.style.zIndex = '50';
    modalContainer.style.display = 'flex';
    modalQuantity.innerText = 1;
    console.log(this);
    updateModalData(this);
}

function updateModalData(ele){
    console.log(ele.style.backgroundImage);
    modalProductImg.src = 'ressources/'+ele.style.backgroundImage.slice(18,-2);
    modalProductName.innerText = ele.children[0].children[0].innerText;
    modalProductPrice.innerText = ele.children[0].children[1].innerText;
    console.log('Prix1 ' + modalProductPrice.innerText );
    updateSubTotal();
}

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

function updateSubTotal(){
    let tempModalProductPrice = modalProductPrice.innerText.replace(',','.');
    modalSubTotal.innerText = parseFloat(modalQuantity.innerText*parseFloat(tempModalProductPrice).toFixed(2)).toFixed(2);
    modalSubTotal.innerText = modalSubTotal.innerText.replace('.', ',');
}

modalCancel.addEventListener('click',()=>{
    modalContainer.style.display = "none";
});