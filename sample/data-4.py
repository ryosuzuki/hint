def repeated(f, n):
  def h(x):
    i, total = 1, n
    while i <= n:
      total = f(total)
      i += 1
    return total
  return h