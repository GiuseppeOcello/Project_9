
const accordionTitle = document.querySelectorAll('.accordion-title');
const accordionContent = document.querySelectorAll('.accordion-content');
// accordionTitle.addEventListener('click', (e)=> {
//     let element = e.target;
//     console.log(element);
//     if (element.nextElementSybling.className == "collapsed") {
//         e.target.classList.add('expanded');
//     }

// });

accordionTitle.forEach( (title, index) => {
    title.addEventListener('click', (e)=> {
        let element = e.target.nextElementSibling;
        
        if (element.classList.contains('collapsed')) {
            element.classList.remove('collapsed');
            element.classList.add('expanded');
            // accordionContent[index-1].classList.add('collapsed');
            // e.target.parentElement.previousElementSybling.classList.add('collapsed');
            console.log(e.target.parentElement.previousElementSybling);
        } else if (element.classList.contains('expanded')) {
            element.classList.remove('expanded');
            element.classList.add('collapsed');
        }
    });
});