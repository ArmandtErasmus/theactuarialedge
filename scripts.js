
// Update student count display
function updateStudentDisplay() {
    const liveTexts = document.querySelectorAll('.live-text');
    if (liveTexts.length === 0) return;
    
    const studentCount = localStorage.getItem('liveStudentCount') || '30';
    liveTexts.forEach(el => {
        el.textContent = `${studentCount} students online`;
    });
}

// Generate and store new random student count (changes by ±1 or ±2 from current)
function generateNewStudentCount() {
    const minStudents = 17;
    const maxStudents = 64;
    
    // Get current count
    const currentCount = parseInt(localStorage.getItem('liveStudentCount') || '30');
    
    // Reverse probabilities based on count: below 50 = 70% increase, above 50 = 70% decrease
    const probabilityThreshold = currentCount > 50 ? 0.3 : 0.7;
    const shouldIncrease = Math.random() < probabilityThreshold;
    
    // Randomly choose change amount: 1 or 2
    const changeAmount = Math.random() < 0.5 ? 1 : 2;
    
    // Calculate change direction
    let change = shouldIncrease ? changeAmount : -changeAmount;
    
    // If at boundaries, adjust
    if (currentCount >= maxStudents) {
        // At max, can only decrease
        change = -changeAmount;
    } else if (currentCount <= minStudents) {
        // At min, can only increase
        change = changeAmount;
    }
    
    // Calculate new count
    let newCount = currentCount + change;
    
    // Ensure it stays within bounds (safety check)
    if (newCount < minStudents) {
        newCount = minStudents;
    } else if (newCount > maxStudents) {
        newCount = maxStudents;
    }
    
    localStorage.setItem('liveStudentCount', newCount.toString());
    updateStudentDisplay();
}

// Initialize or load student count
function initializeLiveStudents() {
    const liveTexts = document.querySelectorAll('.live-text');
    if (liveTexts.length === 0) return;
    
    // Get stored count or initialize with a random value
    let studentCount = localStorage.getItem('liveStudentCount');
    
    if (!studentCount) {
        // First time - generate initial value
        const minStudents = 17;
        const maxStudents = 64;
        studentCount = Math.floor(Math.random() * (maxStudents - minStudents + 1)) + minStudents;
        localStorage.setItem('liveStudentCount', studentCount.toString());
    }
    
    // Display the stored value (maintains continuity across page navigations)
    updateStudentDisplay();
    
    // Set up interval to update every 5-10 seconds on all pages
    setInterval(() => {
        generateNewStudentCount();
    }, Math.floor(Math.random() * 5000) + 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLiveStudents();
});


// FAQ toggle
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});