const contentful = require('contentful');

const client = contentful.createClient({
  space: '6guyy4twbtlm', // Remplacez par l'ID de votre espace
  accessToken: '51TzbP5qqsSgT35BNU3g3SM5KB1jkN8rFJhMQTtK7QM', // Remplacez par votre token d'accès
});

module.exports = client;
