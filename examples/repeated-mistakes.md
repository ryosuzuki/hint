
# Problem Set
```py
Return the function that computes the nth application of f.
>>> add_three = repeated(increment, 3)
>>> add_three(5)
8
>>> repeated(triple, 5)(1) # 3 * 3 * 3 * 3 * 3 * 1
243
>>> repeated(square, 2)(5) # square(square(5))
625
>>> repeated(square, 4)(5) # square(square(square(square(5))))
152587890625
>>> repeated(square, 0)(5)
5

def repeated(f, n):
  "*** YOUR CODE HERE ***"

def compose1(f, g):
  def h(x):
    return f(g(x))
  return h
```

# Inconsistent return type

`repeated` function should return function, but you're returning value
```diff
def repeated(f, n):
  "*** YOUR CODE HERE ***"
  if n == 0:
-   return x
+   return lambda x: x
  else:
-   return f(repeated(f, n - 1))
+   return lambda x: f(repeated(f, n - 1)(x))
```

`repeated` function should return function, but you're returning value
```diff
def repeated(f, n):
  if n == 0:
    def return_value(x):
      return x
    return return_value
  k = 1
  original_function = f
  while k < n:
    original_function = compose1(f,original_function)
    k += 1
- return x
+ return original_function
```

number of arguments or type of arguments is inconsistent 
```diff
def repeated(f, n):
  "*** YOUR CODE HERE ***"
  if n == 0:
    return identity
  else:
-   return compose1(f, repeated(n-1))
+   return compose1(f, repeated(f, n-1))
```

`f` only takes a value as arguments. `repeated` function returns function, so `repeated(-, -)` is function, not value. `repeated(-, -)(x)` will return value 
```diff
def repeated(f, n):
  if n == 0:
    return identity
  if n == 1:
    return f
  else:
    def func(x):
-     return f(repeated(f, n-1))
+     return f(repeated(f, n-1)(x))
    return func
```


# Discrepancy of variables

not `n`, but `z`
```diff
def repeated(f, n):
  def helper(y):
    z = n
-   while n > 0:
+   while z > 0:
      y = f(y)
      z -= 1
    return y
  return helper
```

not `total = n`, but `x`
```diff
def repeated(f, n):
  def h(x):
-   i, total = 1, n
+   i, total = 1, x
    while i <= n:
      total = f(total)
      i += 1
    return total
  return h
```

not return `n`, but `x`
```diff
def repeated(f, n):
  def inner(x):
    def helper(total, n):
      if n == 0:
-       return n
+       return x
      if n == 1:
        return f(total)
      return helper(f(total),n-1)
    return helper(x, n)
  return inner
```

not `x`, but `i`
```diff
def repeated(f, n):
  def nth(x):
-   x = n
+   i = n
    while x > 0:
      x = f(x)
-     x -= 1
+     i -= 1
    return x
  return nth
```

not `repeat(m)`, but `repeat(n)`

```diff
def repeated(f, n):
  def composed_function(x):
    def repeat(m):
      if m == 0:
        return x
      elif m == 1:
        return f(x)
      else:
        return f(repeat(m-1))
-   return repeat(m)
+   return repeat(n)
  return composed_function
```

not `a`, but `n`
```diff
def repeated(f, n):
  def fun(a):
    x = a
-    for i in range(0, a):
+    for i in range(0, n):
        x = f(x)
    return x
  return fun
```

```diff
def repeated(f, n):
  def repeated_helper(counter):
    if counter == 2:
      return compose1(f,f)
    else:
-     return compose1(f,repeated_helper(n-1))
+     return compose1(f,repeated_helper(counter-1))
  if n == 0:
    return lambda x: x
  if n == 1:
    return f
  else:
    return repeated_helper(n)
```



# Misconception of recursive function 

```diff
def repeated(f, n):
  "*** YOUR CODE HERE ***"
  def h(x):
    if n == 0:
      return x
    else:
-     return f(repeated(h, n-1)(x))
+     return f(repeated(f, n-1)(x))
  return h
```


```diff
def repeated(f, n):
  "*** YOUR CODE HERE ***"
  if n==0:
    return identity
  else:
-   return compose1(identity, repeated(f, n-1))
+   return compose1(f, repeated(f, n-1))
```



# Mistake in a conditon 

You're missing a base case 
```diff
def repeated(f, n):
      return identity
+   if n==0:
+    return identity
    if n==2:
      return h
    else:
      return compose1(f, h, n-1)
  return compose1(f, f, n)
```

You're missing a base case 
```diff
def repeated(f, n):
  if n == 0:
    return lambda x: x
+ if n == 1:
+   return f
  else:
    compose1(f, repeated(f,n-1))
```


You made a mistake in a condition of while loop
```diff
def repeated(f, n):
  if n == 0:
    return identity
  else:
    i = 1
    g = f
-   while i <= n:
+   while i < n:
      f = compose1(f,g)
      i = i+1
    return f
```

`i` should start from 1 not 0
```diff
def repeated(f, n):
  def helper(x):
-   i = 0
+   i = 1
    while i <= n:
      x = f(x)
      i += 1
    return x
  return helper
```

`while` condition is wrong, count should be until `n`, not `n-1`
```diff
def repeated(f, n):
  count = 0
  g = lambda x: x
- while count < n-1:
+ while count < n-0:
    g = compose1(f,g)
    count = count + 1
  return g
```

`return i` should be when `n == 0`, not `n == 1`
```diff
def repeated(f, n):
  def inner_repeated(i):
-   if n == 1:
-     return i
+   if n == 0:
+     return i
    else:
      return f(repeated(f, n-1)(i))
  return inner_repeated
```


# Misunderstanding of a base case

Base case condition is wrong. It should return function, not value
```diff
def repeated(f, n):
  "*** YOUR CODE HERE ***"
  if n == 0:
-   return 0
+   return identity
  elif n == 1:
    return f
  return compose1(f,repeated(f,n-1))
```

Base case condition is wrong. It should return `identity`, not `f`
```diff
def repeated(f, n):
- if n == 0:
-   return f
+ if n == 0:
+   return identity
  elif n <= 2:
    return compose1(f, f)
  else:
    return compose1(f, repeated(f, n-1))
```


# Slip 

n is already defined 
```diff
def repeated(f, n):
- def n(x):
+ def func(x):
    i = k
    while i > 0:
      x = f(x)
      i -= 1
    return x
- return n
+ return func
```

a is not defined 
```diff
def repeated(f, n):
  if n == 0:
    return compose1(identity, identity)
  nested = f
  while n > 1:
    nested = compose1(f, nested)
    n -= 1
- return a
+ return nested
```

misspell 
```diff
def repeated(f, n):
  "*** YOUR CODE HERE ***"
  if n == 0:
    return identity
  else:
-    return compose(f, repeated(f, n-1))
+    return compose1(f, repeated(f, n-1))
```


XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX






```diff
def repeated(f, n):
  "*** YOUR CODE HERE ***"
  def helper(x):
    i = n
    g = identity(x)
    while i != 0:
-     g = compose1(f, g)
+     g = f(g)
      i -= 1
    return g

  return helper
```

? 
```diff
def repeated(f, n):
  if n == 0:
    return identity
  else:
-   return f(repeated(f, n - 1))
+   return compose1(repeated(f, n - 1))
```

?
```diff
def repeated(f, n):
  def fun_stuff(first_num):
    def call(num, index):
-     print(num)
+     print(identity)
      if index == n:
        return num
      return call(f(num),index+1)

    return call(first_num,0)

  return fun_stuff
```
  
