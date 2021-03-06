![Munch Bistro Logo](./readme/logo.jpg)
# Munch Bistro

**Restaurant website build tools**

## Update
Unfortunately Munch Bistro closed permanently in May 2019  
Check out the project for their original location, 
Live Site: [www.munchthai.com](https://www.munchthai.com) 
Code: [Munch Thai (GitHub)](https://github.com/aOpenbrier/munchthai)  

## Content Management
Separate Node application developed for restaurant to update menu and edit JSON data with easy web interface.  
Code: [Munch Menu Editor (GitHub)](https://github.com/aOpenbrier/munchmenu)

## Deployment
Development Build: [GitHub Pages](https://www.adamopenbrier.com/munchbistro)

## Development setup
Project uses Nodejs to execute JavaScript command line interface.
Check for Node at command prompt:
```bash
node --version
```
If you haven't already, install [Node.js](https://nodejs.org/en/download/)

Clone the repository then run `npm i` at CLI in project directory

From within the `src` folder you can run the following gulp commands:
- `gulp css` - Auto-prefix and minimize css from `src/stylesheets` folder to `public/assets/css` folder
- `gulp javascript` - Transpile code to es5 and minimize JavaScript from `src/js` to `public/assets/js` folder
- `gulp deploy` - Deploy `public` folder to GitHub Pages. Note: Must have access to repository to commit.

## Technologies Used
- [Node.js](https://nodejs.org) - Execute JavaScript outside of the browser
- [Gulp.js](httsp://gulpjs.com) - Streaming build system for front-end development
- [Sass](https://sass-lang.com/) - Syntactically Awesome Style Sheets. CSS pre-processor

## Author
Adam Openbrier  
 &bull; [Portfolio](https://www.adamopenbrier.com/portfolio.html)  
 &bull; [GitHub](https://github.com/aOpenbrier)  
