import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import H1Component from '~/shared/ui/BaseH1/ui/H1.vue'

// Мокаем useRequestURL для тестов
vi.mock('#app', () => ({
  useRequestURL: () => ({
    pathname: '/test-page',
  }),
}))

describe('h1Component.vue', () => {
  it('отображает пропс head, если он передан', () => {
    const wrapper = mount(H1Component, {
      props: {
        head: 'Тестовый заголовок',
      },
    })

    expect(wrapper.find('h1').text()).toBe('Тестовый заголовок')
    expect(wrapper.find('div[v-if]').exists()).toBe(true)
  })

  it('вызывает h1Search, если пропс head не передан', () => {
    // Мокаем функцию h1Search для отслеживания вызовов
    const h1SearchSpy = vi.fn().mockReturnValue('Найденный заголовок')

    const wrapper = mount(H1Component, {
      global: {
        mocks: {
          h1Search: h1SearchSpy,
        },
      },
      props: {},
    })

    // Проверяем, что функция была вызвана
    expect(h1SearchSpy).toHaveBeenCalled()
    // Проверяем результат
    expect(wrapper.find('h1').text()).toBe('Найденный заголовок')
  })

  it('корректно ищет заголовок по URL в NAVIGATION_LINK', () => {
    // Подготавливаем тестовые данные
    const testNavigationLink = [
      { page: '/test-page', h1: 'Заголовок для тестовой страницы' },
      { page: '/other-page', h1: 'Другой заголовок' },
    ]

    // Заменяем реальный NAVIGATION_LINK на тестовый
    vi.mock('~/app/route', () => ({
      NAVIGATION_LINK: testNavigationLink,
    }))

    const wrapper = mount(H1Component, {
      props: {},
    })

    expect(wrapper.find('h1').text()).toBe('Заголовок для тестовой страницы')
  })

  it('отображает пустой h1, если совпадение не найдено', () => {
    // Тестовые данные без совпадения
    const noMatchNavigationLink = [
      { page: '/other-page', h1: 'Другой заголовок' },
    ]

    vi.mock('~/app/route', () => ({
      NAVIGATION_LINK: noMatchNavigationLink,
    }))

    const wrapper = mount(H1Component, {
      props: {},
    })

    expect(wrapper.find('h1').text()).toBe('')
  })

  it('корректно работает с разными URL', () => {
    const navigationLink = [
      { page: '/home', h1: 'Главная' },
      { page: '/about', h1: 'О нас' },
      { page: '/contact', h1: 'Контакты' },
    ]

    // Мокаем useRequestURL с разными путями
    vi.mock('#app', () => ({
      useRequestURL: () => ({ pathname: '/about' }),
    }))

    const wrapper = mount(H1Component, {
      props: {},
    })

    expect(wrapper.find('h1').text()).toBe('О нас')
  })
})
