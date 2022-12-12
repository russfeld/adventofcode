from collections import deque

def recurse_size(children, sizes, output, start) -> int:
  if start in children:
    size = sizes[start]
    for child in children[start]:
      size += recurse_size(children, sizes, output, start + "/" + child)
    output[start] = size
    return size
  else:
    output[start] = sizes[start]
    return sizes[start]

with open("input7.txt") as file:
  path = deque("/")
  children = {"/": []}
  sizes = {}
  for line in file:
    line = line.strip()
    if line.startswith("$ cd /"):
      path = deque("/")
    elif line.startswith("$ cd .."):
      path.pop()
    elif line.startswith("$ cd "):
      folder = line.split(" ")[2]
      path.append(folder)
    elif line.startswith("$ ls"):
      # folder = path[-1]
      folder = "/".join(path)
      if folder in sizes:
        # because of course this is a thing
        print("Error? Already seen this folder " + folder)
      else:
        sizes[folder] = 0
    elif line.startswith("dir"):
      # parent = path[-1
      parent = "/".join(path)
      child = line.split(" ")[1]
      if parent not in children:
        children[parent] = []
      children[parent].append(child)
    else:
      # folder = path[-1]
      folder = "/".join(path)
      size = int(line.split(" ")[0])
      sizes[folder] += size
  # print(children)
  # print(sizes)
  output = {}
  recurse_size(children, sizes, output, "/")
  # print(output)
  ## part 1
  # total = 0
  # for folder, size in output.items():
  #   if size < 100000:
  #     total += size
  # print(total)
  values = list(output.values())
  values.sort()
  # print(values)
  need = 30000000 - (70000000 - output["/"])
  # print(need)
  for i in values:
    if i < need:
      continue
    break
  print(i)
  