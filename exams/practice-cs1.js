// Actuarial Statistics Practice Questions Data
const questions = [
    {
        id: 1,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 2,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 3,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 4,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 5,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 6,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 7,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 8,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 9,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 10,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 11,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 12,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 13,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 14,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 15,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 16,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 17,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 18,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 19,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 20,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 21,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 22,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 23,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 24,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 25,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
];
