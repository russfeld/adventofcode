import re
from collections import OrderedDict


with open("input15.txt") as file:
  #limit = 20
  limit = 4000000
  target_row = limit // 2
  beacons_in_row = set()
  sensors = {}
  prog = re.compile("^Sensor at x=(-?\d*), y=(-?\d*): closest beacon is at x=(-?\d*), y=(-?\d*)$")
  overlaps = []
  for line in file:
    result = prog.match(line)
    sensor = (int(result[1]), int(result[2]))
    beacon = (int(result[3]), int(result[4]))
    if beacon[1] == target_row:
      beacons_in_row.add(beacon)
    distance = abs(sensor[0] - beacon[0]) + abs(sensor[1] - beacon[1])
    sensors[sensor] = distance
    width = distance - abs(sensor[1] - target_row)
    if width > 0:
      # print("{} : {} : {} : {}".format(sensor, beacon, distance, width))
      offset = width
      overlaps.append((sensor[0] - offset, sensor[0] + offset))

  # part 1
  overlaps.sort()
  count = -1 * len(beacons_in_row)
  prev = overlaps[0][0]
  for item in overlaps:
    if item[1] <= prev:
      continue
    if item[0] > prev:
      prev = item[0]
    count += (item[1] - prev) + 1
    prev = item[1] + 1
  print(count)

  # part 2
  ordered_sensors = OrderedDict(sorted(sensors.items()))
  complete = False
  for i in range(limit + 1):
    #print("row {}".format(i))
    left = 0
    right = 0
    overlaps = []
    for sensor, distance in ordered_sensors.items():
      width = distance - abs(sensor[1] - i)
      if width > 0:
        overlaps.append((sensor[0] - width, sensor[0] + width))
    overlaps.sort()
    overlaps[0][0]
    right = overlaps[0][0]
    if i % 1000 == 0:
      print(i)
    for item in overlaps:
      # print("{} {}".format(right, item))
      if item[0] > right:
        complete = True
        print("{} : {}".format(item[0] - 1, i))
        print((item[0] - 1) * 4000000 + i)
        break
      if item[1] > right:
        right = item[1]
    if complete:
      break
    


