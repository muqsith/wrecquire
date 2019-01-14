const path = require('path');

delete require.cache[require.resolve(__filename)];

const sampleAspects = {
    before: Function.prototype,
    after: Function.prototype,
};

function getFunctionsNames(obj) {
    // courtesy: https://stackoverflow.com/a/31055217/2388706
    let fNames = [];
    do {
        fNames = fNames.concat(Object.getOwnPropertyNames(obj)
            .filter((p) => (p !== 'constructor' && typeof obj[p] === 'function')));
    } while ((obj = Object.getPrototypeOf(obj)) && obj !== Object.prototype);

    return fNames;
};

function getFnWithAspects(fn, aspects) {
    return (function (...args) {
        const that = this;
        const beforeResult = aspects.before.apply(null);
        const beforeResultIsPromiseType = (beforeResult && typeof beforeResult.then === 'function'
            && typeof beforeResult.catch === 'function');
        let fnResult = null;
        if (beforeResultIsPromiseType) {
            beforeResult
                .then(() => {
                    fnResult = fn.apply(that, args);
                })
                .catch(() => {
                    fnResult = fn.apply(that, args);
                });
        } else {
            fnResult = fn.apply(that, args);
        }
        const fnResultIsPromiseType = (fnResult && typeof fnResult.then === 'function'
            && typeof fnResult.catch === 'function');
        let afterResult = null;
        if (fnResultIsPromiseType) {
            return fnResult
                .then((result) => {
                    afterResult = aspects.after.apply(null);
                    return Promise.resolve(result);
                })
                .catch((err) => {
                    afterResult = aspects.after.apply(null);
                    return Promise.reject(err);
                });
        } else {
            afterResult = aspects.after.apply(null);
        }
        const afterResultPromiseType = (afterResult && typeof afterResult.then === 'function'
            && typeof afterResult.catch === 'function');
        if (afterResultPromiseType) {
            afterResult.then(() => {
                return fnResult;
            }).catch(() => {
                return fnResult;
            });
        } else {
            return fnResult;
        }
    });
}

function isConstructorFn(fn) {
    const o = new fn();
    return !!(o instanceof fn);
}

function getConstructorFnWithAspects(requiredModule, aspectsCopy) {
    const fnNames = getFunctionsNames(requiredModule.prototype);
    for (const fnName of fnNames) {
        const originalFunction = requiredModule.prototype[fnName];
        const fnWithAspects = getFnWithAspects(originalFunction, aspectsCopy);
        requiredModule.prototype[fnName] = fnWithAspects;
    }
    return requiredModule;
}

function applyAspects(requiredModule, aspects) {
    let result = null;
    const aspectsCopy = Object.assign(sampleAspects, aspects);
    if (typeof requiredModule === 'object') {
        const fnNames = getFunctionsNames(requiredModule);
        for (const fnName of fnNames) {
            const originalFunction = requiredModule[fnName];
            const fnWithAspects = getFnWithAspects(originalFunction, aspectsCopy);
            requiredModule[fnName] = fnWithAspects;
        }
        result = requiredModule;
    } else if (typeof requiredModule === 'function') {
        if (isConstructorFn(requiredModule)) {
            result = getConstructorFnWithAspects(requiredModule, aspectsCopy);
        } else {
            result = getFnWithAspects(requiredModule, aspectsCopy);
        }
    }
    return result;
}

function wrecquire(modulePath, aspects) {
    const dirname = path.dirname(module.parent.id);
    const absoluteModulePath = path.resolve(dirname, modulePath);
    const requiredModule = require(absoluteModulePath);
    return applyAspects(requiredModule, aspects);
}

module.exports = wrecquire;
