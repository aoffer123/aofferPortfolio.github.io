function downloadResume() {
  const link = document.createElement('a');
  link.href = '../assets/Allison-Offer-RevResume.pdf';
  link.download = 'Allison-Offer-RevResume.pdf';
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link); // Clean up
}