// Shared Practice Flashcard System
// This file works with any exam page that defines a 'questions' array
// If no questions are defined, it will show a message

// Flashcard State
let currentQuestionIndex = 0;
let isFlipped = false;
let answerSubmitted = false;
let isAnswerCorrect = false;

// Get exam code from page title or use default
function getExamCode() {
    const title = document.title;
    const match = title.match(/([A-Z0-9]+)\s*\|/);
    return match ? match[1] : 'EXAM';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if questions are defined
    if (typeof questions === 'undefined' || !questions || questions.length === 0) {
        showNoQuestionsMessage();
        return;
    }
    
    renderQuestion();
    setupEventListeners();
    renderMath(); // Initial render for any math in the first question
    
    // Update card height after initial render
    setTimeout(updateCardHeight, 200);
});

function showNoQuestionsMessage() {
    const questionTextEl = document.getElementById('question-text');
    const answerSectionEl = document.getElementById('answer-section');
    const cardActions = document.querySelector('.card-actions');
    
    if (questionTextEl) {
        questionTextEl.innerHTML = '<p style="text-align: center; color: #64748b; font-style: italic;">Practice questions for this exam are coming soon. Check back later!</p>';
    }
    
    if (answerSectionEl) {
        answerSectionEl.style.display = 'none';
    }
    
    if (cardActions) {
        cardActions.style.display = 'none';
    }
}

function setupEventListeners() {
    const flashcard = document.getElementById('flashcard');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const backToQuestionBtn = document.getElementById('back-to-question-btn');
    const nextAfterSolutionBtn = document.getElementById('next-after-solution-btn');

    if (submitAnswerBtn) {
        submitAnswerBtn.addEventListener('click', () => {
            checkAnswer();
            // Update height after feedback is shown
            setTimeout(updateCardHeight, 100);
        });
    }

    if (showSolutionBtn) {
        showSolutionBtn.addEventListener('click', () => {
            flipCard();
        });
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            nextQuestion();
        });
    }

    if (backToQuestionBtn) {
        backToQuestionBtn.addEventListener('click', () => {
            flipCard();
        });
    }

    if (nextAfterSolutionBtn) {
        nextAfterSolutionBtn.addEventListener('click', () => {
            nextQuestion();
        });
    }

    // Allow Enter key to submit answer
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isFlipped) {
            const answerInput = document.getElementById('answer-input');
            if (answerInput && document.activeElement === answerInput) {
                checkAnswer();
                setTimeout(updateCardHeight, 100);
            }
        }
    });
    
    // Update height on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCardHeight, 150);
    });
}

function renderQuestion() {
    if (!questions || questions.length === 0) {
        showNoQuestionsMessage();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    if (!question) return;

    // Reset state
    answerSubmitted = false;
    isAnswerCorrect = false;

    // Update question number
    const questionNumEl = document.getElementById('question-num');
    const currentProgressEl = document.getElementById('current-progress');
    const totalQuestionsEl = document.getElementById('total-questions');
    
    if (questionNumEl) questionNumEl.textContent = question.id;
    if (currentProgressEl) currentProgressEl.textContent = question.id;
    if (totalQuestionsEl) totalQuestionsEl.textContent = questions.length;

    // Hide feedback
    const feedbackEl = document.getElementById('answer-feedback');
    if (feedbackEl) {
        feedbackEl.style.display = 'none';
        feedbackEl.className = 'answer-feedback';
    }

    // Render question text
    const questionTextEl = document.getElementById('question-text');
    if (questionTextEl) {
        questionTextEl.innerHTML = `<p>${question.question}</p>`;
    }

    // Render answer section
    const answerSectionEl = document.getElementById('answer-section');
    if (answerSectionEl) {
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
                        if (feedbackEl) feedbackEl.style.display = 'none';
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
                        if (feedbackEl) feedbackEl.style.display = 'none';
                    }
                });
            }
        }
    }

    // Render solution
    const solutionTextEl = document.getElementById('solution-text');
    if (solutionTextEl) {
        solutionTextEl.innerHTML = `<p>${question.solution}</p>`;
    }

    // Reset card state
    if (isFlipped) {
        flipCard();
    }

    // Render math after a short delay to ensure DOM is ready
    setTimeout(() => {
        renderMath();
        // Update card height after math is rendered
        setTimeout(updateCardHeight, 100);
    }, 100);
}

function updateCardHeight() {
    const flashcard = document.getElementById('flashcard');
    const front = document.querySelector('.flashcard-front');
    const back = document.querySelector('.flashcard-back');
    
    if (!flashcard || !front || !back) return;
    
    // Temporarily remove absolute positioning to measure natural height
    const originalFrontPosition = front.style.position;
    const originalBackPosition = back.style.position;
    const originalFrontVisibility = front.style.visibility;
    const originalBackVisibility = back.style.visibility;
    const originalFrontOpacity = front.style.opacity;
    const originalBackOpacity = back.style.opacity;
    
    // Make both visible and positioned relatively to measure
    front.style.position = 'relative';
    back.style.position = 'relative';
    front.style.visibility = 'visible';
    back.style.visibility = 'visible';
    front.style.opacity = '1';
    back.style.opacity = '1';
    front.style.display = 'flex';
    back.style.display = 'flex';
    
    // Force a reflow
    void flashcard.offsetHeight;
    
    // Get the heights
    const frontHeight = front.scrollHeight;
    const backHeight = back.scrollHeight;
    
    // Restore original styles
    front.style.position = originalFrontPosition || 'absolute';
    back.style.position = originalBackPosition || 'absolute';
    front.style.visibility = originalFrontVisibility || '';
    back.style.visibility = originalBackVisibility || '';
    front.style.opacity = originalFrontOpacity || '';
    back.style.opacity = originalBackOpacity || '';
    
    // Set flashcard height to the taller of the two, with minimum
    const maxHeight = Math.max(frontHeight, backHeight, 500);
    flashcard.style.height = maxHeight + 'px';
}

function checkAnswer() {
    // Only prevent resubmission if answer was correct
    if (answerSubmitted && isAnswerCorrect) return;

    if (!questions || questions.length === 0) return;
    
    const question = questions[currentQuestionIndex];
    if (!question) return;

    let userAnswer = '';
    const feedbackEl = document.getElementById('answer-feedback');
    if (!feedbackEl) return;

    // Get user's answer
    if (question.questionType === 'multiple-choice') {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            feedbackEl.textContent = 'Please select an answer.';
            feedbackEl.className = 'answer-feedback feedback-error';
            feedbackEl.style.display = 'block';
            setTimeout(updateCardHeight, 50);
            return;
        }
        userAnswer = selectedOption.value.trim();
    } else {
        const answerInput = document.getElementById('answer-input');
        if (!answerInput || !answerInput.value.trim()) {
            feedbackEl.textContent = 'Please enter an answer.';
            feedbackEl.className = 'answer-feedback feedback-error';
            feedbackEl.style.display = 'block';
            setTimeout(updateCardHeight, 50);
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
    
    // Update card height after feedback is shown
    setTimeout(updateCardHeight, 100);
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
    if (!questions || questions.length === 0) return;
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // Loop back to first question
        currentQuestionIndex = 0;
        renderQuestion();
    }
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped');
        // Update height after flip animation
        setTimeout(updateCardHeight, 100);
    }
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
        
        // Update card height after math rendering
        setTimeout(updateCardHeight, 100);
    } else {
        // Retry after a short delay if KaTeX isn't loaded yet
        setTimeout(renderMath, 100);
    }
}

