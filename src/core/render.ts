// src/core/render.ts
import type { VNode } from "../type/type";

// 渲染器函数简单实现
export function render(vNode: VNode, container?: HTMLElement) {
    const el = document.createElement(vNode.tag);
    for (const key in vNode.props) {
        if (/^on/.test(key)) {
            const eventName = key.substring(2).toLowerCase();
            const handler = vNode.props[key] as EventListener;
            el.addEventListener(eventName, handler);
        } else {
            el.setAttribute(key, vNode.props[key] as string);
        }
    }
    if (vNode.children) {
        if (typeof vNode.children === 'string') {
            el.appendChild(document.createTextNode(vNode.children));
        } else if (Array.isArray(vNode.children)) {
            vNode.children.forEach(child => {
                render(child, el);
            });
        }
    }
    if (container) {
        container.appendChild(el);
    }
}
