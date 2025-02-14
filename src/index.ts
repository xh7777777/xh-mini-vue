// src/index.ts
import { VNode, Component } from './type/type';
import { render } from './core/render';
import { reactive, bucket, effect } from 'core/reactive';

class MiniVue {
  el: string;
  data: any;
  constructor(options: any) {
    this.el = options.el;
    this.data = options.data;

    this._init();
  }

  _init() {
    const app = document.querySelector(this.el);
    if (!app) {
      throw new Error(`Element ${this.el} not found`);
    }
    app.innerHTML = this.data.message;
  }

  public mountElement(vNode: VNode, container: HTMLElement) {
    render(vNode, container);
  }

  public mountComponent(vNode: Component, container: HTMLElement) {
    const subTree = vNode.tag();
    render(subTree, container);
  }

  public renderer(vNode: VNode | Component, container: HTMLElement) {
    if (typeof vNode.tag === 'string') {
      this.mountElement(vNode as VNode, container);
    } else if( typeof vNode.tag === 'function') {
      this.mountComponent(vNode as Component, container);
    }
  }

  public reactive(obj: any) {
    return reactive(obj);
  }

  public effect(fn: () => void) {
    return effect(fn);
  }
}


export default MiniVue;

