// Remplacer require par l'objet global contentful fourni par le CDN
const client = contentful.createClient({
  space: '6guyy4twbtlm',        // Remplacez par votre Space ID
  accessToken: '51TzbP5qqsSgT35BNU3g3SM5KB1jkN8rFJhMQTtK7QM'  // Remplacez par votre Access Token
});

async function getProjects() {
  try {
    const response = await client.getEntries({ content_type: 'project' }); // Utilisez 'project' comme content_type
    return response.items;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
  }
}

getProjects().then((projects) => {
  const projectsContainer = document.getElementById('projects-container');
  
  projects.forEach((project, index) => {
    const isLarge = index % 3 === 0;  // Chaque troisième projet est "grand"
    
    const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';  // Occupe 2 colonnes si grand
    const rowSpan = isLarge ? 'row-span-2' : 'row-span-1';  // Occupe 2 lignes si grand

    const projectHtml = `
      <div class="relative ${colSpan} ${rowSpan}">
        <img alt="${project.fields.titre}" class="w-full h-full object-cover" src="https:${project.fields.image.fields.file.url}" />
        <div class="overlay">
          <!-- Ajout de la classe glitch au titre -->
          <div class="text-2xl font-bold glitch" data-text="${project.fields.titre}">${project.fields.titre}</div>
        </div>
      </div>
    `;
    projectsContainer.innerHTML += projectHtml;
  });

  // Appeler la fonction glitch après que les projets ont été insérés
  applyGlitchEffect();  // Appel à la fonction définie dans glitchEffect.js
});

// Sélectionner le lien "About Me" et le conteneur du bloc de présentation
const aboutMeButton = document.querySelector('.nav-button[href="#about"]');
const aboutMeContainer = document.getElementById('about-me-container');
const closeButton = document.getElementById('close-about');

// Ajouter un écouteur d'événements pour détecter le clic sur le lien "About Me"
aboutMeButton.addEventListener('click', (e) => {
  e.preventDefault(); // Empêcher le comportement par défaut du lien
  aboutMeContainer.classList.add('active'); // Ajouter la classe "active" pour afficher le bloc
});

// Ajouter un écouteur d'événements pour détecter le clic sur le bouton de fermeture
closeButton.addEventListener('click', () => {
  aboutMeContainer.classList.remove('active'); // Enlever la classe "active" pour cacher le bloc
});


// Sélectionner le header
const header = document.getElementById('main-header');

// Ajouter un événement lors du scroll
window.addEventListener('scroll', () => {
  // Si on a fait défiler de plus de 50px, ajouter la classe 'scrolled'
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
