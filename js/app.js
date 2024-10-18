// Création du client Contentful avec les identifiants
const client = contentful.createClient({
  space: '6guyy4twbtlm',        // Remplacez par votre Space ID
  accessToken: '51TzbP5qqsSgT35BNU3g3SM5KB1jkN8rFJhMQTtK7QM'  // Remplacez par votre Access Token
});

// Récupération des projets depuis Contentful
async function getProjects() {
  try {
    const response = await client.getEntries({ content_type: 'project' }); // Utilisez 'project' comme content_type
    return response.items;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
  }
}

// Injection des projets dans le conteneur HTML
getProjects().then((projects) => {
  const projectsContainer = document.getElementById('projects-container');
  
  projects.forEach((project, index) => {
    const isLarge = index % 3 === 0;  // Chaque troisième projet est "grand"
    
    const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';  // Occupe 2 colonnes si grand
    const rowSpan = isLarge ? 'row-span-2' : 'row-span-1';  // Occupe 2 lignes si grand

    const projectHtml = `
      <div class="relative ${colSpan} ${rowSpan} project-item">
        <img alt="${project.fields.titre}" class="w-full h-full object-cover" src="https:${project.fields.image.fields.file.url}" />
        <div class="overlay">
          <div class="text-2xl font-bold glitch" data-text="${project.fields.titre}">${project.fields.titre}</div>
        </div>
      </div>
    `;
    projectsContainer.innerHTML += projectHtml;
  });

  // Appeler la fonction glitch après que les projets ont été insérés
  applyGlitchEffect();  // Appel à la fonction définie dans glitchEffect.js

  // Sélectionner tous les éléments de projet ajoutés dynamiquement
  const projectItems = document.querySelectorAll('.project-item');

  // Utiliser IntersectionObserver pour ajouter l'effet de révélation
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal'); // Ajouter la classe reveal lorsqu'il entre dans la vue
        observer.unobserve(entry.target); // Arrêter d'observer cet élément après révélation
      }
    });
  }, { threshold: 0.1 }); // Seuil de 10% pour déclencher l'animation

  // Observer chaque projet
  projectItems.forEach((item) => {
    observer.observe(item);
  });
});

// Sélectionner le lien "About Me" et le conteneur du bloc de présentation
const aboutMeButton = document.querySelector('.nav-button[href="#about"]');
const aboutMeContainer = document.getElementById('about-me-container');

// Ajouter un écouteur d'événements pour détecter le clic sur le lien "About Me"
aboutMeButton.addEventListener('click', (e) => {
  e.preventDefault(); // Empêcher le comportement par défaut du lien

  // Vérifier si le bloc est déjà actif
  if (aboutMeContainer.classList.contains('active')) {
    // Si oui, le cacher et restaurer le texte du bouton
    aboutMeContainer.classList.remove('active');
    aboutMeButton.textContent = 'About Me';
  } else {
    // Sinon, l'afficher et changer le texte du bouton
    aboutMeContainer.classList.add('active');
    aboutMeButton.textContent = 'Close About Me';
  }
});

// Sélectionner le header
const header = document.getElementById('main-header');

// Ajouter un événement lors du scroll pour gérer le dégradé du header
window.addEventListener('scroll', () => {
  // Si on a fait défiler de plus de 50px, ajouter la classe 'scrolled'
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Placer ici la partie JavaScript du menu hamburger
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionner le bouton hamburger et le menu mobile
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  // Vérifier si les éléments sont bien trouvés
  if (hamburgerMenu && mobileMenu) {
    // Ajouter un écouteur d'événements pour ouvrir/fermer le menu mobile
    hamburgerMenu.addEventListener('click', () => {
      console.log("Bouton hamburger cliqué."); // Débogage pour vérifier l'événement
      mobileMenu.classList.toggle('active'); // Basculer la classe 'active'
    });

    // Ajouter un écouteur d'événements sur chaque bouton du menu mobile pour fermer après clic
    const navButtons = document.querySelectorAll('.mobile-nav-button');
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log("Bouton de navigation mobile cliqué."); // Débogage
        mobileMenu.classList.remove('active'); // Fermer le menu après un clic
      });
    });
  } else {
    console.error("Erreur : le bouton hamburger ou le menu mobile n'a pas été trouvé dans le DOM.");
  }

  // Vidéo en arrière-plan (IntersectionObserver)
  const videoContainer = document.querySelector('.video-background');
  const video = document.querySelector('.hero-video');

  if (videoContainer && video) {
    // IntersectionObserver pour l'effet fade-in
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoContainer.classList.add('reveal');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(videoContainer);

    // Ajuster le scale et l'opacité de la vidéo au scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;

      // Ajuster le scale en fonction de la position de défilement
      const scaleValue = 1 + scrollPosition * 0.001; // Augmente légèrement avec le scroll
      video.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;

      // Ajuster l'opacité pour créer un effet de fondu
      const opacityValue = Math.max(1 - scrollPosition / 800, 0); // Diminue avec le scroll
      video.style.opacity = opacityValue;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('.border-animation2');
    const rect = svg.querySelector('.rect-border2');

    const updateRectSize = () => {
        const { width, height } = svg.getBoundingClientRect();
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        
        const perimeter = 2 * (width + height);
        rect.style.strokeDasharray = perimeter;
        rect.style.strokeDashoffset = perimeter;

        // Ajuste également la taille du fill-rect pour qu'il couvre toute la zone
        const fillRect = svg.querySelector('.fill-rect2');
        fillRect.setAttribute('width', width);
        fillRect.setAttribute('height', height);
    };

    updateRectSize();

    window.addEventListener('resize', updateRectSize);

    const textContainer = document.querySelector('.text-container2');
    textContainer.addEventListener('mouseenter', () => {
        setTimeout(() => {
            updateRectSize();
            rect.style.strokeDashoffset = '0';
        }, 300);
    });

    textContainer.addEventListener('mouseleave', () => {
        const { width, height } = svg.getBoundingClientRect();
        const perimeter = 2 * (width + height);
        rect.style.strokeDashoffset = perimeter;
        updateRectSize();
    });
});
