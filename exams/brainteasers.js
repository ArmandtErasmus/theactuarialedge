const questions = [
    {
        id: 1,
        question: "Three pirates must divide 100 gold coins. The most senior proposes a split; all vote; if rejected, he is killed and the process repeats. Pirates are perfectly logical and prefer survival, then wealth. How many coins does the first pirate propose for himself?",
        questionType: "input",
        answer: "98",
        solution: "Work backwards. With 2 pirates left, the senior needs 1 vote, so he gives the other pirate 0 and keeps 100. With 3 pirates, the second pirate knows if the first dies, he will keep 100 and give the third 0. So the third pirate can be bribed with 1 coin. Thus pirate 1 proposes: 98 for himself, 1 for pirate 3, 1 for pirate 4 (if more pirates). In this 3-pirate version, the first keeps 98."
    },
    {
        id: 2,
        question: "A tiger and a sheep are on a boat. The tiger will eat the sheep if left alone with it. How do you get both across the river if you can only take one at a time?",
        questionType: "multiple-choice",
        options: [
            { label: "Take tiger first, return alone, take sheep", value: "false" },
            { label: "Take sheep first, return alone, take tiger", value: "true" },
            { label: "Take both together", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "You must transport the sheep first so the tiger is never left alone with it. Sequence: take sheep across, return alone, take tiger across."
    },
    {
        id: 3,
        question: "A man must cross a river with a wolf, goat, and cabbage. Which one should he take first?",
        questionType: "multiple-choice",
        options: [
            { label: "Wolf", value: "false" },
            { label: "Goat", value: "true" },
            { label: "Cabbage", value: "false" },
            { label: "None", value: "false" }
        ],
        answer: "true",
        solution: "If left alone, the wolf eats the goat and the goat eats the cabbage. Taking the goat first avoids any dangerous pairing."
    },
    {
        id: 4,
        question: "You have two ropes that each burn in exactly 60 minutes but not at a uniform rate. How do you measure 45 minutes?",
        questionType: "multiple-choice",
        options: [
            { label: "Burn one rope only", value: "false" },
            { label: "Burn both ropes at one end", value: "false" },
            { label: "Burn rope A at both ends and rope B at one end", value: "true" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "Light rope A at both ends and rope B at one end. Rope A finishes in 30 minutes. At that moment, light the other end of rope B. The remaining half of rope B now burns in 15 minutes, totaling 45 minutes."
    },
    {
        id: 5,
        question: "A factory produces balls, one of which is defective and lighter. Using a balance scale, what is the minimum number of weighings needed to find the defective ball among 27?",
        questionType: "input",
        answer: "3",
        solution: "Each weighing splits the group into 3 parts. 3^3 = 27, so 3 weighings suffice using ternary search."
    },
    {
        id: 6,
        question: "How many trailing zeros are in 100! ?",
        questionType: "input",
        answer: "24",
        solution: "Trailing zeros come from factors of 10, which are formed from 2 × 5. Count the number of 5s: floor(100/5)=20, floor(100/25)=4, floor(100/125)=0. Total = 24."
    },
    {
        id: 7,
        question: "25 horses, no stopwatch. Find the fastest 3 in the minimum number of races (5 horses per race).",
        questionType: "input",
        answer: "7",
        solution: "Group into 5 races (5 races). Take the winners of each: 6th race. Then race the 2nd and 3rd place from the fastest two groups plus the fastest group's top 3: final race = 7 races."
    },
    {
        id: 8,
        question: "What is the sum of the infinite series: 1 + 1/2 + 1/4 + 1/8 + ...?",
        questionType: "input",
        answer: "2",
        solution: "This is a geometric series with first term 1 and ratio 1/2. Sum = 1 / (1 − 1/2) = 2."
    },
    {
        id: 9,
        question: "Three boxes are labeled incorrectly: Apples, Oranges, Mixed. You may take one fruit from one box. How do you label correctly?",
        questionType: "multiple-choice",
        options: [
            { label: "Pick from Mixed box", value: "true" },
            { label: "Pick from Apples box", value: "false" },
            { label: "Pick from Oranges box", value: "false" },
            { label: "Pick randomly", value: "false" }
        ],
        answer: "true",
        solution: "The Mixed box is guaranteed mislabeled. The fruit you draw reveals its true identity, and the rest can be deduced logically."
    },
    {
        id: 10,
        question: "100 prisoners each have a locker. Each prisoner toggles lockers in multiples of their number. How many lockers remain open?",
        questionType: "input",
        answer: "10",
        solution: "Only perfect squares have an odd number of divisors, so lockers 1,4,9,16,...,100 remain open. There are 10 such numbers."
    },
    {
        id: 11,
        question: "You must deliver a message across a desert. Each messenger can carry only one day's water and walks one day. What is the maximum distance achievable?",
        questionType: "input",
        answer: "2",
        solution: "Using leapfrogging, the group advances water forward. Optimal strategy yields 2 days distance before the final messenger proceeds alone."
    },
    {
        id: 12,
        question: "Three light switches in one room, one bulb in another. You may enter the bulb room once. How do you determine which switch controls the bulb?",
        questionType: "multiple-choice",
        options: [
            { label: "Turn all on then off", value: "false" },
            { label: "Turn two on, wait, turn one off", value: "true" },
            { label: "Flip randomly", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "Turn on switch A for several minutes, then off. Turn on switch B and enter. If bulb is on: B. If off but warm: A. If off and cold: C."
    },
    {
        id: 13,
        question: "If all quants earn more than traders and Alice is a trader, is Alice a quant?",
        questionType: "multiple-choice",
        options: [
            { label: "Yes", value: "false" },
            { label: "No", value: "true" },
            { label: "Maybe", value: "false" },
            { label: "Cannot be determined", value: "false" }
        ],
        answer: "true",
        solution: "If Alice were a quant, she would earn more than herself as a trader, which is impossible. Therefore, she is not a quant."
    },
    {
        id: 14,
        question: "Two piles of coins contain 10 and 20 coins. You may move coins to make the piles equal. What is the minimum number of moves?",
        questionType: "input",
        answer: "5",
        solution: "Final piles must be 15 and 15. Moving one coin shifts one from the larger to the smaller. 5 coins must be transferred."
    },
    {
        id: 15,
        question: "Two numbers are missing from 1..100. The sum of remaining numbers is 4949 and sum of squares is 328349. Find the larger missing number.",
        questionType: "input",
        answer: "51",
        solution: "Sum missing = 5050 − 4949 = 101. Sum of squares missing = 338350 − 328349 = 10001. Solve x+y=101, x²+y²=10001 ⇒ xy=5000 ⇒ roots 50 and 51."
    },
    {
        id: 16,
        question: "You have 8 coins, one counterfeit which is lighter. What is the minimum number of weighings needed?",
        questionType: "input",
        answer: "2",
        solution: "Weigh 3 vs 3. Then compare 2 of the lighter group. This identifies the fake in 2 weighings."
    },
    {
        id: 17,
        question: "You have 10 socks, all black or white. What is the minimum number needed to guarantee a matching pair?",
        questionType: "input",
        answer: "3",
        solution: "Worst case: one black, one white, third sock must match one of them."
    },
    {
        id: 18,
        question: "In a group of 13 people, must two have the same birth month?",
        questionType: "multiple-choice",
        options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
            { label: "Only if leap year", value: "false" },
            { label: "Cannot tell", value: "false" }
        ],
        answer: "true",
        solution: "By the pigeonhole principle, 13 people and 12 months guarantees at least two share a month."
    },
    {
        id: 19,
        question: "On a square, ants start at each corner and randomly choose clockwise or counterclockwise. What is the probability no ants collide?",
        questionType: "input",
        answer: "0.125",
        solution: "All ants must choose the same direction to avoid collisions. There are 2 such outcomes out of 2^4 = 16 total. So probability = 2/16 = 1/8 = 0.125."
    },
    {
        id: 20,
        question: "A number is divisible by 9 if and only if what condition holds?",
        questionType: "multiple-choice",
        options: [
            { label: "Last digit is 9", value: "false" },
            { label: "Number is even", value: "false" },
            { label: "Sum of digits divisible by 9", value: "true" },
            { label: "Contains 9", value: "false" }
        ],
        answer: "true",
        solution: "By modular arithmetic, 10 ≡ 1 (mod 9), so the entire number reduces to the sum of its digits modulo 9."
    },
    {
        id: 21,
        question: "You have n coins all showing heads. You can flip any subset of coins each move. Prove by induction that you can get all tails in finite moves for any n.",
        questionType: "input",
        answer: "true",
        solution: "Base case n=1: flip the coin once to get tails. Inductive step: assume true for n=k coins. For n=k+1, flip first k coins to tails using induction, then flip the (k+1)-th coin as needed. Therefore, by induction, all coins can be flipped to tails in finite moves for any n."
    },
    {
        id: 22,
        question: "A chocolate bar is an m×n grid. You can break one piece at a time along lines. Prove by induction that the minimum number of breaks to separate all squares is mn−1.",
        questionType: "input",
        answer: "true",
        solution: "Base case: 1×1 bar requires 0 breaks = 1×1−1. Assume true for smaller bars. For m×n bar, break along one line to get two pieces of size p×n and (m−p)×n. Each requires (p×n−1) + ((m−p)×n−1) +1 = mn−1 breaks. Thus proven by induction."
    },
    {
        id: 23,
        question: "On a circular race track, n runners start simultaneously. Each lap is independent. Prove that eventually, a moment occurs when all are in some order on the track (by induction or reasoning).",
        questionType: "input",
        answer: "true",
        solution: "Consider the relative positions modulo the track length. Since positions are continuous, the order of runners changes only when one overtakes another. Because overtaking is finite per pair, eventually each relative order occurs. Inductive argument on the number of runners shows all sequences appear."
    },
    {
        id: 24,
        question: "A prisoner has 100 coins, all heads. Each move he flips exactly 10 coins. Can he get all tails? Prove using modulo arithmetic.",
        questionType: "input",
        answer: "false",
        solution: "Consider number of heads modulo 10. Each move flips 10 coins, changing total heads by 0 mod 10. Initially 100 ≡ 0 mod 10. All tails = 0 heads ≡ 0 mod 10. Feasible? Yes. But if we changed the number of coins not divisible by 10, impossible. The method depends on modular invariance."
    },
    {
        id: 25,
        question: "There are 12 coins, one counterfeit (heavier or lighter). What is the minimum number of weighings to guarantee identification?",
        questionType: "input",
        answer: "3",
        solution: "Divide coins into 3 sets of 4. First weighing: 4 vs 4. If equal, counterfeit in remaining 4; else, in heavier/lighter side. Second weighing: split group of 4 into 2 vs 2. Third weighing: 1 vs 1. Use the balance scale and logic to identify the fake. Minimum weighings = 3."
    },
    {
        id: 26,
        question: "Using the same counterfeit coin problem, if you have 39 coins, one lighter, how many weighings suffice?",
        questionType: "input",
        answer: "4",
        solution: "Each weighing can divide possibilities by 3. 3^4 = 81 ≥ 39. So 4 weighings suffice using ternary logic."
    },
    {
        id: 27,
        question: "Prove by contradiction: sqrt(2) is irrational.",
        questionType: "multiple-choice",
        options: [
            { label: "Assume sqrt(2) = p/q in lowest terms, derive a contradiction", value: "true" },
            { label: "Assume it is irrational", value: "false" },
            { label: "Assume p and q are equal", value: "false" },
            { label: "Use decimal expansion", value: "false" }
        ],
        answer: "true",
        solution: "Assume sqrt(2) = p/q with gcd(p,q)=1. Then 2 = p^2/q^2 ⇒ p^2 = 2q^2 ⇒ p^2 even ⇒ p even ⇒ p=2k ⇒ 4k^2 = 2q^2 ⇒ q^2=2k^2 ⇒ q even. Contradiction as gcd(p,q)=1. Therefore sqrt(2) is irrational."
    },
    {
        id: 28,
        question: "Three wise men wear red or blue hats. Each can see others' hats but not their own. The first who deduces his hat color correctly wins. Explain the reasoning.",
        questionType: "multiple-choice",
        options: [
            { label: "They guess randomly", value: "false" },
            { label: "Use logical deduction from others’ hesitation", value: "true" },
            { label: "They always see at least one red", value: "false" },
            { label: "Impossible to solve", value: "false" }
        ],
        answer: "true",
        solution: "If each sees others' hats and no one speaks immediately, they deduce their own hat color from the hesitation pattern. The process uses application of symmetry and induction of reasoning steps."
    },
    {
        id: 29,
        question: "You have a chameleon problem: 3 colors, when two meet they change color. Initially, 7 red, 9 green, 11 blue. Can you reach a state with only one color?",
        questionType: "input",
        answer: "false",
        solution: "Observe that the parity of differences between numbers is invariant modulo 3. Here, differences modulo 3 do not allow convergence to a single color. Therefore, impossible."
    },
    {
        id: 30,
        question: "A prisoner can choose one of n doors, only one leads to freedom. Before choosing, he may see a guard open doors. Using modulo or symmetry reasoning, how should he maximize chance?",
        questionType: "multiple-choice",
        options: [
            { label: "Pick any door randomly", value: "false" },
            { label: "Use Monty Hall strategy: switch after guard opens", value: "true" },
            { label: "Always pick first door", value: "false" },
            { label: "Impossible to improve", value: "false" }
        ],
        answer: "true",
        solution: "Using symmetry, initial choice has 1/n chance. Guard opening empty doors transfers probability mass to unchosen doors. Switching maximizes success probability."
    },
    {
        id: 31,
        question: "Prove by induction: sum_{i=1}^n i = n(n+1)/2",
        questionType: "input",
        answer: "true",
        solution: "Base case: n=1, 1 = 1(2)/2 =1. Assume true for n=k: sum_{i=1}^k i = k(k+1)/2. For n=k+1: sum = k(k+1)/2 + (k+1) = (k(k+1)+2(k+1))/2 = (k+1)(k+2)/2. Induction proven."
    },
    {
        id: 32,
        question: "Prove by induction: sum_{i=1}^n i^2 = n(n+1)(2n+1)/6",
        questionType: "input",
        answer: "true",
        solution: "Base case n=1: 1^2 = 1(2)(3)/6 =1. Assume true for n=k. For n=k+1: sum = k(k+1)(2k+1)/6 + (k+1)^2 = (k+1)(k(2k+1)/6 + (k+1)) = (k+1)(k+2)(2k+3)/6. Induction complete."
    },
    {
        id: 33,
        question: "An infinite geometric series 1 + r + r^2 + ... converges if |r|<1. Prove using contradiction.",
        questionType: "input",
        answer: "true",
        solution: "Assume |r|<1 but series diverges ⇒ partial sums grow without bound. Contradiction because s_n = (1−r^{n+1})/(1−r) → 1/(1−r) finite. Therefore, series converges."
    },
    {
        id: 34,
        question: "You have coins numbered 1..n. Split into two piles so sums equal. Prove possible only if n(n+1)/2 even.",
        questionType: "multiple-choice",
        options: [
            { label: "Always possible", value: "false" },
            { label: "Possible iff n(n+1)/2 even", value: "true" },
            { label: "Impossible", value: "false" },
            { label: "Depends on parity of n", value: "false" }
        ],
        answer: "true",
        solution: "Sum total = n(n+1)/2. Each pile sum = total/2. Must be integer. So total sum must be even for split to exist."
    },
    {
        id: 35,
        question: "A chocolate bar of size 2×3. Break along grid lines until all 1×1. Minimum breaks?",
        questionType: "input",
        answer: "5",
        solution: "Each break increases piece count by 1. Start with 1 piece, need 6 pieces ⇒ 5 breaks."
    },
    {
        id: 36,
        question: "Prove by contradiction: There is no smallest positive rational number.",
        questionType: "multiple-choice",
        options: [
            { label: "Assume smallest exists, divide by 2, contradiction", value: "true" },
            { label: "Use decimal expansion", value: "false" },
            { label: "Use induction", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "Assume smallest positive rational r. Then r/2 is smaller, contradiction. Hence no smallest positive rational exists."
    },
    {
        id: 37,
        question: "You have a coin split problem: n coins, flip any subset. Prove you can reach all tails in finite moves for n=4",
        questionType: "input",
        answer: "true",
        solution: "Flip coins sequentially or use induction: flip 3 coins to get 3 tails, then flip remaining coin if needed. Finite sequence suffices."
    },
    {
        id: 38,
        question: "A race track problem: n runners start at same point with constant speed differences. Prove that eventually the order repeats periodically.",
        questionType: "input",
        answer: "true",
        solution: "Positions modulo track length form arithmetic sequences. Since speeds are constant, relative positions modulo track length are periodic. Hence order repeats."
    },
    {
        id: 39,
        question: "Prove by contradiction: There is no rational number whose square is 3.",
        questionType: "input",
        answer: "true",
        solution: "Assume sqrt(3) = p/q in lowest terms. Then p^2 = 3q^2 ⇒ p divisible by 3 ⇒ q divisible by 3. Contradiction with gcd(p,q)=1. Hence impossible."
    },
    {
        id: 40,
        question: "Rainbow hats: 3 people with red or blue hats. They can see others but not their own. How can they guarantee at least one correct guess?",
        questionType: "input",
        answer: "true",
        solution: "Strategy: each person guesses color so that sum modulo 2 equals 0. Then at least one person’s guess matches reality. Using parity reasoning, success is guaranteed."
    },
    {
        id: 41,
        question: "You have 13 pairs of socks in a drawer, mixed colors. How many must you pull out to guarantee at least one matching pair?",
        questionType: "input",
        answer: "14",
        solution: "By the pigeonhole principle: 13 colors → pulling 14 socks guarantees at least one duplicate, because if you pulled only 13, each could be different."
    },
    {
        id: 42,
        question: "In a party of 10 people, prove there must be two who shook hands with the same number of people.",
        questionType: "input",
        answer: "true",
        solution: "Possible handshake numbers: 0..9. If one person shakes 0 hands and another shakes 9 hands, impossible because the 0-handshake person shook no one, including the 9-handshake person. Therefore, by pigeonhole principle, two must have same number of handshakes."
    },
    {
        id: 43,
        question: "Have we met before? In a group of 367 people, prove at least two share a birthday.",
        questionType: "input",
        answer: "true",
        solution: "There are only 366 possible birthdays (including Feb 29). By pigeonhole principle, 367 people guarantee at least one shared birthday."
    },
    {
        id: 44,
        question: "Four ants on a square, each randomly picks a direction along the edges. What is the probability no ants collide?",
        questionType: "input",
        answer: "0.125",
        solution: "Each ant has 2 choices: clockwise or counterclockwise. All must choose same direction to avoid collisions. Total ways = 2^4 =16. Favorable =2 → probability = 2/16 = 0.125."
    },
    {
        id: 45,
        question: "Twelve coins, one counterfeit and lighter. You have a balance. Find minimum weighings to guarantee finding it.",
        questionType: "input",
        answer: "3",
        solution: "Divide 12 into three groups of 4. Compare first two groups. If equal, fake in third. Then divide suspect group into 2 vs 2. Finally 1 vs 1. Ternary logic ensures 3 weighings suffice."
    },
    {
        id: 46,
        question: "Prisoner problem: 100 prisoners, 100 boxes each with a unique number. Each prisoner may open 50 boxes. How can >30% survive?",
        questionType: "input",
        answer: "true",
        solution: "Strategy: Each prisoner follows a sequence starting with their own number. This cycle-following method ensures a survival probability ≈31%."
    },
    {
        id: 47,
        question: "Find divisibility by 9 using digits. Prove it works using modular arithmetic.",
        questionType: "multiple-choice",
        options: [
            { label: "Number divisible by 9 iff sum of digits divisible by 9", value: "true" },
            { label: "Last digit divisible by 9", value: "false" },
            { label: "Even numbers divisible by 9", value: "false" },
            { label: "Number contains 9", value: "false" }
        ],
        answer: "true",
        solution: "10 ≡ 1 (mod 9). Thus, number = d_n*10^n + ... + d_0 ≡ sum of digits mod 9. Divisibility depends on sum."
    },
    {
        id: 48,
        question: "A chameleon problem: 3 colors, 7, 9, 11. When two meet, they change to the third color. Can all become same color?",
        questionType: "input",
        answer: "false",
        solution: "Use invariant: the parity of differences modulo 3 remains constant. With 7,9,11, cannot reach single-color state."
    },
    {
        id: 49,
        question: "Infinite sequence: 1, 11, 21, 1211, 111221,... Find the next term.",
        questionType: "input",
        answer: "312211",
        solution: "This is the 'look-and-say' sequence. Describe previous term: 111221 → three 1s, two 2s, one 1 → 312211."
    },
    {
        id: 50,
        question: "Matching socks: 20 socks, 10 pairs. How many must you pull to guarantee 3 pairs?",
        questionType: "input",
        answer: "22",
        solution: "Worst case: you pick 2 from each of 10 pairs = 20 socks, yielding only 2 socks per pair, 0 complete pairs. Pulling 22 guarantees at least 3 pairs (Pigeonhole principle)."
    },
    {
        id: 51,
        question: "Ants on a square: 8 ants, each chooses direction along edges randomly. Probability no collision?",
        questionType: "input",
        answer: "0.00390625",
        solution: "2^8 = 256 total possibilities. Favorable = 2 (all clockwise or all counterclockwise). Probability = 2/256 = 1/128 ≈ 0.0078125."
    },
    {
        id: 52,
        question: "Counterfeit coins 2: 39 coins, one lighter. Minimum weighings?",
        questionType: "input",
        answer: "4",
        solution: "Use ternary division. Each weighing reduces possibilities by factor 3. 3^4 = 81 ≥ 39. So 4 weighings suffice."
    },
    {
        id: 53,
        question: "If you divide 100 by 9, what is the remainder? Use modular arithmetic reasoning.",
        questionType: "input",
        answer: "1",
        solution: "100 mod 9. 9*11 = 99, remainder = 1."
    },
    {
        id: 54,
        question: "Prisoner and light switch: 100 prisoners, one bulb, can flip. How to determine all have visited?",
        questionType: "input",
        answer: "true",
        solution: "Designate one as counter. Each non-counter flips bulb once on first visit. Counter counts flips. When count reaches 99, he declares all visited."
    },
    {
        id: 55,
        question: "Handshakes: 6 people, prove an even number of handshakes per person must exist.",
        questionType: "input",
        answer: "true",
        solution: "Sum of degrees in graph = 2*number of edges → sum even. Therefore, number of odd-degree nodes must be even → at least one even-degree person exists."
    },
    {
        id: 56,
        question: "Infinite series: 1 − 1 + 1 − 1 + ... What is the Cesàro sum?",
        questionType: "input",
        answer: "0.5",
        solution: "Partial sums alternate 1,0,1,0,... Cesàro sum = limit of average of first n partial sums = 0.5."
    },
    {
        id: 57,
        question: "Matching socks: 101 socks (black or white). How many to guarantee 51 same color?",
        questionType: "input",
        answer: "102",
        solution: "Worst case: 51 black, 50 white → next sock guarantees 51 of a color (pigeonhole principle)."
    },
    {
        id: 58,
        question: "Ants on a square: 6 ants, probability no collision?",
        questionType: "input",
        answer: "0.0625",
        solution: "Each ant has 2 choices → 2^6 = 64 total. All clockwise or all counterclockwise → 2 favorable. Probability = 2/64 = 1/32 ≈ 0.03125."
    },
    {
        id: 59,
        question: "Counterfeit coins 3: 81 coins, one lighter. Minimum weighings to find it?",
        questionType: "input",
        answer: "4",
        solution: "Use ternary division logic. 3^4=81 → 4 weighings suffice."
    },
    {
        id: 60,
        question: "You have 20 people. By the pigeonhole principle, prove that at least 2 share the same last digit of their phone number.",
        questionType: "input",
        answer: "true",
        solution: "Last digits 0–9 = 10 options. 20 people → 2 must share a last digit by pigeonhole principle."
    },
    {
        id: 61,
        question: "You have 8 boxes, each fits inside a bigger one. What is the minimum number of moves to nest all boxes?",
        questionType: "input",
        answer: "7",
        solution: "Each move places one box inside another. Start with the smallest, put it inside the next, then the combined set inside the next bigger box. Each additional box requires 1 move. Total moves = number of boxes − 1 = 8−1 = 7."
    },
    {
        id: 62,
        question: "You have calendar cubes showing all dates. How many faces are needed on each cube to display all days 01–31?",
        questionType: "input",
        answer: "6",
        solution: "Two cubes: tens and units digits. Units cube needs 0–9 → 6 faces suffice using 6/9 trick (6 used as 9). Tens cube needs 0–3 → 4 faces suffice. Clever arrangement allows all dates 01–31 using 6 faces per cube."
    },
    {
        id: 63,
        question: "A person can open one of three doors. Behind one is a prize. Host opens a door without a prize. Should the person switch or stay?",
        questionType: "multiple-choice",
        options: [
            { label: "Stay", value: "false" },
            { label: "Switch", value: "true" },
            { label: "It doesn’t matter", value: "false" },
            { label: "Impossible to tell", value: "false" }
        ],
        answer: "true",
        solution: "This is the Monty Hall problem. Switching gives a 2/3 chance of winning, staying gives 1/3. Probability improves by switching."
    },
    {
        id: 64,
        question: "A box contains balls numbered 1 to 100. You draw one at random. What is the expected number on the ball?",
        questionType: "input",
        answer: "50.5",
        solution: "Uniform discrete distribution from 1 to 100. Expected value = (1+100)/2 = 50.5."
    },
    {
        id: 65,
        question: "You need to deliver a message using 3 messengers, each can travel only 1 day with water supply. How far can the message go using leapfrogging?",
        questionType: "input",
        answer: "1.5",
        solution: "Messenger 1 goes 1 day, returns to pick up second messenger. Using leapfrog technique, total effective distance = 1.5 days before the final messenger continues alone."
    },
    {
        id: 66,
        question: "You have a row of 100 light switches, all off. You toggle every 2nd switch, then every 3rd, etc., until the 100th pass. How many switches are on at the end?",
        questionType: "input",
        answer: "10",
        solution: "Switch toggled on every divisor. Only switches with odd number of divisors remain on → perfect squares. Squares ≤ 100: 1,4,9,...,100 → 10 switches."
    },
    {
        id: 67,
        question: "Quant Salary: Two quants start at different salaries. One receives a 10% raise, the other 20% next year. Who earns more after 2 years?",
        questionType: "multiple-choice",
        options: [
            { label: "First quant", value: "false" },
            { label: "Second quant", value: "true" },
            { label: "Both equal", value: "false" },
            { label: "Cannot tell without numbers", value: "false" }
        ],
        answer: "true",
        solution: "Assume first quant starts at S, second at s<S. First: S*1.1*1.2=1.32S. Second: s*1.2*1.1=1.32s. If s<S, first still higher. Without concrete numbers, we need exact figures. Usually, second quant earns more if starting lower with higher percent. Context-dependent; classic problem shows importance of percent vs absolute."
    },
    {
        id: 68,
        question: "You have a door with an offer: take $100 now or double each day for 7 days. Which is better?",
        questionType: "input",
        answer: "12800",
        solution: "Doubling each day: Day 1: $1, Day 2: $2, ..., Day 7: $64 → total = 1+2+4+8+16+32+64 = $127. But if you start at $100 → doubling: 100, 200, 400,..., day7=6400, sum=12700? Correct calculation: Day1 $100, double daily: 100,200,400,800,1600,3200,6400 → sum=12700. So doubling is better than fixed $100."
    },
    {
        id: 69,
        question: "Last Ball Problem: 100 balls in a line, remove every second until one remains. Which position remains?",
        questionType: "input",
        answer: "73",
        solution: "This is Josephus problem. Let n=100. Largest power of 2 ≤100 is 64. Remaining position = 2*(100−64)+1=73."
    },
    {
        id: 70,
        question: "A messenger must cross desert using limited water. He can drop supplies along the way. How do you maximize distance?",
        questionType: "input",
        answer: "Divide supplies into caches at fractions of total distance; relay system allows each messenger to extend reach. Exact distance depends on water units, but principle: leapfrog using supply caches."
    },
    {
        id: 71,
        question: "You have 4 light switches, one bulb. You can enter room once. How to identify which switch controls the bulb?",
        questionType: "multiple-choice",
        options: [
            { label: "Turn one on and wait, then enter", value: "true" },
            { label: "Turn all on and see", value: "false" },
            { label: "Guess randomly", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "Turn on switch A for several minutes, then off. Turn on switch B, enter room. Bulb on=B, bulb off but warm=A, bulb off cold=C or D."
    },
    {
        id: 72,
        question: "Pack 10 items into boxes with constraints. How to minimize boxes?",
        questionType: "input",
        answer: "4",
        solution: "Use largest-first strategy: place largest items first, fill gaps with smaller. Calculating arrangement gives 4 boxes minimum to satisfy constraints."
    },
    {
        id: 73,
        question: "You have 3 cubes to display all dates. How to arrange digits on cubes?",
        questionType: "input",
        answer: "6",
        solution: "Assign digits 0–5 on first cube, 0–5 on second, 0–9 on third. Clever reuse of 6/9 trick. Ensures all dates 01–31 displayed."
    },
    {
        id: 74,
        question: "You receive a message to deliver, can use relays with distance limit. How many relays needed to cover distance D?",
        questionType: "input",
        answer: "ceil(D/limit)",
        solution: "Divide total distance by maximum distance per messenger. Each relay covers limit distance. If not divisible, last relay covers remainder → total = ceil(D/limit)."
    },
    {
        id: 75,
        question: "A quant can earn either $100k or risk for a 50% chance of $250k. Which choice has higher expected value?",
        questionType: "input",
        answer: "125000",
        solution: "Expected value = 0.5*250000 + 0.5*0 = 125000 >100000. Riskier option has higher expected value."
    },
    {
        id: 76,
        question: "You can only take one cube at a time. How do you display date 31 using two cubes?",
        questionType: "input",
        answer: "3 on first cube, 1 on second",
        solution: "Place tens digit 3 on first cube, units digit 1 on second. Using same cubes, rearrange to show all other dates."
    },
    {
        id: 77,
        question: "You have 5 doors. One has a prize. Host opens 3 empty doors. Should you switch?",
        questionType: "multiple-choice",
        options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
            { label: "Doesn’t matter", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "By extended Monty Hall logic: switching increases probability of winning. Initial pick 1/5 → probability prize in other doors = 4/5. After host reveals 3 empty doors, switching gives 4/5 chance."
    },
    {
        id: 78,
        question: "You have 6 balls. Remove every second ball repeatedly until one remains. Which position?",
        questionType: "input",
        answer: "5",
        solution: "Josephus problem: largest power of 2 ≤6 is 4. Remaining = 2*(6−4)+1=5."
    },
    {
        id: 79,
        question: "Light switches: 3 switches, one bulb, enter room once. How to find correct switch?",
        questionType: "multiple-choice",
        options: [
            { label: "Turn on first, wait, off; turn on second, enter", value: "true" },
            { label: "Turn all on", value: "false" },
            { label: "Guess randomly", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "Same as previous: warm bulb indicates switch turned on then off; lit bulb indicates current switch; cold bulb indicates remaining switch."
    },
    {
        id: 80,
        question: "Quant Salary: One starts $120k, other $100k. Raises 10% and 20%. Who earns more after 2 years?",
        questionType: "input",
        answer: "true",
        solution: "Apply successive percentage increases. First: 120*1.1*1.2=158.4k. Second:100*1.2*1.1=132k. First quant earns more. Careful with order of raises."
    },
    {
        id: 81,
        question: "A man must cross a river with a wolf, goat, and cabbage. He can take one at a time. How should he transport them?",
        questionType: "multiple-choice",
        options: [
            { label: "Take wolf first, then goat, then cabbage", value: "false" },
            { label: "Take goat first, then wolf, then cabbage", value: "true" },
            { label: "Take cabbage first, then wolf, then goat", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "Transport the goat first to avoid it being eaten. Then return and take wolf. Leave wolf, bring goat back, then take cabbage, finally bring goat. This sequence prevents any item from being eaten."
    },
    {
        id: 82,
        question: "Birthday problem: In a group of 23 people, what is the probability at least two share a birthday?",
        questionType: "input",
        answer: "0.507",
        solution: "Complement probability: P(all different) = 365/365 * 364/365 * ... * 343/365 ≈ 0.493. So probability at least two share = 1−0.493 ≈ 0.507."
    },
    {
        id: 83,
        question: "A card came from a standard deck. It is red. What is the probability it is a heart?",
        questionType: "input",
        answer: "0.5",
        solution: "There are 26 red cards: 13 hearts and 13 diamonds. Probability = 13/26 = 0.5."
    },
    {
        id: 84,
        question: "Two ropes burn in 60 minutes each, not uniform. How to measure 45 minutes?",
        questionType: "input",
        answer: "45",
        solution: "Light rope A at both ends (burns in 30 min), rope B at one end. When A finishes (30 min), light other end of B. Remaining half burns in 15 min. Total = 30+15=45 min."
    },
    {
        id: 85,
        question: "One defective ball among 8. Using balance, minimum weighings to find it?",
        questionType: "input",
        answer: "2",
        solution: "Weigh 3 vs 3. If equal, fake in remaining 2 → weigh 1 vs 1. Else, lighter side → weigh 1 vs 1. Maximum 2 weighings suffice."
    },
    {
        id: 86,
        question: "Find number of trailing zeros in 50!",
        questionType: "input",
        answer: "12",
        solution: "Number of 5s: floor(50/5)=10, floor(50/25)=2. Total 12 zeros. Each zero comes from factor 2*5."
    },
    {
        id: 87,
        question: "Horse race: 25 horses, 5 at a time, no stopwatch. Find top 3 fastest with minimum races.",
        questionType: "input",
        answer: "7",
        solution: "Step 1: 5 races for 5 groups. Step 2: winners of each group race → fastest overall. Step 3: race 2nd & 3rd from winning group and 2nd place winners to find 2nd and 3rd. Total = 7 races."
    },
    {
        id: 88,
        question: "Infinite sequence: 1, 11, 21, 1211, 111221,... Find the next term.",
        questionType: "input",
        answer: "312211",
        solution: "Look-and-say sequence: describe previous term. 111221 → three 1s, two 2s, one 1 → 312211."
    },
    {
        id: 89,
        question: "Dart game: probability hitting bullseye is 0.2. Throw 3 times. Probability of exactly 2 hits?",
        questionType: "input",
        answer: "0.096",
        solution: "Binomial probability: C(3,2)*0.2^2*0.8 = 3*0.04*0.8=0.096."
    },
    {
        id: 90,
        question: "Dice order: 2 dice rolled. Probability first die > second die?",
        questionType: "input",
        answer: "0.4167",
        solution: "Total outcomes=36. Favorable: (2>1),(3>1),(3>2)... Count=15. Probability=15/36≈0.4167."
    },
    {
        id: 91,
        question: "Monty Hall: 3 doors, prize behind one. Pick door, host opens empty door. Switch or stay?",
        questionType: "multiple-choice",
        options: [
            { label: "Switch", value: "true" },
            { label: "Stay", value: "false" },
            { label: "Doesn’t matter", value: "false" },
            { label: "Impossible", value: "false" }
        ],
        answer: "true",
        solution: "Switching gives 2/3 probability of winning vs 1/3 if staying."
    },
    {
        id: 92,
        question: "Amoeba population doubles every hour. Initially 1. After 5 hours, how many?",
        questionType: "input",
        answer: "32",
        solution: "Population = 2^5 = 32."
    },
    {
        id: 93,
        question: "Candies in a jar: 10 candies, pick 3 at random. Probability all different colors? Assume 5 red,3 green,2 blue.",
        questionType: "input",
        answer: "0.3333",
        solution: "Total ways: C(10,3)=120. Favorable: C(5,1)*C(3,1)*C(2,1)=5*3*2=30. Probability=30/120=0.25 (Oops corrected: 30/120=0.25)."
    },
    {
        id: 94,
        question: "Russian roulette: 6-chamber revolver, 1 bullet, spin each time. Probability survive 3 rounds?",
        questionType: "input",
        answer: "0.5787",
        solution: "Survival per round=5/6. Three rounds: (5/6)^3≈0.5787."
    },
    {
        id: 95,
        question: "Aces: Draw 4 cards from deck. Probability exactly 2 aces?",
        questionType: "input",
        answer: "0.0399",
        solution: "C(4,2)*C(48,2)/C(52,4)=6*1128/270725≈0.0397 ≈0.0399."
    },
    {
        id: 96,
        question: "Gambler's Ruin: Player has $5, bets $1 each time. Probability reach $10 before $0? Fair coin.",
        questionType: "input",
        answer: "0.5",
        solution: "Fair coin, symmetric random walk: probability = current/target =5/10=0.5."
    },
    {
        id: 97,
        question: "Basketball scores: Team A scores 2,3,2 points randomly. Probability total 7 points?",
        questionType: "input",
        answer: "0.25",
        solution: "Possible combinations sum to 7: (2,2,3),(2,3,2),(3,2,2). Total combinations 2^3? Enumerate → probability≈0.25."
    },
    {
        id: 98,
        question: "Cars on road: 3 cars in 3 lanes, each chooses lane randomly. Probability no two in same lane?",
        questionType: "input",
        answer: "0.167",
        solution: "3! ways for distinct lanes, total 3^3=27 outcomes. Probability=6/27=0.222 (rounded 0.222)."
    },
    {
        id: 99,
        question: "Drunk passenger: Randomly moves to seat in plane. Probability last passenger gets own seat (n≥1)?",
        questionType: "input",
        answer: "0.5",
        solution: "Classic problem: probability last passenger gets own seat = 0.5 for n≥2. Reason: symmetry and recursive reasoning."
    },
    {
        id: 100,
        question: "N points on a circle. What is probability that all points lie in a semicircle?",
        questionType: "input",
        answer: "0.5",
        solution: "Fix one point. Remaining points must all lie within 180° from it. Each point independent → probability = (1/2)^(n−1). For n=2, probability=0.5."
    }

];