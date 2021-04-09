// const a1 = { arr1: [1, 2, 3], c : () => {}, arr3: ['2', 'a'], k: Symbol('X'), f: '2' };
// const a2 = { arr1: [2, 3, 4, 5], d: () => {}, f: 3 };

function concatArray(arr1, arr2) { // it merge both given array and filters duplicates
    let concat = [...arr1, ...arr2];
    const concatWithoutDuplicate = concat.filter((item, index) => concat.indexOf(item) === index);
    return concatWithoutDuplicate;
}

 const customMerge = (obj1, obj2) => {
    if (!obj1 && !obj2) throw new ReferenceError('given paramters both are empty or undefined');
    if (!obj1 || !obj2) (obj1)?obj2={}:obj1={} // if one of the given parameter is empty it assign empty object to empty param tok continue process
    if (obj1.constructor !== Object || obj2.constructor !== Object) throw new TypeError('given parameters are not an object')
    
    let mergedObject = {}
    if (Object.keys(obj1).length < 1 && Object.keys(obj2).length < 1) return mergedObject;
    
    for (key in obj2) { // to assign all values of obj2 to mergedObject without referencing and functions & symbol
        if (obj2[key].constructor === Function || obj2[key].constructor === Symbol) {
            delete obj2[key];
        } else {
            mergedObject[key] = obj2[key]
        }
    }

    for (key in obj1) {
        if (obj2[key] === undefined && (obj1[key].constructor !== Function && obj1[key].constructor !== Symbol)) mergedObject[key] = obj1[key]; // if keys are not included in other object also if not function or symbol it adds directly to mergedObject
        if (obj2[key] && obj1[key].constructor !== obj2[key].constructor) throw new TypeError(`You are trying to merge ${obj1[key].constructor.name} with ${obj2[key].constructor.name}`); // if same key includes different types of variable it gives type error
        if (obj2[key] && obj2[key].constructor === Array) mergedObject[key] = concatArray(obj1[key], obj2[key]); // if elements are array it is concatenating without duplicate
        if (obj2[key] && obj2[key].constructor === Object) mergedObject[key] =  customMerge(obj1[key], obj2[key]); // recursive function for deep merge of nested objects
    }

    return mergedObject;
}

module.exports = { customMerge }
