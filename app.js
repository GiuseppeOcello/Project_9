// ===========================================================================//
// Functionalities for index.html
// ===========================================================================//

const accordion = document.querySelectorAll('.accordion');
const accordionTitle = document.querySelectorAll('.accordion-title');


// Collapse animation
function collapseElement(element) {
    // Get element innerheight
    const sectionHeight = element.scrollHeight;
    // setting element height
    element.style.height = sectionHeight + 'px';
    
    // Animate to the final height
    requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
    });
    
    // set data-collapsed attribute to true
    element.setAttribute('data-collapsed', 'true');
}

//   Expand Animation
function expandElement(element) {
// Get element innerheight
const sectionHeight = element.scrollHeight;
// setting element height
element.style.height = sectionHeight + 'px';
    
// set data-collapsed attribute to false
element.setAttribute('data-collapsed', 'false');
}
  
// check if any of the accordion's title is clicked and calls the respectinve expand or collapse function
accordionTitle.forEach( (title, index) => {
    const currentElement = index;
    title.addEventListener('click', (e)=> {
        let element = accordion[currentElement].children[1];
        let elementCollapsed = element.getAttribute('data-collapsed');

        if (elementCollapsed === 'true') {
            expandElement(element);
            
            // collapse all the other accordion element
            for (let i = 0; i< accordion.length; i++) {
                element = accordion[i].children[1];

                if (i !== currentElement && elementCollapsed) {
                    collapseElement(element);
                }
            }

        } else {
            collapseElement(element);
        }

    });
});


// Create tooltip for the language' icons
let icons = document.querySelectorAll(".language-list > li");
let abbreviations = [
    'HyperText Markup Language',
    'Cascading Style Sheets',
    'Syntactically Awesome Stylesheet',
    'JavaScript',
    'Scalable Vector Graphics',
    'Visual Basic for Applications',
    'Java',
    'WordPress',
    'Visual Studio Code',
    'Global Information Tracker',
    'Visual Instrument Improved',
    'Node',
    'Structured Query Language',
    'Hypertext Preprocessor'
];


icons.forEach((icon, index) => {
    // create a tool tip
    icon.addEventListener('mouseenter', () => {

        if (icon.lastElementChild.classList == 'brand') {
            let tip = document.createElement('span');
            tip.textContent = abbreviations[index];
            tip.classList.add('tooltip');
            icon.appendChild(tip);
        }
        
    });

    // remove the span element of the tool tip create in the previous event
    icon.addEventListener('mouseleave', () => {
        
        if (icon.lastElementChild.classList == 'tooltip') {
            let tip = document.querySelector('.tooltip');
            icon.removeChild(tip);
        }

    });

});


// ===========================================================================//
// Functionalities for portfolio.html
// ===========================================================================//
const previewBtn = document.querySelectorAll('.btn-preview');
const siteThumb = document.querySelectorAll('img.project-preview');
const card = document.querySelectorAll('.card');
const modalContainer = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");
let vpWidth = document.documentElement.clientWidth;
let btnSmall = '<button class="btn-small">See at 320px</button>';
let btnMedium = '<button class="btn-medium">See at 768px</button>';

let currentProject;

function populateModal(project) {

    let siteHTML = card[project].children[0].outerHTML;
    let titleHTML = card[project].children[2].outerHTML;
    let btnHTML = card[project].children[6].children[1].outerHTML;
    
    modalContainer.innerHTML = `
        ${titleHTML}
        ${siteHTML}
        ${btnHTML}
    `;

    // adds buttons to preview the site at different width
    if (vpWidth > 1024) {
        modalContainer.innerHTML += `
        ${btnSmall}
        ${btnMedium}
    `;
    } else if (vpWidth > 768) {
        modalContainer.innerHTML += `
        ${btnSmall}
    `;
    }

    overlay.classList.remove('hidden');    
}


document.addEventListener('click', (e) => {

    if (e.target.classList == 'btn-small') {
        modalContainer.children[1].style.width = '320px';
    } else if (e.target.classList == 'btn-medium') {
        modalContainer.children[1].style.width = '768px';
    }

});

// Calls the function to show and populate the modal if the preview button is clicked
previewBtn.forEach( (btn, index) => {
    
    btn.addEventListener('click', (e)=> {

        currentProject = index;
        populateModal(currentProject);
  
    });

});

// clicking the site preview image opens the site in a new window when at 320px layout
siteThumb.forEach( (thumbnail, index) => {
    
    thumbnail.addEventListener('click', (e)=> {
        window.open(card[index].children[0].getAttribute('src'));
    });

});


// === Modal Navigation === //
const btnPrevious = document.querySelector(".btn-previous");
const btnNext = document.querySelector(".btn-next");
const btnClose = document.querySelector(".btn-close");
const numberOfProjects = card.length - 1;

document.addEventListener("keyup", (e) => {
   if (e.code == "ArrowRight") {
      btnNext.click();
   } else if (e.code == "ArrowLeft") {
      btnPrevious.click();
   } else if (e.code == "Escape") {
      btnClose.click();
 }
});

if (btnClose) {
btnClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    modalContainer.innerHTML = "";
    });
}

if (btnPrevious) {
btnPrevious.addEventListener("click", () => {
    modalContainer.innerHTML = ""; 
    if (currentProject > 0) {
        currentProject += -1;
        populateModal(currentProject);
    } else if ( currentProject == 0) {
        currentProject = numberOfProjects;
        populateModal(currentProject);
    } 
 
});
}

if (btnNext) {
btnNext.addEventListener("click", () => {
    modalContainer.innerHTML = "";
    if (currentProject < numberOfProjects) {
        currentProject += 1;
        populateModal(currentProject);
    } else if (currentProject == numberOfProjects) {
        currentProject = 0;
        populateModal(currentProject);
    }
   
});
}



// ===========================================================================//
// Functionalities for contact.html
// ===========================================================================//
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

if (btnSubmit) {
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
}

function sendEmail() {
    let firstName = document.querySelector("#first-name").value;
    let lastName = document.querySelector("#last-name").value;
    let subject = document.querySelector("#subject").value;
    let query = document.querySelector("#query").value;
    window.open(`mailto:giuseppe.ocello@hotmail.com?subject=${subject}&body=Hello%20I%20am%20${firstName}%20${lastName},%0D%0A%0D%0A%20I%20am%20contacting%20you%20for%20${query}`);
}
