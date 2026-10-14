# Maths problems (part B): arithmetic on strings and arrays, sequences, geometry,
# counting with arrays, bit manipulation, and dates and simulation.

PROBLEMS = [
    # ------------------------------------------------------------------ Arithmetic
    dict(
        title="Adding Premium Totals Held as Text",
        difficulty="easy",
        topics=["Maths", "Arithmetic"],
        statement=(
            "An old billing system stores premium totals (in cents) as strings of digits, and some of them "
            "are far too long for its number type. Given two such strings `a` and `b`, return their sum as a "
            "string.\n\n"
            "Each input is a non-negative whole number written with the digits `0` to `9` only, with no "
            "leading zeros (except the number zero itself, written `\"0\"`). The result must follow the same "
            "format.\n\n"
            "Constraints: `1 <= len(a), len(b) <= 10 000`."
        ),
        signature="def add_number_strings(a: str, b: str) -> str",
        solution='''def add_number_strings(a, b):
    i, j = len(a) - 1, len(b) - 1
    carry = 0
    digits = []
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += ord(a[i]) - ord("0")
            i -= 1
        if j >= 0:
            total += ord(b[j]) - ord("0")
            j -= 1
        digits.append(str(total % 10))
        carry = total // 10
    return "".join(reversed(digits))
''',
        tests=[
            ["4580", "925"],
            ["0", "0"],
            ["999", "1"],
            ["1", "99999999999999999999"],
            ["123456789123456789", "987654321987654321"],
            ["5", "5"],
            ["0", "760"],
        ],
        notes=["Try doing it digit by digit, the way you would on paper, rather than converting the whole string to an integer."],
    ),
    dict(
        title="Next Number on the Policy Counter",
        difficulty="easy",
        topics=["Maths", "Arithmetic"],
        statement=(
            "A policy counter is stored as a list of decimal digits, most significant digit first. For example "
            "`[1, 2, 9]` stands for the number 129.\n\n"
            "Return a new list of digits for the counter after adding one to it. The input never has leading "
            "zeros, apart from the single-digit list `[0]`.\n\n"
            "Constraints: `1 <= len(digits) <= 100` and every entry is between 0 and 9."
        ),
        signature="def plus_one(digits: list[int]) -> list[int]",
        solution='''def plus_one(digits):
    result = list(digits)
    for i in range(len(result) - 1, -1, -1):
        if result[i] < 9:
            result[i] += 1
            return result
        result[i] = 0
    return [1] + result
''',
        tests=[
            [[1, 2, 9]],
            [[0]],
            [[9, 9, 9]],
            [[4, 3, 2, 1]],
            [[8, 9, 9, 9]],
            [[9]],
            [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9]],
        ],
    ),
    dict(
        title="Multiplying Long Number Strings",
        difficulty="medium",
        topics=["Maths", "Arithmetic"],
        statement=(
            "Given two non-negative whole numbers `a` and `b` written as strings of digits, return their "
            "product as a string of digits.\n\n"
            "The inputs have no leading zeros, except for the number zero itself (`\"0\"`), and the result "
            "must not have leading zeros either.\n\n"
            "Constraints: `1 <= len(a), len(b) <= 200`."
        ),
        signature="def multiply_number_strings(a: str, b: str) -> str",
        solution='''def multiply_number_strings(a, b):
    if a == "0" or b == "0":
        return "0"
    # place[k] collects every digit product that lands k places from the right
    place = [0] * (len(a) + len(b))
    for i, da in enumerate(reversed(a)):
        for j, db in enumerate(reversed(b)):
            place[i + j] += int(da) * int(db)
    for k in range(len(place) - 1):
        place[k + 1] += place[k] // 10
        place[k] %= 10
    while len(place) > 1 and place[-1] == 0:
        place.pop()
    return "".join(str(d) for d in reversed(place))
''',
        tests=[
            ["123", "45"],
            ["0", "98765"],
            ["999", "999"],
            ["1", "1"],
            ["123456789", "987654321"],
            ["25", "4"],
            ["31415926535897932384626433832795", "27182818284590452353602874713527"],
        ],
        notes=["Work with the digits directly instead of converting the whole strings to integers: the point is to practise long multiplication."],
    ),
    dict(
        title="Multiplying Complex Numbers Written as Text",
        difficulty="medium",
        topics=["Maths", "Arithmetic"],
        statement=(
            "A complex number is written as a string of the form `\"x+yi\"` or `\"x-yi\"`, where `x` is the "
            "real part (a whole number, which may start with `-`) and the number after the sign is the size of "
            "the imaginary part. Both parts are always present, so zero is written `\"0+0i\"`. Examples: "
            "`\"3+2i\"`, `\"-1-4i\"`, `\"0+7i\"`.\n\n"
            "Given two complex numbers `a` and `b` in this format, return their product in the same format. "
            "Remember that `i * i = -1`. Write a zero imaginary part as `+0i`.\n\n"
            "Constraints: the real and imaginary parts of each input are between -100 and 100."
        ),
        signature="def multiply_complex(a: str, b: str) -> str",
        solution=r'''import re

PATTERN = re.compile(r"^(-?\d+)([+-])(\d+)i$")


def parse(text):
    real, sign, imag = PATTERN.match(text).groups()
    return int(real), int(imag) if sign == "+" else -int(imag)


def multiply_complex(a, b):
    p, q = parse(a)
    r, s = parse(b)
    real = p * r - q * s
    imag = p * s + q * r
    sign = "+" if imag >= 0 else "-"
    return f"{real}{sign}{abs(imag)}i"
''',
        tests=[
            ["3+2i", "1-4i"],
            ["0+0i", "5+7i"],
            ["1+1i", "1+1i"],
            ["-2-3i", "4+0i"],
            ["0+1i", "0+1i"],
            ["-5+2i", "-5-2i"],
            ["100-100i", "-100+100i"],
        ],
    ),
    dict(
        title="Exact Decimal with a Recurring Block",
        difficulty="hard",
        topics=["Maths", "Arithmetic"],
        statement=(
            "Given two integers `numerator` and `denominator`, return the exact value of "
            "`numerator / denominator` as a decimal string.\n\n"
            "- If the division is exact and the result is a whole number, return it with no decimal point, for "
            "example `\"4\"` or `\"-3\"`.\n"
            "- If the decimal stops, return all of its digits, for example `\"0.125\"`.\n"
            "- If the decimal repeats forever, write the repeating block once, in round brackets, starting "
            "where the repetition first begins. For example 1/6 is `\"0.1(6)\"` and 1/7 is "
            "`\"0.(142857)\"`.\n"
            "- A negative result starts with `-`. Zero is always `\"0\"`.\n\n"
            "Constraints: `denominator != 0` and both values are between -2 000 000 and 2 000 000."
        ),
        signature="def fraction_to_decimal(numerator: int, denominator: int) -> str",
        solution='''def fraction_to_decimal(numerator, denominator):
    if numerator == 0:
        return "0"
    sign = "-" if (numerator < 0) != (denominator < 0) else ""
    n, d = abs(numerator), abs(denominator)
    whole, remainder = divmod(n, d)
    if remainder == 0:
        return sign + str(whole)
    digits = []
    seen = {}  # remainder -> position of the digit it produces
    while remainder and remainder not in seen:
        seen[remainder] = len(digits)
        digit, remainder = divmod(remainder * 10, d)
        digits.append(str(digit))
    if remainder:
        start = seen[remainder]
        fraction = "".join(digits[:start]) + "(" + "".join(digits[start:]) + ")"
    else:
        fraction = "".join(digits)
    return f"{sign}{whole}.{fraction}"
''',
        tests=[
            [1, 6],
            [4, 2],
            [-22, 7],
            [0, -5],
            [1, 8],
            [7, -12],
            [1, 333],
            [-50, -8],
            [100, 1],
            [1, 97],
        ],
        notes=["A digit pattern repeats exactly when a remainder in the long division repeats."],
    ),
    dict(
        title="Simplifying a Sum of Fractions",
        difficulty="hard",
        topics=["Maths", "Arithmetic"],
        statement=(
            "An expression adds and subtracts simple fractions, written with no spaces, for example "
            "`\"1/2+1/3-3/4\"`. Every term is `p/q` where `p` is a whole number from 0 to 10 and `q` is a "
            "whole number from 1 to 10. The terms are joined by `+` or `-`, and the first term may start "
            "with `-`.\n\n"
            "Evaluate the expression and return the result as a string `\"p/q\"` in lowest terms, with "
            "`q > 0` and any minus sign in front of `p`. A whole-number answer still has a denominator, so "
            "two is `\"2/1\"` and zero is `\"0/1\"`.\n\n"
            "Constraints: the expression has between 1 and 10 terms."
        ),
        signature="def add_fractions(expression: str) -> str",
        solution=r'''import re
from math import gcd


def add_fractions(expression):
    num, den = 0, 1
    for sign, p, q in re.findall(r"([+-]?)(\d+)/(\d+)", expression):
        p, q = int(p), int(q)
        if sign == "-":
            p = -p
        # num/den + p/q = (num*q + p*den) / (den*q)
        num, den = num * q + p * den, den * q
        g = gcd(num, den)
        num, den = num // g, den // g
    return f"{num}/{den}"
''',
        tests=[
            ["1/2+1/3-3/4"],
            ["-1/2+1/2"],
            ["3/4"],
            ["2/4"],
            ["1/3-1/2"],
            ["5/2+3/2+7/10-1/5"],
            ["-1/10-1/10-1/10"],
            ["0/7"],
            ["10/1-10/1+1/9+1/8+1/7+1/6+1/5+1/4+1/3+1/2"],
        ],
        notes=["`math.gcd` always returns a non-negative value, which helps keep the denominator positive."],
    ),

    # ------------------------------------------------------------------ Sequences
    dict(
        title="Three-Term Claim Count Sequence",
        difficulty="easy",
        topics=["Maths", "Sequences"],
        statement=(
            "A toy model for monthly claim counts says each month's count is the sum of the counts from the "
            "three months before it. The sequence starts with `T(0) = 0`, `T(1) = 1` and `T(2) = 1`, and "
            "after that `T(n) = T(n - 1) + T(n - 2) + T(n - 3)`.\n\n"
            "Return `T(n)` as an integer.\n\n"
            "Constraints: `0 <= n <= 37`."
        ),
        signature="def claim_count(n: int) -> int",
        solution='''from functools import lru_cache


@lru_cache(maxsize=None)
def claim_count(n):
    if n == 0:
        return 0
    if n <= 2:
        return 1
    return claim_count(n - 1) + claim_count(n - 2) + claim_count(n - 3)
''',
        tests=[[6], [0], [1], [2], [3], [25], [37]],
        notes=["Plain recursion repeats a huge amount of work. Remember the values you have already worked out, or build the sequence up from the start."],
    ),
    dict(
        title="Digit Squares That Settle at One",
        difficulty="easy",
        topics=["Maths", "Sequences"],
        statement=(
            "Start with a positive integer `n` and repeatedly replace it with the sum of the squares of its "
            "decimal digits. For example 19 becomes 1 + 81 = 82, then 64 + 4 = 68, then 36 + 64 = 100, then 1.\n\n"
            "Some starting numbers reach 1 (after which they stay at 1); every other number ends up going round "
            "a loop that never contains 1.\n\n"
            "Return `True` if the process starting from `n` reaches 1, and `False` otherwise.\n\n"
            "Constraints: `1 <= n <= 2 000 000 000`."
        ),
        signature="def reaches_one(n: int) -> bool",
        solution='''def digit_square_sum(n):
    total = 0
    while n:
        n, d = divmod(n, 10)
        total += d * d
    return total


def reaches_one(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = digit_square_sum(n)
    return n == 1
''',
        tests=[[19], [2], [1], [7], [4], [100], [116], [1999999999]],
        notes=["Keep track of the numbers you have seen so you can tell when you are going round a loop."],
    ),
    dict(
        title="Digit at a Position in the Counting String",
        difficulty="medium",
        topics=["Maths", "Sequences"],
        statement=(
            "Write the positive integers one after another with no separators: "
            "`123456789101112131415...`. Positions are counted from 1, so position 1 holds the digit 1, "
            "position 10 holds the 1 of `10` and position 11 holds its 0.\n\n"
            "Return the digit at position `n` as an integer.\n\n"
            "Constraints: `1 <= n <= 2 000 000 000`. Building the string is far too slow for large `n`."
        ),
        signature="def digit_at(n: int) -> int",
        solution='''def digit_at(n):
    width, count, first = 1, 9, 1   # numbers with `width` digits: `count` of them, starting at `first`
    while n > width * count:
        n -= width * count
        width += 1
        count *= 10
        first *= 10
    number = first + (n - 1) // width
    return int(str(number)[(n - 1) % width])
''',
        tests=[[15], [1], [9], [10], [11], [189], [190], [1000000000], [2000000000]],
        notes=["Skip whole blocks at a time: there are 9 one-digit numbers, 90 two-digit numbers, 900 three-digit numbers, and so on."],
    ),
    dict(
        title="Read-Aloud Number Sequence",
        difficulty="medium",
        topics=["Maths", "Sequences"],
        statement=(
            "This sequence of digit strings starts with `\"1\"`. Each later term describes the previous term "
            "out loud: split it into runs of the same digit and, for each run from left to right, write how "
            "many digits are in the run followed by the digit itself.\n\n"
            "So `\"1\"` is one 1, giving `\"11\"`; that is two 1s, giving `\"21\"`; that is one 2 then one 1, "
            "giving `\"1211\"`, and so on.\n\n"
            "Return term number `n` of the sequence as a string, where term 1 is `\"1\"`.\n\n"
            "Constraints: `1 <= n <= 30`."
        ),
        signature="def read_aloud(n: int) -> str",
        solution='''def describe(term):
    parts = []
    i = 0
    while i < len(term):
        j = i
        while j < len(term) and term[j] == term[i]:
            j += 1
        parts.append(f"{j - i}{term[i]}")
        i = j
    return "".join(parts)


def read_aloud(n):
    term = "1"
    for _ in range(n - 1):
        term = describe(term)
    return term
''',
        tests=[[5], [1], [2], [3], [4], [8], [12]],
    ),
    dict(
        title="Fewest Square Numbers for a Total",
        difficulty="medium",
        topics=["Maths", "Sequences"],
        statement=(
            "A square number is the square of a whole number: 1, 4, 9, 16, 25 and so on.\n\n"
            "Given a positive integer `n`, return the smallest count of square numbers (repeats allowed) that "
            "add up to exactly `n`. For example 12 = 4 + 4 + 4 needs three squares, and no two squares add up "
            "to 12.\n\n"
            "Constraints: `1 <= n <= 10 000`."
        ),
        signature="def fewest_squares(n: int) -> int",
        solution='''def fewest_squares(n):
    squares = [k * k for k in range(1, int(n ** 0.5) + 1)]
    best = [0] + [n] * n   # best[t] = fewest squares summing to t
    for t in range(1, n + 1):
        for s in squares:
            if s > t:
                break
            if best[t - s] + 1 < best[t]:
                best[t] = best[t - s] + 1
    return best[n]
''',
        tests=[[12], [13], [1], [7], [43], [100], [9999]],
        notes=["Build the answer for every total from 1 up to `n`: the best way to make `t` uses one square `s` plus the best way to make `t - s`."],
    ),
    dict(
        title="Best Product from Splitting a Number",
        difficulty="medium",
        topics=["Maths", "Sequences"],
        statement=(
            "Split the integer `n` into a sum of at least two positive integers, and multiply those parts "
            "together. For example 10 = 3 + 3 + 4 gives 3 * 3 * 4 = 36.\n\n"
            "Return the largest product you can get as an integer.\n\n"
            "Constraints: `2 <= n <= 58`."
        ),
        signature="def max_split_product(n: int) -> int",
        solution='''def max_split_product(n):
    # best[k] = largest product from splitting k into at least two parts
    best = [0] * (n + 1)
    best[1] = 1
    for k in range(2, n + 1):
        for first in range(1, k):
            rest = k - first
            best[k] = max(best[k], first * rest, first * best[rest])
    return best[n]
''',
        tests=[[10], [2], [3], [4], [5], [8], [58]],
        notes=["For each number, try every size for the first part and either keep the rest whole or split it again."],
    ),
    dict(
        title="Huge Fibonacci Numbers Modulo a Prime",
        difficulty="hard",
        topics=["Maths", "Sequences"],
        statement=(
            "The Fibonacci numbers are `F(0) = 0`, `F(1) = 1` and `F(n) = F(n - 1) + F(n - 2)` for `n >= 2`.\n\n"
            "Return `F(n) % 1 000 000 007` as an integer.\n\n"
            "Constraints: `0 <= n <= 10^15`. Stepping through the sequence one term at a time is far too slow, "
            "so you need a method whose running time grows with the number of digits of `n`."
        ),
        signature="def fib_mod(n: int) -> int",
        solution='''MOD = 1_000_000_007


def pair(n):
    """Return (F(n), F(n + 1)) modulo MOD by fast doubling."""
    if n == 0:
        return 0, 1
    a, b = pair(n // 2)          # a = F(k), b = F(k + 1), with k = n // 2
    c = a * (2 * b - a) % MOD    # F(2k)
    d = (a * a + b * b) % MOD    # F(2k + 1)
    return (d, (c + d) % MOD) if n % 2 else (c, d)


def fib_mod(n):
    return pair(n)[0]
''',
        tests=[[10], [0], [1], [2], [50], [100], [123456789012345], [10 ** 15]],
        notes=[
            "Useful identities: `F(2k) = F(k) * (2F(k+1) - F(k))` and `F(2k+1) = F(k)^2 + F(k+1)^2`.",
            "Raising the matrix `[[1, 1], [1, 0]]` to the power `n` by repeated squaring also works.",
        ],
    ),

    # ------------------------------------------------------------------ Geometry
    dict(
        title="All Points on One Straight Line",
        difficulty="easy",
        topics=["Maths", "Geometry"],
        statement=(
            "Given a list `points` of distinct points `[x, y]` with integer coordinates, return `True` if all "
            "of them lie on a single straight line, and `False` otherwise.\n\n"
            "Constraints: `2 <= len(points) <= 1000` and every coordinate is between -10 000 and 10 000. Lines "
            "may be vertical."
        ),
        signature="def on_one_line(points: list[list[int]]) -> bool",
        solution='''def on_one_line(points):
    (x0, y0), (x1, y1) = points[0], points[1]
    dx, dy = x1 - x0, y1 - y0
    # (x, y) is on the line through the first two points when the cross product is zero
    return all(dx * (y - y0) - dy * (x - x0) == 0 for x, y in points[2:])
''',
        tests=[
            [[[1, 2], [2, 4], [4, 8]]],
            [[[0, 0], [1, 1], [2, 3]]],
            [[[5, 5], [1, 2]]],
            [[[2, 0], [2, 5], [2, -3]]],
            [[[0, 0], [0, 1], [1, 0]]],
            [[[-1, -1], [1, 1], [3, 3], [4, 5]]],
            [[[3, 7], [-6, 7], [100, 7], [0, 7]]],
        ],
        notes=["Comparing slopes as fractions breaks on vertical lines. A cross product of two direction vectors avoids division altogether."],
    ),
    dict(
        title="Quickest Route Round the Claim Sites",
        difficulty="easy",
        topics=["Maths", "Geometry"],
        statement=(
            "A loss adjuster must visit a list of claim sites on a city grid, in the order given. Each site is "
            "a point `[x, y]` with integer coordinates and the adjuster starts at the first one.\n\n"
            "Every second the adjuster can move one unit horizontally, one unit vertically, or one unit in each "
            "direction at once (a diagonal step). Return the minimum number of seconds needed to visit all the "
            "sites in order, as an integer. Passing through a site early does not count as visiting it.\n\n"
            "Constraints: `1 <= len(points) <= 100` and every coordinate is between -1000 and 1000."
        ),
        signature="def min_visit_time(points: list[list[int]]) -> int",
        solution='''def min_visit_time(points):
    total = 0
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        # diagonal steps cover both directions at once, so the larger gap decides
        total += max(abs(x1 - x0), abs(y1 - y0))
    return total
''',
        tests=[
            [[[1, 1], [3, 4], [-1, 0]]],
            [[[0, 0]]],
            [[[0, 0], [5, 0]]],
            [[[2, 2], [2, 2]]],
            [[[-3, -3], [3, 3], [3, -3]]],
            [[[0, 0], [1, 5], [4, 2]]],
            [[[1000, -1000], [-1000, 1000], [0, 0]]],
        ],
    ),
    dict(
        title="Largest Triangle from a Set of Points",
        difficulty="medium",
        topics=["Maths", "Geometry"],
        statement=(
            "Given a list `points` of distinct points `[x, y]` with integer coordinates, choose three of them "
            "to form the triangle with the largest possible area. Return that area as a float. If every choice "
            "of three points is in a straight line, the answer is `0.0`.\n\n"
            "Constraints: `3 <= len(points) <= 50` and every coordinate is between -50 and 50."
        ),
        signature="def largest_triangle_area(points: list[list[int]]) -> float",
        solution='''from itertools import combinations


def largest_triangle_area(points):
    best = 0
    for (x1, y1), (x2, y2), (x3, y3) in combinations(points, 3):
        # shoelace formula: twice the area is the absolute cross product
        twice = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))
        best = max(best, twice)
    return best / 2
''',
        tests=[
            [[[0, 0], [0, 2], [2, 0], [1, 1]]],
            [[[0, 0], [1, 0], [2, 0]]],
            [[[1, 0], [0, 0], [0, 1]]],
            [[[-2, -1], [3, 4], [0, 5], [4, -3]]],
            [[[0, 0], [10, 0], [0, 10], [10, 10], [5, 5]]],
            [[[x, (x * x) % 17 - 8] for x in range(-25, 25)]],
        ],
        notes=["A triangle with corners `A`, `B` and `C` has area `|(B - A) x (C - A)| / 2`, where `x` is the 2D cross product."],
    ),
    dict(
        title="Area Covered by Two Flood Zones",
        difficulty="medium",
        topics=["Maths", "Geometry"],
        statement=(
            "Two flood zones on a map are axis-aligned rectangles. Each is given as `[x1, y1, x2, y2]`, where "
            "`(x1, y1)` is the bottom-left corner and `(x2, y2)` is the top-right corner, so `x1 <= x2` and "
            "`y1 <= y2`.\n\n"
            "Return the total area covered by at least one of the two zones, as an integer. Land that lies in "
            "both zones is only counted once.\n\n"
            "Constraints: every coordinate is between -10 000 and 10 000."
        ),
        signature="def covered_area(a: list[int], b: list[int]) -> int",
        solution='''def covered_area(a, b):
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    area_a = (ax2 - ax1) * (ay2 - ay1)
    area_b = (bx2 - bx1) * (by2 - by1)
    overlap_w = max(0, min(ax2, bx2) - max(ax1, bx1))
    overlap_h = max(0, min(ay2, by2) - max(ay1, by1))
    return area_a + area_b - overlap_w * overlap_h
''',
        tests=[
            [[-2, 0, 4, 3], [1, -1, 6, 2]],
            [[0, 0, 1, 1], [2, 2, 3, 3]],
            [[0, 0, 2, 2], [0, 0, 2, 2]],
            [[0, 0, 2, 2], [2, 0, 4, 2]],
            [[0, 0, 10, 10], [2, 2, 4, 4]],
            [[0, 0, 0, 5], [0, 0, 3, 3]],
            [[-10000, -10000, 10000, 10000], [-10000, -10000, 10000, 10000]],
        ],
        notes=["Rectangles that only touch along an edge have zero overlap."],
    ),
    dict(
        title="Do Four Points Make a Square?",
        difficulty="medium",
        topics=["Maths", "Geometry"],
        statement=(
            "You are given four points `p1`, `p2`, `p3` and `p4`, each `[x, y]` with integer coordinates, in no "
            "particular order. Return `True` if they are the four corners of a square with a positive area, "
            "and `False` otherwise. The square does not have to line up with the axes.\n\n"
            "Constraints: every coordinate is between -10 000 and 10 000. Points may repeat."
        ),
        signature="def is_square(p1: list[int], p2: list[int], p3: list[int], p4: list[int]) -> bool",
        solution='''from itertools import combinations


def is_square(p1, p2, p3, p4):
    dists = sorted(
        (ax - bx) ** 2 + (ay - by) ** 2
        for (ax, ay), (bx, by) in combinations([p1, p2, p3, p4], 2)
    )
    side, diagonal = dists[0], dists[5]
    # four equal positive sides and two equal diagonals of twice the squared side
    return side > 0 and dists[:4] == [side] * 4 and dists[4] == diagonal == 2 * side
''',
        tests=[
            [[0, 0], [1, 1], [1, 0], [0, 1]],
            [[0, 0], [2, 1], [1, 3], [-1, 2]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [2, 0], [2, 1], [0, 1]],
            [[0, 0], [1, 1], [0, 2], [-1, 1]],
            [[0, 0], [1, 2], [3, 3], [2, 1]],
            [[0, 0], [1, 0], [0, 1], [0, 1]],
        ],
        notes=["Compare squared distances so everything stays in whole numbers."],
    ),
    dict(
        title="Angle Between the Clock Hands",
        difficulty="medium",
        topics=["Maths", "Geometry"],
        statement=(
            "An analogue clock shows `hour` o'clock and `minutes` minutes. The hour hand moves smoothly, so at "
            "3:30 it is halfway between the 3 and the 4.\n\n"
            "Return the smaller of the two angles between the hour hand and the minute hand, in degrees, as a "
            "float between 0 and 180.\n\n"
            "Constraints: `1 <= hour <= 12` and `0 <= minutes <= 59`."
        ),
        signature="def clock_angle(hour: int, minutes: int) -> float",
        solution='''def clock_angle(hour, minutes):
    minute_hand = 6.0 * minutes                      # 360 degrees / 60 minutes
    hour_hand = 30.0 * (hour % 12) + 0.5 * minutes   # 360 / 12 hours, plus drift
    gap = abs(hour_hand - minute_hand)
    return min(gap, 360.0 - gap)
''',
        tests=[[3, 30], [12, 0], [6, 0], [9, 45], [1, 57], [12, 30], [4, 50], [11, 59]],
    ),
    dict(
        title="Most Points on a Single Line",
        difficulty="hard",
        topics=["Maths", "Geometry"],
        statement=(
            "Given a list `points` of distinct points `[x, y]` with integer coordinates, return the largest "
            "number of them that lie on one straight line, as an integer.\n\n"
            "Constraints: `1 <= len(points) <= 300` and every coordinate is between -10 000 and 10 000."
        ),
        signature="def max_on_line(points: list[list[int]]) -> int",
        solution='''from collections import Counter
from math import gcd


def max_on_line(points):
    if len(points) <= 2:
        return len(points)
    best = 2
    for i, (x0, y0) in enumerate(points):
        directions = Counter()
        for x1, y1 in points[i + 1:]:
            dx, dy = x1 - x0, y1 - y0
            g = gcd(dx, dy)
            dx, dy = dx // g, dy // g
            # give every direction one standard form so opposite directions match
            if dx < 0 or (dx == 0 and dy < 0):
                dx, dy = -dx, -dy
            directions[(dx, dy)] += 1
        if directions:
            best = max(best, max(directions.values()) + 1)
    return best
''',
        tests=[
            [[[0, 0], [1, 1], [2, 2], [3, 1], [1, 3], [0, 4]]],
            [[[7, -3]]],
            [[[1, 2], [5, 9]]],
            [[[2, 1], [2, 5], [2, -3], [1, 1]]],
            [[[0, 0], [1, 2], [2, 1], [3, 3]]],
            [[[-4, 6], [-2, 6], [0, 6], [9, 6], [1, 1], [2, 2], [3, 3], [5, 5]]],
            [[[i, 2 * i + 1] for i in range(40)] + [[i, i * i] for i in range(-30, 30)]],
        ],
        notes=[
            "Fix one point and group every other point by the direction to it. Store directions as reduced whole-number pairs, not floating-point slopes, so equal slopes always compare equal.",
        ],
    ),
    dict(
        title="Total Area Hit by a Hailstorm",
        difficulty="hard",
        topics=["Maths", "Geometry"],
        statement=(
            "A hailstorm's footprint is reported as several axis-aligned rectangles, which may overlap. Each "
            "is `[x1, y1, x2, y2]`, with `(x1, y1)` the bottom-left corner and `(x2, y2)` the top-right corner, "
            "so `x1 <= x2` and `y1 <= y2`.\n\n"
            "Return the total area covered by at least one rectangle, as an integer. Areas covered by several "
            "rectangles count only once. An empty list covers no area.\n\n"
            "Constraints: `0 <= len(rectangles) <= 50` and every coordinate is between 0 and 1 000 000."
        ),
        signature="def union_area(rectangles: list[list[int]]) -> int",
        solution='''def union_area(rectangles):
    xs = sorted({x for r in rectangles for x in (r[0], r[2])})
    ys = sorted({y for r in rectangles for y in (r[1], r[3])})
    total = 0
    # split the plane into a grid along every rectangle edge, then add up covered cells
    for i in range(len(xs) - 1):
        for j in range(len(ys) - 1):
            cx, cy = xs[i], ys[j]
            if any(x1 <= cx < x2 and y1 <= cy < y2 for x1, y1, x2, y2 in rectangles):
                total += (xs[i + 1] - cx) * (ys[j + 1] - cy)
    return total
''',
        tests=[
            [[[0, 0, 4, 3], [2, 1, 6, 5], [5, 0, 7, 2]]],
            [[]],
            [[[1, 1, 3, 4]]],
            [[[0, 0, 5, 5], [0, 0, 5, 5], [0, 0, 5, 5]]],
            [[[0, 0, 10, 10], [2, 2, 3, 3], [4, 4, 9, 9]]],
            [[[0, 0, 1, 1], [1, 0, 2, 1], [0, 1, 2, 2]]],
            [[[0, 0, 0, 9], [3, 3, 3, 3]]],
            [[[0, 0, 1000000, 1000000], [500000, 500000, 1000000, 1000000]]],
            [[[i, 50 - i, i + 20, 70 - i] for i in range(0, 50, 2)]],
        ],
        notes=["Every distinct x and y edge value splits the plane into a grid of cells. Each cell is either fully covered or not covered at all."],
    ),

    # ------------------------------------------------------------------ Arrays
    dict(
        title="The Missing Policy Number",
        difficulty="easy",
        topics=["Maths", "Arrays"],
        statement=(
            "A block of policies was numbered `0, 1, 2, ..., n`, and exactly one of them has since been "
            "cancelled. The list `nums` holds the `n` remaining numbers in no particular order, each exactly "
            "once.\n\n"
            "Return the cancelled number as an integer.\n\n"
            "Constraints: `1 <= n <= 10 000`."
        ),
        signature="def missing_number(nums: list[int]) -> int",
        solution='''def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)
''',
        tests=[
            [[4, 1, 0, 2]],
            [[0]],
            [[1]],
            [[5, 3, 1, 2, 0]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 9]],
            [[2, 0]],
            [list(range(10000, 0, -1))],
        ],
        notes=["The numbers `0` to `n` add up to `n(n + 1) / 2`."],
    ),
    dict(
        title="The Dominant Claim Code",
        difficulty="easy",
        topics=["Maths", "Arrays"],
        statement=(
            "The list `codes` holds the cause code recorded on each claim this week. One code is used on more "
            "than half of the claims. Return that code as an integer.\n\n"
            "Constraints: `1 <= len(codes) <= 50 000`, codes are between -10^9 and 10^9, and a code used on "
            "more than half of the claims always exists."
        ),
        signature="def dominant_code(codes: list[int]) -> int",
        solution='''def dominant_code(codes):
    # pair off different codes: the majority code is the only one that can survive
    candidate, count = None, 0
    for code in codes:
        if count == 0:
            candidate = code
        count += 1 if code == candidate else -1
    return candidate
''',
        tests=[
            [[2, 7, 2, 5, 2, 2, 7]],
            [[9]],
            [[1, 1, 2]],
            [[4, 4, 4, 4]],
            [[3, -1, -1, 3, -1]],
            [[6, 5, 5]],
            [[8, 1, 8, 2, 8, 3, 8, 4, 8]],
        ],
        notes=["A counting dictionary works. For a challenge, find it in one pass with only two variables."],
    ),
    dict(
        title="Largest Product of Three Values",
        difficulty="easy",
        topics=["Maths", "Arrays"],
        statement=(
            "Given a list of integers `nums`, choose three entries at different positions so that their product "
            "is as large as possible, and return that product as an integer.\n\n"
            "Constraints: `3 <= len(nums) <= 10 000` and every value is between -1000 and 1000."
        ),
        signature="def max_product_of_three(nums: list[int]) -> int",
        solution='''def max_product_of_three(nums):
    s = sorted(nums)
    # either the three largest, or the two most negative times the largest
    return max(s[-1] * s[-2] * s[-3], s[0] * s[1] * s[-1])
''',
        tests=[
            [[-10, -8, 1, 2, 5]],
            [[1, 2, 3]],
            [[-1, -2, -3]],
            [[-5, -4, 0, 1]],
            [[0, 0, 0, -1]],
            [[-1000, -999, 1000, 999, 998]],
            [[7, 3, 1, 9, 2]],
        ],
        notes=["Two large negative numbers multiply to a large positive one."],
    ),
    dict(
        title="Sum Over All Odd-Length Windows",
        difficulty="easy",
        topics=["Maths", "Arrays"],
        statement=(
            "Given a list of non-negative integers `values`, consider every contiguous window (a run of "
            "neighbouring entries) whose length is odd: 1, 3, 5 and so on. Add up the entries of each such "
            "window, then return the grand total across all of them as an integer.\n\n"
            "For `[2, 5, 1, 4]` the windows of length 1 add up to 12 and the two windows of length 3 add up to "
            "8 and 10, so the answer is 30.\n\n"
            "Constraints: `1 <= len(values) <= 1000` and every value is between 0 and 1000."
        ),
        signature="def odd_window_total(values: list[int]) -> int",
        solution='''def odd_window_total(values):
    n = len(values)
    total = 0
    for i, v in enumerate(values):
        left, right = i + 1, n - i   # choices for the window's start and end
        # windows containing position i with odd length
        odd_windows = (left * right + 1) // 2
        total += v * odd_windows
    return total
''',
        tests=[
            [[2, 5, 1, 4]],
            [[7]],
            [[1, 2]],
            [[10, 20, 30, 40, 50]],
            [[0, 0, 0]],
            [[3, 1, 4, 1, 5, 9]],
            [list(range(1000))],
        ],
        notes=["Checking every window works. For a faster method, count how many odd-length windows include each position."],
    ),
    dict(
        title="Renewal Vouchers and Stamps",
        difficulty="easy",
        topics=["Maths", "Arrays"],
        statement=(
            "A loyalty scheme gives a customer `vouchers` renewal vouchers. Each time a voucher is used, the "
            "customer gets one stamp, and any `k` stamps can be swapped for one new voucher, which can be used "
            "in turn.\n\n"
            "Return the total number of vouchers the customer can use, as an integer.\n\n"
            "Constraints: `1 <= vouchers <= 1000` and `2 <= k <= 100`."
        ),
        signature="def vouchers_used(vouchers: int, k: int) -> int",
        solution='''def vouchers_used(vouchers, k):
    used = 0
    stamps = 0
    while vouchers:
        used += vouchers
        stamps += vouchers
        vouchers, stamps = divmod(stamps, k)
    return used
''',
        tests=[[9, 3], [5, 5], [1, 2], [15, 4], [100, 2], [7, 10], [1000, 100]],
    ),
    dict(
        title="Levelling Up Branch Targets",
        difficulty="medium",
        topics=["Maths", "Arrays"],
        statement=(
            "Each branch has a sales count, listed in `counts`. In one move you add 1 to every count except "
            "one (any one you choose).\n\n"
            "Return the fewest moves needed to make all the counts equal, as an integer.\n\n"
            "Constraints: `1 <= len(counts) <= 100 000` and every count is between -10^9 and 10^9. The answer "
            "always exists."
        ),
        signature="def moves_to_equal(counts: list[int]) -> int",
        solution='''def moves_to_equal(counts):
    # adding 1 to all but one is the same, relative to the others, as taking 1 off that one
    smallest = min(counts)
    return sum(c - smallest for c in counts)
''',
        tests=[
            [[2, 5, 3]],
            [[4]],
            [[1, 1, 1]],
            [[-1, 4, 2]],
            [[0, 1000000]],
            [[3, 3, 7, 1]],
            [[-1000000000, 1000000000, 0]],
        ],
        notes=["Think about what a move does to the gaps between the counts."],
    ),
    dict(
        title="Switches Left On After Every Pass",
        difficulty="medium",
        topics=["Maths", "Arrays"],
        statement=(
            "A row of `n` review flags, numbered 1 to `n`, all start off. Then `n` passes are made along the "
            "row: on pass `i` every flag whose number is a multiple of `i` is flipped (off becomes on, on "
            "becomes off). So pass 1 flips every flag, pass 2 flips flags 2, 4, 6, ... and so on.\n\n"
            "Return the number of flags that are on after all `n` passes, as an integer.\n\n"
            "Constraints: `0 <= n <= 10^9`, so a simulation is too slow."
        ),
        signature="def flags_on(n: int) -> int",
        solution='''from math import isqrt


def flags_on(n):
    # flag m is flipped once per divisor of m; only perfect squares have an odd count
    return isqrt(n)
''',
        tests=[[10], [0], [1], [3], [4], [99], [1000000000]],
        notes=["Divisors usually come in pairs. When don't they?"],
    ),
    dict(
        title="Smallest Unused Policy Number",
        difficulty="hard",
        topics=["Maths", "Arrays"],
        statement=(
            "Policy numbers are positive integers. The list `taken` holds numbers that have been issued, but it "
            "also contains junk entries (zero, negative values and repeats) and is in no particular order.\n\n"
            "Return the smallest positive integer that does not appear in `taken`.\n\n"
            "Constraints: `0 <= len(taken) <= 100 000` and every value is between -2^31 and 2^31 - 1. Aim for a "
            "single linear-time pass that uses only a constant amount of extra memory (you may rearrange a copy "
            "of the list)."
        ),
        signature="def smallest_unused(taken: list[int]) -> int",
        solution='''def smallest_unused(taken):
    a = list(taken)
    n = len(a)
    # place each value v with 1 <= v <= n at index v - 1
    for i in range(n):
        while 1 <= a[i] <= n and a[a[i] - 1] != a[i]:
            j = a[i] - 1
            a[i], a[j] = a[j], a[i]
    for i in range(n):
        if a[i] != i + 1:
            return i + 1
    return n + 1
''',
        tests=[
            [[5, 2, -3, 1]],
            [[]],
            [[1, 2, 3]],
            [[7, 8, 9]],
            [[2, 2, 1, 1]],
            [[0, -1, 3, 1, 2, 6]],
            [[-2147483648, 2147483647]],
            [list(range(100000, 0, -1))],
        ],
        notes=["The answer is always between 1 and `len(taken) + 1`, so only values in that range matter."],
    ),

    # ------------------------------------------------------------------ Bit manipulation
    dict(
        title="Counting Set Bits",
        difficulty="easy",
        topics=["Maths", "Bit manipulation"],
        statement=(
            "Return the number of 1 bits in the binary form of the non-negative integer `n`. For example 45 is "
            "`101101` in binary, which has four 1 bits.\n\n"
            "Constraints: `0 <= n <= 2^32 - 1`."
        ),
        signature="def count_set_bits(n: int) -> int",
        solution='''def count_set_bits(n):
    count = 0
    while n:
        n &= n - 1   # clears the lowest 1 bit
        count += 1
    return count
''',
        tests=[[45], [0], [1], [255], [4294967295], [1024], [2863311530]],
        notes=["`n & (n - 1)` removes the lowest 1 bit of `n`."],
    ),
    dict(
        title="The Unpaired Claim Reference",
        difficulty="easy",
        topics=["Maths", "Bit manipulation"],
        statement=(
            "Every claim reference in the list `refs` appears exactly twice (once when the claim is opened and "
            "once when it is closed), except for one claim that is still open and appears only once.\n\n"
            "Return the reference that appears once, as an integer.\n\n"
            "Constraints: `1 <= len(refs) <= 30 000` and every value is between -30 000 and 30 000. Try to use "
            "only a constant amount of extra memory."
        ),
        signature="def unpaired(refs: list[int]) -> int",
        solution='''def unpaired(refs):
    result = 0
    for r in refs:
        result ^= r   # x ^ x == 0, so pairs cancel out
    return result
''',
        tests=[
            [[6, 3, 9, 3, 6]],
            [[1]],
            [[-4, 2, 2]],
            [[0, 7, 7]],
            [[10, 20, 30, 20, 10]],
            [[-30000, 5, 30000, 5, 30000]],
        ],
        notes=["Exclusive or (`^`) is its own inverse: `x ^ x == 0` and `x ^ 0 == x`."],
    ),
    dict(
        title="Widest Gap Between One Bits",
        difficulty="easy",
        topics=["Maths", "Bit manipulation"],
        statement=(
            "Write the positive integer `n` in binary and look at each pair of neighbouring 1 bits, meaning "
            "two 1 bits with only 0 bits (or nothing) between them. The distance between such a pair is the "
            "difference in their bit positions, so in `1001` the two 1 bits are 3 apart and in `11` they are "
            "1 apart.\n\n"
            "Return the largest such distance as an integer, or 0 if `n` has fewer than two 1 bits.\n\n"
            "Constraints: `1 <= n <= 10^9`."
        ),
        signature="def widest_bit_gap(n: int) -> int",
        solution='''def widest_bit_gap(n):
    best = 0
    last = None
    position = 0
    while n:
        if n & 1:
            if last is not None:
                best = max(best, position - last)
            last = position
        n >>= 1
        position += 1
    return best
''',
        tests=[[37], [8], [5], [6], [1], [1041], [536870913]],
    ),
    dict(
        title="Reversing a 32-Bit Word",
        difficulty="medium",
        topics=["Maths", "Bit manipulation"],
        statement=(
            "Treat the non-negative integer `n` as an unsigned 32-bit word, including any leading zeros. "
            "Reverse the order of its 32 bits, so bit 0 swaps with bit 31, bit 1 with bit 30 and so on, and "
            "return the resulting unsigned integer.\n\n"
            "For example 11 is `000...01011`, which reverses to `11010...000`, the number 3 489 660 928.\n\n"
            "Constraints: `0 <= n <= 2^32 - 1`."
        ),
        signature="def reverse_bits(n: int) -> int",
        solution='''def reverse_bits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result
''',
        tests=[[11], [0], [1], [4294967295], [2147483648], [305419896], [65535]],
    ),
    dict(
        title="Set Bits for Every Number up to n",
        difficulty="medium",
        topics=["Maths", "Bit manipulation"],
        statement=(
            "Given a non-negative integer `n`, return a list of `n + 1` integers whose entry at index `i` is "
            "the number of 1 bits in the binary form of `i`, for every `i` from 0 to `n`.\n\n"
            "Constraints: `0 <= n <= 100 000`. Aim for a solution that does a constant amount of work per "
            "number."
        ),
        signature="def bit_counts(n: int) -> list[int]",
        solution='''def bit_counts(n):
    counts = [0] * (n + 1)
    for i in range(1, n + 1):
        # i has the same bits as i // 2, plus its own lowest bit
        counts[i] = counts[i >> 1] + (i & 1)
    return counts
''',
        tests=[[6], [0], [1], [2], [16], [31]],
        notes=["Shifting `i` right by one drops its lowest bit, and you have already worked out the answer for `i >> 1`."],
    ),
    dict(
        title="The Odd One Out Among Triples",
        difficulty="hard",
        topics=["Maths", "Bit manipulation"],
        statement=(
            "In the list `nums`, every value appears exactly three times except for one value, which appears "
            "exactly once. Return that value as an integer.\n\n"
            "Constraints: `1 <= len(nums) <= 30 000` and every value fits in a signed 32-bit integer, so it is "
            "between -2^31 and 2^31 - 1. Aim for linear time and a constant amount of extra memory, so no "
            "counting dictionary."
        ),
        signature="def single_among_triples(nums: list[int]) -> int",
        solution='''def single_among_triples(nums):
    result = 0
    for bit in range(32):
        # bits from the tripled values add up to a multiple of 3
        total = sum((x >> bit) & 1 for x in nums)
        if total % 3:
            result |= 1 << bit
    # read the 32-bit pattern back as a signed number
    return result - (1 << 32) if result >= 1 << 31 else result
''',
        tests=[
            [[5, 1, 5, 5]],
            [[-2, -2, 7, -2]],
            [[9]],
            [[3, 3, 3, -8]],
            [[0, 4, 4, 4, 0, 0, 11]],
            [[2147483647, 1, 1, 1]],
            [[-2147483648, 6, 6, 6]],
            [[-1, -1, -1, 0]],
        ],
        notes=[
            "Look at one bit position at a time: count how many values have that bit set and take the count modulo 3.",
            "Python integers are not limited to 32 bits, so take care when rebuilding a negative answer.",
        ],
    ),

    # ------------------------------------------------------------------ Dates & simulation
    dict(
        title="Day Number Within the Year",
        difficulty="easy",
        topics=["Maths", "Dates & simulation"],
        statement=(
            "A policy start date is given as a string `'YYYY-MM-DD'`. Return which day of its year it is, as an "
            "integer, where 1 January is day 1.\n\n"
            "Use the Gregorian calendar: a year is a leap year if it is divisible by 4, except that years "
            "divisible by 100 are not leap years unless they are also divisible by 400.\n\n"
            "Constraints: the date is valid and the year is between 1600 and 2400. Work it out yourself "
            "rather than using the `datetime` module."
        ),
        signature="def day_of_year(date: str) -> int",
        solution='''MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


def day_of_year(date):
    year, month, day = (int(part) for part in date.split("-"))
    days = sum(MONTH_DAYS[: month - 1]) + day
    if month > 2 and is_leap(year):
        days += 1
    return days
''',
        tests=[
            ["2024-03-01"],
            ["2023-03-01"],
            ["2000-12-31"],
            ["1900-12-31"],
            ["2023-01-01"],
            ["2100-03-01"],
            ["2024-02-29"],
        ],
    ),
    dict(
        title="Does the Inspector End Where They Started?",
        difficulty="easy",
        topics=["Maths", "Dates & simulation"],
        statement=(
            "A site inspector walks around a grid following the string `moves`. Each character is one step: "
            "`'U'` up, `'D'` down, `'L'` left or `'R'` right.\n\n"
            "Return `True` if the inspector finishes back at the starting point, and `False` otherwise.\n\n"
            "Constraints: `0 <= len(moves) <= 20 000` and `moves` contains only those four letters."
        ),
        signature="def back_at_start(moves: str) -> bool",
        solution='''def back_at_start(moves):
    x = moves.count("R") - moves.count("L")
    y = moves.count("U") - moves.count("D")
    return x == 0 and y == 0
''',
        tests=[["UURDDL"], [""], ["LL"], ["UD"], ["RRUL"], ["LDRRUL"], ["U" * 5000 + "R" * 3000 + "D" * 5000 + "L" * 2999]],
    ),
    dict(
        title="Winning the Pile Game",
        difficulty="medium",
        topics=["Maths", "Dates & simulation"],
        statement=(
            "Two players play a game with several piles of counters, given as the list `piles`. They take turns, "
            "and on each turn a player chooses one non-empty pile and removes any positive number of counters "
            "from it (up to the whole pile). The player who takes the last counter wins. If there are no "
            "counters at all, the first player cannot move and loses.\n\n"
            "Both players play perfectly. Return `True` if the first player can force a win, and `False` "
            "otherwise.\n\n"
            "Constraints: `1 <= len(piles) <= 1000` and every pile holds between 0 and 10^9 counters."
        ),
        signature="def first_player_wins(piles: list[int]) -> bool",
        solution='''from functools import reduce
from operator import xor


def first_player_wins(piles):
    # the player to move loses exactly when the XOR of the pile sizes is zero
    return reduce(xor, piles, 0) != 0
''',
        tests=[
            [[3, 4, 5]],
            [[1, 1]],
            [[0]],
            [[7]],
            [[1, 2, 3]],
            [[5, 9, 12]],
            [[0, 0, 6]],
            [[1000000000, 999999999, 1]],
        ],
        notes=[
            "Try small cases by hand. With one pile the first player simply takes it all; with two equal piles the second player can copy every move.",
        ],
    ),
    dict(
        title="Days Between Two Policy Dates",
        difficulty="medium",
        topics=["Maths", "Dates & simulation"],
        statement=(
            "Given two dates `start` and `end` as `'YYYY-MM-DD'` strings, return the number of days between "
            "them as a non-negative integer. The dates may be given in either order, and the same date twice "
            "gives 0.\n\n"
            "Use the Gregorian calendar: a year is a leap year if it is divisible by 4, except that years "
            "divisible by 100 are not leap years unless they are also divisible by 400.\n\n"
            "Constraints: both dates are valid and their years are between 1600 and 2400. Work it out yourself "
            "rather than using the `datetime` module."
        ),
        signature="def days_between(start: str, end: str) -> int",
        solution='''MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


def day_number(date):
    """Days from 1 January 1600 to the given date."""
    year, month, day = (int(part) for part in date.split("-"))
    days = sum(366 if is_leap(y) else 365 for y in range(1600, year))
    days += sum(MONTH_DAYS[: month - 1]) + day - 1
    if month > 2 and is_leap(year):
        days += 1
    return days


def days_between(start, end):
    return abs(day_number(end) - day_number(start))
''',
        tests=[
            ["2024-01-15", "2024-03-01"],
            ["2023-06-30", "2023-06-30"],
            ["2021-01-01", "2020-01-01"],
            ["1900-02-28", "1900-03-01"],
            ["2000-02-28", "2000-03-01"],
            ["1999-12-31", "2100-01-01"],
            ["1600-01-01", "2400-12-31"],
        ],
        notes=["Counting each date's days from a fixed starting point turns the problem into one subtraction."],
    ),
    dict(
        title="Spreadsheet Serial Number to Date",
        difficulty="hard",
        topics=["Maths", "Dates & simulation"],
        statement=(
            "A spreadsheet stores dates as serial numbers counting days, with serial 1 meaning `'1900-01-01'`, "
            "serial 2 meaning `'1900-01-02'` and so on. To stay compatible with an old program, it wrongly "
            "treats 1900 as a leap year: serial 59 is `'1900-02-28'`, serial 60 is the date `'1900-02-29'` "
            "(which never existed) and serial 61 is `'1900-03-01'`. Every later serial follows the real "
            "calendar.\n\n"
            "Given a `serial`, return its date as a `'YYYY-MM-DD'` string, keeping the quirk above. Outside "
            "1900 the usual Gregorian rules apply: a year is a leap year if it is divisible by 4, except that "
            "years divisible by 100 are not leap years unless they are also divisible by 400.\n\n"
            "Constraints: `1 <= serial <= 2 958 465` (the last serial is 31 December 9999). Work it out "
            "yourself rather than using the `datetime` module."
        ),
        signature="def serial_to_date(serial: int) -> str",
        solution='''MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


def serial_to_date(serial):
    if serial == 60:
        return "1900-02-29"
    remaining = serial - 1 if serial > 60 else serial   # skip the day that never existed
    year = 1900
    while True:
        length = 366 if is_leap(year) else 365
        if remaining <= length:
            break
        remaining -= length
        year += 1
    for month, days in enumerate(MONTH_DAYS, start=1):
        if month == 2 and is_leap(year):
            days += 1
        if remaining <= days:
            return f"{year:04d}-{month:02d}-{remaining:02d}"
        remaining -= days
''',
        tests=[[45000], [1], [59], [60], [61], [366], [367], [36526], [36585], [2958465]],
        notes=["Deal with the fictitious 29 February first, then the rest is ordinary calendar arithmetic."],
    ),
]
