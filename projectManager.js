document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const logo = document.getElementById('logo').value;

    // Charger les projets existants du localStorage (ou du fichier JSON)
    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    // Ajouter le nouveau projet
    const newProject = { title, description, image, logo };
    projects.push(newProject);

    // Sauvegarder les projets mis à jour dans le localStorage (ou dans un fichier JSON)
    localStorage.setItem('projects', JSON.stringify(projects));

    // Afficher un message de succès
    document.getElementById('successMessage').classList.remove('hidden');
    document.getElementById('projectForm').reset(); // Réinitialiser le formulaire
});
