const funcCache = require('../../src/func-cache.js');

describe('funcCache.js', () => {
    describe('constructor', () => {
        it('should be function', () => {
            expect(typeof funcCache).to.eql('function');
        });

        it('should return a function', () => {
            const func = funcCache();
            expect(typeof func).to.eql('function');
        });
    });

    describe('error', () => {
        it('should throw error if the first argument is not a function', () => {
            const c = funcCache();
            const invalidFunc = 'im evil';

            expect(() => c(invalidFunc)).to.throw(Error);
        });
    });

    describe('test cache and return result', () => {
        it('cache and return with arguments as number', () => {
            const c = funcCache(true);
            const plus = (x, y) => {
                return x + y;
            };

            expect(c(plus, 1, 2)).to.eql(plus(1, 2));
            expect(c(plus, 2, 2)).to.eql(plus(2, 2));
            expect(c(plus, 1, 2)).to.eql(plus(1, 2));
            expect(c(plus, 2, 2)).to.eql(plus(2, 2));
            expect(c(plus, 1, 2)).to.eql(plus(1, 2));
        });

        it('cache and return with arguments as object', () => {
            const c = funcCache(true);
            const plus = (obj) => {
                return obj.x + obj.y;
            };

            expect(c(plus, {x: 1, y: 2})).to.eql(plus({x: 1, y: 2}));
            expect(c(plus, {x: 1, y: 2})).to.eql(plus({x: 1, y: 2}));
            expect(c(plus, {x: 2, y: 2})).to.eql(plus({x: 2, y: 2}));
            expect(c(plus, {x: 2, y: 2})).to.eql(plus({x: 2, y: 2}));
            expect(c(plus, {x: 3, y: 2})).to.eql(plus({x: 3, y: 2}));
            expect(c(plus, {x: 3, y: 2})).to.eql(plus({x: 3, y: 2}));
        });

        it('cache and return with arguments as array', () => {
            const c = funcCache(true);
            const plus = (arr) => {
                return arr[0] + arr[1];
            };

            expect(c(plus, [1,2])).to.eql(plus([1,2]));
            expect(c(plus, [1,2])).to.eql(plus([1,2]));
            expect(c(plus, [2,2])).to.eql(plus([2,2]));
            expect(c(plus, [2,2])).to.eql(plus([2,2]));
            expect(c(plus, [3,2])).to.eql(plus([3,2]));
            expect(c(plus, [3,2])).to.eql(plus([3,2]));
        });

        it('it should cache method as well', () => {
            const c = funcCache(true);

            class Math {
                plus(arr) {
                    return arr[0] + arr[1];
                }
            }

            const m = new Math();

            expect(c(m.plus, [1,2])).to.eql(m.plus([1,2]));
            expect(c(m.plus, [1,2])).to.eql(m.plus([1,2]));
            expect(c(m.plus, [2,2])).to.eql(m.plus([2,2]));
            expect(c(m.plus, [2,2])).to.eql(m.plus([2,2]));
            expect(c(m.plus, [3,2])).to.eql(m.plus([3,2]));
            expect(c(m.plus, [3,2])).to.eql(m.plus([3,2]));
        });
    });
});