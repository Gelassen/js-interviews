const subject = require("../quantory/index")

test('Test the basic scenario', () => {
    let arr = [1,2,3,[4],5,6];
    
    console.log("Chain: " + subject.flatten(arr));

    expect(subject.flatten(arr)).toEqual([1,2,3,4,5,6]);
})

test('Test scenario for depth 1', () => {
    let arr = [1,[2,3,[4],5],6];
    
    expect(subject.flatten(arr, 1)).toEqual([1,2,3,[4],5,6]);
})

test('Test scenario for depth 2', () => {
    let arr = [1,[2,3,[4],5],6];
    
    expect(subject.flatten(arr, 2)).toEqual([1,2,3,4,5,6]);
})

test('Test random scenario for depth 5', () => {
    let arr = [1,[2,3,[4],5],6,[7,8],9,[10,11,[[12,[13,[14]],15],16]]];
    
    console.log("Chain: " + JSON.stringify(subject.flatten(arr, 5)));

    expect(subject.flatten(arr, 5)).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
})