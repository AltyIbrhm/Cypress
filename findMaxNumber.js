// Find the highest number in an array using JavaScript

// Method 1: Using Math.max() with spread operator
function findMaxNumber1(arr) {
    return Math.max(...arr);
}

// Method 2: Using Math.max() with apply()
function findMaxNumber2(arr) {
    return Math.max.apply(null, arr);
}

// Method 3: Using reduce() method
function findMaxNumber3(arr) {
    return arr.reduce((max, current) => Math.max(max, current), arr[0]);
}

// Method 4: Using for loop (traditional approach)
function findMaxNumber4(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Method 5: Using sort() method
function findMaxNumber5(arr) {
    return arr.sort((a, b) => b - a)[0];
}

// Test the functions
const numbers = [3, 7, 2, 9, 1, 5, 8, 4, 6];

console.log("Original array:", numbers);
console.log("Method 1 (Math.max with spread):", findMaxNumber1(numbers));
console.log("Method 2 (Math.max with apply):", findMaxNumber2(numbers));
console.log("Method 3 (reduce):", findMaxNumber3(numbers));
console.log("Method 4 (for loop):", findMaxNumber4(numbers));
console.log("Method 5 (sort):", findMaxNumber5(numbers));

// Test with different arrays
const testArrays = [
    [1, 2, 3, 4, 5],
    [10, 20, 30, 40, 50],
    [-5, -10, -2, -8, -1],
    [100, 200, 300, 400, 500],
    [0.5, 1.5, 2.5, 3.5, 4.5]
];

console.log("\nTesting with different arrays:");
testArrays.forEach((arr, index) => {
    console.log(`Array ${index + 1}: [${arr.join(', ')}] -> Max: ${findMaxNumber1(arr)}`);
});

// Edge cases
console.log("\nEdge cases:");
console.log("Empty array:", findMaxNumber1([])); // Returns -Infinity
console.log("Single element:", findMaxNumber1([42])); // Returns 42
console.log("All same numbers:", findMaxNumber1([5, 5, 5, 5])); // Returns 5 