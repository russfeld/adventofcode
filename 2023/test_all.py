import sys

sys.path.append("src")

import a_one as one
import b_two as two
import c_three as three


def test_one():
    assert one.one_a() == 54081
    assert one.one_b() == 54649


def test_two():
    assert two.two_a() == 2447
    assert two.two_b() == 56322


def test_three():
    assert three.three_a() == 533784
    assert three.three_b() == 78826761
