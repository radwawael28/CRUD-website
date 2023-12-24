var siteName = document.getElementById("name");
var siteUrl =document.getElementById("url");
var tableBody = document.getElementById("tableBody");
var searchInput = document.getElementById("searchInput");
var boxAlert = document.getElementById("boxAlert");
var btn = document.getElementById("btn");
infoContainer =[];
if(localStorage.getItem('bookmarks') != null){
    infoContainer = JSON.parse( localStorage.getItem('bookmarks'));
    displayInfo(infoContainer)
}
function submitInfo(){
    if(validateName() == true && validateUrl() == true){
    var bookmark={
        name : siteName.value,
        url : siteUrl.value
}
infoContainer.push(bookmark);
localStorage.setItem("bookmarks",JSON.stringify(infoContainer))
displayInfo(infoContainer);
clear();
}else{
    boxAlert.innerHTML = `<div class="box-info position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="box-conent bg-white p-4 rounded-2 shadow-lg">
    <header class="box-header w-100 d-flex justify-content-between align-items-center mb-4">
        <div class="circles d-flex">
        <span class="rounded-circle me-2"></span>
        <span class="rounded-circle me-2"></span>
        <span class="rounded-circle me-2"></span>
        </div>
        <button class="btn border-0" id="closeBtn" onclick="closeBtn()">
        <i class="fa-solid fa-xmark close fs-3"></i>
        </button>
    </header>
    <p class="m-0 pb-2">
        Site Name or Url is not valid, Please follow the rules below :
    </p>
    <ol class="rules list-unstyled m-0">
        <li>
        <i class="fa-regular fa-circle-right p-2"></i>Site name must
        contain at least 3 characters
        </li>
        <li>
    <i class="fa-regular fa-circle-right p-2"></i>Site URL must be a
    valid one
        </li>
    </ol>
    </div>
</div>`
}}
function clear(){
    siteName.value ="";
    siteUrl.value= "";
}

function displayInfo(infoContainer){
    var displayContent = ``;
    displayIndex = 0;
    for (var i=0; i < infoContainer.length ; i++){
        displayIndex = i+1;
        displayContent += `
        <tr>
        <td> ${displayIndex} </td>
        <td> ${infoContainer[i].name} </td>
        <td> <button class="btn btn-visit btn-sm pe-2" onclick="visitInfo(${i})" ><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td> <button class="btn btn-delete btn-sm pe-2" onclick="deleteInfo(${i})"><i class="fa-regular fa-trash-can pe-2"></i>Delete</button></td>
        </tr> `
    }
    tableBody.innerHTML = displayContent
}

function deleteInfo(displayIndex){
    infoContainer.splice(displayIndex,1);
    localStorage.setItem("bookmarks",JSON.stringify(infoContainer))
    displayInfo(infoContainer);

}
function visitInfo(i){
    url = infoContainer[i].url;
    if( url.indexOf("http") == 0 ) {
        window.open(url)
    }else{
        window.open('https://'+ url); }

}

function searchProduct(term){
    var matchedNames = [];
    for (var i=0; i<infoContainer.length ; i++)
    {
        if(infoContainer[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            matchedNames.push(infoContainer[i]);
        }
        
    }
    displayInfo(matchedNames);
}

function validateName(){
    var regex = /^\w{3,}(\s+\w+)*$/;
    if( regex.test(siteName.value) == true){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true;
        
    }else{
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        return false;
    }
}
function validateUrl(){
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if( regex.test(siteUrl.value) == true){
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        return true;
    }else{
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        return false;
    }
}
function closeBtn(){
    boxAlert.innerHTML = "";
}
