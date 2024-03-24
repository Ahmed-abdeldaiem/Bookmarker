// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
//     'use strict'
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to

//     // Loop over them and prevent submission
//     form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }else{
//             form.classList.add('was-validated')
//         }
  
       
//       }, false)
   
//   })()


  
// var form = document.querySelector('.needs-validation');
var form = document.querySelector('form');
  // console.log(form);

  var siteInput=document.querySelector('#siteInput');
  // console.log(siteInput);
  var urlInput=document.querySelector('#urlInput');
  // console.log(urlInput);
var tableBody=document.querySelector('tbody');
// console.log(tableBody);

var submitBtn =document.querySelector('#submitBtn');
// console.log(submitBtn);
var updateBtn =document.querySelector('#updateBtn');
// console.log(submitBtn);

var updateIndex=0;



var urlLiist=[];

// check local storage first and show the site list in HTML
checkLocalStorageDataFirst();
function checkLocalStorageDataFirst(){

 var localData= JSON.parse(localStorage.getItem('urldata'));

if (localData) {
  console.log('data');
  
  urlLiist=localData;
  console.log(typeof(localData));
  console.log('local list',urlLiist,localData);
  addToHtml();
}



}






var modal =document.querySelector('#errorModal');
var grayLayer=document.querySelector('.gray-layer');
var closeModal=document.querySelector('#closeModal');
closeModal.addEventListener('click',()=>{
  modal.style.display='none';
  grayLayer.style.display='none';
})



submitBtn.addEventListener('click',(e)=>{
 
   e.preventDefault();
   if (checkNamevalidate(siteInput.value)&&checkUrlvalidate(urlInput.value)) {
    // submitBtn.removeAttribute('data-bs-toggle');
    // submitBtn.removeAttribute('data-bs-target');
   
    // modal.classList.remove='show';
    
   
   
  
      addSite(siteInput.value,urlInput.value);
      clearForm();
      urlInput.classList.remove('is-valid');
      urlInput.classList.remove('is-invalid');
      siteInput.classList.remove('is-valid');
      siteInput.classList.remove('is-invalid');
    
   
   }else{
    modal.style.display='block';
    grayLayer.style.display='block';
    // submitBtn.setAttribute('data-bs-toggle','modal');
    // submitBtn.setAttribute('data-bs-target','#errorModal');


   }
   
   

   
})




function addSite(nameInput,urlInput){
// console.log(name,url);
// add to list 
urlLiist.push({name:nameInput,url:urlInput});
console.log(urlLiist);

// addto local Storage

localStorage.setItem('urldata',JSON.stringify(urlLiist));
// localStorage.clear();

addToHtml();

}

function addToHtml(){
  tableBody.innerHTML=''
  // add to HTML
for (var i = 0; i < urlLiist.length; i++) {
  // console.log(urlLiist[i]);
  tableBody.innerHTML+=`<tr>
  <th scope="row">${i+1}</th>
  <td>${urlLiist[i].name}</td>
  <td><a class="btn btn-success" href="${urlLiist[i].url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
  <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  <td><button class="btn btn-warning" onclick="updateSite(${i})"><i class="fa-solid fa-pen"></i> Update</button></td>
  </tr>`;
}
}



// clear inputs values
function clearForm(){
  console.log('clear');
  // clear in html
  siteInput.value='';
  urlInput.value='';

}

// delete Site 

function deleteSite(index){
  // delete from list
  urlLiist.splice(index,1);
  //delete from local storge
  localStorage.setItem('urldata',JSON.stringify(urlLiist));
  // show again in html
  addToHtml();

}


//Update Site 
function updateSite(index){
console.log(urlLiist[index].name);
console.log(urlLiist[index].url);
  siteInput.value=`${urlLiist[index].name}`;
  
  urlInput.value=`${urlLiist[index].url}`;
  submitBtn.style.display='none';
  updateBtn.style.display='block';
  updateIndex=index;

}

function updateSiteData(nameInput,urlInput,index){

//update the list 
urlLiist.splice(index,1,{name:nameInput,url:urlInput});

 // addto local Storage

localStorage.setItem('urldata',JSON.stringify(urlLiist));
// localStorage.clear();

addToHtml(); 

submitBtn.style.display='block';
updateBtn.style.display='none';

}
updateBtn.addEventListener('click',(e)=>{
 
  e.preventDefault();
  if (checkNamevalidate(siteInput.value)&&checkUrlvalidate(urlInput.value)) {
   // submitBtn.removeAttribute('data-bs-toggle');
   // submitBtn.removeAttribute('data-bs-target');
  
   // modal.classList.remove='show';
   
  
  
 
   updateSiteData(siteInput.value,urlInput.value,updateIndex);
     clearForm();
     urlInput.classList.remove('is-valid');
     urlInput.classList.remove('is-invalid');
     siteInput.classList.remove('is-valid');
     siteInput.classList.remove('is-invalid');
   
  
  }else{
   modal.style.display='block';
   grayLayer.style.display='block';
   // submitBtn.setAttribute('data-bs-toggle','modal');
   // submitBtn.setAttribute('data-bs-target','#errorModal');


  }
  
  

  
})

//******************VALIDATION *************************/

// function checkvalidate(){



//   checkNamevalidate(siteInput.value);
//   checkUrlvalidate(urlInput.value);
// }


function checkNamevalidate(site_name){
  siteNamePattern=/^\w{3,}$/;
  if(siteNamePattern.test(site_name)){
    siteInput.classList.remove('is-invalid');
    siteInput.classList.add('is-valid');
    // console.log('match');
    return true
  }else{
    // console.log('not-match');
    siteInput.classList.remove('is-valid');
    siteInput.classList.add('is-invalid');
    return false
  }
}

function checkUrlvalidate(site_url){
  siteURLPattern=/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if(siteURLPattern.test(site_url)){
    urlInput.classList.remove('is-invalid');
    urlInput.classList.add('is-valid');
    return true
    // console.log('match');
  }else{
    // console.log('not-match');
    urlInput.classList.remove('is-valid');
    urlInput.classList.add('is-invalid');
    return false
  }
}



siteInput.addEventListener('input',()=>{
  checkNamevalidate(siteInput.value);
})
urlInput.addEventListener('input',()=>{
  checkUrlvalidate(urlInput.value);
})