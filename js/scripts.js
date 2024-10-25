function downloadResume() {
  const link = document.createElement('a');
  link.href = '../assets/AllisonOffer-Resume.pdf';
  link.download = 'AllisonOffer-Resume.pdf';
  link.click();
}