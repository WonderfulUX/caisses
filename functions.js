//--------------------------------------------------------
//CATEGORY SCROLL
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
function clearBlock(){
    clearFilteredList();
    hideAllCategories();
    hideAllSubCategories();
    hideAllProducts();
}

function clearFilteredList(){
    filteredList.innerHTML = "";
}

function hideAllCategories(){
    cliquableCategories.forEach(category=>{
        category.style.display = "none";
    });
}

function showCategories(){
    cliquableCategories.forEach(category=>{
        // console.log('displaying');
        category.classList.remove('selected');
        category.style.display = "flex";
    });
}

function resetBlock(){
    SearchInput.value ="";
    clearSearch.classList.add('d-none');
    clearFilteredList();
    hideAllProducts();
    hideAllSubCategories();
    showCategories();
}

function filterResults(){
    // console.log(this.value);
    if(this.value===""){
        clearSearch.classList.add('d-none');
        showCategories();
        hideAllProducts();
    }
    else{
        clearSearch.classList.remove('d-none');
        clearBlock();
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
            </div>`;
            newEle.addEventListener('click',openModal);
            filteredList.appendChild(newEle);
        });
        document.getElementById('ProductList').appendChild(filteredList);
    }
    // console.log(newList);
}

function allProductsList(list){
    products.forEach(product=>{
        // list.push({image : product.style.backgroundImage.slice(18,-2), pname : product.children[0].children[0].innerText, pprice : product.children[0].children[1].innerText});
        list.push([product.style.backgroundImage.slice(18,-2),product.children[0].children[0].innerText,product.children[0].children[1].innerText]);
    });
    return (list);
}

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
        //  console.log("CASE 6");
        this.classList.remove('selected');
        hideAllProducts();
        subCategorySelected = Boolean(false);
    }
    else if((subCategorySelected) && !(this.classList.contains('selected'))){
        // console.log("CASE 5");
        cliquableSubCategories.forEach(subCategory=>{
            subCategory.classList.remove('selected');
        });
        this.classList.add('selected');
        showRelatedProducts(this);
        subCategorySelected = Boolean(true);
    }
    else{
        // console.log("CASE 4");
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
    filteredList.innerHTML="";
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
    // console.log(categoryIndex);
    // console.log(subCategoryIndex);
    products.forEach(product =>{
        product.style.display = 'none';
    });
    let listToBeDisplayed = document.querySelectorAll(`#ProductListC${categoryIndex+1}S${subCategoryIndex+1} li`);
    // console.log(listToBeDisplayed);
    listToBeDisplayed.forEach(element => {
        element.style.display = 'flex';
        element.addEventListener('click',openModal);
    });
}
//--------------------------------------------------------
//MODALE
function openModal(e){
    // console.log("Opening");
    if(e.target.classList.contains('removeSelection')){
        return;
    }
    updateModalData(this);
    modalContainer.style.display = 'flex';
}

function checkSelectionQuantity(){
    // console.log('**********************');
    // console.log('Checking quantity from selection list');
    let selectionList = Array.from(document.querySelectorAll('.selectionLine .productName'));
    let dataCell = selectionList.filter(select =>{
        if(select.innerText===modalProductName.innerText){
            return select;
        }
    });
    if(dataCell.length >0){
        modalQuantity.innerText = dataCell[0].parentElement.children[3].innerText;
        // console.log(`Already selected`);
        alreadySelected = Boolean(true);
        modalAdd.innerText="Modifier";
    }
    else{
        // console.log('Selection List empty');
        // console.log(`New quantity : 1`);
        alreadySelected = Boolean(false);
        // console.log('ELSE 2');
        modalQuantity.innerText = 1;
        modalAdd.innerText="Ajouter";
    }
}

function updateModalData(ele){
    // console.log('updating Modal Data');
    if(ele.classList.contains('product')){
        modalProductImg.src = 'ressources/'+ele.style.backgroundImage.slice(18,-2);
        modalProductName.innerText = ele.children[0].children[0].innerText;
        modalProductPrice.innerText = ele.children[0].children[1].innerText;
        checkSelectionQuantity();
    }
    else{
        modalAdd.innerText="Modifier";
        // console.log(ele);
        // console.log('already Selected bool true');
        alreadySelected = Boolean(true);
        let eleToFind = Array.from(document.querySelectorAll('.pname')).filter(name=>{
            // console.log(name);
            if(name.innerText.toUpperCase() === ele.children[1].innerText){
                // console.log(ele.children[1].innerText);
                // console.log(name.innerText);
                return name;
            }
        });
        modalProductImg.src = 'ressources/'+eleToFind[0].parentElement.parentElement.style.backgroundImage.slice(18,-2);
        modalProductName.innerText = ele.children[1].innerText;
        modalQuantity.innerText = ele.children[3].innerText;
        modalProductPrice.innerText = ele.children[4].innerText;
    }
    updateSubTotal();
}

function checkModalQuantity(){
    if(modalQuantity.innerText === '1') {
        minusBtn.classList.add('inactive');
    }
    else if(minusBtn.classList.contains('inactive')){
        minusBtn.classList.remove('inactive');
    }
}

function updateSubTotal(){
    // console.log("Updating modal Subtotal");
    let tempModalProductPrice = modalProductPrice.innerText.replace(',','.');
    modalSubTotal.innerText = parseFloat(modalQuantity.innerText*parseFloat(tempModalProductPrice).toFixed(2)).toFixed(2);
    modalSubTotal.innerText = modalSubTotal.innerText.replace('.', ',');
}

//--------------------------------------------------------
//SELECTIONS

function updateSelectionLine(){
    // console.log("Updating selection Line");
    let lineToUpdate = Array.from(document.querySelectorAll('.selectionLine .productName'));
    lineToUpdate = lineToUpdate.filter(line=>{
        if(line.innerText === modalProductName.innerText){
            return line;
        }
    });
    lineToUpdate[0].parentElement.children[3].innerText = modalQuantity.innerText;
    lineToUpdate[0].parentElement.children[5].innerText = modalSubTotal.innerText;
}
function addNewLine(){
    // console.log("Adding new selection Line");
    let tableBody = document.querySelector('#tableContainer tbody');
    let newTableLine = document.createElement('tr');
    newTableLine.classList.add('selectionLine');
    newTableLine.style.gridTemplateColumns = '50% 50%';
    newTableLine.innerHTML = `<td class="productReference toHide">451235487</td>
    <td class="productName">${modalProductName.innerText}</td>
    <td class="productStock toHide">20</td>
    <td class="productQuantity">${modalQuantity.innerText}</td>
    <td class="productPrice toHide prices">${modalProductPrice.innerText}</td>
    <td class="productSubTotal toHide prices">${modalSubTotal.innerText}</td>
    <td class="toHide">
        <button class="removeSelection" onclick="removeLine(event)">
            <img src="./ressources/close.svg" alt="">
        </button>
    </td>`;
    newTableLine.addEventListener('click',openModal);
    tableBody.appendChild(newTableLine);
    cells = document.querySelectorAll('.toHide');
        cells.forEach(cell=>{
            cell.style.display= 'none';
        });
        checkLines();
}

function removeLine(e){
    e.stopPropagation();
    e.target.parentElement.parentElement.remove();
    updateTotal();
    checkLines();
};

function checkLines(){
    let tableBodyLength = document.querySelectorAll('.selectionLine').length;
    if(tableBodyLength=== 0){
        paymentBtn.classList.add('inactive');
    }
    else{
        paymentBtn.classList.remove('inactive');
    }
}

function updateTotal(){
    // console.log("Updating total");
    let prices = document.querySelectorAll('tbody .productSubTotal');
    // console.log(prices.length);
    if(prices.length===0){
        totalValue.innerText = '0,00';
        // console.log('IF');
    }
    else{ 
        // console.log('ELSE');
        prices = Array.from(prices).map(price=>{
            let temp = price.innerText.replace(',', '.');
            return temp;
        });
        // console.log(prices);
        let total = prices.reduce((val1,val2)=>
        parseFloat(parseFloat(val1)+parseFloat(val2)).toFixed(2),0);
        totalValue.innerText = total;
        totalValue.innerText = totalValue.innerText.replace('.',',');
    }
}

//--------------------------------------------------------
//TIME AND DATE
function updateDateAndTime(){
    let todayDateAndTime = new Date();
    let dateElements = document.querySelectorAll('.date');
    let timeElements = document.querySelectorAll('.time');
    dateElements.forEach(date=>{
        date.innerText = todayDateAndTime.toLocaleDateString("fr-FR");
    })
    timeElements.forEach(time=>{
        time.innerText = todayDateAndTime.toLocaleTimeString("fr-FR");
    })
}

//--------------------------------------------------------
//SCREEN LOCK
function lockScreen(){
    lockInputField.value = '';
    ScreenLockInterface.style.display = 'flex';
}

function unlockScreen(e){
    if(pwdIsWrong){
        screenLockErrorMessage.style.display = 'none';
        lockInputField.classList.remove('lockInputFieldErrorAnimate');
    }
    setTimeout(()=>{
        if(lockInputField.value == '1235'){
            ScreenLockInterface.style.display = 'none';
        }
        else{
            console.log('Wrong PIN');
            screenLockErrorMessage.style.display = 'inline-block';
            lockInputField.classList.add('lockInputFieldError');
            lockInputField.classList.add('lockInputFieldErrorAnimate');
            pwdIsWrong = Boolean(true);
    
        }
    },1);
}
function resetInputField(){
    lockInputField.classList.remove('lockInputFieldError');
    screenLockErrorMessage.style.display = 'none';
    lockInputField.value = '';
    UnlockScreenBtn.classList.remove('active');
    // UnlockScreenBtn.setAttribute('disabled', true);
}
function activateButton(){
    if(lockInputField.value.length === 4){
        UnlockScreenBtn.classList.add('active');
        // UnlockScreenBtn.setAttribute('disabled', false);
    }
    else{
        UnlockScreenBtn.classList.remove('active');
        if(lockInputField.classList.contains('lockInputFieldError')){
            lockInputField.classList.remove('lockInputFieldError');
            screenLockErrorMessage.style.display = 'none';
        }
        // UnlockScreenBtn.setAttribute('disabled', true);
    }
}
