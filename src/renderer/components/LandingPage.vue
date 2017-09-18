<template>
  <div id="wrapper">
    <div v-if="fileOpen" v-html="renderedMD" class="markdown-body"></div>
    <div v-else class="markdown-body">
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
  const fs = require('fs')
  const path = require('path')
  const ipcRenderer = require('electron').ipcRenderer
  const marked = require('marked')

  let mainData = {
    renderedMD: '',
    fileOpen: false
  }

  ipcRenderer.on('markdawn-load-file', (event, arg) => {
    const filePath = arg[0]
    const dirPath = path.dirname(filePath)
    renderMDFromFile(filePath)
    startFileWatcher(filePath)
    mainData.fileOpen = true

    const newRenderer = new marked.Renderer()
    // modified image render method to fix image path
    newRenderer.image = function (href, title, text) {
      const modifiedHref = path.resolve(dirPath, href)
      let out = '<img src="' + modifiedHref + '" alt="' + text + '"'
      if (title) {
        out += ' title="' + title + '"'
      }
      out += this.options.xhtml ? '/>' : '>'
      console.log(out)
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
  })

  function startFileWatcher (filePath) {
    fs.watch(filePath, function (eventType, fileName) {
      renderMDFromFile(filePath)
    })
  }

  function renderMDFromFile (filePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        console.error(err)
      } else {
        mainData.renderedMD = marked(data)
      }
    })
  }

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
    }
  }
</script>

<style src="../assets/main.css"></style>
