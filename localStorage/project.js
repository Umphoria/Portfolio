// Liste de projets
const projects = [
    {
        title: "Projet 1",
        image: "https://via.placeholder.com/600x400",
        logo: "ton-logo.png",
        description: "Description du projet 1"
    },
    {
        title: "Projet 2",
        image: "https://via.placeholder.com/600x400",
        logo: "ton-logo.png",
        description: "Description du projet 2"
    },
    {
        title: "Projet 3",
        image: "https://via.placeholder.com/600x400",
        logo: "ton-logo.png",
        description: "Description du projet 3"
    }
];

// Fonction pour charger dynamiquement les projets
function loadProjects() {
    const projectContainer = document.getElementById('projects');

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('relative');

        projectDiv.innerHTML = `
            <img alt="${project.title}" class="w-full h-full object-cover" src="${project.image}" />
            <div class="logo" style="background-image: url('${project.logo}');"></div>
            <div class="overlay">
                <div class="text-4xl font-bold">${project.title}</div>
            </div>
        `;

        projectContainer.appendChild(projectDiv);
    });
}

// Charger les projets après le chargement de la page
window.onload = loadProjects;
