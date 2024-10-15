const client = require('./contentful.config.js');

// Fonction pour récupérer les projets depuis Contentful
client.getEntries({ content_type: 'projet' })  // 'projet' est le modèle de contenu que vous avez créé dans Contentful
  .then((response) => {
    console.log(response.items); // Affiche les projets récupérés dans la console
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des projets :', error);
  });
