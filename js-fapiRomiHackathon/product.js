/* 
userItemsList
*/

function saveProduct() {
    console.log("saveProduct()");

    let sP_logedUserID=JSON.parse(localStorage.getItem("LSlogedUserID"));
    let sp_usersList=JSON.parse(localStorage.getItem("LSusersList"));
    let pId;
    (sp_usersList[sP_logedUserID-1].userItemsList).length != 0 ? ((sp_usersList[sP_logedUserID-1].userItemsList)).findLast((product) => pId = product.id) : pId = 0; 
    console.log(`             pId: ${pId}`);
    let sp_product={
        id     : pId+1,
        title  : document.getElementById("inputProductTitle").value,
        price  : document.getElementById("inputProductPrice").value,
        amount  : document.getElementById("inputProductAmount").value
    };
    if(sP_logedUserID!=""){
        if(validateProduct(sp_product,'notYetValidated')=='validated'){
            (sp_usersList[sP_logedUserID-1].userItemsList).push(sp_product);    // ok
            console.log(`             sp_usersList: ${JSON.stringify(sp_usersList)}`);
            localStorage.setItem("LSusersList",JSON.stringify(sp_usersList));
            fillTableData();
            document.getElementById("productForm").reset();
        }
    } else {
    console.log("             LSlogedUser not loaded.");
        location.replace("./fapiRomiHackathon.html");
    };
}

let updateId = 0; // list index

function updateTrigger(idIn){
    console.log("updateTrigger()");
    updateId = idIn-1;    // because taken value comes from add function, where it is array index
    console.log("             updateId: "+updateId);

    document.body.scrollTop = 0;    // autoscrolling up to update field
    document.documentElement.scrollTop = 0;

    updateStylingSwitch();   // updating buttons (ADD/UPDATE) visibility

    document.getElementById('inputProductTitle').value = findUpdatedItem().title;
    document.getElementById('inputProductPrice').value = findUpdatedItem().price;
    document.getElementById('inputProductAmount').value = findUpdatedItem().amount;
 }


 function updateStylingSwitch(){
    if (document.getElementById('buttonSave').style.display === 'block'){
        document.getElementById('buttonSave').style.display = 'none';   
        document.getElementById('buttonUpdate').style.display = 'block';  
    }
    else {
        document.getElementById('buttonSave').style.display = 'block';   
        document.getElementById('buttonUpdate').style.display = 'none';  
    }
}

function findUpdatedItem(){     // for use in updateTrigger()
    console.log("findUpdatedItem()");
    let findU_logedUserID=JSON.parse(localStorage.getItem("LSlogedUserID"));
    let findU_usersList=JSON.parse(localStorage.getItem("LSusersList"));
    console.log("             found item: "+JSON.stringify((findU_usersList[findU_logedUserID-1].userItemsList)[updateId]));
    return (findU_usersList[findU_logedUserID-1].userItemsList)[updateId];
}

function updateSubmit(){
    console.log("updateSubmit()");
    let uP_logedUserID=JSON.parse(localStorage.getItem("LSlogedUserID"));
    let uP_usersList=JSON.parse(localStorage.getItem("LSusersList"));
    console.log(`             id: ${updateId}`);
    let uP_product={
        id     : updateId+1,
        title  : document.getElementById("inputProductTitle").value,
        price  : document.getElementById("inputProductPrice").value,
        amount  : document.getElementById("inputProductAmount").value
    };
    console.log(`             uP_product: ${JSON.stringify(uP_product)}`);
    if(uP_logedUserID!=""){
        if(validateProduct(uP_product,'notYetValidated')=='validated'){
            uP_usersList[uP_logedUserID-1].userItemsList[updateId] =uP_product;    // ok
            console.log(`             uP_usersList: ${JSON.stringify(uP_usersList)}`);
            localStorage.setItem("LSusersList",JSON.stringify(uP_usersList));
            fillTableData();
            document.getElementById("productForm").reset();
            updateId=0;
            updateStylingSwitch();
        }
    } else {
    console.log("             LSlogedUser not loaded.");
        location.replace("./fapiRomiHackathon.html");
    }; 
}

function removeData(id){ // pomocná f-ce pro mazání položky
    let sP_logedUserID=JSON.parse(localStorage.getItem("LSlogedUserID"));
    let sp_usersList=JSON.parse(localStorage.getItem("LSusersList"));

    if(sP_logedUserID!=""){        
        let removeList = sp_usersList[sP_logedUserID-1].userItemsList;
        removeList = removeList.filter(function(value){ 
            return value.id != id; 
        });
        sp_usersList[sP_logedUserID-1].userItemsList=removeList;
        localStorage.setItem('LSusersList', JSON.stringify(sp_usersList))
}  else alert("Please login first.");
    fillTableData();
}

function getTotalPriceCZ(amountIn,priceIn){
    return (
        (amountIn*priceIn)+((amountIn*priceIn)/100)*21
    )
}

function getTotalPriceEUR(totalPriceCz){
    console.log("getTotalPriceEUR()");
    let gotRate = parseFloat(localStorage.getItem('ls_rate'));    
    console.log(`             gotRate: ${gotRate}`);
    return (totalPriceCz/gotRate).toFixed(2);
}

function fillTableData () {
    //console.log(`fillTableData()`);
    let sP_logedUserID=JSON.parse(localStorage.getItem("LSlogedUserID"));
    let sp_usersList=JSON.parse(localStorage.getItem("LSusersList"));

    if (sP_logedUserID){
        document.getElementById('tabledata').innerHTML = "";
        (sp_usersList[sP_logedUserID-1].userItemsList).forEach(function (value, i){ 
            document.getElementById('tabledata').innerHTML += `
                <tr id="row${i+1}">
                    <td class="text-center">${i+1}</td>
                    <td class="text-center">${value.title}</td>
                    <td class="text-center">${value.price}</td>
                    <td class="text-center">${value.amount}</td>
                    <td class="text-center">${getTotalPriceCZ(value.amount,value.price)}</td>
                    <td class="text-center">${getTotalPriceEUR(getTotalPriceCZ(value.amount,value.price))}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-warning" onclick="updateTrigger(${value.id})">
                            UPDATE
                        </button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
                            DELETE
                        </button>
                    </td>
                </tr>
            `
        });
    }
    else console.log('fillTableData() - logedUser not loaded or no items to display.')
};

function validateProduct(productIn,validated) {
    if (productIn.title==='' && productIn.price!='' && productIn.amount===''){
        alert ("Please check if you filled in title, price and amount. They cant be empty.")
    }
    else {
        if (isNaN(parseFloat(productIn.price)/2) || isNaN(parseFloat(productIn.amount)/2)){
            alert ("Please check if filled price and amount are numbers. They have to be.");
        }
        else {
            validated='validated';
            return validated;
        }
    }
}