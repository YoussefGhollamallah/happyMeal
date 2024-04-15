// créer un élément par l'ID 'searchInput' 
const searchInput = document.getElementById('searchInput');

// on prend la fonction search input et on dit que quand on appuie sur une touche 
// cela va exécuter la fonction input qui va permettre d'afficher la touche cliquée sur la console
searchInput.addEventListener('keyup', function() {
    const input = searchInput.value.toLowerCase(); // Convertir l'entrée en minuscules pour une recherche insensible à la casse

    fetch('./src/datas/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('La requête a échoué.');
        }
        return response.json();
    })
    .then(data => {
        // Filtrer les recettes dont le nom contient l'entrée de recherche
        const filteredRecipes = data.recettes.filter(recipe => recipe.nom.toLowerCase().includes(input));
        let suggestion = '';

        if (input != ''){
        // Construire les suggestions HTML
        filteredRecipes.forEach(recipe => {
            suggestion += `
                <div class="suggestion">${recipe.nom}</div>
            `;
        });
        }
        // Ajouter les suggestions à l'élément HTML avec l'ID 'suggestion'
        document.getElementById('suggestion').innerHTML = suggestion;
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la récupération des données :', error);
    });
});
