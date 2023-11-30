import sys
sys.path.append("src")

import a_one as one

def test_one():
  assert one.one_a() == 0
  assert one.one_b() == 0

