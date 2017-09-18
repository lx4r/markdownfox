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
    <dialog class="markdown-body" id="oss-licenses">
      <h2>Open Source licenses</h2>
      <div>
        <p id="oss-licenses-text">
          License for Vue.js:<br>
          <br>
          The MIT License (MIT)<br>
          <br>
          Copyright (c) 2013-present, Yuxi (Evan) You<br>
          <br>
          Permission is hereby granted, free of charge, to any person obtaining a copy<br>
          of this software and associated documentation files (the &quot;Software&quot;), to deal<br>
          in the Software without restriction, including without limitation the rights<br>
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br>
          copies of the Software, and to permit persons to whom the Software is<br>
          furnished to do so, subject to the following conditions:<br>
          <br>
          The above copyright notice and this permission notice shall be included in<br>
          all copies or substantial portions of the Software.<br>
          <br>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br>
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br>
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br>
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br>
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br>
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN<br>
          THE SOFTWARE.<br>
          <br>
          ----<br>
          <br>
          License for Electron:<br>
          <br>
          Copyright (c) 2013-2017 GitHub Inc.<br>
          <br>
          Permission is hereby granted, free of charge, to any person obtaining<br>
          a copy of this software and associated documentation files (the<br>
          &quot;Software&quot;), to deal in the Software without restriction, including<br>
          without limitation the rights to use, copy, modify, merge, publish,<br>
          distribute, sublicense, and/or sell copies of the Software, and to<br>
          permit persons to whom the Software is furnished to do so, subject to<br>
          the following conditions:<br>
          <br>
          The above copyright notice and this permission notice shall be<br>
          included in all copies or substantial portions of the Software.<br>
          <br>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,<br>
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF<br>
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND<br>
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE<br>
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION<br>
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION<br>
          WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.<br>
          <br>
          ----<br>
          <br>
          License for Electron-Vue:<br>
          <br>
          The MIT License (MIT)<br>
          <br>
          Copyright (c) 2016 Greg Holguin<br>
          <br>
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br>
          <br>
          The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>
          <br>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.<br>
          <br>
          ----<br>
          <br>
          License for Marked:<br>
          <br>
          Copyright (c) 2011-2014, Christopher Jeffrey (https://github.com/chjj/)<br>
          <br>
          Permission is hereby granted, free of charge, to any person obtaining a copy<br>
          of this software and associated documentation files (the &quot;Software&quot;), to deal<br>
          in the Software without restriction, including without limitation the rights<br>
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br>
          copies of the Software, and to permit persons to whom the Software is<br>
          furnished to do so, subject to the following conditions:<br>
          <br>
          The above copyright notice and this permission notice shall be included in<br>
          all copies or substantial portions of the Software.<br>
          <br>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br>
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br>
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br>
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br>
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br>
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN<br>
          THE SOFTWARE.<br>
          <br>
          ----<br>
          <br>
          License for highlight.js:<br>
          <br>
          Copyright (c) 2006, Ivan Sagalaev<br>
          All rights reserved.<br>
          Redistribution and use in source and binary forms, with or without<br>
          modification, are permitted provided that the following conditions are met:<br>
          <br>
          * Redistributions of source code must retain the above copyright<br>
          notice, this list of conditions and the following disclaimer.<br>
          * Redistributions in binary form must reproduce the above copyright<br>
          notice, this list of conditions and the following disclaimer in the<br>
          documentation and/or other materials provided with the distribution.<br>
          * Neither the name of highlight.js nor the names of its contributors<br>
          may be used to endorse or promote products derived from this software<br>
          without specific prior written permission.<br>
          <br>
          THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY<br>
          EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED<br>
          WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE<br>
          DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY<br>
          DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES<br>
          (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;<br>
          LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND<br>
          ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT<br>
          (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS<br>
          SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.<br>
          <br>
          ----<br>
          <br>
          License for github-markdown-css:<br>
          <br>
          The MIT License (MIT)<br>
          <br>
          Copyright (c) Sindre Sorhus &lt;sindresorhus@gmail.com&gt; (sindresorhus.com)<br>
          <br>
          Permission is hereby granted, free of charge, to any person obtaining a copy<br>
          of this software and associated documentation files (the &quot;Software&quot;), to deal<br>
          in the Software without restriction, including without limitation the rights<br>
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br>
          copies of the Software, and to permit persons to whom the Software is<br>
          furnished to do so, subject to the following conditions:<br>
          <br>
          The above copyright notice and this permission notice shall be included in<br>
          all copies or substantial portions of the Software.<br>
          <br>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br>
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br>
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br>
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br>
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br>
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN<br>
          THE SOFTWARE.<br>
        </p>
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close">Close</button>
      </div>
    </dialog>
  </div>
</template>

<script>
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
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    data: function () {
      return mainData
    },
    mounted: function () {
      // register licenses dialog
      // TODO: move to separate component
      const dialog = document.querySelector('dialog')
      console.log(dialog)
      dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close()
      })
      ipcRenderer.on('show-licenses', (event, arg) => {
        dialog.showModal()
      })
    }
  }
</script>

<style src="../assets/main.css"></style>
