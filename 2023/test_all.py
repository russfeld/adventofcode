import sys

sys.path.append("src")

import a_one as one
import b_two as two
import c_three as three
import d_four as four
import e_five as five
import f_six as six
import g_seven as seven
import h_eight as eight
import i_nine as nine
import j_ten as ten


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


def test_six():
    assert six.six_a() == 316800
    assert six.six_b() == 45647654


def test_seven():
    assert seven.seven_a() == 248601919
    assert seven.seven_b() == 248781813


def test_eight():
    assert eight.eight_a() == 14893
    assert eight.eight_b() == 10241191004509


def test_nine():
    assert nine.nine_a() == 2005352194
    assert nine.nine_b() == 1077


def test_ten():
    assert ten.ten_a() == 6786
    assert ten.ten_b() == 495
