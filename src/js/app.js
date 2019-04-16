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

// wait until finished dragscroll-ing to update arrows
function thenUpdateArrows() {
    document.addEventListener('mouseup', updateArrows)
}

function updateArrows() {
    document.removeEventListener('mouseup', updateArrows)
    const el = document.getElementById('menutabs')
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    console.log('left scroll max: ' + el.scrollLeft + " of " + maxScrollLeft)
    if (el.scrollLeft < maxScrollLeft - 1 ) {
        // Show right arrow
        document.getElementById('indicator-right').style.display = 'block'
    }
    else {
        // Hide right arrow
        document.getElementById('indicator-right').style.display = 'none'
    }
    if (el.scrollLeft > 1) {
        // Show left arrow
        document.getElementById('indicator-left').style.display = 'block'
    }
    else {
        // Hide left arrow
        document.getElementById('indicator-left').style.display = 'none'
    }
}

function arrowLeft() {
    const el = document.getElementById('menutabs')
    el.style.scrollBehavior = 'smooth'
    // scroll far enough without passing any content
    if (el.scrollWidth > el.clientWidth * 2) {
        el.scrollLeft -= el.clientWidth * 0.7
    }
    else {
        el.scrollLeft = 0
    }
    el.style.scrollBehavior = 'auto'
    // smooth scroll behavior delays leftScroll update
    setTimeout(updateArrows, 500)
}

function arrowRight() {
    const el = document.getElementById('menutabs')
    el.style.scrollBehavior = 'smooth'
    // scroll far enough without passing any content
    if (el.scrollWidth > el.clientWidth * 2) {
        el.scrollLeft += el.clientWidth * 0.7
    }
    else {
        el.scrollLeft += el.scrollWidth
    }
    el.style.scrollBehavior = 'auto'
    // smooth scroll behavior delays leftScroll update
    setTimeout(updateArrows, 500)
}

// initialize page
document.getElementById('defaultOpen').click()
updateArrows()
