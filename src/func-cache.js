function funcCache() {
    const result = {};

    function getKey(func, params) {
        return JSON.stringify([func.name, params]);
    }

    return function() {

        if (arguments.length < 1 || typeof arguments[0] !== 'function') {
            throw new Error('First argument should be a function')
        }
        let argv = [];
        for(const k in arguments) {
            argv.push(arguments[k])
        }

        const func = argv.shift();

        const key = getKey(func, argv);

        if (undefined === result[key]) {
            result[key] = func.apply(func, argv);
            console.log('No cache: ', func.name, argv);
        }

        return result[key];
    }
}

module.exports = funcCache;