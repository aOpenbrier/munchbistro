const fs = require('fs')
const menu = require('../public/assets/js/menu.json')

menu.forEach(tab => {
    tab.sections.forEach((section, sectionIndex) => {
        if (section["section items"]) {
            section["section items"].forEach((item, itemIndex) => {
                if (item.image) {

                    const filename = `../public/menu/${item.image.split('.')[0]}.html`

                    const data = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Munch Bistro - ${item.name}</title>
    <meta name="description" content="${item.description}">
    <meta property="og:title" content="Munch Bistro ${item.name}">
    <meta property="og:description" content="${item.description}">
    <meta property="og:image" content="https://www.munchbistro.com/assets/images/${item.image}">
    <meta property="og:url" content="https://www.munchbistro.com/menu/${filename}">
    <meta name="theme-color" content="#c4001b">
    <link rel="shortcut icon" href="../assets/images/favicon.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:700" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/reset.css">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<header>
        <nav>
            <ul id='nav-collapse'>
                <li class='order'>
                    <a href="https://www.toasttab.com/munch-bistro/v2/online-order#!/" target="_blank">Order<span class='hidemobile'> Online</span></a>
                </li>
                <li><a href="../index.html#top">Home</a></li>
                <li><a href="../index.html#ourmenu">Our Menu</a></li>
                <li><a href="../index.html#contact">Contact Us</a></li>
                <li>
                    <a href="https://www.yelp.com/waitlist/munch-bistro-thai-with-a-twist-huntington-beach-3"><i class="material-icons md18">launch</i>Waitlist</a>
                </li>
                <li class="hamburger">
                    <i id='navtrigger' class="material-icons" onclick="openMenu()">menu</i>
                </li>
            </ul>
        </nav>
        </header>
    <main>
    <div class="menucontainer">
                <div>
                <a class="backbutton" href="../index.html#ourmenu"><i class="material-icons">arrow_back_ios</i>Back to Menu</a>
                </div>
                <div class="menu">
                <div class="itempage">
            <img class="itempagelogo" src="../assets/images/logo.png" alt="Munch Bistro Logo">
            <h5 class="itemname">${item.name}</h5>
            <p class="itemdesc">${item.description}</p>
            ${item["gf option"] ? `<p class="itemdietary">*Gluten-free optional</p>` : ''}
            ${item.vegan ? `<p class="itemdietary">*Vegan</p>` : ''}
            ${item.vegetarian ? `<p class="itemdietary">*Vegetarian</p>` : ''}
            ${item.extras ? `<p class="itemextras">${item.extras}</p>` : ''}
            ${item.options ? `<p class="itemoptions">${item.options}</p>` : ''}
            <div class="itemimagewrapper">
                <div class="itemimage" style="background-image:url(../assets/images/${item.image})">
                        <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.munchbistro.com%2Fmenu%2F${filename}.html&layout=button&size=small&width=59&height=20&appId" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                <div>
            <div>
        </div>
    </div>
</div>
</main>
<footer>
    <div class="sociallinks">
        <a aria-label="Find on Instagram" href="https://www.instagram.com/munchbistrohb/" rel="noopener" target="_blank"><img class="invert" src="../assets/images/instagram.png" alt="instagram logo"></a>
        <a aria-label="Like on Facebook" href="https://www.facebook.com/munchbistrohuntingtonbeach/" rel="noopener" target="_blank"> <img src="../assets/images/facebook.png" alt="facebook logo"></a>
    </div>
    <div class="location">
        <div>
            <p>Location</p>
            <p>Huntington Beach</p>
            <p>18541-A Beach Blvd</p>
            <p>Huntington Beach, CA 92684</p>
            <p>(714) 369-6100</p>
        </div>
    </div>
</footer>
<script src="../assets/js/nav.js"></script>
</body>
</html>
`

                    fs.writeFile(filename, data, (e) => e && console.error(e))

                }
            })
        }
    })
})
