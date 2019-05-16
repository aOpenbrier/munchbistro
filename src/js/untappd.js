
// Get Untappd beer menu
fetch('https://business.untappd.com/api/v1/menus/62808?full=true', {
    headers: { "Authorization": "Basic YW9wZW5icmllckBnbWFpbC5jb206RVVYcWFnYnVMN0pEaS1MS3FqUkg=" }
}).then(r => r.json())
    .then(r => {
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