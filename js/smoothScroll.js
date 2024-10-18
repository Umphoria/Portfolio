let scrollPosition = window.pageYOffset;
let velocity = 0;
let isInertiaActive = false;

// Fonction pour déclencher un défilement fluide avec inertie
function smoothScrollWithInertia(deltaY) {
  // Réduire l'impact du deltaY pour un contrôle plus précis du défilement
  const adjustedDeltaY = deltaY * 0.1; // Diminue l'effet initial du mouvement
  scrollPosition += adjustedDeltaY;
  velocity += adjustedDeltaY * 0.2; // Ajuste la vélocité pour l'inertie (moins amplifiée)

  // Assurer que le défilement ne dépasse pas les limites de la page
  scrollPosition = Math.max(0, Math.min(scrollPosition, document.body.scrollHeight - window.innerHeight));

  // Appliquer la nouvelle position avec un comportement de défilement instantané
  window.scrollTo({
    top: scrollPosition,
    behavior: 'auto'
  });

  // Démarrer l'inertie si elle n'est pas déjà active
  if (!isInertiaActive) {
    isInertiaActive = true;
    requestAnimationFrame(inertiaScroll);
  }
}

// Fonction pour gérer l'inertie et la décélération
function inertiaScroll() {
  // Décélération progressive
  velocity *= 0.9;

  // Ajouter la vélocité à la position de défilement
  scrollPosition += velocity;

  // Limiter le défilement pour rester dans les bornes de la page
  scrollPosition = Math.max(0, Math.min(scrollPosition, document.body.scrollHeight - window.innerHeight));

  // Appliquer le défilement avec la nouvelle position
  window.scrollTo({
    top: scrollPosition,
    behavior: 'auto'
  });

  // Continuer l'inertie tant que la vélocité est significative
  if (Math.abs(velocity) > 0.1) {
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
