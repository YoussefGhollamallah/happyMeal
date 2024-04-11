import { fetchRecettes, getNomRecettes, getCategories, getTempsRecettes, getIngredientsRecette, getEtapesRecette } from "./fonctions.js";

const recettesParPage = 9;
let pageActuelle = 1;

const container = document.getElementById("container-box");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

fetchRecettes()
    .then(recettes => {
        const totalPages = Math.ceil(recettes.length / recettesParPage);

        prevButton.addEventListener("click", () => {
            if (pageActuelle > 1) {
                pageActuelle--;
                afficherRecettes(recettes, container, pageActuelle);
            }
        });

        nextButton.addEventListener("click", () => {
            if (pageActuelle < totalPages) {
                pageActuelle++;
                afficherRecettes(recettes, container, pageActuelle);
            }
        });

        recettes.forEach(recette => {
            recette.favori = false;
        })

        afficherRecettes(recettes, container, pageActuelle);
    })
    .catch(error => console.error(error));


function toggleFavori(recette, boutonFavori) {
    recette.favori = !recette.favori;

    afficherRecettes(recette, container, pageActuelle)
    if (recette.favori) {
        boutonFavori.classList.add("favori");
    } else {
        boutonFavori.classList.remove("favori");
    }
}


function afficherRecettes(recettes, container, page) {
    container.innerHTML = "";
    const startIndex = (page - 1) * recettesParPage;
    const endIndex = startIndex + recettesParPage;
    const recettesAffichees = recettes.slice(startIndex, endIndex);

    recettesAffichees.forEach(recette => {

        const boutonFavori = document.createElement("button");
        boutonFavori.innerText = recette.favori ? "Retirer des favoris" : "Ajouter aux favoris";
        
        boutonFavori.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavori(recette, event.target);
            return false;
        });

        if (recette.favori) {
            boutonFavori.classList.add("favori");
        }

        const titreRecette = document.createElement("h2");
        titreRecette.innerText = recette.nom ?? "pas de titre pour le moment";

        const paracategorie = document.createElement("p");
        paracategorie.innerText = recette.categorie ?? "pas de catégorie pour le moment";

        const paraTemps = document.createElement("p");
        paraTemps.innerText = recette.temps_preparation ?? "temps de préparation non spécifié";

    

        const listeIngredients = document.createElement("ul");
        recette.ingredients.forEach(ingredient => {
            const listItem = document.createElement("li");
            listItem.innerText = `${ingredient.nom}: ${ingredient.quantite}`;
            listeIngredients.appendChild(listItem);
        });

        const listeEtapes = document.createElement("ol");
        recette.etapes.forEach((etape, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = `${index + 1}. ${etape}`;
            listeEtapes.appendChild(listItem);
        });

        const article = document.createElement("article");
        article.appendChild(titreRecette);
        article.appendChild(boutonFavori)
        article.appendChild(paracategorie);
        article.appendChild(paraTemps);
        article.appendChild(listeIngredients);
        article.appendChild(listeEtapes);
        container.appendChild(article);
    });

    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
}
