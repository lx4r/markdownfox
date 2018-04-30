<div align='center'>
  <img width=200px src='http://files.l3r.de/markdownfox/logo.png'><br>
  <h1>MarkdownFox</h1>
</div>

<p align="center">  
a simple Markdown viewer with PDF export
</div>

<div align="center">
  
  [![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  
  [![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

</div>

## Features

- updates preview when you make changes to the Markdown file
- supports [GFM (GitHub Flavored Markdown)](https://github.github.com/gfm/)
- renders LaTeX-like formulae if they're surrounded by `$$`
- PDF export
- syntax highlighting in code blocks

## Downloads

... can be found at [releases](https://github.com/lx4r/markdownfox/releases)

## Known issues

- When using gedit only the first change to the Markdown file triggers an update of the preview in MarkdownFox. This doesn't seem to happen with other editors. [Issue regarding this bug](https://github.com/lx4r/markdownfox/issues/13)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test

# lint all JS/Vue component files in `src/`
npm run lint
```

## Powered by

- [Vue.js](https://vuejs.org/)
- [Electron](https://electron.atom.io/)
- [Electron-Vue](https://github.com/SimulatedGREG/electron-vue) by SimulatedGREG
- [Marked](https://github.com/chjj/marked) by chjj
- [highlight.js](https://github.com/isagalaev/highlight.js) by isagalaev
- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) by sindresorhus
- [KaTeX](https://github.com/Khan/KaTeX) by Khan Academy


## License

[MIT](LICENSE)  
Open Source licenses can be found in [OPENSOURCE_LICENSES](OPENSOURCE_LICENSES) and in the app

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[7c4e3e9](https://github.com/SimulatedGREG/electron-vue/tree/7c4e3e90a772bd4c27d2dd4790f61f09bae0fcef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
