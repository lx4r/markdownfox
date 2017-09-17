<template>
  <div id="wrapper">
    <main>
      <div v-if="fileOpen" v-html="renderedMD" class="markdown-body"></div>
      <div v-else class="markdown-body">
        <img src="~@/assets/background_small.jpg"><br>
        <b>Welcome to MarkDawn :)</b><br>
        Open a Markdown file from the "File" menu to render it. <br>
        MarkDawn will then watch for changes to the file and update the preview.
      </div>
    </main>
  </div>
</template>

<script>
  const fs = require('fs')
  const ipcRenderer = require('electron').ipcRenderer
  const marked = require('marked')

  // Synchronous highlighting with highlight.js
  marked.setOptions({
    highlight: function (code) {
      return require('highlight.js').highlightAuto(code).value
    },

  });

  let mainData = {
    renderedMD: '',
    fileOpen: false
  }

  ipcRenderer.on('markdawn-load-file', (event, arg) => {
    const filePath = arg[0]
    renderMDFromFile(filePath)
    startFileWatcher(filePath)
    mainData.fileOpen = true
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
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
    },
    data: function () {
      return mainData
    }
  }
</script>

<style src="../assets/main.css"></style>
