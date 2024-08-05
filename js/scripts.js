function downloadResume() {
  const link = document.createElement('a');
  link.href = '/Main/assets/Resume_Allison_Offer.pdf';
  link.download = 'Allison_Offer_Resume.pdf';
  link.click();
}