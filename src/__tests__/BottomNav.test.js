import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/home', component: { template: '<div>home</div>' } }],
})

const global = {
  plugins: [router],
  components: {
    'iconify-icon': { template: '<span class="iconify-icon"><slot/></span>' },
  },
}

describe('BottomNav', () => {
  it('renders without error', async () => {
    router.push('/home')
    await router.isReady()
    const wrapper = mount(BottomNav, { props: { hidden: false }, global })
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('hides when hidden prop is true', async () => {
    router.push('/home')
    await router.isReady()
    const wrapper = mount(BottomNav, { props: { hidden: true }, global })
    expect(wrapper.find('nav').classes()).toContain('translate-y-full')
  })

  it('shows when hidden prop is false', async () => {
    router.push('/home')
    await router.isReady()
    const wrapper = mount(BottomNav, { props: { hidden: false }, global })
    expect(wrapper.find('nav').classes()).toContain('translate-y-0')
  })
})
