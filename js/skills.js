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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloadResumeBtn').addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'assets/AllisonOfferResume.pdf';  // Update with the correct path to your resume file
        link.download = 'AllisonOffer_Resume.pdf';  // Update with the desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
