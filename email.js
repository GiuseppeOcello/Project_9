// Variabels
let requiredField = document.querySelectorAll('[required]');
let fieldPopulated;

function formValidation() {
   fieldPopulated = true;
   requiredField.forEach( (field) => {
      
      if (field.value == "") {
         unsuccessfullInput(field);
      } else if (field.value !== "" && field.type !== "email") {
         successfullInput(field);
      } else if (field.value !== "" && field.type == "email") {
         if (validateEmail(field)) {
            successfullInput(field);
         } else {
            unsuccessfullInput(field);
            alert('The Email format is invalid. Please check your email, it should look like this: sample@domain.com');
         }
      }
   });
}

function clearFields() {
   requiredField.forEach( (field) => {
      field.value = '';
      field.classList.remove('success');
      field.classList.remove('warning');
      field.placeholder = ' ';
      field.nextElementSibling.style.cssText = '';
   });
}

function successfullInput(field) {
   field.classList.add('success');
}

function unsuccessfullInput(field) {
   fieldPopulated = false;
   field.classList.add('warning');
   field.placeholder = 'This field cannot be empty';

   if (field.tagName !== "TEXTAREA") {
      field.nextElementSibling.style.cssText = 'bottom: 60px; font-size: 0.9em; color: white; background-color: #3a4664;';
   } else {
      field.nextElementSibling.style.cssText = 'bottom: 225px; font-size: 0.9em; color: white; background-color: #3a4664;';
   }
}

function validateEmail(email) {
   let emailFormat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
   if(emailFormat.test(email.value)) {
      return true;
   } else {
      return false;
   }
}

let btnSubmit = document.querySelector("#btn-submit");

btnSubmit.addEventListener('click', (e) => {
   e.preventDefault();
   formValidation();
   if (fieldPopulated) {
      sendEmail();
      clearFields();
   } else {
      alert('Please verify that all the input fields have been filled in correctly');
   }
   
});

function sendEmail() {
   let firstName = document.querySelector("#first-name").value;
   let lastName = document.querySelector("#last-name").value;
   let subject = document.querySelector("#subject").value;
   let query = document.querySelector("#query").value;
   window.open(`mailto:giuseppe.ocello@hotmail.com?subject=${subject}&body=Hello%20I%20am%20${firstName}%20${lastName},%0D%0A%0D%0A%20I%20am%20contacting%20you%20for%20${query}`);
}
