// Task
// Provide 3 unique implementations of the following function in JavaScript
// **Input**: `n` - any integer
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Solution 1
const sum_to_n_a = (n: number) => {
  return (n * (n + 1)) / 2;
};

// Solution 2
const sum_to_n_b = (n: number) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Solution 3
const sum_to_n_c = (n: number) => {
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_a(n - 1);
};
