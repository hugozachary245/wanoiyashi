// Get the navbar list UL
const navBarUl = document.getElementById('navbar__list');

var newState = false;

// Get the list of sections and add to the navbar list UL with links
const sections = document.querySelectorAll('section');
for (var section of sections) {
    var li = document.createElement('li');
    li.id = `nav-li-${section.id}`;
    li.innerHTML = `<a class="menu__link" href="#${section.id}">${section.dataset.nav}</a>`;
    navBarUl.appendChild(li);
};

// Get current active section and set classes.
function checkForActiveSection() {
    let sects = document.querySelectorAll('section');
    let currentActiveSect = document.querySelector('.active-section');
    for (var sect of sections) {
        if (isTopOfElementNearTopOfViewport(sect)) {
            if (currentActiveSect !== sect) {
                newState = true;
            }
            setNewActiveClass(sect);
        };
    };
};

// Set new active class and deactiveate old one
function setNewActiveClass(sect) {
    // Remove current active class if changed
    if (newState) {
        // Toggle section state
        document.querySelector('.active-section').classList.toggle('active-section');
        
        // Toggle menu state
        if (document.querySelector('.li-active-state')) {
            document.querySelector('.li-active-state').classList.toggle('li-active-state');
        }
        // Set new active class
        sect.classList.toggle('active-section');
    
        // Update nav bar
        if(sect.id === 'main-container') {
            // Clear navLi active class
            } else {
            // Update active section link
            let navLi = document.getElementById(`nav-li-${sect.id}`);
            navLi.classList.toggle('li-active-state');
        }
        newState = false;
    }
}

// This function calculates if the top of the element is in the upper third of the viewport and returns true/false.
function isTopOfElementNearTopOfViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const vertNearTop = (rect.top >= 0) && ((rect.top) <= (rect.height / 3));
    return (vertNearTop);
};

// This function sets the active class to the correct section and scrolls to it.
function scrollToActive(e) {
    e.preventDefault();
    
    // Set active class
    let sectId = e.target.href.split('#')[1];
    newState = true;
    setNewActiveClass(document.getElementById(sectId));
    
    // Scroll to active section
    document.querySelector('.active-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
};

// Scroll to top button
scrollButton = document.getElementById('btn-top');

// https://joshbroton.com/hooking-up-to-the-window-onscroll-event-without-killing-your-performance/
var didScroll = false;

function scrolling() {
    didScroll = true;
}

// Scrolling event handler
function handleScroll() {
    console.log('onscroll');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        // Show scroll to top button when not at top of doc
        scrollButton.style.display = "block";
        // Check for the active section
        checkForActiveSection();
    } else {
        // Hide scroll to top button when at top of doc
        scrollButton.style.display = "none";
        // Reset active section to main
        // Toggle off current active section
        document.querySelector('.active-section').classList.toggle('active-section');
        // Toggle on main section as active
        document.querySelector('#main-container').classList.toggle('active-section');
        // Reset navBar
        if(document.querySelector('.li-active-state')) {
            document.querySelector('.li-active-state').classList.toggle('li-active-state');
        }
    }
};

setInterval(function() {
    if(didScroll) {
        didScroll = false;
        handleScroll();
    }
}, 200);


// Event Listeners

// Scroll to anchor ID using scrollTO event
navBarUl.addEventListener('click', scrollToActive);

// Scroll to top button
scrollButton.addEventListener('click', scrollToActive);

// Check for active section upon scroll
window.addEventListener('scroll', scrolling);
