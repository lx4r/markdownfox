<template>
  <div id="wrapper">
    <div v-if="fileOpen" v-html="renderedMD" class="markdown-body"></div>
    <div v-else class="markdown-body" id="main-markdown">
      <img src="~@/assets/logo.png"><br>
      <b>Welcome to MarkdownFox :)</b><br>
      Open a Markdown file from the "File" menu to render it. <br>
      MarkdownFox will then watch for changes to the file and update the preview.<br>
      PDF export is also available from the "File" menu.<br>
      You can use <code>$$</code> to surround LaTeX-like formulae that will be converted by <a href="https://github.com/Khan/KaTeX">KaTeX</a>.
    </div>
    <licenses></licenses>
    <error-modal></error-modal>
  </div>
</template>

<script>
  import Licenses from './LandingPage/Licenses.vue'
  import ErrorModal from './LandingPage/ErrorModal.vue'
  import KatexAutoRender from 'katex/contrib/auto-render/auto-render'
  const path = require('path')
  const ipcRenderer = require('electron').ipcRenderer
  const marked = require('marked')
  let currentFilePath = null

  let mainData = {
    renderedMD: '',
    fileOpen: false
  }

  ipcRenderer.on('file-contents', (event, filePath, data) => {
    if (currentFilePath === filePath) {
      // file was updated
      mainData.renderedMD = marked(data)
    } else {
      // a new file was loaded
      mainData.fileOpen = true

      // build modified image render method to fix image path
      const dirPath = path.dirname(filePath)
      const newRenderer = new marked.Renderer()
      newRenderer.image = function (href, title, text) {
        const modifiedHref = path.resolve(dirPath, href)
        let out = '<img src="' + modifiedHref + '" alt="' + text + '"'
        if (title) {
          out += ' title="' + title + '"'
        }
        out += this.options.xhtml ? '/>' : '>'
        return out
      }
      // enable highlighting and set modified renderer
      // this is done for every file as the image render method has to be adapted to the file path
      marked.setOptions({
        highlight: function (code) {
          return require('highlight.js').highlightAuto(code).value
        },
        renderer: newRenderer
      })

      mainData.renderedMD = marked(data)
    }
  })

  export default {
    name: 'landing-page',
    components: {Licenses, ErrorModal},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    data: function () {
      return mainData
    },
    updated: function () {
      // TODO: use smaller scope here
      KatexAutoRender(document.body, {delimiters: [
        {
          left: '$$',
          right: '$$',
          display: false
        }
      ]})
    }
  }
</script>

<style>
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>
<style src="../assets/github-markdown-css.css"></style>
<style src="../../../node_modules/katex/dist/katex.min.css"></style>

