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
    <dialog class="mdl-dialog">
      <h4 class="mdl-dialog__title">Allow data collection?</h4>
      <div class="mdl-dialog__content">
        <p>
          Allowing us to collect data will let us get you the information you want faster.
        </p>
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button">Agree</button>
        <button type="button" class="mdl-button close">Disagree</button>
      </div>
    </dialog>
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

  const dialog = document.querySelector('dialog');
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });
  ipcRenderer.on('show-licenses', (event, arg) => {
    dialog.showModal();
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
