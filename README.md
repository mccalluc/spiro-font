<img width="183" alt="SPIRO-FONT" src="https://user-images.githubusercontent.com/730388/151907055-96ea0a27-9fa9-444d-a6f2-22210025a72b.png">

Like a spirograph, for fonts: Change the parameters, make something pretty, and waste time.

This project introduced me to these libraries: 
- [opentype.js](https://github.com/staff-code/opentype.js#readme): Font construction
- [JSTS](https://github.com/bjornharrtell/jsts): Geometric manipulations
- [Raphaël](https://dmitrybaranovskiy.github.io/raphael/): SVG drawing
- [Vue.js](https://vuejs.org/): Javascript framework

It also uses [Cypress](https://www.cypress.io/) for end-to-end testing,
[ESLint](https://eslint.org/) for linting,
and [Jekyll](https://jekyllrb.com/) for static site generation.

Deployed at: https://mccalluc.github.io/spiro-font/

When developing locally:
```
cd docs
bundler exec jekyll serve
```
