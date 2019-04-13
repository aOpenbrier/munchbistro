


function openMenu() {
    document.getElementById('nav-collapse').classList.toggle('open')
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('#navtrigger')) {
        document.getElementById('nav-collapse').classList.remove('open');
    }
}

function openTab(evt, cityName) {
    // Declare all variables
    let tabcontent
    let tablinks

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent")
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks")
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    // Show the current tab, and add an "active" class to the button that opened the tab 
    document.getElementById(cityName).style.display = "block"
    evt.currentTarget.className += " active"
}

document.getElementById('defaultOpen').click()

function checkScroll(event)
{
    const elem = event.currentTarget
    const maxScrollLeft = elem.scrollWidth - elem.clientWidth;
    if (elem.leftScroll < maxScrollLeft) {
        // TODO: show right arrow
    }
    else {
        // TODO: hide right arrow
    }
    if (elem.leftScroll > 0) {
        // TODO: show left arrow
    }
    else {
        // TODO: hide left arrow
    }
}