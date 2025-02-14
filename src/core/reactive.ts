// 存储副作用函数的桶
export const bucket = new WeakMap<object, Map<string | Symbol, Set<() => void>>>();
let activeEffect: (() => void) | null = null;


// target - key - effectFn 一个代理对象身上的一个key对应一个effectFn
export const reactive = <T extends object>(obj: T): T => {
    return new Proxy(obj, {
        set(target, key, value) {
            Reflect.set(target, key, value);
            trigger(target, key);
            return true;
        },
        get(target, key) {
            const result = Reflect.get(target, key);
            if (!activeEffect) return result;
            track(target, key);
            return result && typeof result === 'object' ? reactive(result) : result;
        }
    });
};

export const effect = (fn: () => void) => {
    activeEffect = fn;
    fn();
    // activeEffect = null;
}

//  track 用于将副作用函数添加到桶中
function track(target: object, key: string | symbol) {
    if (!activeEffect) return;
    let depsMap = bucket.get(target);
    if (!depsMap) {
        depsMap = new Map();
        bucket.set(target, depsMap);
    }
    let effects = depsMap.get(key);
    if (!effects) {
        effects = new Set();
        depsMap.set(key, effects);
    }
    effects.add(activeEffect);
}

// trigger 用于触发副作用函数
function trigger(target: object, key: string | symbol) {
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    if (effects) {
        effects.forEach(effect => effect());
    }
}