<template>
    <dialog class="markdown-body" id="error-modal">
        <h3 id="error-heading">Error</h3>
        <div v-html="errorMsg">
        </div>
        <div>
            <button type="button" class="mdl-button close">Close</button>
        </div>
    </dialog>
</template>

<script>
  const ipcRenderer = require('electron').ipcRenderer
  const mainData = {
    errorMsg: ''
  }

  export default {
    name: 'error-modal',
    mounted: function () {
      // register error dialog
      const dialog = document.querySelector('#error-modal')
      dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close()
      })
      ipcRenderer.on('show-error', (event, errorMsg) => {
        console.log('got the message')
        mainData.errorMsg = errorMsg
        dialog.showModal()
      })
    },
    data: function () {
      return mainData
    }
  }
</script>

<style scoped>
    #error-heading {
        color: firebrick;
    }
    #error-modal {
        width: 50vw;
        height: 35vh;
        border: 1px solid black;
        padding-top: 10px;
    }
</style>