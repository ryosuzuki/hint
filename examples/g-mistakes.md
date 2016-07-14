
# Problem Set
```py
Return the value of G(n), computed recursively.
>>> g(1)
1
>>> g(2)
2
>>> g(3)
3
>>> g(4)
10
>>> g(5)
22
>>> from construct_check import check
>>> check(HW_SOURCE_FILE, 'g', ['While', 'For'])
True

def g(n):
  "*** YOUR CODE HERE ***"
```

# Student's code and fixed code

```diff
def g(n):
  if n <= 3:
    return n
  elif n > 3:
-   return g(n - 1) + 2 * g(n - 2) + 3 * g(n - 1)
+   return g(n - 1) + 2 * g(n - 2) + 3 * g(n - 3)
```

```diff
def g(n):
- if n < 3:
+ if n <= 3:
    return n
  else:
    return g(n - 1) + (2 * g(n - 2)) + (3 * g(n - 3))
```

```diff
def g(n):
- if n >= 3:
+ if n <= 3:
    return n
  else:
    return g(n-1) + 2 * g(n-2) + 3 * g(n-3)
```

```diff
def g(n):
- def compute_G(i):
+ def compute_G(i, value):
    if n <= 3:
      return n
-   elif i < 5:
-     i += 1
-     return (i-1)*g(n - (i-1))
+   elif i < 4:
+     return compute_G(i + 1, value + i*g(n - i))
+   return value
  return compute_G(1)
```

```diff
def g(n):
  if n <= 3:
    return n
  else:
-   return g(n-1) * g(n-2) * g(n-3)
+   return g(n-1) + 2*g(n-2) + 3*g(n-3)
```

```diff
def g(n):
  if n<=3:
    return n
  else:
-   return n+g(n-1)+(2*g(n-2))+(3*g(n-3))
+   return g(n-1) + 2*g(n-2) + 3*g(n-3)
```

```diff
def g(n):
  if n <= 3:
    return n
- return G(n-1) + 2 * G(n-2) + 3 * G(n-3)
+ return g(n-1) + 2 * g(n-2) + 3 * g(n-3)
```









