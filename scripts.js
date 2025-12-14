
function randomizeLiveStudents() {
    const minStudents = 28;
    const maxStudents = 35;

    const liveTexts = document.querySelectorAll('.live-text');

    liveTexts.forEach(el => {
        const randomStudents = Math.floor(Math.random() * (maxStudents - minStudents + 1)) + minStudents;
        el.textContent = `${randomStudents}+ students online`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    randomizeLiveStudents();

    setInterval(randomizeLiveStudents, Math.floor(Math.random() * 5000) + 5000);
});


// FAQ toggle
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});