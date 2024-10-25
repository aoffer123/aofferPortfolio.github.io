document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('downloadResumeBtn').addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = '../assets/Allison-Offer-RevResume.pdf';  // Update with the correct path to your resume file
        link.download = 'AllisonOfferResume.pdf';  // Update with the desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});