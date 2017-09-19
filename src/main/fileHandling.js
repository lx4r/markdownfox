const fs = require('fs')

const fileLoadError = 'File could not be loaded.<br>'
const fileSaveError = 'File could not be saved.<br>'

function startFileWatcher (filePath, targetWindow) {
  return fs.watch(filePath, function (eventType, fileName) {
    sendFileContentsToView(filePath, targetWindow)
  })
}

function sendFileContentsToView (filePath, targetWindow) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      targetWindow.webContents.send('show-error', fileLoadError + err.message)
    } else {
      targetWindow.webContents.send('file-contents', filePath, data)
    }
  })
}

function saveDataToFile (filePath, targetWindow, data) {
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      if (err.errno === (-4082)) {
        const resourceBusyMessage = 'The resource is busy e.g. because the file is used by another program.'
        targetWindow.webContents.send('show-error', fileSaveError + resourceBusyMessage)
      } else {
        targetWindow.webContents.send('show-error', fileSaveError + err.message)
      }
    }
  })
}

export {startFileWatcher, sendFileContentsToView, saveDataToFile}
