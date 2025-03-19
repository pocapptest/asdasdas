# Fibonacci in Python

The Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1. In Python, we can generate a Fibonacci sequence using various methods. Here is a simple implementation using a for loop:

def fibonacci(n):
    a, b = 0, 1
    for i in range(n):
        a, b = b, a + b
    return a

# Test the function
print(fibonacci(10))  # Output: 55

In the above code, `n` is the position of the Fibonacci sequence to return. The function starts by initializing two variables `a` and `b` to `0` and `1`, which are the first two numbers in the Fibonacci sequence. Then it enters a loop that runs `n` times. In each iteration of the loop, it updates `a` and `b` to `b` and `a + b`, which are the next two numbers in the sequence. Finally, it returns `a`, which is the `n`th number in the Fibonacci sequence.