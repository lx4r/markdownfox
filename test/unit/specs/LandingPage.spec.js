import Vue from 'vue'
import LandingPage from '@/components/LandingPage'
const path = require('path')

describe('LandingPage.vue', () => {
  it('should have a created hook', () => {
    expect(LandingPage.mounted).to.be.a('function')
  })

  it('should set the correct default data', () => {
    expect(LandingPage.data).to.be.a('function')
    const defaultData = LandingPage.data()
    expect(defaultData.renderedMD).to.equal(null)
    expect(defaultData.fileOpen).to.equal(false)
  })

  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(LandingPage)
    }).$mount()

    expect(vm.$el.querySelector('#welcome-text').textContent).to.contain('Welcome to MarkDawn :)')
  })

  it('should have a created hook', () => {
    expect(LandingPage.mounted).to.be.a('function')
  })

  describe('methods.updateView', () => {
    it('should update the view with correctly rendered Markdown when the first file is opened', () => {
      const Ctor = Vue.extend(LandingPage)
      const vm = new Ctor().$mount()

      const testMD = '# awesome'
      const expectedRenderedMD = '<h1 id="awesome">awesome</h1>\n'
      vm.updateView('/dev/test/test.md', testMD)

      expect(vm.renderedMD).to.equal(expectedRenderedMD)
      // wait a "tick" after state change before asserting DOM updates
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#rendered-markdown').innerHTML).to.contain(expectedRenderedMD)
      })
    })
    it('should update the view with correctly rendered Markdown when the same file is updated', () => {
      const Ctor = Vue.extend(LandingPage)
      const vm = new Ctor().$mount()

      const testMD = '# awesome'
      const testMD2 = '# awesome42'
      const expectedRenderedMD = '<h1 id="awesome42">awesome42</h1>\n'
      vm.updateView('/dev/test/test.md', testMD)
      vm.updateView('/dev/test/test.md', testMD2)

      expect(vm.renderedMD).to.equal(expectedRenderedMD)
      // wait a "tick" after state change before asserting DOM updates
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#rendered-markdown').innerHTML).to.contain(expectedRenderedMD)
      })
    })

    it('should update the view with correctly rendered Markdown when a second file is opened', () => {
      const Ctor = Vue.extend(LandingPage)
      const vm = new Ctor().$mount()

      const testMD = '# awesome'
      const testMD2 = '# awesome42'
      const expectedRenderedMD = '<h1 id="awesome42">awesome42</h1>\n'
      vm.updateView('/dev/test/test1.md', testMD)
      vm.updateView('/dev/test/test2.md', testMD2)

      expect(vm.renderedMD).to.equal(expectedRenderedMD)
      // wait a "tick" after state change before asserting DOM updates
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#rendered-markdown').innerHTML).to.contain(expectedRenderedMD)
      })
    })

    it('should ensure the rendered Markdown has correct image paths', () => {
      const Ctor = Vue.extend(LandingPage)
      const vm = new Ctor().$mount()

      const testMD = '# awesome\n![](image.png)'
      const expectedPath = path.resolve('/dev/test', 'image.png') // using resolve here as the wanted output is platform dependent, TODO: better solution?
      const expectedRenderedMD = '<h1 id="awesome">awesome</h1><p><img src="' + expectedPath + '" alt=""></p>'
      vm.updateView('/dev/test/test1.md', testMD)

      expect(vm.renderedMD).to.equal(expectedRenderedMD)
      /* // wait a "tick" after state change before asserting DOM updates
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#rendered-markdown').innerHTML).to.contain(expectedRenderedMD)
      }) */
    })
  })
})
