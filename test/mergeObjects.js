const expect = require('chai').expect;
const { customMerge } = require('../mergeObjects');

// this test is written to test all edge cases and functionality of customMerge function
describe('test of all edge cases for cutomMerge function', () => {
    it('if both given parameters are empty ,it throws ReferenceError', (done) => {
        expect(()=> { customMerge() }).to.throw(ReferenceError);
        done();
    });

    it('if one of the given parameter is empty ,it returns other one without functions and symbols', (done) => {
        const obj1 = {a: true, b: [1, 2, 3], c: () => {return true}}; 
        expect(customMerge(obj1)).to.deep.equal({ a: true, b: [1, 2, 3] }); // it will return obj1 without c (function), 
        done();
    });

    it('if one of the given parameter is not object ,it throws TypeError', (done) => {
        expect(() => { customMerge("123", { a: 1, b: [1, 2] }) }).to.throw(TypeError);
        done();
    });

    it('if both given parameter is empty object ,it returns empty', (done) => {
        expect(customMerge({}, {})).to.deep.equal({});
        done();
    });

    it('if both given parameters are object, it returns merged object regarding rules', (done) => {
        // all rules are okey, if element primitive last one will crash first one, 
        // if element is function or symbol will be ignored,
        // if element is arrray it will be concatenated
        // if element is object ,it will merged again with customMerge function
        const obj1 = {
            a: true,
            b: { b1: true, b2: "foo-bar", b3: ["foo", "bar"], b4: () =>{} },
            c: [ "c1", "c2"],
        };
        const obj2 = {
            b: { b1: false, b3: ["congo"] },
            c: [ "c2", "c3" ],
        };
        const result = {a: true, b: { b1: false, b2: "foo-bar", b3: ["foo", "bar", "congo"] }, c: ["c1", "c2", "c3"]}

        const mergedObject = customMerge(obj1, obj2);
        expect(mergedObject).to.deep.equal(result);
        done();
    })
})
