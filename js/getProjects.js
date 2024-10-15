const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE, // Utilise les variables d'environnement
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

exports.handler = async function () {
  try {
    const response = await client.getEntries({ content_type: 'project' });
    return {
      statusCode: 200,
      body: JSON.stringify(response.items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de la récupération des projets' }),
    };
  }
};
