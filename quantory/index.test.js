const subject = require("../quantory/index")

test.skip('Test the basic scenario', () => {
    let arr = [1,2,3,[4],5,6];
    
    console.log("Chain: " + subject.flatten(arr));

    expect(subject.flatten(arr)).toEqual([1,2,3,4,5,6]);
})

test.skip('Test scenario for depth 1', () => {
    let arr = [1,[2,3,[4],5],6];
    
    expect(subject.flatten(arr, 1)).toEqual([1,2,3,[4],5,6]);
})

test.skip('Test scenario for depth 2', () => {
    let arr = [1,[2,3,[4],5],6];
    
    expect(subject.flatten(arr, 2)).toEqual([1,2,3,4,5,6]);
})

test.skip('Test random scenario for depth 5', () => {
    let arr = [1,[2,3,[4],5],6,[7,8],9,[10,11,[[12,[13,[14]],15],16]]];
    
    console.log("Chain: " + JSON.stringify(subject.flatten(arr, 5)));

    expect(subject.flatten(arr, 5)).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
})

test('Test convertToArray basic scenario', () => {
    let arr = JSON.stringify([1,2,[3,4,5],6]);

    let result = subject.convertToArray(arr);

    console.log("Result: " + JSON.stringify(result));

    expect(result).toEqual([1,2,[3,4,5],6]);
})

test('Test convertToArray basic scenario', () => {
    let arr = JSON.stringify([1,2,[3,4,5],6]);

    let result = subject.convertToArray(arr);
    
    console.log("Result: " + JSON.stringify(result));

    expect(result).toEqual([1,2,[3,4,5],6]);
})

test('Test convertToArray sequence depth scenario', () => {
    let arr = [1,2,[3,4,5],6,[7,[[8,[9]]]]];
    arr = JSON.stringify(arr);

    let result = subject.convertToArray(arr);
    
    console.log("Result: " + JSON.stringify(result));

    expect(result).toEqual(JSON.parse(arr));
})

test('Test convertToArray random scenario', () => {
    let arr = [1,2,[3,4,5],6,[7,[8,[9,[10,11]]],12]];
    arr = JSON.stringify(arr);

    let result = subject.convertToArray(arr);

    console.log("Result: " + JSON.stringify(result));

    expect(result).toEqual(arr);
})

test('Test evaluateNextInt basic scenario', () => {
    let arrPart = '10,12]]';
    
    let result = subject.evaluateNextInt(arrPart, 1);

    expect(result.nextInt).toEqual(10);
    expect(result.nextId).toEqual(3);
})

test('Test evaluateNextInt basic scenario for ended bracket', () => {
    let arrPart = '10],12]]';
    
    let result = subject.evaluateNextInt(arrPart, 1);

    expect(result.nextInt).toEqual(10);
    expect(result.nextId).toEqual(3);
})

test('Test evaluateNextInt basic scenario for ended bracket and long number', () => {
    let arrPart = '100000200],12]]';
    
    let result = subject.evaluateNextInt(arrPart, 1);

    expect(result.nextInt).toEqual(100000200);
    expect(result.nextId).toEqual(10);
})