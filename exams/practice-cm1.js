// CM1 Practice Questions Data
const questions = [
    {
        id: 1,
        question: "If a bond with a face value of $100 pays annual coupons at a rate of 4% per annum, what is the coupon received each year?",
        questionType: "input",
        answer: "4",
        solution: "The coupon payment is calculated as: \\[C = F \\times r = 100 \\times 0.04 = 4\\] where \\(F\\) is the face value and \\(r\\) is the coupon rate. Therefore, the annual coupon payment is $4."
    },
    {
        id: 2,
        question: "Calculate the present value of a 5-year annuity-due with annual payments of $1,000 at an interest rate of 6% per annum.",
        questionType: "input",
        answer: "4465.11",
        solution: "For an annuity-due, the present value is: \\[\\ddot{a}_{\\overline{5}|} = \\frac{1 - v^5}{d}\\] where \\(v = \\frac{1}{1+i} = \\frac{1}{1.06}\\) and \\(d = \\frac{i}{1+i} = \\frac{0.06}{1.06}\\). \\[\\ddot{a}_{\\overline{5}|} = \\frac{1 - (1/1.06)^5}{0.06/1.06} = \\frac{1 - 0.747258}{0.056604} = 4.46511\\] Therefore, PV = $1,000 × 4.46511 = $4,465.11"
    },
    {
        id: 3,
        question: "What is the effective annual interest rate if the nominal rate is 8% per annum convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" }
        ],
        answer: "8.24",
        solution: "The effective annual interest rate is calculated as: \\[i = \\left(1 + \\frac{i^{(4)}}{4}\\right)^4 - 1\\] where \\(i^{(4)} = 0.08\\). \\[i = \\left(1 + \\frac{0.08}{4}\\right)^4 - 1 = (1.02)^4 - 1 = 1.0824 - 1 = 0.0824\\] Therefore, the effective annual interest rate is 8.24%."
    },
    {
        id: 4,
        question: "A loan of $10,000 is to be repaid by level annual payments over 10 years at an interest rate of 5% per annum. What is the annual payment?",
        questionType: "input",
        answer: "1295.05",
        solution: "The annual payment \\(X\\) is found using: \\[L = X \\times a_{\\overline{10}|}\\] where \\(L = 10,000\\) and \\(a_{\\overline{10}|} = \\frac{1 - v^{10}}{i}\\) with \\(i = 0.05\\). \\[a_{\\overline{10}|} = \\frac{1 - (1/1.05)^{10}}{0.05} = \\frac{1 - 0.613913}{0.05} = 7.72173\\] Therefore, \\(X = \\frac{10,000}{7.72173} = 1,295.05\\)"
    },
    {
        id: 5,
        question: "What is the accumulated value at time 10 of a continuous payment stream of $100 per annum for 10 years, assuming a force of interest of \\(\\delta = 0.05\\)?",
        questionType: "input",
        answer: "1291.86",
        solution: "The accumulated value of a continuous payment stream is: \\[\\bar{s}_{\\overline{10}|} = \\frac{e^{\\delta n} - 1}{\\delta}\\] where \\(\\delta = 0.05\\) and \\(n = 10\\). \\[\\bar{s}_{\\overline{10}|} = \\frac{e^{0.5} - 1}{0.05} = \\frac{1.64872 - 1}{0.05} = 12.9186\\] Therefore, AV = $100 × 12.9186 = $1,291.86"
    }
];

// Flashcard State
let currentQuestionIndex = 0;
let isFlipped = false;
let answerSubmitted = false;
let isAnswerCorrect = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
    setupEventListeners();
    renderMath(); // Initial render for any math in the first question
});

function setupEventListeners() {
    const flashcard = document.getElementById('flashcard');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const backToQuestionBtn = document.getElementById('back-to-question-btn');
    const nextAfterSolutionBtn = document.getElementById('next-after-solution-btn');

    submitAnswerBtn.addEventListener('click', () => {
        checkAnswer();
    });

    showSolutionBtn.addEventListener('click', () => {
        flipCard();
    });

    nextQuestionBtn.addEventListener('click', () => {
        nextQuestion();
    });

    backToQuestionBtn.addEventListener('click', () => {
        flipCard();
    });

    nextAfterSolutionBtn.addEventListener('click', () => {
        nextQuestion();
    });

    // Allow Enter key to submit answer
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isFlipped) {
            const answerInput = document.getElementById('answer-input');
            if (answerInput && document.activeElement === answerInput) {
                checkAnswer();
            }
        }
    });
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    if (!question) return;

    // Reset state
    answerSubmitted = false;
    isAnswerCorrect = false;

    // Update question number
    document.getElementById('question-num').textContent = question.id;
    document.getElementById('current-progress').textContent = question.id;
    document.getElementById('total-questions').textContent = questions.length;

    // Hide feedback
    const feedbackEl = document.getElementById('answer-feedback');
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'answer-feedback';

    // Render question text
    const questionTextEl = document.getElementById('question-text');
    questionTextEl.innerHTML = `<p>${question.question}</p>`;

    // Render answer section
    const answerSectionEl = document.getElementById('answer-section');
    if (question.questionType === 'multiple-choice') {
        answerSectionEl.innerHTML = `
            <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #1e293b;">Select your answer:</label>
            <div class="multiple-choice-options">
                ${question.options.map((option, index) => `
                    <label class="choice-option" data-value="${option.value}">
                        <input type="radio" name="answer" value="${option.value}">
                        <span>${option.label}</span>
                    </label>
                `).join('')}
            </div>
        `;

        // Add click handlers for multiple choice
        answerSectionEl.querySelectorAll('.choice-option').forEach(option => {
            option.addEventListener('click', function() {
                // Only prevent changes if answer was correct
                if (answerSubmitted && isAnswerCorrect) return;
                
                // Remove selected class from all options
                answerSectionEl.querySelectorAll('.choice-option').forEach(opt => {
                    opt.classList.remove('selected');
                    opt.querySelector('input[type="radio"]').checked = false;
                });
                // Add selected class to clicked option
                this.classList.add('selected');
                this.querySelector('input[type="radio"]').checked = true;
                
                // If answer was wrong and user changes selection, allow resubmission
                if (answerSubmitted && !isAnswerCorrect) {
                    answerSubmitted = false;
                    const feedbackEl = document.getElementById('answer-feedback');
                    feedbackEl.style.display = 'none';
                }
            });
        });
    } else {
        answerSectionEl.innerHTML = `
            <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #1e293b;">Enter your answer:</label>
            <input type="text" class="answer-input" id="answer-input" placeholder="Enter your answer here">
        `;
        
        // Allow resubmission if user changes their answer after getting it wrong
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.addEventListener('input', function() {
                if (answerSubmitted && !isAnswerCorrect) {
                    answerSubmitted = false;
                    const feedbackEl = document.getElementById('answer-feedback');
                    feedbackEl.style.display = 'none';
                }
            });
        }
    }

    // Render solution
    const solutionTextEl = document.getElementById('solution-text');
    solutionTextEl.innerHTML = `<p>${question.solution}</p>`;

    // Reset card state
    if (isFlipped) {
        flipCard();
    }

    // Render math after a short delay to ensure DOM is ready
    setTimeout(() => {
        renderMath();
    }, 100);
}

function checkAnswer() {
    // Only prevent resubmission if answer was correct
    if (answerSubmitted && isAnswerCorrect) return;

    const question = questions[currentQuestionIndex];
    if (!question) return;

    let userAnswer = '';
    const feedbackEl = document.getElementById('answer-feedback');

    // Get user's answer
    if (question.questionType === 'multiple-choice') {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            feedbackEl.textContent = 'Please select an answer.';
            feedbackEl.className = 'answer-feedback feedback-error';
            feedbackEl.style.display = 'block';
            return;
        }
        userAnswer = selectedOption.value.trim();
    } else {
        const answerInput = document.getElementById('answer-input');
        if (!answerInput || !answerInput.value.trim()) {
            feedbackEl.textContent = 'Please enter an answer.';
            feedbackEl.className = 'answer-feedback feedback-error';
            feedbackEl.style.display = 'block';
            return;
        }
        userAnswer = answerInput.value.trim();
    }

    // Normalize answers for comparison (handle decimals, case, etc.)
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(question.answer);

    // Check if answer is correct
    isAnswerCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    // Show feedback
    answerSubmitted = true;
    feedbackEl.style.display = 'block';

    if (isAnswerCorrect) {
        feedbackEl.textContent = '✓ Correct! Well done.';
        feedbackEl.className = 'answer-feedback feedback-correct';
        
        // Disable input if correct
        if (question.questionType === 'input') {
            const answerInput = document.getElementById('answer-input');
            if (answerInput) answerInput.disabled = true;
        } else {
            document.querySelectorAll('.choice-option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
        }
    } else {
        feedbackEl.textContent = '✗ Incorrect. Try again or view the solution.';
        feedbackEl.className = 'answer-feedback feedback-error';
        
        // Re-enable input for text answers if wrong (allow retry)
        if (question.questionType === 'input') {
            const answerInput = document.getElementById('answer-input');
            if (answerInput) {
                answerInput.disabled = false;
                answerInput.focus();
            }
        }
    }
}

function normalizeAnswer(answer) {
    // Convert to string, trim, remove spaces, handle decimals
    let normalized = answer.toString().trim().replace(/\s+/g, '').toLowerCase();
    
    // Remove currency symbols, commas, and other formatting
    normalized = normalized.replace(/[$,\s]/g, '');
    
    // Try to parse as number to normalize decimals
    // This handles cases like "4.00" matching "4" or "4.0"
    const num = parseFloat(normalized);
    if (!isNaN(num)) {
        // For whole numbers, remove decimal point and trailing zeros
        if (num % 1 === 0) {
            normalized = num.toString();
        } else {
            // For decimals, keep the number as is (removes leading zeros)
            normalized = num.toString();
        }
    }
    
    return normalized;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // Could show a completion message or loop back
        currentQuestionIndex = 0;
        renderQuestion();
    }
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped');
}

function renderMath() {
    // Render LaTeX using KaTeX
    // Wait for KaTeX to be available
    if (typeof renderMathInElement !== 'undefined') {
        const questionText = document.getElementById('question-text');
        const solutionText = document.getElementById('solution-text');
        
        const renderOptions = {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '\\[', right: '\\]', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false}
            ],
            throwOnError: false
        };
        
        if (questionText) {
            renderMathInElement(questionText, renderOptions);
        }
        
        if (solutionText) {
            renderMathInElement(solutionText, renderOptions);
        }
    } else {
        // Retry after a short delay if KaTeX isn't loaded yet
        setTimeout(renderMath, 100);
    }
}

