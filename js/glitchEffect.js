// Fonction pour créer l'effet de glitch
function glitchTextEffect(element, originalText, glitchDuration = 500) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let glitchInterval;
  
    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        let glitchText = '';
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() > 0.5) {
            glitchText += characters.charAt(Math.floor(Math.random() * characters.length));
          } else {
            glitchText += originalText[i];
          }
        }
        element.innerText = glitchText;
      }, 30);
    };
  
    const stopGlitch = () => {
      clearInterval(glitchInterval);
      element.innerText = originalText;
    };
  
    startGlitch();
    setTimeout(stopGlitch, glitchDuration);
  }
  
  // Fonction pour appliquer l'effet de glitch à tous les éléments avec la classe "glitch"
  function applyGlitchEffect() {
    document.querySelectorAll('.glitch').forEach((glitchElement) => {
      const originalText = glitchElement.getAttribute('data-text');
  
      glitchElement.closest('.relative').addEventListener('mouseenter', () => {
        glitchTextEffect(glitchElement, originalText);
      });
    });
  }
  