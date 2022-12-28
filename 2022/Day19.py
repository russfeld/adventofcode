import re
from collections import deque

blueprints = {}


class Blueprint:

  def __init__(self, id, ore, clay, obs_ore, obs_clay, ge_ore, ge_obs):
    self.id = id
    self.ore = ore
    self.clay = clay
    self.obs_ore = obs_ore
    self.obs_clay = obs_clay
    self.ge_ore = ge_ore
    self.ge_obs = ge_obs

  def __str__(self):
    return "Blueprint {}: Ore {}, Clay {}, Obs Ore {} Clay {}, Geode Ore {}, Obs {}".format(self.id, self.ore, self.clay, self.obs_ore, self.obs_clay, self.ge_ore, self.ge_obs)
  
  def __repr__(self):
    return str(self)

class State:

  def __init__(self, ore_bot, clay_bot, obs_bot, geo_bot, ore, clay, obs, geo, day):
    self.ore_bot = ore_bot
    self.clay_bot = clay_bot
    self.obs_bot = obs_bot
    self.geo_bot = geo_bot
    self.ore = ore
    self.clay = clay
    self.obs = obs
    self.geo = geo
  
  def __str__(self):
    print("Bots Ore {} C {} Obs {} Geo {} : Ore {} C {} Obs {} Geo {}".format(self.ore_bot, self.clay_bot, self.obs_bot, self.geo_bot, self.ore, self.clay, self.obs, self.geo))


  def __repr__(self):
    return str(self)

def simulate(blueprint):
  options = deque()
  options.add(State(1, 0, 0, 0, 0, 0, 0, 0))
  while len(options) > 0:
    setup = options.popleft()
    
    



prog = re.compile("Blueprint (\d*): Each ore robot costs (\d*) ore. Each clay robot costs (\d*) ore. Each obsidian robot costs (\d*) ore and (\d*) clay. Each geode robot costs (\d*) ore and (\d*) obsidian.")
with open("test19.txt") as file:
  for line in file:
    results = prog.match(line.strip())
    blueprint = Blueprint(int(results[1]), int(results[2]), int(results[3]), int(results[4]), int(results[5]), int(results[6]), int(results[7]))
    blueprints[blueprint.id] = blueprint

for blueprint in blueprints:
  simulate(blueprint, 24)


