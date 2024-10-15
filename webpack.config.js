const path = require('path');

module.exports = {
  entry: './js/app.js',  // Point d'entrée
  output: {
    filename: 'bundle.js',  // Fichier de sortie
    path: path.resolve(__dirname, 'dist'),  // Dossier de sortie
  },
  mode: 'development'
};
