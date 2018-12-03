/**
 * @jest-environment jsdom
 */

jest.mock('../src/environment.ts', () => ({
  IS_DEV: true,
  IS_PROD: false,
}))

import { AbstractMarkdown } from '../src/abstract-markdown'
import Vue, { VueConstructor } from "vue/dist/vue";
import { Mixins, Component } from 'vue-property-decorator';
import { mount } from '@vue/test-utils';

describe(`AbstractMarkdown`, () => {
  @Component
  class Md extends AbstractMarkdown {
    toHtml(text: string, options?){
      return text.replace(/\*\*/g, '--');
    }
    parseEmoji(text: string) {
      return text.replace(/\:\)/g, '<img smile>');
    }
  }

  beforeEach(() => {
    // markdown = Vue.extend(AbstractMarkdown);
  })

  it(`should create abstract markdown component`, () => {
    const vOpt = {
      components: { AbstractMarkdown },
      template: '<abstract-markdown>hello **world**</abstract-markdown>'
    };
    const Comp = Vue.extend({
      components: { AbstractMarkdown },
      template: '<abstract-markdown>hello **world**</abstract-markdown>'
    });
    // const wrapper = mount(vOpt);
    const vComp = new Comp().$mount();
    expect(vComp.$el).toMatchSnapshot();
  })

  it(`should mixin the abstract markdown component with slot`,  () => {
    const vOpts = {
      components: { Md },
      template: '<md>hello:) **world**</md>'
    };
    const wrapper = mount(vOpts);
    const vm = wrapper.vm;
    expect(vm.$el).toMatchSnapshot();
  })

  it(`should mixin the abstract markdown component with source prop`,  (done) => {
    const vOpts = {
      components: { Md },
      data: function() {
        return {
          text: 'hello pro **world**'
        }
      },
      template: '<md :source="text"></md>'
    };
    const wrapper = mount(vOpts);
    const vm = wrapper.vm;

    expect(vm.$el).toMatchSnapshot();
    vm['text'] = 'ok it **as**';
    vm.$nextTick(()=>{
      expect(vm.$el).toMatchSnapshot();
      done();
    })
  })

  it(`should mixin the abstract markdown component with invisible`,  () => {
    const vOpts = {
      components: { Md },
      data: function() {
        return {
          visible: true
        }
      },
      template: '<md :visible="visible">hello **world**</md>'
    };
    const wrapper = mount(vOpts);
    const vm = wrapper.vm;
    vm['visible'] = false;
    expect(vm.$el).toMatchSnapshot();
  })

})
