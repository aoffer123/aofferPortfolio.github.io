window.addEventListener('scroll', function() {
    const skillsSection = document.querySelector('.skills-section');
    const progressBars = document.querySelectorAll('.progress-bar');
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    console.log('Scroll event triggered');  // Debug log

    if (sectionPosition < screenPosition) {
        console.log('Skills section in view');  // Debug log
        progressBars.forEach(bar => {
            const maxWidth = bar.getAttribute('data-progress');
            console.log(`Filling progress bar to ${maxWidth}`);  // Debug log
            bar.style.width = maxWidth;
        });
    }
});



window.addEventListener('scroll', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const triggerBottom = window.innerHeight / 5 * 4;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if(itemTop < triggerBottom) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
});
