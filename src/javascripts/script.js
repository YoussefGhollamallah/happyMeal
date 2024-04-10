import { fetchRecettes, getNomRecettes, getCategories, getIngredientsRecette } from "./fonctions.js";

fetchRecettes()
    .then(recettes => {
        
        const nomsRecettes = getNomRecettes(recettes);
        const titreRecette = document.createElement("h2")
        titreRecette.innerText = nomsRecettes[0] ?? "pas de titre pour le moment"
        
        const categorieRecettes = getCategories(recettes);
        const paracategorie = document.createElement("p")
        paracategorie.innerText = categorieRecettes[0]
        
        const ingredientsRecettes = getIngredientsRecette(recettes);
        // Afficher la liste d'ingrédients pour la première recette
        console.log("Ingrédients pour la première recette:");
        ingredientsRecettes[0].forEach(ingredient => {
        console.log(ingredient);
            
        const sections = document.getElementById("container-box")
        const article1 = document.createElement("article")
        sections.appendChild(article1)
        article1.appendChild(titreRecette)
        article1.appendChild(paracategorie)
        });
    })
    .catch(error => console.error(error))