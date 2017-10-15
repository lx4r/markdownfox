<template>
    <dialog class="markdown-body" id="error-modal" ref="errorModal">
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
      this.$refs.errorModal.addEventListener('click', function () {
        this.close()
      })
      ipcRenderer.on('show-error', (event, errorMsg) => {
        mainData.errorMsg = errorMsg
        this.$refs.errorModal.showModal()
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