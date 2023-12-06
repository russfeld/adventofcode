import sys

sys.path.append("src")

import a_one as one
import b_two as two
import c_three as three
import d_four as four
import e_five as five


def test_one():
    assert one.one_a() == 54081
    assert one.one_b() == 54649


def test_two():
    assert two.two_a() == 2447
    assert two.two_b() == 56322


def test_three():
    assert three.three_a() == 533784
    assert three.three_b() == 78826761


def test_four():
    assert four.four_a() == 26346
    assert four.four_b() == 8467762


def test_five():
    assert five.five_a() == 218513636
    assert five.five_b() == 81956384
