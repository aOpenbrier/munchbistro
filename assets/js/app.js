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
    // Get all elements with class="tabcontent" and hide them
    let tabcontent = document.getElementsByClassName("tabcontent")
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
    }
    // Get all elements with class="tablinks" and remove the class "active"
    let tablinks = document.getElementsByClassName("tablinks")
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    // Show the current tab, and add an "active" class to the button that opened the tab 
    document.getElementById(tabId).style.display = "block"
    evt.currentTarget.className += " active"
    // center active tab
    const ElemPosition = evt.currentTarget.offsetLeft - 20
    const targetPosition = (evt.currentTarget.parentElement.clientWidth - evt.currentTarget.clientWidth) / 2
    document.getElementById('menutabs').style.scrollBehavior = 'smooth'
    evt.currentTarget.parentElement.scrollLeft = ElemPosition - targetPosition
    document.getElementById('menutabs').style.scrollBehavior = 'auto'
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

// Add menu content
for (const key in menu) {
    menu[key].forEach( section => {
        let sectionDiv = document.createElement('div')
        sectionDiv.className = 'menusection'
        sectionDiv.innerHTML = `
        <h3 class="sectiontitle">${section["section title"]}</h3>
        ${section["section details"] ? `<p class="sectiondetails">${section["section details"]}</p>` : ''}
        `
        let sectionBody = document.createElement('div')
        sectionBody.className = 'sectionbody'

        section["section items"].forEach(item => {
            let sectionItem = document.createElement('div')
            sectionItem.className = 'sectionitem' 
            let price = item.price ? item.price.toString().split('.')[1] ? item.price.toFixed(2) : item.price : ''
            sectionItem.innerHTML = `
            ${item.price ? `<p class="itemprice">${ `${price}`}</p>` : ""}
            <h5 class="itemname">${item.name}</h5>
            <p class="itemdesc">${item.description}</p>
            ${item["gf option"] ? `<p class="itemdietary">*Gluten-free optional</p>` : ''}
            ${item.vegan ? `<p class="itemdietary">*Vegan</p>` : ''}
            ${item.vegetarian ? `<p class="itemdietary">*Vegetarian</p>` : ''}
            ${item.extras ? `<p class="itemextras">${item.extras}</p>` : ''}
            ${item.options ? `<p class="itemoptions">${item.options}</p>` : ''}
            ${item.featured ? `<p class="itemfeatured">FEATURED</p>` : ''}
            ${item.image ? `<img class="itemimage" src="./assets/images/${item.image}" alt="${item.name}">` : ''}
            `
            sectionBody.appendChild(sectionItem)
        })
        sectionDiv.appendChild(sectionBody)
        document.getElementById(key).appendChild(sectionDiv)
    })
}
// update arrow indicators after tab interaction is complete
document.getElementById('menutabs').addEventListener('touchstart', menuScrolled)
document.getElementById('menutabs').addEventListener('mousedown', menuScrolled)

// initialize page
document.getElementById('defaultOpen').click()
updateArrows()
