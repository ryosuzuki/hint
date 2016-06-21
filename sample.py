def product(n, term):
  i = 1
  product = 1
  while i <= n:
    product *= term(i)
    i += 1
  return product