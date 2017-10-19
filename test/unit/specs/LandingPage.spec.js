import Vue from 'vue'
import LandingPage from '@/components/LandingPage'

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
    it('should update the view with correctly renedered Markdown when the first file is opened', () => {
      const Ctor = Vue.extend(LandingPage)
      const vm = new Ctor().$mount()

      const testMD = '# awesome'
      const expectedRenderedMD = '<h1 id="awesome">awesome</h1>\n'
      vm.updateView('/dev/test/test.md', testMD)

      expect(vm.renderedMD).to.equal(expectedRenderedMD)
      expect(vm.$el.querySelector('#rendered-markdown').textContent).to.contain(expectedRenderedMD)
    })
  })
})
