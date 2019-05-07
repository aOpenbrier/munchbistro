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
    let tabcontent = document.getElementsByClassName('tabcontent')
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
    }
    // Get all elements with class="tablinks" and remove the class "active"
    let tablinks = document.getElementsByClassName('tablinks')
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
    }
    // Show the current tab, and add an "active" class to the button that opened the tab 
    document.getElementById(tabId).style.display = 'block'
    evt.currentTarget.className += ' active'
    document.getElementById('menutabs').style.scrollBehavior = 'smooth'
    // center active tab
    const ElemPosition = evt.currentTarget.offsetLeft - 20
    const targetPosition = (evt.currentTarget.parentElement.clientWidth - evt.currentTarget.clientWidth) / 2
    evt.currentTarget.parentElement.scrollLeft = ElemPosition - targetPosition
    // scroll to top of menu section
    const menuTop = document.getElementById('ourmenu').offsetTop
    if (document.documentElement.scrollTop > menuTop || document.body.scrollTop > menuTop) {
        document.documentElement.scrollTop = menuTop
        // safari 
        document.body.scrollTop = menuTop
    }
    document.getElementById('menutabs').style.scrollBehavior = 'auto'
    setTimeout(updateArrows, 500)
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
    if (el.scrollLeft < maxScrollLeft - 8) {
        document.getElementById('indicator-right').style.display = 'block'
    }
    else {
        document.getElementById('indicator-right').style.display = 'none'
    }
    if (el.scrollLeft > 8) {
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
    menu[key].forEach((section, sectionIndex) => {
        let sectionDiv = document.createElement('div')
        sectionDiv.className = 'menusection'
        sectionDiv.innerHTML = `
        <h3 class="sectiontitle">${section["section title"]}</h3>
        ${section["section details"] ? `<p class="sectiondetails">${section["section details"]}</p>` : ''}
        `
        let sectionBody = document.createElement('div')
        sectionBody.className = 'sectionbody'

        section["section items"].forEach((item, itemIndex) => {
            let sectionItem = document.createElement('div')
            sectionItem.className = 'sectionitem'
            let price = item.price ? item.price.toString().split('.')[1] ? item.price.toFixed(2) : item.price : ''
            sectionItem.innerHTML = `
${item.price ? `<p class="itemprice">${`${price}`}</p>` : ''}
<h5 class="itemname">${item.name}</h5>
<p class="itemdesc">${item.description}</p>
${item["gf option"] ? `<p class="itemdietary">*Gluten-free optional</p>` : ''}
${item.vegan ? `<p class="itemdietary">*Vegan</p>` : ''}
${item.vegetarian ? `<p class="itemdietary">*Vegetarian</p>` : ''}
${item.extras ? `<p class="itemextras">${item.extras}</p>` : ''}
${item.options ? `<p class="itemoptions">${item.options}</p>` : ''}
<div class="itemimgwrapper">
    ${item.image ? `
    <div class="itemimage" style="background-image:url(./assets/images/${item.image})">
        <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.munchbistro.com%2Fmenu%2F${item.image.split('.')[0]}.html&layout=button&size=small&width=59&height=20&appId" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
    </div>` : ''}
    ${item.featured ? `<p class="itemfeatured">FEATURED</p>` : ''}
</div>
`
            sectionBody.appendChild(sectionItem)
        })
        sectionDiv.appendChild(sectionBody)
        document.getElementById(key).appendChild(sectionDiv)
    })
}

// Get Untappd beer menu
fetch('https://business.untappd.com/api/v1/menus/62808?full=true', {
    headers: { "Authorization": "Basic YW9wZW5icmllckBnbWFpbC5jb206RVVYcWFnYnVMN0pEaS1MS3FqUkg=" }
}).then(r => r.json())
    .then(r => {
        console.log(r)
        let beerMenu = document.createElement('div')
        r.menu.sections.forEach(section => {
            let beerSection = document.createElement('div')
            beerSection.className = 'menusection'
            beerSection.innerHTML = `<h3 class="sectiontitle">${section.name}</h3>`
            let sectionBody = document.createElement('div')
            sectionBody.className = 'sectionbody'
            section.items.forEach(item => {
                let sectionItem = document.createElement('div')
                sectionItem.className = 'sectionitem'

                let containerIndex = 0
                // check if beer is on tap wall, would include 1 oz pricing
                item.containers.forEach((container, i) => {
                    if (container.container_size.ounces == 1.0) {
                        containerIndex = i
                    }
                })
                sectionItem.innerHTML = `
            ${item.label_image ? `<a href="https://untappd.com/b/${item.untappd_beer_slug}/${item.untappd_id}"><img class="beerimage" src="${item.label_image}"></a>` : ''}
<a href="https://untappd.com/b/${item.untappd_beer_slug}/${item.untappd_id}"><h5 class="itemname">${item.name || ''}</h5></a>
<p class="itemdesc">${item.brewery || ''}, ${item.brewery_location || ''}</p>
<p class="beerprice">${parseInt(item.containers[containerIndex].container_size.ounces) == 1 ? 'Oz. ' : item.containers[containerIndex].container_size.name || ''} $${item.containers[containerIndex].price || ''}</p>
`
                sectionBody.appendChild(sectionItem)
            })
            beerSection.appendChild(sectionBody)
            beerMenu.appendChild(beerSection)
        })

        document.getElementById('menubeer').appendChild(beerMenu)
    }).catch(e => console.error(e))

// update arrow indicators after tab interaction is complete
document.getElementById('menutabs').addEventListener('touchstart', menuScrolled)
document.getElementById('menutabs').addEventListener('mousedown', menuScrolled)

// initialize page
document.getElementById('defaultOpen').click()
updateArrows()
