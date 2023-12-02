import sys

sys.path.append("src")

import a_one as one
import b_two as two


def test_one():
    assert one.one_a() == 54081
    assert one.one_b() == 54649


def test_two():
    assert two.two_a() == 2447
    assert two.two_b() == 56322
