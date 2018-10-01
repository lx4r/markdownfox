'use strict'

import {
  startFileWatcher,
  sendFileContentsToView,
  saveDataToFile
} from './fileHandling'
import { app, BrowserWindow, Menu, dialog } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
  let fileWatcher = null

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      webSecurity: false
    }
  })

  // open links in external browser
  // IMPORTANT: This only works because this is a single page app, otherwise
  // navigation inside the app would open the external browser.
  const shell = require('electron').shell
  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  mainWindow.loadURL(winURL)

  // MENU
  const template = [
    {
      label: 'MarkdownFox',
      submenu: [
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click () {
            const newFilePath = dialog.showOpenDialog({
              properties: ['openFile']
            })
            if (newFilePath !== undefined) {
              // if newFilePath is undefined the user canceled the open dialog
              sendFileContentsToView(newFilePath[0], mainWindow)
              if (fileWatcher) {
                // stop old file watcher before starting a new one
                fileWatcher.close()
              }
              fileWatcher = startFileWatcher(newFilePath[0], mainWindow)
            }
          }
        },
        {
          label: 'Export to PDF',
          click () {
            mainWindow.webContents.printToPDF(
              {
                printBackground: true,
                marginsType: 0
              },
              function (err, data) {
                if (err) {
                  console.error(err)
                } else {
                  const newFilePath = dialog.showSaveDialog({})
                  if (newFilePath !== undefined) {
                    // if newFilePath is undefined the user canceled the save dialog
                    saveDataToFile(newFilePath, mainWindow, data)
                  }
                }
              }
            )
          }
        },
        {
          label: 'Settings',
          click () {
            mainWindow.webContents.send('show-settings')
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Open Source licenses',
          click () {
            mainWindow.webContents.send('show-licenses')
          }
        },
        {
          label: 'MarkdownFox on Github',
          click () {
            require('electron').shell.openExternal(
              'https://github.com/lx4r/markdownfox'
            )
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
