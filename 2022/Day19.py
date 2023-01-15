import re, copy
from collections import deque

blueprints = {}


class Blueprint:

  def __init__(self, id, ore, clay, obs_ore, obs_clay, geo_ore, geo_obs):
    self.id = id
    self.ore = ore
    self.clay = clay
    self.obs_ore = obs_ore
    self.obs_clay = obs_clay
    self.geo_ore = geo_ore
    self.geo_obs = geo_obs

  @property
  def max_ore(self):
    return max(self.ore, self.clay, self.obs_ore, self.geo_ore)

  def __str__(self):
    return "Blueprint {}: Ore {}, Clay {}, Obs Ore {} Clay {}, Geode Ore {}, Obs {}".format(self.id, self.ore, self.clay, self.obs_ore, self.obs_clay, self.geo_ore, self.geo_obs)
  
  def __repr__(self):
    return str(self)


class State:

  def __init__(self, ore_bot, clay_bot, obs_bot, geo_bot, ore, clay, obs, geo, remain):
    self.ore_bot = ore_bot
    self.clay_bot = clay_bot
    self.obs_bot = obs_bot
    self.geo_bot = geo_bot
    self.ore = ore
    self.clay = clay
    self.obs = obs
    self.geo = geo
    self.remain = remain
  
  def __str__(self):
    return "Remain {} = Bots OreB {} ClayB {} ObsB {} GeoB {} : Ore {} Clay {} Obs {} Geo {}".format(self.remain, self.ore_bot, self.clay_bot, self.obs_bot, self.geo_bot, self.ore, self.clay, self.obs, self.geo)

  def __repr__(self):
    return str(self)


def simulate(blueprint, minutes):
  # print(blueprint)
  states = deque()
  best = [0 for x in range(minutes + 1)]
  states.append(State(1, 0, 0, 0, 0, 0, 0, 0, minutes))
  while len(states) > 0:
    state = states.popleft()
    geo = state.geo
    if state.geo > best[state.remain]:
      best[state.remain] = state.geo
    for i in range(state.remain, 0, -1):
      geo += state.geo_bot
      if geo > best[i-1]:
        best[i-1] = geo
    
    # prune
    if state.geo < best[state.remain] - 1:
      continue

    # print(state)

    # add ore
    if state.ore_bot > 0 and state.ore_bot < blueprint.max_ore:
      i = 0
      while i < state.remain:
        ore = state.ore + i * state.ore_bot
        if ore >= blueprint.ore:
          i += 1
          states.append(State(
            state.ore_bot + 1,
            state.clay_bot,
            state.obs_bot,
            state.geo_bot,
            state.ore + state.ore_bot * i - blueprint.ore,
            state.clay + state.clay_bot * i,
            state.obs + state.obs_bot * i,
            state.geo + state.geo_bot * i,
            state.remain - i
          ))
          break
        i += 1
    # add clay
    if state.ore_bot > 0 and state.clay_bot < blueprint.obs_clay:
      i = 0
      while i < state.remain:
        ore = state.ore + i * state.ore_bot
        if ore >= blueprint.clay:
          i += 1
          states.append(State(
            state.ore_bot,
            state.clay_bot + 1,
            state.obs_bot,
            state.geo_bot,
            state.ore + state.ore_bot * i - blueprint.clay,
            state.clay + state.clay_bot * i,
            state.obs + state.obs_bot * i,
            state.geo + state.geo_bot * i,
            state.remain - i
          ))
          break
        i += 1
    # add obs
    if state.clay_bot > 0 and state.obs_bot < blueprint.geo_obs:
      i = 0
      while i < state.remain:
        ore = state.ore + i * state.ore_bot
        clay = state.clay + i * state.clay_bot
        if ore >= blueprint.obs_ore and clay >= blueprint.obs_clay:
          i += 1
          states.append(State(
            state.ore_bot,
            state.clay_bot,
            state.obs_bot + 1,
            state.geo_bot,
            state.ore + state.ore_bot * i - blueprint.obs_ore,
            state.clay + state.clay_bot * i - blueprint.obs_clay,
            state.obs + state.obs_bot * i,
            state.geo + state.geo_bot * i,
            state.remain - i
          ))
          break
        i += 1
    # add geo
    if state.obs_bot > 0:
      i = 0
      while i < state.remain:
        ore = state.ore + i * state.ore_bot
        obs = state.obs + i * state.obs_bot
        if ore >= blueprint.geo_ore and obs >= blueprint.geo_obs:
          i += 1
          states.append(State(
            state.ore_bot,
            state.clay_bot,
            state.obs_bot,
            state.geo_bot + 1,
            state.ore + state.ore_bot * i - blueprint.geo_ore,
            state.clay + state.clay_bot * i,
            state.obs + state.obs_bot * i - blueprint.geo_obs,
            state.geo + state.geo_bot * i,
            state.remain - i
          ))
          break
        i += 1
  # print(best[0])
  return best[0]


prog = re.compile("Blueprint (\d*): Each ore robot costs (\d*) ore. Each clay robot costs (\d*) ore. Each obsidian robot costs (\d*) ore and (\d*) clay. Each geode robot costs (\d*) ore and (\d*) obsidian.")
with open("input19.txt") as file:
  for line in file:
    results = prog.match(line.strip())
    blueprint = Blueprint(int(results[1]), int(results[2]), int(results[3]), int(results[4]), int(results[5]), int(results[6]), int(results[7]))
    blueprints[blueprint.id] = blueprint

# part 1
total = 0
for blueprint in blueprints.values():
  geodes = simulate(blueprint, 24)
  print("{} : {}".format(blueprint.id, geodes))
  total += geodes * blueprint.id
print(total)

# part 2
total = 1
for i in range(1, 4):
  blueprint = blueprints[i]
  geodes = simulate(blueprint, 32)
  print("{} : {}".format(blueprint.id, geodes))
  total *= geodes
print(total)