window.onload = function() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    const projectContainer = document.getElementById('projects');
    
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('relative');

        projectDiv.innerHTML = `
            <img alt="${project.title}" class="w-full h-full object-cover" src="${project.image}" />
            <div class="logo" style="background-image: url('${project.logo}');"></div>
            <div class="overlay">
                <div class="text-4xl font-bold">${project.title}</div>
                <p>${project.description}</p>
            </div>
        `;

        projectContainer.appendChild(projectDiv);
    });
}
