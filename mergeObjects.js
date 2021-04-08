// const obj1 = {
//     a: true,
//     b: {
//         b1: true,
//         b2: "foo-bar",
//         b3: [
//             "foo",
//             "bar"
//         ],
//         b4: () =>{},
//     },
//     c: [
//         "c1",
//         "c2",
//     ],
// };
// const obj2 = {
//     b: {
//         b1: false,
//         b3: [
//             "congo"
//         ],
//     },
//     c: [
//         "c2",
//         "c3"
//     ],
// };

const a1 = { arr1: [1, 2, 3], c : () => {}, arr3: ['2', 'a'], k: Symbol('X') };
const a2 = { arr1: [2, 3, 4, 5], d: () => {} };

function customMerge(obj1, obj2) {
    if (!obj1 && !obj2) throw new ReferenceError('given paramters are empty or undefined')
    if (obj1.constructor !== Object || obj2.constructor !== Object) throw new TypeError('given parameters are not an object')

    let mergedObject = {}
    if (Object.keys(obj1).length < 1 && Object.keys(obj2).length < 1) return mergedObject;
    
    for (key in obj2) {
        if (obj2[key].constructor === Function || obj2[key].constructor === Symbol) {
            delete obj2[key];
        } else {
            mergedObject[key] = obj2[key]
        }
    }
    
    
    for (key in obj1) {
        if (!obj2[key] && (obj1[key].constructor !== Function && obj1[key].constructor !== Symbol)) mergedObject[key] = obj1[key];
        if (obj2[key] && obj2[key].constructor === Array) mergedObject[key] = obj1[key].concat(obj2) // tamamlanacak
        if (obj2[key] && obj2[key].constructor === Object) mergedObject[key] =  customMerge(obj1[key], obj2[key]);
    }

    return mergedObject;
}

console.log(customMerge(a1, a2))