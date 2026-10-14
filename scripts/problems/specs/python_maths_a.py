# Maths problems, part A: digits, number bases, primes and divisors, powers and roots,
# factorials and combinatorics. All inputs and results stay below 2**53 so they survive
# the trip through JSON in the browser.

PROBLEMS = [
    # ---------------------------------------------------------------- Digits
    dict(
        title="Digit Root of a Number",
        difficulty="easy",
        topics=["Maths", "Digits"],
        statement=(
            "Add up the digits of a non-negative integer `n`. If the total has more than one digit, "
            "add up its digits too, and keep going until a single digit is left.\n\n"
            "Return that single digit as an `int`. `n` is between 0 and 10^12."
        ),
        signature="def digit_root(n: int) -> int",
        solution="""\
def digit_root(n):
    while n >= 10:
        n = sum(int(d) for d in str(n))
    return n
""",
        tests=[[7365], [0], [9], [38], [987654321], [10**12], [1000000000001]],
        notes=["There is a neat shortcut using remainders on division by 9. Can you find it?"],
    ),
    dict(
        title="Mirror-Image Policy Numbers",
        difficulty="easy",
        topics=["Maths", "Digits"],
        statement=(
            "A policy number is called a mirror number if its digits read the same from left to right "
            "as from right to left.\n\n"
            "Given an integer `x`, return `True` if it is a mirror number and `False` otherwise. "
            "Negative numbers are never mirror numbers, because of the minus sign. "
            "`x` is between -10^12 and 10^12."
        ),
        signature="def is_mirror_number(x: int) -> bool",
        solution="""\
def is_mirror_number(x):
    if x < 0:
        return False
    original, reversed_x = x, 0
    while x > 0:
        reversed_x = reversed_x * 10 + x % 10
        x //= 10
    return original == reversed_x
""",
        tests=[[12321], [-121], [10], [0], [7], [1000021], [123454321], [999999999999]],
        notes=["Try solving it with arithmetic only, without turning the number into a string."],
    ),
    dict(
        title="Numbers Divisible by Their Own Digits",
        difficulty="easy",
        topics=["Maths", "Digits"],
        statement=(
            "A positive integer is self-dividing if it contains no zero digit and it is divisible by "
            "every one of its digits. For example, 36 is self-dividing because 36 is divisible by both 3 and 6.\n\n"
            "Given two integers `low` and `high` with 1 <= `low` <= `high` <= 10^4, return a list of all "
            "self-dividing numbers from `low` to `high` inclusive, in ascending order. Return an empty list if there are none."
        ),
        signature="def self_dividing(low: int, high: int) -> list[int]",
        solution="""\
def self_dividing(low, high):
    result = []
    for n in range(low, high + 1):
        digits = [int(d) for d in str(n)]
        if all(d != 0 and n % d == 0 for d in digits):
            result.append(n)
    return result
""",
        tests=[[1, 22], [47, 85], [100, 110], [128, 128], [9990, 10000], [1, 1]],
    ),
    dict(
        title="Narcissistic Number Check",
        difficulty="easy",
        topics=["Maths", "Digits"],
        statement=(
            "Suppose a non-negative integer `n` has `k` digits. It is narcissistic if raising each digit "
            "to the power `k` and adding the results gives back `n`. For example, 153 has 3 digits and "
            "1^3 + 5^3 + 3^3 = 153.\n\n"
            "Return `True` if `n` is narcissistic and `False` otherwise. `n` is between 0 and 10^9."
        ),
        signature="def is_narcissistic(n: int) -> bool",
        solution="""\
def is_narcissistic(n):
    digits = [int(d) for d in str(n)]
    k = len(digits)
    return sum(d ** k for d in digits) == n
""",
        tests=[[153], [154], [0], [9], [10], [9474], [548834], [1000000000]],
    ),
    dict(
        title="Digit Product Minus Digit Sum",
        difficulty="easy",
        topics=["Maths", "Digits"],
        statement=(
            "Given a positive integer `n`, work out the product of its digits and the sum of its digits.\n\n"
            "Return the product minus the sum as an `int`. The answer can be negative. "
            "`n` is between 1 and 10^9."
        ),
        signature="def product_minus_sum(n: int) -> int",
        solution="""\
def product_minus_sum(n):
    product, total = 1, 0
    while n > 0:
        d = n % 10
        product *= d
        total += d
        n //= 10
    return product - total
""",
        tests=[[234], [4421], [7], [105], [11], [999999999], [1000000000]],
    ),
    dict(
        title="Reversing a Policy Number Safely",
        difficulty="medium",
        topics=["Maths", "Digits"],
        statement=(
            "An old policy system stores numbers as signed 32-bit integers, so every value must stay "
            "between -2^31 and 2^31 - 1 inclusive.\n\n"
            "Given such an integer `x`, return the integer you get by reversing its decimal digits, keeping "
            "the sign. Zeros that end up at the front simply disappear, so 4710 becomes 174. "
            "If the reversed number falls outside the 32-bit range, return `0` instead.\n\n"
            "Imagine you can't store anything bigger than 32 bits: build the answer one digit at a time and "
            "check that the next step stays in range before you take it."
        ),
        signature="def reverse_digits(x: int) -> int",
        solution="""\
def reverse_digits(x):
    sign = -1 if x < 0 else 1
    limit = 2**31 if x < 0 else 2**31 - 1
    x = abs(x)
    result = 0
    while x > 0:
        d = x % 10
        x //= 10
        # result * 10 + d <= limit  is the same as  result <= (limit - d) // 10
        if result > (limit - d) // 10:
            return 0
        result = result * 10 + d
    return sign * result
""",
        tests=[[4710], [-385], [0], [120], [1534236469], [1463847412], [-2147483412], [-2147483648], [2147483647]],
    ),
    dict(
        title="Closest Palindromic Reference",
        difficulty="hard",
        topics=["Maths", "Digits"],
        statement=(
            "Claim references are positive integers, given to you as a string `n` of digits with no leading "
            "zeros. `n` has between 1 and 15 digits.\n\n"
            "Find the palindrome (a non-negative integer that reads the same both ways) that is closest to `n`, "
            "measured by absolute difference. It must not be `n` itself. If two palindromes are equally close, "
            "pick the smaller one.\n\n"
            "Return the answer as a string with no leading zeros. Note that 0 counts as a palindrome."
        ),
        signature="def closest_palindrome(n: str) -> str",
        solution="""\
def closest_palindrome(n):
    length = len(n)
    value = int(n)
    # Numbers like 999 and 1001 are the edge cases where the length changes.
    candidates = {10 ** length + 1, 10 ** (length - 1) - 1}
    prefix = int(n[: (length + 1) // 2])
    for p in (prefix - 1, prefix, prefix + 1):
        s = str(p)
        if length % 2 == 1:
            candidates.add(int(s + s[:-1][::-1]))
        else:
            candidates.add(int(s + s[::-1]))
    candidates.discard(value)
    best = min(candidates, key=lambda c: (abs(c - value), c))
    return str(best)
""",
        tests=[["12345"], ["1"], ["10"], ["11"], ["99"], ["100"], ["12921"], ["807045053224792"], ["999999999999999"], ["1000000000000000"]],
        notes=["Think about which palindromes share the first half of `n`, and the special cases where the number of digits changes."],
    ),
    dict(
        title="Counting the Digit One",
        difficulty="hard",
        topics=["Maths", "Digits"],
        statement=(
            "Write out every integer from 0 to `n` inclusive. How many times does the digit 1 appear in total? "
            "For example, from 0 to 13 it appears in 1, 10, 11 (twice), 12 and 13, which is 6 times.\n\n"
            "Return the count as an `int`. `n` is between 0 and 10^12, so you can't simply count number by number."
        ),
        signature="def count_digit_one(n: int) -> int",
        solution="""\
def count_digit_one(n):
    total = 0
    place = 1
    while place <= n:
        higher = n // (place * 10)
        current = (n // place) % 10
        lower = n % place
        if current == 0:
            total += higher * place
        elif current == 1:
            total += higher * place + lower + 1
        else:
            total += (higher + 1) * place
        place *= 10
    return total
""",
        tests=[[13], [0], [1], [9], [100], [999999], [3141592653], [10**12]],
        notes=["Count how often a 1 lands in the units place, then the tens place, and so on."],
    ),
    # ---------------------------------------------------------------- Number bases
    dict(
        title="Summing Two Binary Strings",
        difficulty="easy",
        topics=["Maths", "Number bases"],
        statement=(
            "You are given two binary numbers as strings `a` and `b`, made only of the characters `0` and `1`. "
            "Neither has leading zeros, except the number zero itself, which is written `\"0\"`. "
            "Each string has between 1 and 10^4 characters.\n\n"
            "Return their sum as a binary string, also without leading zeros."
        ),
        signature="def add_binary(a: str, b: str) -> str",
        solution="""\
def add_binary(a, b):
    i, j, carry = len(a) - 1, len(b) - 1, 0
    digits = []
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += int(a[i])
            i -= 1
        if j >= 0:
            total += int(b[j])
            j -= 1
        digits.append(str(total % 2))
        carry = total // 2
    return "".join(reversed(digits)) or "0"
""",
        tests=[["1011", "111"], ["0", "0"], ["1", "1"], ["1111", "1"], ["0", "101"], ["1" * 60, "1"], ["100100111", "11011001110"]],
        notes=["Try adding column by column with a carry, as you would on paper."],
    ),
    dict(
        title="Reading Roman Numerals",
        difficulty="easy",
        topics=["Maths", "Number bases"],
        statement=(
            "Some old policy documents number their schedules in Roman numerals. The symbols are "
            "`I` = 1, `V` = 5, `X` = 10, `L` = 50, `C` = 100, `D` = 500 and `M` = 1000. Symbols are normally "
            "written from largest to smallest and added up. When a smaller symbol comes just before a larger one, "
            "it is subtracted instead: `IV` = 4, `IX` = 9, `XL` = 40, `XC` = 90, `CD` = 400 and `CM` = 900.\n\n"
            "Given a valid Roman numeral `s` for a number from 1 to 3999, return its value as an `int`."
        ),
        signature="def from_roman(s: str) -> int",
        solution="""\
def from_roman(s):
    values = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
    total = 0
    for i, ch in enumerate(s):
        v = values[ch]
        if i + 1 < len(s) and values[s[i + 1]] > v:
            total -= v
        else:
            total += v
    return total
""",
        tests=[["CDXLIV"], ["I"], ["VIII"], ["XLIX"], ["MDCCLXXVI"], ["MMXXIV"], ["MMMCMXCIX"]],
    ),
    dict(
        title="Spreadsheet Column Label to Number",
        difficulty="easy",
        topics=["Maths", "Number bases"],
        statement=(
            "Spreadsheet columns are labelled `A`, `B`, ..., `Z`, then `AA`, `AB`, ..., `AZ`, `BA`, and so on. "
            "So `A` is column 1, `Z` is column 26 and `AA` is column 27.\n\n"
            "Given a label made of 1 to 7 capital letters, return its column number as an `int`."
        ),
        signature="def column_number(label: str) -> int",
        solution="""\
def column_number(label):
    n = 0
    for ch in label:
        n = n * 26 + (ord(ch) - ord("A") + 1)
    return n
""",
        tests=[["AB"], ["A"], ["Z"], ["AZ"], ["ZZ"], ["AAA"], ["FXSHRXW"]],
    ),
    dict(
        title="Flipping Every Bit",
        difficulty="easy",
        topics=["Maths", "Number bases"],
        statement=(
            "Write a non-negative integer `n` in binary without leading zeros (zero itself is written `0`). "
            "Now flip every bit, turning each 0 into 1 and each 1 into 0, and read the result as a binary number.\n\n"
            "Return that number as an `int`. For example, 10 is `1010` in binary, which flips to `0101`, so the answer is 5. "
            "`n` is between 0 and 10^9."
        ),
        signature="def flip_bits(n: int) -> int",
        solution="""\
def flip_bits(n):
    if n == 0:
        return 1
    mask = (1 << n.bit_length()) - 1
    return n ^ mask
""",
        tests=[[10], [0], [1], [7], [8], [1000000000]],
    ),
    dict(
        title="Differing Bits Between Two Codes",
        difficulty="easy",
        topics=["Maths", "Number bases"],
        statement=(
            "Two risk codes `a` and `b` are stored as non-negative integers below 2^31. Line up their binary forms "
            "(padding the shorter one with leading zeros) and count the positions where the bits differ.\n\n"
            "Return that count as an `int`."
        ),
        signature="def differing_bits(a: int, b: int) -> int",
        solution="""\
def differing_bits(a, b):
    x = a ^ b
    count = 0
    while x:
        count += x & 1
        x >>= 1
    return count
""",
        tests=[[9, 14], [0, 0], [5, 5], [1, 4], [0, 2**31 - 1], [123456789, 987654321]],
    ),
    dict(
        title="Writing a Number in Another Base",
        difficulty="medium",
        topics=["Maths", "Number bases"],
        statement=(
            "Given an integer `n` and a base `base` between 2 and 16, return `n` written in that base as a string.\n\n"
            "Use the digits `0` to `9` and then the capital letters `A` to `F` for the values 10 to 15. "
            "Negative numbers start with a minus sign, and zero is written `\"0\"`. "
            "Don't add leading zeros. `n` is between -10^12 and 10^12."
        ),
        signature="def to_base(n: int, base: int) -> str",
        solution="""\
def to_base(n, base):
    if n == 0:
        return "0"
    symbols = "0123456789ABCDEF"
    sign = "-" if n < 0 else ""
    n = abs(n)
    digits = []
    while n > 0:
        digits.append(symbols[n % base])
        n //= base
    return sign + "".join(reversed(digits))
""",
        tests=[[100, 7], [-7, 7], [0, 2], [1, 16], [255, 16], [-48879, 16], [10**12, 3], [-10**12, 2]],
        notes=["Python's `bin` and `hex` only cover some bases, so build the digits yourself."],
    ),
    dict(
        title="Policy Years in Roman Numerals",
        difficulty="medium",
        topics=["Maths", "Number bases"],
        statement=(
            "Anniversary certificates show the policy year in Roman numerals. The symbols are "
            "`I` = 1, `V` = 5, `X` = 10, `L` = 50, `C` = 100, `D` = 500 and `M` = 1000, written from largest to smallest. "
            "A symbol is never repeated more than three times in a row; instead, use the subtractive pairs "
            "`IV` = 4, `IX` = 9, `XL` = 40, `XC` = 90, `CD` = 400 and `CM` = 900.\n\n"
            "Given an integer `n` from 1 to 3999, return its Roman numeral as a string."
        ),
        signature="def to_roman(n: int) -> str",
        solution="""\
def to_roman(n):
    table = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
    ]
    parts = []
    for value, symbol in table:
        count, n = divmod(n, value)
        parts.append(symbol * count)
    return "".join(parts)
""",
        tests=[[2024], [1], [4], [444], [949], [3888], [3999]],
    ),
    dict(
        title="Number to Spreadsheet Column Label",
        difficulty="medium",
        topics=["Maths", "Number bases"],
        statement=(
            "Spreadsheet columns are labelled `A`, `B`, ..., `Z`, then `AA`, `AB`, ..., `ZZ`, then `AAA`, and so on, "
            "so column 1 is `A`, column 26 is `Z` and column 27 is `AA`.\n\n"
            "Given a column number `n` between 1 and 2^31 - 1, return its label as a string of capital letters."
        ),
        signature="def column_label(n: int) -> str",
        solution="""\
def column_label(n):
    letters = []
    while n > 0:
        n -= 1
        letters.append(chr(ord("A") + n % 26))
        n //= 26
    return "".join(reversed(letters))
""",
        tests=[[731], [1], [26], [27], [52], [702], [703], [2147483647]],
        notes=["This is like base 26, except there is no digit for zero. That changes how you handle `Z`."],
    ),
    dict(
        title="Base Where a Number Is All Ones",
        difficulty="hard",
        topics=["Maths", "Number bases"],
        statement=(
            "Every integer `n` of at least 3 looks like `11` in base `n - 1`, because 1 x (n - 1) + 1 = n. "
            "Often a smaller base also works: 13 is `111` in base 3, since 9 + 3 + 1 = 13.\n\n"
            "Given an integer `n` between 3 and 10^15, return the smallest base `k` (an `int`, at least 2) in which "
            "every digit of `n` is a 1."
        ),
        signature="def all_ones_base(n: int) -> int",
        solution="""\
def all_ones_base(n):
    # Try the longest possible string of ones first: more ones means a smaller base.
    for ones in range(n.bit_length(), 2, -1):
        lo, hi = 2, int(n ** (1 / (ones - 1))) + 1
        while lo <= hi:
            k = (lo + hi) // 2
            total = 0
            for _ in range(ones):
                total = total * k + 1
            if total == n:
                return k
            if total < n:
                lo = k + 1
            else:
                hi = k - 1
    return n - 1
""",
        tests=[[13], [3], [6], [7], [31], [4681], [2**50 - 1], [10**15], [111111111111111]],
        notes=["For a fixed number of ones, the value grows with the base, so you can search for the base."],
    ),
    dict(
        title="Binary Codes Without Neighbouring Ones",
        difficulty="hard",
        topics=["Maths", "Number bases"],
        statement=(
            "A system only accepts codes whose binary form never has two 1s next to each other. "
            "For example, 5 (`101`) is fine but 6 (`110`) is not.\n\n"
            "Given an integer `n` between 0 and 10^15, return how many integers from 0 to `n` inclusive are accepted, as an `int`."
        ),
        signature="def count_no_adjacent_ones(n: int) -> int",
        solution="""\
def count_no_adjacent_ones(n):
    # ways[i] = number of binary strings of length i with no two adjacent ones
    ways = [1, 2]
    while len(ways) < 64:
        ways.append(ways[-1] + ways[-2])
    bits = bin(n)[2:]
    total, previous = 0, "0"
    for i, b in enumerate(bits):
        if b == "1":
            # Put a 0 here instead; the remaining bits are then free (within the rule).
            total += ways[len(bits) - i - 1]
            if previous == "1":
                return total
        previous = b
    return total + 1  # n itself is accepted
""",
        tests=[[5], [0], [1], [2], [3], [6], [100], [1000000], [10**15]],
        notes=["The number of valid bit strings of each length follows a famous sequence."],
    ),
    # ---------------------------------------------------------------- Primes & divisors
    dict(
        title="Built from 2, 3 and 5",
        difficulty="easy",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "Call a positive integer smooth if its only prime factors are 2, 3 and 5. "
            "The number 1 has no prime factors at all, so it counts as smooth.\n\n"
            "Given an integer `n` between -10^12 and 10^12, return `True` if it is smooth and `False` otherwise. "
            "Zero and negative numbers are never smooth."
        ),
        signature="def is_smooth(n: int) -> bool",
        solution="""\
def is_smooth(n):
    if n <= 0:
        return False
    for p in (2, 3, 5):
        while n % p == 0:
            n //= p
    return n == 1
""",
        tests=[[60], [14], [1], [0], [-30], [2**20 * 3**5 * 5**3], [7 * 2**30], [49]],
    ),
    dict(
        title="Equal to Its Divisor Sum",
        difficulty="easy",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "A positive integer is perfect if it equals the sum of its proper divisors, that is, all its positive "
            "divisors except itself. For example, 28 = 1 + 2 + 4 + 7 + 14.\n\n"
            "Given `n` between 1 and 10^8, return `True` if `n` is perfect and `False` otherwise."
        ),
        signature="def is_perfect(n: int) -> bool",
        solution="""\
def is_perfect(n):
    if n == 1:
        return False
    total = 1
    d = 2
    while d * d <= n:
        if n % d == 0:
            total += d
            if d != n // d:
                total += n // d
        d += 1
    return total == n
""",
        tests=[[28], [1], [6], [12], [496], [8128], [33550336], [100000000]],
        notes=["Divisors come in pairs `d` and `n // d`, so you only need to check up to the square root."],
    ),
    dict(
        title="Exactly Three Divisors",
        difficulty="easy",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "Given a positive integer `n` between 1 and 10^12, return `True` if `n` has exactly three positive "
            "divisors and `False` otherwise. For example, 49 has the divisors 1, 7 and 49."
        ),
        signature="def has_three_divisors(n: int) -> bool",
        solution="""\
from math import isqrt


def has_three_divisors(n):
    # Only squares of primes have exactly three divisors: 1, p and p * p.
    root = isqrt(n)
    if root * root != n or root < 2:
        return False
    d = 2
    while d * d <= root:
        if root % d == 0:
            return False
        d += 1
    return True
""",
        tests=[[49], [1], [4], [12], [16], [36], [999966000289], [1000000000000]],
        notes=["Think about which numbers can have an odd number of divisors."],
    ),
    dict(
        title="GCD and LCM of a List",
        difficulty="easy",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "Premium payments on several products repeat every `nums[i]` days. Find the greatest common divisor "
            "(the largest whole number that divides every value) and the least common multiple (the smallest "
            "positive whole number that every value divides) of the list.\n\n"
            "`nums` has between 1 and 100 positive integers, each at most 10^6, and the least common multiple is "
            "guaranteed to be below 10^15. Return `[gcd, lcm]` as a list of two `int`s."
        ),
        signature="def gcd_and_lcm(nums: list[int]) -> list[int]",
        solution="""\
def gcd_and_lcm(nums):
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    g, l = nums[0], nums[0]
    for x in nums[1:]:
        g = gcd(g, x)
        l = l // gcd(l, x) * x
    return [g, l]
""",
        tests=[[[12, 18, 30]], [[7]], [[1, 1, 1]], [[4, 9]], [[6, 10, 15]], [[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]], [[1000000, 999999]]],
        notes=["The two are linked: for two numbers, `gcd(a, b) * lcm(a, b) == a * b`."],
    ),
    dict(
        title="Primes Below a Limit",
        difficulty="medium",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "Given an integer `n` between 0 and 10^6, return how many prime numbers are strictly less than `n`, as an `int`. "
            "Remember that 0 and 1 are not prime."
        ),
        signature="def count_primes(n: int) -> int",
        solution="""\
def count_primes(n):
    if n < 3:
        return 0
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False
    p = 2
    while p * p < n:
        if is_prime[p]:
            for multiple in range(p * p, n, p):
                is_prime[multiple] = False
        p += 1
    return sum(is_prime)
""",
        tests=[[30], [0], [1], [2], [3], [100], [100000], [1000000]],
        notes=["Checking each number on its own is too slow for large `n`. Cross out multiples instead (the sieve of Eratosthenes)."],
    ),
    dict(
        title="The nth Smooth Number",
        difficulty="medium",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "Call a positive integer smooth if its only prime factors are 2, 3 and 5. In ascending order the smooth "
            "numbers start 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ... (1 counts, because it has no prime factors).\n\n"
            "Given `n` between 1 and 2000, return the `n`th smooth number as an `int`."
        ),
        signature="def nth_smooth(n: int) -> int",
        solution="""\
def nth_smooth(n):
    smooth = [1]
    i2 = i3 = i5 = 0
    while len(smooth) < n:
        nxt = min(smooth[i2] * 2, smooth[i3] * 3, smooth[i5] * 5)
        smooth.append(nxt)
        if nxt == smooth[i2] * 2:
            i2 += 1
        if nxt == smooth[i3] * 3:
            i3 += 1
        if nxt == smooth[i5] * 5:
            i5 += 1
    return smooth[n - 1]
""",
        tests=[[10], [1], [2], [7], [11], [150], [2000]],
        notes=["Every smooth number after 1 is 2, 3 or 5 times a smaller smooth number."],
    ),
    dict(
        title="The kth Divisor",
        difficulty="medium",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "List the positive divisors of `n` in ascending order. Return the `k`th one as an `int`, "
            "or `-1` if `n` has fewer than `k` divisors.\n\n"
            "`n` is between 1 and 10^10 and `k` is between 1 and 10^4, so checking every number up to `n` is too slow."
        ),
        signature="def kth_divisor(n: int, k: int) -> int",
        solution="""\
def kth_divisor(n, k):
    small, large = [], []
    d = 1
    while d * d <= n:
        if n % d == 0:
            small.append(d)
            if d != n // d:
                large.append(n // d)
        d += 1
    divisors = small + large[::-1]
    return divisors[k - 1] if k <= len(divisors) else -1
""",
        tests=[[12, 3], [12, 6], [12, 7], [1, 1], [1, 2], [97, 2], [36, 5], [10**10, 50], [9999999967, 2]],
    ),
    dict(
        title="Distinct Primes in a Product",
        difficulty="medium",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "You are given a list `nums` of claim counts, with between 1 and 1000 values, each between 1 and 10^6. "
            "Imagine multiplying them all together.\n\n"
            "Return how many different prime numbers divide that product, as an `int`. "
            "Try to do it without forming the (possibly huge) product."
        ),
        signature="def distinct_prime_factors(nums: list[int]) -> int",
        solution="""\
def distinct_prime_factors(nums):
    primes = set()
    for x in nums:
        d = 2
        while d * d <= x:
            if x % d == 0:
                primes.add(d)
                while x % d == 0:
                    x //= d
            d += 1
        if x > 1:
            primes.add(x)
    return len(primes)
""",
        tests=[[[6, 10, 21]], [[1]], [[2, 4, 8, 16]], [[999983, 999983]], [[30, 77, 13, 1]], [[1000000, 999999, 720720]], [[1, 1, 1, 1]]],
        notes=["A prime divides the product exactly when it divides at least one of the values."],
    ),
    dict(
        title="Nth Review Day",
        difficulty="hard",
        topics=["Maths", "Primes & divisors"],
        statement=(
            "Starting from day 1, one team reviews the claims book on every day that is a multiple of `a`, and "
            "another team on every day that is a multiple of `b`. A review day is any day on which at least one "
            "team reviews; days when both teams review count once.\n\n"
            "Given `n` between 1 and 10^9, and `a` and `b` between 2 and 40 000, return the day number of the "
            "`n`th review day as an `int`. Listing the days one by one is too slow."
        ),
        signature="def nth_review_day(n: int, a: int, b: int) -> int",
        solution="""\
from math import gcd


def nth_review_day(n, a, b):
    both = a * b // gcd(a, b)

    def review_days_up_to(day):
        return day // a + day // b - day // both

    lo, hi = 1, n * min(a, b)
    while lo < hi:
        mid = (lo + hi) // 2
        if review_days_up_to(mid) >= n:
            hi = mid
        else:
            lo = mid + 1
    return lo
""",
        tests=[[5, 2, 3], [1, 2, 3], [4, 2, 4], [3, 6, 4], [7, 5, 5], [10, 4, 6], [1000000000, 40000, 39999], [999999999, 2, 3]],
        notes=["Count how many review days fall on or before a given day using inclusion and exclusion, then search for the right day."],
    ),
    # ---------------------------------------------------------------- Powers & roots
    dict(
        title="Power of a Small Base",
        difficulty="easy",
        topics=["Maths", "Powers & roots"],
        statement=(
            "Given an integer `n` and a base `base` that is 2, 3 or 4, return `True` if `n` equals `base` raised to "
            "some whole power `k` >= 0, and `False` otherwise. Note that 1 is `base` to the power 0.\n\n"
            "`n` is between -10^15 and 10^15."
        ),
        signature="def is_power_of(n: int, base: int) -> bool",
        solution="""\
def is_power_of(n, base):
    if n < 1:
        return False
    while n % base == 0:
        n //= base
    return n == 1
""",
        tests=[[81, 3], [64, 4], [32, 4], [1, 2], [0, 2], [-8, 2], [6, 2], [2**50, 2], [3**31, 3], [3**31 + 2, 3], [4**24, 4], [2**49, 4]],
        notes=["For a power of 2, try `n & (n - 1)`. Can you find similar tricks for 3 and 4?"],
    ),
    dict(
        title="Integer Square Root by Hand",
        difficulty="medium",
        topics=["Maths", "Powers & roots"],
        statement=(
            "Given a non-negative integer `n` between 0 and 10^15, return the largest integer `r` with `r * r <= n`, as an `int`. "
            "In other words, the square root of `n` rounded down.\n\n"
            "Don't use `math.sqrt`, `math.isqrt`, `** 0.5` or any other built-in root: work it out with integer arithmetic. "
            "You can then use it to tell whether `n` is a perfect square."
        ),
        signature="def int_sqrt(n: int) -> int",
        solution="""\
def int_sqrt(n):
    lo, hi = 0, n
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if mid * mid <= n:
            lo = mid
        else:
            hi = mid - 1
    return lo
""",
        tests=[[40], [0], [1], [3], [99], [100], [2147395600], [999999999999999], [10**15]],
        notes=["Binary search over the answer works well. Newton's method is even faster."],
    ),
    dict(
        title="Fast Exponentiation",
        difficulty="medium",
        topics=["Maths", "Powers & roots"],
        statement=(
            "Given a number `x` between -100 and 100 and an integer `n` between -2^31 and 2^31 - 1, return `x` raised to the "
            "power `n` as a `float`. A negative power means 1 divided by the positive power, so 2^-3 = 0.125.\n\n"
            "`x` is never 0 when `n` is negative, and the true answer is always between -10^4 and 10^4. "
            "Multiplying `x` by itself `n` times is far too slow for large `n`, and don't use `**` or `pow` on `x` and `n` directly."
        ),
        signature="def fast_power(x: float, n: int) -> float",
        solution="""\
def fast_power(x, n):
    if n < 0:
        x, n = 1 / x, -n
    result = 1.0
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result
""",
        tests=[[1.5, 3], [2.0, -3], [5.0, 0], [0.0, 5], [-2.0, 7], [1.0, 2147483647], [-1.0, -2147483648], [1.00001, 100000], [0.5, 10]],
        notes=["Use the fact that x^n = (x^2)^(n/2) when `n` is even, so you halve `n` at each step."],
    ),
    dict(
        title="Splitting into Two Squares",
        difficulty="medium",
        topics=["Maths", "Powers & roots"],
        statement=(
            "Given an integer `c` between 0 and 10^10, return `True` if there are non-negative integers `a` and `b` with "
            "`a * a + b * b == c`, and `False` otherwise. `a` and `b` may be equal, and either may be 0."
        ),
        signature="def is_sum_of_two_squares(c: int) -> bool",
        solution="""\
from math import isqrt


def is_sum_of_two_squares(c):
    a, b = 0, isqrt(c)
    while a <= b:
        total = a * a + b * b
        if total == c:
            return True
        if total < c:
            a += 1
        else:
            b -= 1
    return False
""",
        tests=[[41], [3], [0], [1], [2], [21], [10**10], [9999999967], [2147483646]],
        notes=["Try two pointers: one counting up from 0 and one counting down from the square root of `c`."],
    ),
    dict(
        title="Counting Perfect Powers",
        difficulty="hard",
        topics=["Maths", "Powers & roots"],
        statement=(
            "A perfect power is a positive integer that can be written as `a ** b` with whole numbers `a` >= 1 and `b` >= 2. "
            "So 1, 4, 8, 9, 16, 25, 27 and 32 are all perfect powers. Numbers such as 64, which is both a square and a cube, "
            "count only once.\n\n"
            "Given `n` between 1 and 10^15, return how many perfect powers are between 1 and `n` inclusive, as an `int`."
        ),
        signature="def count_perfect_powers(n: int) -> int",
        solution="""\
from math import isqrt


def count_perfect_powers(n):
    squares = isqrt(n)  # 1, 4, 9, ... up to n
    others = set()
    b = 3
    while 2 ** b <= n:
        a = 2
        while a ** b <= n:
            x = a ** b
            r = isqrt(x)
            if r * r != x:  # squares are already counted
                others.add(x)
            a += 1
        b += 1
    return squares + len(others)
""",
        tests=[[30], [1], [3], [4], [100], [1000000], [10**12], [10**15]],
        notes=["There are far too many squares to list, but they are easy to count. Higher powers are rare enough to list."],
    ),
    # ---------------------------------------------------------------- Combinatorics
    dict(
        title="Rows of Pascal's Triangle",
        difficulty="easy",
        topics=["Maths", "Combinatorics"],
        statement=(
            "In Pascal's triangle the first row is `[1]`. Each later row starts and ends with 1, and every other entry is "
            "the sum of the two entries just above it in the previous row.\n\n"
            "Given `num_rows` between 0 and 30, return the first `num_rows` rows as a list of lists of `int`s. "
            "Return an empty list when `num_rows` is 0."
        ),
        signature="def pascal_rows(num_rows: int) -> list[list[int]]",
        solution="""\
def pascal_rows(num_rows):
    rows = []
    for i in range(num_rows):
        if i == 0:
            rows.append([1])
        else:
            prev = rows[-1]
            rows.append([1] + [prev[j] + prev[j + 1] for j in range(len(prev) - 1)] + [1])
    return rows
""",
        tests=[[5], [0], [1], [2], [10], [30]],
    ),
    dict(
        title="Zeros at the End of n!",
        difficulty="medium",
        topics=["Maths", "Combinatorics"],
        statement=(
            "Given a non-negative integer `n`, return how many zeros `n!` (n factorial, 1 x 2 x ... x n, with 0! = 1) ends with, as an `int`.\n\n"
            "`n` is between 0 and 10^15, so you can't work out the factorial itself."
        ),
        signature="def factorial_zeros(n: int) -> int",
        solution="""\
def factorial_zeros(n):
    zeros = 0
    while n > 0:
        n //= 5
        zeros += n
    return zeros
""",
        tests=[[25], [0], [4], [5], [24], [100], [1000], [10**15]],
        notes=["Each trailing zero needs a factor 10 = 2 x 5. Factors of 2 are plentiful, so count the factors of 5."],
    ),
    dict(
        title="Choosing Claims for Audit",
        difficulty="medium",
        topics=["Maths", "Combinatorics"],
        statement=(
            "An auditor picks `r` claims out of `n` to review, and the order of picking doesn't matter. "
            "The number of ways is the binomial coefficient C(n, r) = n! / (r! (n - r)!), which is 0 when `r` > `n`.\n\n"
            "Given `n` between 0 and 2 x 10^5 and `r` between 0 and 2 x 10^5, return C(n, r) modulo 1 000 000 007 as an `int`."
        ),
        signature="def choose_mod(n: int, r: int) -> int",
        solution="""\
def choose_mod(n, r):
    MOD = 1_000_000_007
    if r > n:
        return 0
    r = min(r, n - r)
    numerator, denominator = 1, 1
    for i in range(r):
        numerator = numerator * (n - i) % MOD
        denominator = denominator * (i + 1) % MOD
    # MOD is prime, so dividing means multiplying by the modular inverse.
    return numerator * pow(denominator, MOD - 2, MOD) % MOD
""",
        tests=[[6, 2], [10, 0], [0, 0], [5, 7], [7, 7], [100, 50], [200000, 100000], [200000, 3]],
        notes=["Division doesn't work directly with remainders. Because 1 000 000 007 is prime, `pow(d, MOD - 2, MOD)` gives the inverse of `d`."],
    ),
    dict(
        title="Routes Across a Grid",
        difficulty="medium",
        topics=["Maths", "Combinatorics"],
        statement=(
            "A claims assessor drives through a town whose junctions form a grid with `rows` rows and `cols` columns. "
            "They start at the top-left junction and finish at the bottom-right one, and each move goes one junction "
            "to the right or one junction down.\n\n"
            "Given `rows` and `cols`, each between 1 and 25, return the number of different routes as an `int`. "
            "A grid with a single junction has exactly one route: stay where you are."
        ),
        signature="def grid_routes(rows: int, cols: int) -> int",
        solution="""\
def grid_routes(rows, cols):
    ways = [1] * cols
    for _ in range(1, rows):
        for c in range(1, cols):
            ways[c] += ways[c - 1]
    return ways[-1]
""",
        tests=[[3, 4], [1, 1], [1, 10], [10, 1], [2, 2], [10, 7], [25, 25]],
        notes=["Every route makes the same number of right and down moves. Dynamic programming and a single binomial coefficient both work."],
    ),
    dict(
        title="Complete Rows of a Coin Staircase",
        difficulty="medium",
        topics=["Maths", "Combinatorics"],
        statement=(
            "You build a staircase from `n` coins: 1 coin in the first row, 2 in the second, 3 in the third, and so on. "
            "The last row may be left incomplete.\n\n"
            "Given `n` between 0 and 10^15, return the number of complete rows as an `int`. "
            "Watch out for rounding errors with floating-point square roots at this size."
        ),
        signature="def complete_rows(n: int) -> int",
        solution="""\
from math import isqrt


def complete_rows(n):
    # Largest k with k * (k + 1) / 2 <= n.
    return (isqrt(8 * n + 1) - 1) // 2
""",
        tests=[[11], [0], [1], [2], [3], [6], [500000500000], [500000499999], [10**15]],
        notes=["`k` complete rows use k(k + 1)/2 coins. Solve the quadratic, or binary search on `k`."],
    ),
    dict(
        title="Ways Up the Staircase",
        difficulty="medium",
        topics=["Maths", "Combinatorics"],
        statement=(
            "You climb a staircase of `n` steps, and each stride covers one of the step counts in the list `strides`. "
            "Different orders count as different ways: with strides `[1, 2]`, going 1 then 2 differs from going 2 then 1.\n\n"
            "Return the number of ways to reach exactly the top step, modulo 1 000 000 007, as an `int`. "
            "There is one way to climb 0 steps (do nothing). `n` is between 0 and 10^4, and `strides` holds between 1 and "
            "10 distinct integers, each between 1 and 100."
        ),
        signature="def ways_to_climb(n: int, strides: list[int]) -> int",
        solution="""\
def ways_to_climb(n, strides):
    MOD = 1_000_000_007
    ways = [0] * (n + 1)
    ways[0] = 1
    for step in range(1, n + 1):
        ways[step] = sum(ways[step - s] for s in strides if s <= step) % MOD
    return ways[n]
""",
        tests=[[5, [1, 2]], [0, [1, 2]], [1, [2]], [4, [1, 2, 3]], [7, [2]], [10, [3, 5]], [1000, [1, 2]], [10000, [1, 3, 7, 50]]],
        notes=["The number of ways to reach a step depends only on the ways to reach the steps one stride below it."],
    ),
    dict(
        title="Factorials Ending in Exactly k Zeros",
        difficulty="hard",
        topics=["Maths", "Combinatorics"],
        statement=(
            "For a non-negative integer `x`, let z(x) be the number of zeros at the end of `x!` (with 0! = 1). "
            "For example, z(10) = 2 because 10! = 3 628 800.\n\n"
            "Given `k` between 0 and 10^12, return how many non-negative integers `x` have z(x) exactly equal to `k`, as an `int`."
        ),
        signature="def factorials_with_k_zeros(k: int) -> int",
        solution="""\
def factorials_with_k_zeros(k):
    def zeros(x):
        total = 0
        while x > 0:
            x //= 5
            total += x
        return total

    def first_with_at_least(target):
        lo, hi = 0, 5 * (target + 1)
        while lo < hi:
            mid = (lo + hi) // 2
            if zeros(mid) >= target:
                hi = mid
            else:
                lo = mid + 1
        return lo

    return first_with_at_least(k + 1) - first_with_at_least(k)
""",
        tests=[[3], [0], [5], [6], [11], [24], [1000000000], [190734863270], [10**12]],
        notes=["z(x) never decreases as `x` grows, and it only changes when `x` reaches a multiple of 5."],
    ),
    dict(
        title="The kth Arrangement of Digits",
        difficulty="hard",
        topics=["Maths", "Combinatorics"],
        statement=(
            "Take the digits 1 to `n` and list every way of arranging them in dictionary (lexicographic) order. "
            "For `n` = 3 the list is `123`, `132`, `213`, `231`, `312`, `321`.\n\n"
            "Given `n` between 1 and 9 and `k` between 1 and `n!`, return the `k`th arrangement in the list (counting from 1) as a string. "
            "Try to work it out directly rather than generating the whole list."
        ),
        signature="def kth_arrangement(n: int, k: int) -> str",
        solution="""\
def kth_arrangement(n, k):
    digits = [str(d) for d in range(1, n + 1)]
    block = 1
    for i in range(2, n):
        block *= i  # (n - 1)!
    k -= 1
    result = []
    for remaining in range(n - 1, -1, -1):
        index, k = divmod(k, block)
        result.append(digits.pop(index))
        if remaining > 0:
            block //= remaining
    return "".join(result)
""",
        tests=[[4, 10], [1, 1], [3, 1], [3, 6], [5, 61], [9, 1], [9, 200000], [9, 362880]],
        notes=["The arrangements starting with each first digit form a block of (n - 1)! entries."],
    ),
]
