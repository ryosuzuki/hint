def repeated(f, n):
  count = 1
  a = f
  while count !=n:
    a = compose1(a,f)
    count+=1
  return a

def compose1(f, g):
  def h(x):
    return f(g(x))
  return h