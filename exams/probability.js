const questions = [

    {
        id: 1,
        question: "A fair coin is tossed once. What is the probability of getting heads?",
        questionType: "input",
        answer: "0.5",
        solution: "A fair coin has two possible outcomes: Heads and Tails. Because the coin is fair, each outcome is equally likely. Therefore, the probability of getting Heads is the number of favorable outcomes (1) divided by the total number of possible outcomes (2). Hence, P(Heads) = 1 / 2 = 0.5."
    },
    {
        id: 2,
        question: "Two fair coins are tossed. What is the probability of getting two heads?",
        questionType: "input",
        answer: "0.25",
        solution: "When two fair coins are tossed, the sample space consists of four equally likely outcomes: HH, HT, TH, TT. Only one of these outcomes (HH) corresponds to getting two heads. Therefore, the probability is 1 favorable outcome divided by 4 total outcomes, giving P = 1 / 4 = 0.25."
    },
    {
        id: 3,
        question: "A card is drawn from a standard 52-card deck. What is the probability the card is an Ace?",
        questionType: "input",
        answer: "0.076923",
        solution: "A standard deck contains 52 cards, of which exactly 4 are Aces. Since each card is equally likely to be drawn, the probability of drawing an Ace is the ratio of favorable outcomes (4 Aces) to total possible outcomes (52 cards). Thus, P(Ace) = 4 / 52 = 1 / 13 ≈ 0.076923."
    },
    {
        id: 4,
        question: "Two cards are drawn from a deck without replacement. What is the probability both are Aces?",
        questionType: "input",
        answer: "0.004524",
        solution: "On the first draw, the probability of getting an Ace is 4 / 52. After one Ace has been drawn, only 3 Aces remain out of 51 cards. Therefore, the probability the second card is also an Ace is 3 / 51. Because the second draw depends on the first, we multiply these probabilities: (4 / 52) × (3 / 51) = 12 / 2652 ≈ 0.004524."
    },
    {
        id: 5,
        question: "A drunk passenger randomly chooses one of 3 exits at a station. What is the probability he chooses the correct exit?",
        questionType: "input",
        answer: "0.333333",
        solution: "There are 3 exits, and the passenger selects one at random. Each exit has an equal chance of being chosen. Only one of the three exits is correct. Therefore, the probability of choosing the correct exit is 1 favorable choice divided by 3 possible choices: P = 1 / 3 ≈ 0.333333."
    },
    {
        id: 6,
        question: "Two events A and B satisfy P(A) = 0.7, P(B) = 0.5, and P(A ∩ B) = 0.4. What is P(A ∪ B)?",
        questionType: "input",
        answer: "0.8",
        solution: "To compute the probability of at least one of the events occurring, we use the inclusion–exclusion principle: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Substituting the given values gives 0.7 + 0.5 − 0.4 = 0.8. This subtraction avoids double-counting the overlap between A and B."
    },
    {
        id: 7,
        question: "Events A and B are independent. If P(A) = 0.2 and P(B) = 0.6, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.12",
        solution: "For independent events, the occurrence of one event does not affect the probability of the other. By definition of independence, P(A ∩ B) = P(A) × P(B). Substituting the values gives 0.2 × 0.6 = 0.12."
    },
    {
        id: 8,
        question: "If P(A) = 0.4, what is P(Aᶜ)?",
        questionType: "input",
        answer: "0.6",
        solution: "The complement of an event A, denoted Aᶜ, represents all outcomes in which A does not occur. Since total probability is 1, we use the complement rule: P(Aᶜ) = 1 − P(A) = 1 − 0.4 = 0.6."
    },
    {
        id: 9,
        question: "Which of the following must be true for any probability P(A)?",
        questionType: "multiple-choice",
        options: [
            { label: "0 ≤ P(A) ≤ 1", value: "true" },
            { label: "P(A) > 1", value: "false" },
            { label: "P(A) < 0", value: "false" },
            { label: "P(A) = 2", value: "false" }
        ],
        answer: "true",
        solution: "By the axioms of probability, the probability of any event must lie between 0 and 1 inclusive. Values outside this range would violate the fundamental definition of probability."
    },
    {
        id: 10,
        question: "Three fair coins are tossed. What is the probability of exactly two heads?",
        questionType: "input",
        answer: "0.375",
        solution: "With three fair coins, there are 2³ = 8 equally likely outcomes. Exactly two heads can occur in three ways: HHT, HTH, and THH. Therefore, the probability is 3 favorable outcomes divided by 8 total outcomes: 3 / 8 = 0.375."
    },
    {
        id: 11,
        question: "A point is chosen uniformly on the interval [0, 1]. What is the probability it lies between 0.2 and 0.6?",
        questionType: "input",
        answer: "0.4",
        solution: "For a uniform distribution on [0,1], probability is proportional to length. The interval from 0.2 to 0.6 has length 0.6 − 0.2 = 0.4. Since the total interval length is 1, the probability is 0.4."
    },
    {
        id: 12,
        question: "Two people independently choose a random number in [0,1]. What is the probability their numbers differ by less than 0.1?",
        questionType: "input",
        answer: "0.19",
        solution: "Geometrically, this corresponds to the region in the unit square where |x − y| < 0.1. The excluded area consists of two triangles of side length 0.9, whose combined area is 0.9² = 0.81. Therefore, the favorable area is 1 − 0.81 = 0.19."
    },
    {
        id: 13,
        question: "Four points are randomly placed on a circle. What is the probability they all lie within some semicircle?",
        questionType: "input",
        answer: "0.5",
        solution: "A classical result states that for N points placed independently and uniformly on a circle, the probability that all lie within some semicircle is N / 2^(N−1). Substituting N = 4 gives 4 / 8 = 0.5."
    },
    {
        id: 14,
        question: "If P(A) = 0.3 and P(A ∩ B) = 0.15, what is P(B|A)?",
        questionType: "input",
        answer: "0.5",
        solution: "Conditional probability measures the chance of B occurring given that A has occurred. By definition, P(B|A) = P(A ∩ B) / P(A). Substituting the given values yields 0.15 / 0.3 = 0.5."
    },
    {
        id: 15,
        question: "A die is rolled. What is the probability the number is at least 4?",
        questionType: "input",
        answer: "0.5",
        solution: "A standard die has six outcomes: 1 through 6. Numbers that are at least 4 are 4, 5, and 6, giving 3 favorable outcomes. Thus, the probability is 3 / 6 = 0.5."
    },
    {
        id: 16,
        question: "If A and B are mutually exclusive with P(A) = 0.4 and P(B) = 0.3, what is P(A ∪ B)?",
        questionType: "input",
        answer: "0.7",
        solution: "Mutually exclusive events cannot occur together, so P(A ∩ B) = 0. Using the union formula P(A ∪ B) = P(A) + P(B) − P(A ∩ B), we get 0.4 + 0.3 − 0 = 0.7."
    },
    {
        id: 17,
        question: "Which condition implies independence of events A and B?",
        questionType: "multiple-choice",
        options: [
            { label: "P(A ∩ B) = P(A)P(B)", value: "true" },
            { label: "P(A) + P(B) = 1", value: "false" },
            { label: "A and B cannot occur together", value: "false" },
            { label: "P(A|B) = 1", value: "false" }
        ],
        answer: "true",
        solution: "Independence is defined by the condition that the joint probability equals the product of the marginal probabilities: P(A ∩ B) = P(A)P(B)."
    },
    {
        id: 18,
        question: "If P(A|B) = 0.2 and P(B) = 0.5, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.1",
        solution: "By the definition of conditional probability, P(A|B) = P(A ∩ B) / P(B). Rearranging gives P(A ∩ B) = P(A|B) × P(B) = 0.2 × 0.5 = 0.1."
    },
    {
        id: 19,
        question: "Two cards are drawn with replacement. What is the probability both are Kings?",
        questionType: "input",
        answer: "0.005917",
        solution: "With replacement, the probability of drawing a King on each draw is 4 / 52. Since the draws are independent, the joint probability is (4 / 52) × (4 / 52) = 16 / 2704 ≈ 0.005917."
    },
    {
        id: 20,
        question: "If P(A) = 0.65, P(B) = 0.55, and P(A ∪ B) = 0.85, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.35",
        solution: "Using the inclusion–exclusion formula P(A ∪ B) = P(A) + P(B) − P(A ∩ B), substitute the known values: 0.85 = 0.65 + 0.55 − x. Solving gives x = 0.35."
    },
    {
        id: 21,
        question: "How many distinct 5-card hands can be drawn from a standard 52-card deck?",
        questionType: "input",
        answer: "2598960",
        solution: "A 5-card hand is an unordered selection of 5 cards from 52. The number of such hands is given by the combination formula C(52,5) = 52! / (5!47!) = 2,598,960."
    },
    {
        id: 22,
        question: "How many ways can 3 letters be selected from the word 'QUANT' without regard to order?",
        questionType: "input",
        answer: "10",
        solution: "The word 'QUANT' has 5 distinct letters. Selecting 3 letters without regard to order gives C(5,3) = 5! / (3!2!) = 10."
    },
    {
        id: 23,
        question: "How many distinct arrangements of the letters in the word 'RISK' are possible?",
        questionType: "input",
        answer: "24",
        solution: "The word 'RISK' contains 4 distinct letters. The number of permutations of 4 distinct objects is 4! = 24."
    },
    {
        id: 24,
        question: "How many ways can 10 people be seated around a round table?",
        questionType: "input",
        answer: "362880",
        solution: "For circular permutations, rotations are considered identical. The number of distinct seatings of n people around a table is (n−1)!. Thus, for 10 people the number is 9! = 362,880."
    },
    {
        id: 25,
        question: "How many different 5-card poker hands contain exactly one pair?",
        questionType: "input",
        answer: "1098240",
        solution: "Choose the rank for the pair: C(13,1). Choose 2 of the 4 suits for that rank: C(4,2). Choose 3 different ranks from the remaining 12 for the other cards: C(12,3). For each of those 3 ranks choose 1 of 4 suits: 4^3. Total = 13 × 6 × 220 × 64 = 1,098,240."
    },
    {
        id: 26,
        question: "How many different 5-card poker hands are full houses?",
        questionType: "input",
        answer: "3744",
        solution: "Choose the rank for the triple: C(13,1). Choose 3 of its 4 suits: C(4,3). Choose the rank for the pair from remaining 12: C(12,1). Choose 2 of its 4 suits: C(4,2). Total = 13 × 4 × 12 × 6 = 3,744."
    },
    {
        id: 27,
        question: "In a group of 23 people, what is the approximate probability that at least two share the same birthday?",
        questionType: "input",
        answer: "0.5073",
        solution: "The probability that all 23 birthdays are different is approximately 365/365 × 364/365 × ... × 343/365 ≈ 0.4927. Therefore, the probability that at least two share a birthday is 1 − 0.4927 ≈ 0.5073."
    },
    {
        id: 28,
        question: "How many ways can 6 distinct books be arranged on a shelf?",
        questionType: "input",
        answer: "720",
        solution: "Arranging 6 distinct objects in order is a permutation: 6! = 720."
    },
    {
        id: 29,
        question: "How many binary strings of length 8 contain exactly 3 ones?",
        questionType: "input",
        answer: "56",
        solution: "Choose the positions of the 3 ones from 8 available positions: C(8,3) = 56."
    },
    {
        id: 30,
        question: "How many distinct 5-letter strings can be formed from the alphabet if letters may repeat?",
        questionType: "input",
        answer: "11881376",
        solution: "There are 26 choices for each of the 5 positions. Since repetition is allowed, the total number is 26^5 = 11,881,376."
    },
    {
        id: 31,
        question: "How many ways can a rabbit hop from (0,0) to (5,5) moving only right or up?",
        questionType: "input",
        answer: "252",
        solution: "The rabbit must make 10 moves total: 5 right and 5 up. The number of distinct paths is the number of ways to choose where the 5 right moves occur among 10 positions: C(10,5) = 252."
    },
    {
        id: 32,
        question: "How many 4-digit numbers have digits in strictly increasing order?",
        questionType: "input",
        answer: "210",
        solution: "Choose any 4 distinct digits from {0,...,9}: C(10,4) = 210. Each choice corresponds to exactly one increasing sequence."
    },
    {
        id: 33,
        question: "In a chess tournament with 8 players, each pair plays exactly once. How many games are played?",
        questionType: "input",
        answer: "28",
        solution: "Each game corresponds to a unique pair of players. The number of pairs from 8 players is C(8,2) = 28."
    },
    {
        id: 34,
        question: "How many 6-letter words can be formed from 'BALLOON'?",
        questionType: "input",
        answer: "180",
        solution: "The word BALLOON has 7 letters with repetitions: B(1), A(1), L(2), O(2), N(1). Choosing 6 letters and arranging them yields 180 distinct permutations."
    },
    {
        id: 35,
        question: "How many subsets does a set of 10 elements have?",
        questionType: "input",
        answer: "1024",
        solution: "Each element can either be included or excluded independently. Therefore, the total number of subsets is 2^10 = 1,024."
    },
    {
        id: 36,
        question: "How many distinct ways can the letters of 'PROBABILITY' be arranged?",
        questionType: "input",
        answer: "39916800",
        solution: "The word PROBABILITY has 11 letters with B repeated twice. The number of distinct permutations is 11! / 2! = 39,916,800."
    },
    {
        id: 37,
        question: "How many ways can 12 identical candies be distributed among 4 children?",
        questionType: "input",
        answer: "455",
        solution: "This is a stars-and-bars problem: the number of nonnegative integer solutions to x1 + x2 + x3 + x4 = 12 is C(12 + 4 − 1, 4 − 1) = C(15,3) = 455."
    },
    {
        id: 38,
        question: "How many ways can 5 people be chosen from a group of 20?",
        questionType: "input",
        answer: "15504",
        solution: "This is a combination problem: C(20,5) = 20! / (5!15!) = 15,504."
    },
    {
        id: 39,
        question: "How many integers from 1 to 1000 inclusive contain no repeated digits?",
        questionType: "input",
        answer: "738",
        solution: "Counting valid numbers with 1, 2, and 3 digits without repetition yields 9 + 9×9 + 9×9×8 = 9 + 81 + 648 = 738."
    },
    {
        id: 40,
        question: "How many 7-digit phone numbers contain no repeated digits?",
        questionType: "input",
        answer: "604800",
        solution: "The first digit has 10 choices, the second 9, then 8, 7, 6, 5, 4. Multiplying gives 10 × 9 × 8 × 7 × 6 × 5 × 4 = 604,800."
    },
    {
        id: 41,
        question: "A fair coin is tossed three times. What is the probability of exactly two heads given that the first toss was heads?",
        questionType: "input",
        answer: "0.5",
        solution: "Given that the first toss is heads, only the remaining two tosses are random. There are four equally likely outcomes for the last two tosses: HH, HT, TH, TT. Exactly one more head must occur to obtain exactly two heads in total, which happens in outcomes HT and TH. Therefore, the probability is 2 / 4 = 0.5."
    },
    {
        id: 42,
        question: "A coin is biased so that P(Heads) = 0.7. What is the probability of getting exactly 2 heads in 3 tosses?",
        questionType: "input",
        answer: "0.441",
        solution: "The number of ways to choose which 2 of the 3 tosses are heads is C(3,2) = 3. For each such sequence, the probability is (0.7)^2 × (0.3). Therefore, the total probability is 3 × 0.7^2 × 0.3 = 3 × 0.49 × 0.3 = 0.441."
    },
    {
        id: 43,
        question: "Two children are selected at random from a population where boys and girls are equally likely. What is the probability both are boys given that at least one is a boy?",
        questionType: "input",
        answer: "0.333333",
        solution: "The sample space for two children is {BB, BG, GB, GG}. Given that at least one is a boy, the possible outcomes are {BB, BG, GB}. Only BB satisfies the condition that both are boys. Therefore, the conditional probability is 1 / 3 ≈ 0.333333."
    },
    {
        id: 44,
        question: "A jar contains 3 red balls and 2 blue balls. Two balls are drawn without replacement. What is the probability both are red?",
        questionType: "input",
        answer: "0.3",
        solution: "The probability the first ball is red is 3 / 5. After removing one red ball, 2 red balls remain out of 4 total balls. Therefore, the probability the second is red is 2 / 4. Multiplying gives (3 / 5) × (2 / 4) = 6 / 20 = 0.3."
    },
    {
        id: 45,
        question: "A test for a disease is 95% accurate. The disease occurs in 1% of the population. What is the probability a randomly chosen person who tests positive actually has the disease?",
        questionType: "input",
        answer: "0.161",
        solution: "Let D be the event that the person has the disease. Using Bayes’ theorem: P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|not D)P(not D)]. Substituting: (0.95 × 0.01) / [(0.95 × 0.01) + (0.05 × 0.99)] ≈ 0.0095 / 0.059 ≈ 0.161."
    },
    {
        id: 46,
        question: "A fair die is rolled twice. What is the probability the second roll is larger than the first?",
        questionType: "input",
        answer: "0.416667",
        solution: "There are 36 equally likely ordered pairs. Six of them are ties: (1,1) through (6,6). Of the remaining 30, exactly half have the second roll larger than the first. Thus, the probability is 15 / 36 = 5 / 12 ≈ 0.416667."
    },
    {
        id: 47,
        question: "You have two coins: one fair and one double-headed. You randomly pick one coin and toss it. It comes up heads. What is the probability the coin is double-headed?",
        questionType: "input",
        answer: "0.666667",
        solution: "Let D be choosing the double-headed coin and F the fair coin. P(D)=P(F)=0.5. P(H|D)=1 and P(H|F)=0.5. By Bayes’ theorem: P(D|H) = [1 × 0.5] / [1 × 0.5 + 0.5 × 0.5] = 0.5 / 0.75 = 2 / 3 ≈ 0.666667."
    },
    {
        id: 48,
        question: "In the Monty Hall problem, after the host opens one goat door, what is the probability of winning the car if you switch?",
        questionType: "input",
        answer: "0.666667",
        solution: "Initially, the chance your chosen door hides the car is 1/3. The other two doors together have probability 2/3. When the host reveals a goat behind one of them, the full 2/3 probability transfers to the remaining unopened door. Thus, switching yields a win with probability 2 / 3 ≈ 0.666667."
    },
    {
        id: 49,
        question: "Two cards are drawn from a deck. What is the probability at least one is an Ace?",
        questionType: "input",
        answer: "0.147",
        solution: "Compute the complement: the probability that neither card is an Ace. There are 48 non-Aces. Without replacement: (48/52) × (47/51) ≈ 0.853. Therefore, the probability of at least one Ace is 1 − 0.853 ≈ 0.147."
    },
    {
        id: 50,
        question: "A gambler starts with $3 and plays a fair game, winning $1 with probability 0.5 and losing $1 with probability 0.5. What is the probability he eventually reaches $5 before going broke at $0?",
        questionType: "input",
        answer: "0.6",
        solution: "This is a classic gambler’s ruin problem. For a fair game, the probability of reaching the upper boundary N before 0 starting from x is x / N. Here x = 3 and N = 5, so the probability is 3 / 5 = 0.6."
    },
    {
        id: 51,
        question: "Two people meet at a café at random between 12:00 and 1:00 and each waits 10 minutes. What is the probability they meet?",
        questionType: "input",
        answer: "0.305556",
        solution: "The meeting region in the unit square corresponds to |x − y| ≤ 1/6. The favorable area is 1 − (5/6)^2 = 1 − 25/36 = 11/36 ≈ 0.305556."
    },
    {
        id: 52,
        question: "A fair coin is tossed until the first head appears. What is the probability this takes exactly 4 tosses?",
        questionType: "input",
        answer: "0.0625",
        solution: "The first 3 tosses must be tails and the 4th must be heads. The probability is (0.5)^3 × 0.5 = (0.5)^4 = 1 / 16 = 0.0625."
    },
    {
        id: 53,
        question: "Two dice are rolled. What is the probability the sum is 9 given that at least one die is 4?",
        questionType: "input",
        answer: "0.333333",
        solution: "Given at least one die is 4, the possible outcomes are (4,1) through (4,6) and (1,4) through (6,4), excluding (4,4). There are 11 such outcomes. The ones summing to 9 are (4,5) and (5,4). Thus, the probability is 2 / 11 ≈ 0.333333."
    },
    {
        id: 54,
        question: "A jar contains 4 red and 6 blue candies. One candy is drawn. Given that it is red, what is the probability the next candy drawn (without replacement) is blue?",
        questionType: "input",
        answer: "0.666667",
        solution: "After drawing a red candy, the jar contains 3 red and 6 blue candies, 9 total. The probability the next candy is blue is 6 / 9 = 2 / 3 ≈ 0.666667."
    },
    {
        id: 55,
        question: "An amoeba population doubles every hour. Starting with 1 amoeba, what is the expected population after 5 hours?",
        questionType: "input",
        answer: "32",
        solution: "The population doubles each hour, so after n hours the population is 2^n. After 5 hours, the population is 2^5 = 32."
    },
    {
        id: 56,
        question: "Two independent events A and B satisfy P(A) = 0.4 and P(B) = 0.5. What is P(A|B)?",
        questionType: "input",
        answer: "0.4",
        solution: "For independent events, the occurrence of B does not change the probability of A. Therefore, P(A|B) = P(A) = 0.4."
    },
    {
        id: 57,
        question: "What is the probability that in 10 coin tosses there are more heads than tails?",
        questionType: "input",
        answer: "0.376953",
        solution: "More heads than tails means at least 6 heads. Compute the binomial sum: Σ_{k=6}^{10} C(10,k)(0.5)^10 = (210 + 120 + 45 + 10 + 1) / 1024 = 386 / 1024 ≈ 0.376953."
    },
    {
        id: 58,
        question: "Two cards are drawn without replacement. What is the probability they are of the same suit?",
        questionType: "input",
        answer: "0.235294",
        solution: "After the first card is drawn, 12 of the remaining 51 cards are of the same suit. Thus, the probability is 12 / 51 ≈ 0.235294."
    },
    {
        id: 59,
        question: "A fair coin is tossed repeatedly. What is the probability that the first two heads occur consecutively?",
        questionType: "input",
        answer: "0.666667",
        solution: "The probability the first two heads are consecutive equals 1 − P(the first two heads are separated by at least one tail). This evaluates to 2 / 3 ≈ 0.666667."
    },
    {
        id: 60,
        question: "If 70% of drivers speed and 40% text while driving, and 25% do both, what is the probability a randomly selected driver does neither?",
        questionType: "input",
        answer: "0.15",
        solution: "Let S be speeding and T be texting. P(S ∪ T) = P(S) + P(T) − P(S ∩ T) = 0.7 + 0.4 − 0.25 = 0.85. Therefore, the probability of doing neither is 1 − 0.85 = 0.15."
    },
    {
        id: 61,
        question: "Two people arrive independently and uniformly between 12:00 and 1:00 and each waits 15 minutes. What is the probability they meet?",
        questionType: "input",
        answer: "0.4375",
        solution: "Let arrival times x and y be uniform on [0,1]. They meet if |x − y| ≤ 0.25. The total area of the unit square is 1. The area where |x − y| > 0.25 consists of two triangles each with side length 0.75, giving area 2 × (0.75^2 / 2) = 0.5625. Therefore, the meeting probability is 1 − 0.5625 = 0.4375."
    },
    {
        id: 62,
        question: "Events occur according to a Poisson process at rate 3 per hour. What is the probability exactly 2 events occur in one hour?",
        questionType: "input",
        answer: "0.224042",
        solution: "For a Poisson process with rate λ = 3, the probability of k events in time 1 is P(N=2) = e^{−3} × 3^2 / 2! = 9e^{−3} / 2 ≈ 0.224042."
    },
    {
        id: 63,
        question: "For a Poisson process with rate 5 per hour, what is the expected waiting time until the next event?",
        questionType: "input",
        answer: "0.2",
        solution: "The waiting time in a Poisson process follows an exponential distribution with mean 1/λ. With λ = 5, the expected waiting time is 1 / 5 = 0.2 hours."
    },
    {
        id: 64,
        question: "Three random points are chosen independently and uniformly on [0,1]. What is the probability they form the vertices of a triangle?",
        questionType: "input",
        answer: "1",
        solution: "Any three distinct points on a line always form a triangle except when collinear, but in one dimension the probability of exact equality between points is zero. Therefore, with probability 1 they form a triangle."
    },
    {
        id: 65,
        question: "Three random points are chosen independently and uniformly on the circumference of a circle. What is the probability they form an acute triangle?",
        questionType: "input",
        answer: "0.25",
        solution: "A classical geometric result states that a triangle inscribed in a circle is obtuse if and only if one of its angles subtends a diameter. The probability the triangle is obtuse is 3/4. Therefore, the probability it is acute is 1 − 3/4 = 1/4 = 0.25."
    },
    {
        id: 66,
        question: "A continuous random variable X is uniformly distributed on [2, 8]. What is E[X]?",
        questionType: "input",
        answer: "5",
        solution: "For a uniform distribution on [a,b], the expected value is (a + b) / 2. Thus, E[X] = (2 + 8) / 2 = 5."
    },
    {
        id: 67,
        question: "A continuous random variable X is uniformly distributed on [2, 8]. What is Var(X)?",
        questionType: "input",
        answer: "3",
        solution: "For a uniform distribution on [a,b], Var(X) = (b − a)^2 / 12. Here b − a = 6, so Var(X) = 36 / 12 = 3."
    },
    {
        id: 68,
        question: "If X ~ N(0, 4), what is Var(2X + 1)?",
        questionType: "input",
        answer: "16",
        solution: "For a linear transformation aX + b, the variance scales by a^2. Thus, Var(2X + 1) = 2^2 × Var(X) = 4 × 4 = 16."
    },
    {
        id: 69,
        question: "If X and Y are independent standard normal variables, what is Var(X + Y)?",
        questionType: "input",
        answer: "2",
        solution: "For independent variables, Var(X + Y) = Var(X) + Var(Y). Each has variance 1, so the total variance is 1 + 1 = 2."
    },
    {
        id: 70,
        question: "If X ~ Poisson(λ), what is Var(X)?",
        questionType: "input",
        answer: "λ",
        solution: "A fundamental property of the Poisson distribution is that its mean and variance are both equal to λ."
    },
    {
        id: 71,
        question: "The lifetime of a machine follows an exponential distribution with mean 5 years. What is the probability it lasts more than 10 years?",
        questionType: "input",
        answer: "0.135335",
        solution: "For an exponential distribution with mean 5, the rate is λ = 1 / 5. The survival function is P(T > t) = e^{−λt}. Therefore, P(T > 10) = e^{−(1/5) × 10} = e^{−2} ≈ 0.135335."
    },
    {
        id: 72,
        question: "If X ~ N(10, 9), what is the standard deviation of X?",
        questionType: "input",
        answer: "3",
        solution: "The variance is 9, so the standard deviation is the square root of the variance: √9 = 3."
    },
    {
        id: 73,
        question: "If X and Y are independent exponential random variables with mean 1, what is E[min(X, Y)]?",
        questionType: "input",
        answer: "0.5",
        solution: "The minimum of two independent exponential(1) variables is exponential with rate 2, hence mean 1 / 2 = 0.5."
    },
    {
        id: 74,
        question: "If X is normally distributed with mean 0 and variance 1, what is E[X^2]?",
        questionType: "input",
        answer: "1",
        solution: "For any random variable, Var(X) = E[X^2] − (E[X])^2. Here Var(X) = 1 and E[X] = 0, so E[X^2] = 1."
    },
    {
        id: 75,
        question: "For a Poisson process with rate 4, what is the expected number of events in 3 hours?",
        questionType: "input",
        answer: "12",
        solution: "The expected number of events in time t is λt. Here λ = 4 and t = 3, so the expectation is 12."
    },
    {
        id: 76,
        question: "If X ~ Uniform(0,1), what is P(X < 0.3)?",
        questionType: "input",
        answer: "0.3",
        solution: "For a uniform distribution on [0,1], the probability equals the length of the interval: 0.3 − 0 = 0.3."
    },
    {
        id: 77,
        question: "If X ~ Exp(2), what is E[X]?",
        questionType: "input",
        answer: "0.5",
        solution: "The mean of an exponential distribution with rate λ is 1 / λ. Thus, E[X] = 1 / 2 = 0.5."
    },
    {
        id: 78,
        question: "A random variable X has density f(x) = 2x for 0 ≤ x ≤ 1. What is E[X]?",
        questionType: "input",
        answer: "0.666667",
        solution: "Compute E[X] = ∫₀¹ x · 2x dx = 2 ∫₀¹ x² dx = 2 / 3 ≈ 0.666667."
    },
    {
        id: 79,
        question: "A random variable X has density f(x) = 2x for 0 ≤ x ≤ 1. What is Var(X)?",
        questionType: "input",
        answer: "0.055556",
        solution: "First compute E[X] = 2/3 and E[X²] = ∫₀¹ 2x · x² dx = 2 ∫₀¹ x³ dx = 1/2. Then Var(X) = E[X²] − (E[X])² = 0.5 − (4/9) = 1/18 ≈ 0.055556."
    },
    {
        id: 80,
        question: "If X ~ N(0,1), what is P(|X| < 1)?",
        questionType: "input",
        answer: "0.682689",
        solution: "For the standard normal distribution, the probability that X lies within one standard deviation of the mean is approximately 0.682689, a well-known property of the normal curve."
    },
    {
        id: 81,
        question: "A fair die is rolled. What is the expected value of the outcome?",
        questionType: "input",
        answer: "3.5",
        solution: "The expected value of a discrete random variable is the weighted average of all possible outcomes. For a fair die, E[X] = (1+2+3+4+5+6) / 6 = 21 / 6 = 3.5."
    },
    {
        id: 82,
        question: "Two fair dice are rolled. What is the expected sum?",
        questionType: "input",
        answer: "7",
        solution: "The expected value of the sum equals the sum of the expected values. Each die has expectation 3.5, so E[X + Y] = 3.5 + 3.5 = 7."
    },
    {
        id: 83,
        question: "If X has E[X] = 2 and Var(X) = 3, what is E[4X − 1]?",
        questionType: "input",
        answer: "7",
        solution: "Expectation is linear. Therefore, E[4X − 1] = 4E[X] − 1 = 4 × 2 − 1 = 7."
    },
    {
        id: 84,
        question: "If X has Var(X) = 2, what is Var(5X + 3)?",
        questionType: "input",
        answer: "50",
        solution: "Variance scales with the square of the coefficient: Var(aX + b) = a² Var(X). Thus, Var(5X + 3) = 25 × 2 = 50."
    },
    {
        id: 85,
        question: "Two random variables X and Y have Var(X) = 4, Var(Y) = 9, and Cov(X,Y) = 3. What is Var(X + Y)?",
        questionType: "input",
        answer: "19",
        solution: "Var(X + Y) = Var(X) + Var(Y) + 2Cov(X,Y) = 4 + 9 + 2×3 = 19."
    },
    {
        id: 86,
        question: "A portfolio consists of two assets with weights 0.5 and 0.5, variances 4 and 16, and covariance 2. What is the portfolio variance?",
        questionType: "input",
        answer: "6",
        solution: "Portfolio variance is w1²Var1 + w2²Var2 + 2w1w2Cov. Substituting: (0.25×4) + (0.25×16) + (2×0.5×0.5×2) = 1 + 4 + 1 = 6."
    },
    {
        id: 87,
        question: "A game pays $10 with probability 0.2 and loses $5 otherwise. What is the expected payoff?",
        questionType: "input",
        answer: "-2",
        solution: "E[X] = 10×0.2 + (−5)×0.8 = 2 − 4 = −2."
    },
    {
        id: 88,
        question: "A fair coin is tossed until the first head appears. What is the expected number of tosses?",
        questionType: "input",
        answer: "2",
        solution: "This follows a geometric distribution with success probability p = 0.5. The expected number of trials is 1 / p = 2."
    },
    {
        id: 89,
        question: "If Cov(X,Y) = 0 and Var(X) and Var(Y) are positive, are X and Y independent?",
        questionType: "multiple-choice",
        options: [
            { label: "Not necessarily", value: "true" },
            { label: "Always independent", value: "false" },
            { label: "Always dependent", value: "false" },
            { label: "Impossible to determine", value: "false" }
        ],
        answer: "true",
        solution: "Zero covariance implies no linear relationship, but it does not imply independence except in special cases such as the joint normal distribution."
    },
    {
        id: 90,
        question: "A random variable X takes values 1, 2, 3 with equal probability. What is Var(X)?",
        questionType: "input",
        answer: "0.666667",
        solution: "E[X] = (1+2+3)/3 = 2. E[X²] = (1+4+9)/3 = 14/3. Var(X) = E[X²] − (E[X])² = 14/3 − 4 = 2/3 ≈ 0.666667."
    },
    {
        id: 91,
        question: "Two independent fair dice are rolled. What is Cov(X,Y)?",
        questionType: "input",
        answer: "0",
        solution: "For independent variables, covariance is zero: Cov(X,Y) = 0."
    },
    {
        id: 92,
        question: "If Corr(X,Y) = 0.5 and Var(X) = 4 and Var(Y) = 9, what is Cov(X,Y)?",
        questionType: "input",
        answer: "3",
        solution: "Cov(X,Y) = Corr(X,Y) × √Var(X) × √Var(Y) = 0.5 × 2 × 3 = 3."
    },
    {
        id: 93,
        question: "In the coupon collector problem with 10 coupons, what is the expected number of purchases required to collect all coupons?",
        questionType: "input",
        answer: "29.29",
        solution: "The expected number is n(1 + 1/2 + ... + 1/n). For n = 10, this is approximately 10 × 2.928968 = 29.29."
    },
    {
        id: 94,
        question: "A random variable has E[X] = 5 and Var(X) = 4. What is E[(X − 3)²]?",
        questionType: "input",
        answer: "8",
        solution: "E[(X − a)²] = Var(X) + (E[X] − a)². Thus, E[(X − 3)²] = 4 + (5 − 3)² = 4 + 4 = 8."
    },
    {
        id: 95,
        question: "A stock and an index have correlation 0.8, stock volatility 20%, index volatility 10%. What is the optimal hedge ratio?",
        questionType: "input",
        answer: "1.6",
        solution: "Optimal hedge ratio h = ρ σ_stock / σ_index = 0.8 × 0.20 / 0.10 = 1.6."
    },
    {
        id: 96,
        question: "Let X and Y be independent with E[X] = 1 and E[Y] = 2. What is E[XY]?",
        questionType: "input",
        answer: "2",
        solution: "For independent variables, E[XY] = E[X]E[Y] = 1 × 2 = 2."
    },
    {
        id: 97,
        question: "A fair die is rolled until a 6 appears. What is the expected number of rolls?",
        questionType: "input",
        answer: "6",
        solution: "This is a geometric distribution with success probability p = 1/6. The expected number of trials is 1 / p = 6."
    },
    {
        id: 98,
        question: "Two assets have returns X and Y with Var(X) = 1, Var(Y) = 1, and Cov(X,Y) = −0.5. What is Var(X − Y)?",
        questionType: "input",
        answer: "3",
        solution: "Var(X − Y) = Var(X) + Var(Y) − 2Cov(X,Y) = 1 + 1 − 2(−0.5) = 3."
    },
    {
        id: 99,
        question: "A random variable has P(X = 1) = 0.4 and P(X = 3) = 0.6. What is E[X]?",
        questionType: "input",
        answer: "2.2",
        solution: "E[X] = 1×0.4 + 3×0.6 = 0.4 + 1.8 = 2.2."
    },
    {
        id: 100,
        question: "If X and Y are jointly normally distributed and Cov(X,Y) = 0, are they independent?",
        questionType: "multiple-choice",
        options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
            { label: "Only if variances are equal", value: "false" },
            { label: "Impossible to determine", value: "false" }
        ],
        answer: "true",
        solution: "For jointly normally distributed variables, zero covariance implies independence."
    },
    {
        id: 101,
        question: "Three fair coins are tossed. What is the probability of getting the pattern HTH in that order?",
        questionType: "input",
        answer: "0.125",
        solution: "Each coin toss is independent with probability 0.5 for heads or tails. The probability of the specific sequence HTH is (0.5)^3 = 1 / 8 = 0.125."
    },
    {
        id: 102,
        question: "Two dice are rolled. What is the probability the first die is larger than the second?",
        questionType: "input",
        answer: "0.416667",
        solution: "There are 36 equally likely outcomes. Six outcomes are ties. Of the remaining 30, exactly half have the first die larger. Thus the probability is 15 / 36 = 5 / 12 ≈ 0.416667."
    },
    {
        id: 103,
        question: "Five balls numbered 1 through 5 are drawn one by one without replacement. What is the probability they appear in increasing order?",
        questionType: "input",
        answer: "0.008333",
        solution: "All 5! = 120 orders are equally likely. Only one of them is strictly increasing. Thus, the probability is 1 / 120 ≈ 0.008333."
    },
    {
        id: 104,
        question: "In a sequence of coin tosses, what is the probability that the pattern HHT appears before TTH?",
        questionType: "input",
        answer: "0.5",
        solution: "By symmetry of the coin, both patterns are equally likely to appear first. Therefore, the probability is 0.5."
    },
    {
        id: 105,
        question: "A gambler starts with $4 and plays a fair game, winning or losing $1 with equal probability. What is the probability he reaches $6 before going broke at $0?",
        questionType: "input",
        answer: "0.666667",
        solution: "For a fair gambler’s ruin problem, the probability of reaching N before 0 when starting at x is x / N. Here x = 4 and N = 6, so the probability is 4 / 6 = 2 / 3 ≈ 0.666667."
    },
    {
        id: 106,
        question: "An urn contains 5 red and 5 blue balls. Balls are drawn one at a time without replacement. What is the probability the last ball drawn is red?",
        questionType: "input",
        answer: "0.5",
        solution: "By symmetry, each ball is equally likely to be the last drawn. Since 5 of the 10 balls are red, the probability the final ball is red is 5 / 10 = 0.5."
    },
    {
        id: 107,
        question: "Three distinct numbers are chosen at random from {1,2,3,4,5}. What is the probability the largest number chosen is 5?",
        questionType: "input",
        answer: "0.6",
        solution: "The total number of ways to choose 3 numbers from 5 is C(5,3) = 10. The number of selections that include 5 is C(4,2) = 6. Therefore, the probability is 6 / 10 = 0.6."
    },
    {
        id: 108,
        question: "Four balls are drawn from an urn containing 3 red and 5 blue balls. What is the probability exactly two are red?",
        questionType: "input",
        answer: "0.357143",
        solution: "The number of ways to choose exactly two red is C(3,2)C(5,2) = 3 × 10 = 30. The total number of ways to choose any 4 balls is C(8,4) = 70. Thus the probability is 30 / 70 = 3 / 7 ≈ 0.357143."
    },
    {
        id: 109,
        question: "A fair die is rolled four times. What is the probability the maximum value observed is exactly 4?",
        questionType: "input",
        answer: "0.197531",
        solution: "P(max ≤ 4) = (4/6)^4 and P(max ≤ 3) = (3/6)^4. Therefore, P(max = 4) = (4/6)^4 − (3/6)^4 = 256/1296 − 81/1296 = 175/1296 ≈ 0.197531."
    },
    {
        id: 110,
        question: "Two cards are drawn without replacement. What is the probability the higher card is a King?",
        questionType: "input",
        answer: "0.153846",
        solution: "The higher card is a King if and only if one King is drawn and the other card is not an Ace. The probability of drawing exactly one King and one non-Ace non-King is (4/52)(48/51) + (48/52)(4/51) = 384 / 2652 ≈ 0.153846."
    },
    {
        id: 111,
        question: "A random sample of 5 numbers is chosen from {1,...,20}. What is the expected value of the maximum?",
        questionType: "input",
        answer: "17",
        solution: "The expected maximum of a uniform discrete sample of size n from 1 to N is approximately (n/(n+1))(N+1). With n=5 and N=20, this gives (5/6) × 21 = 17.5, approximated here as 17."
    },
    {
        id: 112,
        question: "Four balls are drawn from an urn containing 6 red and 4 blue balls. What is the probability the colors appear in the pattern RBRB?",
        questionType: "input",
        answer: "0.114286",
        solution: "The probability of drawing R then B then R then B is (6/10)(4/9)(5/8)(3/7) = 360 / 2520 ≈ 0.114286."
    },
    {
        id: 113,
        question: "Ten coins are tossed. What is the expected number of heads in the longest run?",
        questionType: "input",
        answer: "3",
        solution: "For 10 fair coin tosses, the expected longest run of heads is approximately 3. This is a known result from run theory and simulation."
    },
    {
        id: 114,
        question: "What is the probability that the median of three independent uniform(0,1) variables exceeds 0.5?",
        questionType: "input",
        answer: "0.5",
        solution: "By symmetry of the uniform distribution, the median is equally likely to be above or below 0.5. Hence the probability is 0.5."
    },
    {
        id: 115,
        question: "Three balls are drawn from an urn containing 4 red, 3 blue, and 3 green balls. What is the probability all three colors appear?",
        questionType: "input",
        answer: "0.4",
        solution: "Choose one of each color: C(4,1)C(3,1)C(3,1) = 36 favorable outcomes. Total ways to choose 3 balls: C(10,3) = 120. Thus, probability = 36 / 120 = 0.3."
    },
    {
        id: 116,
        question: "A fair coin is tossed until the pattern HT appears. What is the expected number of tosses?",
        questionType: "input",
        answer: "4",
        solution: "Using pattern waiting time theory, the expected time for HT is 1 / (P(H)P(T)) = 1 / (0.5 × 0.5) = 4."
    },
    {
        id: 117,
        question: "Five numbers are selected from {1,...,10}. What is the probability the smallest selected number is 3?",
        questionType: "input",
        answer: "0.222222",
        solution: "The smallest is 3 if 3 is chosen and the other four are from {4,...,10}. Favorable outcomes: C(7,4) = 35. Total outcomes: C(10,5) = 252. Thus probability = 35 / 252 ≈ 0.138889."
    },
    {
        id: 118,
        question: "Three fair dice are rolled. What is the probability their values are in strictly increasing order?",
        questionType: "input",
        answer: "0.166667",
        solution: "Ignoring ties, all 3! orderings are equally likely. Only one is strictly increasing. The probability of no ties is 6×5×4 / 6^3 = 120 / 216. Thus probability = (120/216) × (1/6) = 1 / 6 ≈ 0.166667."
    },
    {
        id: 119,
        question: "An urn contains 5 white and 5 black balls. Balls are drawn until one color is exhausted. What is the expected number of draws?",
        questionType: "input",
        answer: "9",
        solution: "By symmetry, the expected final remaining ball is 1. Therefore, from 10 initial balls, the expected number of draws until one color is exhausted is 9."
    },
    {
        id: 120,
        question: "What is the probability that in a random permutation of {1,...,6}, the number 6 appears after 5?",
        questionType: "input",
        answer: "0.5",
        solution: "In a random permutation, the relative order of any two numbers is equally likely. Thus the probability that 6 appears after 5 is 1 / 2."
    }
];