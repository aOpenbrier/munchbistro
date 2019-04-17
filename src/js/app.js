function openMenu() {
    document.getElementById('nav-collapse').classList.toggle('open')
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('#navtrigger')) {
        document.getElementById('nav-collapse').classList.remove('open');
    }
}

function openTab(evt, tabId) {
    let tabcontent, tablinks

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
    document.getElementById(tabId).style.display = "block"
    evt.currentTarget.className += " active"
}

function menuScrolled() {
    document.addEventListener('mouseup', updateArrows)
    document.addEventListener('touchend', updateArrows)
}

function updateArrows() {
    document.removeEventListener('mouseup', updateArrows)
    document.removeEventListener('touchend', updateArrows)
    const el = document.getElementById('menutabs')
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    console.log('left scroll max: ' + el.scrollLeft + " of " + maxScrollLeft)
    // Hide arrows when not scrollable
    if (el.scrollLeft < maxScrollLeft - 1) {
        document.getElementById('indicator-right').style.display = 'block'
    }
    else {
        document.getElementById('indicator-right').style.display = 'none'
    }
    if (el.scrollLeft > 1) {
        document.getElementById('indicator-left').style.display = 'block'
    }
    else {
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
    // smooth scroll behavior prevents dragscroll from working correctly
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
    // smooth scroll behavior prevents dragscroll from working correctly
    el.style.scrollBehavior = 'auto'
    // smooth scroll behavior delays leftScroll update
    setTimeout(updateArrows, 500)
}

for (const key in menu) {
    for (const jey in menu[key]) {
        console.log(`${jey} in ${key}`)
        let section = document.createElement('div')
        section.className = 'menusection'
        section.innerHTML = `
        <h3 class="sectiontitle">${jey}</h3>
        `
        let sectionBody = document.createElement('div')
        sectionBody.className = 'sectionbody'

        menu[key][jey].forEach(item => {
            let sectionItem = document.createElement('div')
            sectionItem.className = 'sectionitem'
            sectionItem.innerHTML = `
            ${item.price ? `<p class="itemprice">${item.price}</p>` : ""}
            <h5 class="itemname">${item.name}</h5>
            <p class="itemdesc">${item.description}</p>
            ${item.vegan ? `<p class="itemveg">*Vegan</p>` : ''}
            ${item.vegetarian ? `<p class="itemveg">*Vegetarian</p>` : ''}
            ${item.extras ? `<p class="itemextras">${item.extras}</p>` : ''}
            ${item.featured ? `<p class="itemfeatured">FEATURED</p>` : ''}
            ${item.image ? `<img class="itemimage" src="./assets/images/${item.image}" alt="${item.name}">` : ''}
            `
            sectionBody.appendChild(sectionItem)
        })
        section.appendChild(sectionBody)
        document.getElementById(key).appendChild(section)
    }
}
// update arrow indicators after tab interaction is complete
document.getElementById('menutabs').addEventListener('touchstart', menuScrolled)
document.getElementById('menutabs').addEventListener('mousedown', menuScrolled)

// initialize page
document.getElementById('defaultOpen').click()
updateArrows()
