<template>
  <div id="wrapper">
    <div v-if="fileOpen" v-html="renderedMD" id="rendered-markdown" class="markdown-body"></div>
    <div v-else id="welcome-text" class="markdown-body">
      <img src="~@/assets/background_small.jpg"><br>
      <b>Welcome to MarkDawn :)</b><br>
      Open a Markdown file from the "File" menu to render it. <br>
      MarkDawn will then watch for changes to the file and update the preview.<br>
      PDF export is also available from the "File" menu.
    </div>
    <licenses></licenses>
    <error-modal></error-modal>
  </div>
</template>

<script>
  import Licenses from './LandingPage/Licenses.vue'
  import ErrorModal from './LandingPage/ErrorModal.vue'
  const path = require('path')
  const ipcRenderer = require('electron').ipcRenderer
  const marked = require('marked')

  let currentFilePath = null

  export default {
    name: 'landing-page',
    components: {Licenses, ErrorModal},
    mounted: function () {
      ipcRenderer.on('file-contents', (event, filePath, data) => {
        this.updateView(filePath, data)
      })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      updateView (filePath, newData) {
        if (currentFilePath === filePath) {
          // file was updated
          this.renderedMD = marked(newData)
        } else {
          // a new file was loaded
          this.fileOpen = true

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

          this.renderedMD = marked(newData)
        }
      }
    },
    data: function () {
      return {
        renderedMD: '',
        fileOpen: false
      }
    }
  }
</script>

<style src="../assets/main.css"></style>
