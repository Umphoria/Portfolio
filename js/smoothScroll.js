let scrollPosition = window.pageYOffset; // Position de défilement actuelle
let velocity = 0; // Vitesse initiale du défilement
let isInertiaActive = false; // Pour savoir si l'inertie est en cours

// Fonction pour déclencher un défilement fluide avec inertie
function smoothScrollWithInertia(deltaY) {
  // Applique immédiatement le mouvement sans accumulation de vélocité pour éviter le délai
  scrollPosition += deltaY;  // Mouvement immédiat

  // Ajoute la vélocité pour l'inertie, mais plus contrôlée
  velocity += deltaY * 1;  // Ajuste la vélocité pour l'inertie

  // Assurer que le défilement ne dépasse pas les limites de la page
  scrollPosition = Math.max(0, Math.min(scrollPosition, document.body.scrollHeight - window.innerHeight));

  // Appliquer immédiatement la nouvelle position
  window.scrollTo({
    top: scrollPosition,
    behavior: 'auto'  // Défilement sans délai
  });

}

// Fonction pour gérer l'inertie et la décélération
function inertiaScroll() {
  // Décélérer progressivement
  velocity *= 0.45;

  // Ajouter la vélocité à la position
  scrollPosition += velocity;

  // Limiter le défilement pour ne pas dépasser les bornes
  scrollPosition = Math.max(0, Math.min(scrollPosition, document.body.scrollHeight - window.innerHeight));

  // Appliquer le défilement avec la nouvelle position
  window.scrollTo({
    top: scrollPosition,
    behavior: 'auto'  // Défilement sans délai
  });

  // Continuer l'inertie tant que la vélocité est significative
  if (Math.abs(velocity) > 0.5) {
    requestAnimationFrame(inertiaScroll);
  } else {
    isInertiaActive = false; // Arrêter l'inertie
  }
}

// Écouteur d'événements pour la molette
window.addEventListener('wheel', (e) => {
  e.preventDefault();  // Empêche le défilement natif
  const deltaY = e.deltaY;  // Récupère la direction et la quantité de défilement

  // Activer le défilement fluide avec inertie
  smoothScrollWithInertia(deltaY);
}, { passive: false });
