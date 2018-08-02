<template>
    <dialog class="markdown-body" id="settings-modal">
        <h3>Settings</h3>
        <div>
          <fieldset>
            <legend>LaTeX delimiter</legend>
            <div>
              <input type="radio" id="$$" name="delimiter" checked />
              <label for="$$">$$</label>
            </div>
            <div>
              <input type="radio" id="$" name="delimiter" />
              <label for="$">$</label>
            </div>
          </fieldset>
          <button type="button" class="mdl-button close">Close</button>
        </div>
    </dialog>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer

export default {
  name: 'settings-modal',
  mounted: function () {
    // register settings dialog
    const dialog = document.querySelector('#settings-modal')
    dialog.querySelector('.close').addEventListener('click', function () {
      dialog.close()
    })
    ipcRenderer.on('show-settings', (event, errorMsg) => {
      dialog.showModal()
    })
  }
}
</script>

<style scoped>
#settings-modal {
  width: 50vw;
  height: 35vh;
  border: 1px solid black;
  padding-top: 10px;
}
</style>