function downloadResume() {
  const link = document.createElement('a');
  link.href = '/Main/assets/ResumeAllisonOffer.pdf';
  link.download = 'Allison_Offer_Resume.pdf';
  link.click();
}