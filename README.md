<img width="183" alt="SPIRO-FONT" src="https://user-images.githubusercontent.com/730388/151907055-96ea0a27-9fa9-444d-a6f2-22210025a72b.png">

Like a spirograph, for fonts: Change the parameters, make something interesting, and waste time.

This project introduced me to these libraries: 
- [opentype.js](https://github.com/staff-code/opentype.js#readme): Font construction
- [JSTS](https://github.com/bjornharrtell/jsts): Geometric manipulations
- [Raphaël](https://dmitrybaranovskiy.github.io/raphael/): SVG drawing
- [Vue.js](https://vuejs.org/): Javascript framework

Deployed at: https://mccalluc.github.io/spiro-font/

Use jekyll when developing locally:
```
bundler exec jekyll serve
```
(Because of CORS restrictions, the javascript won't work with just `file:` instead of `http:`.)
