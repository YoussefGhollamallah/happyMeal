export async function fetchRecettes() {
    try {
        const reponse = await fetch("./src/datas/data.json")
        const data = await reponse.json()
        return data.recettes;
    } catch (error) {
        console.log("Erreur lor de la récupération des données: ", error)
    }
}


export function getNomRecettes(recettes) {
    return recettes.map(recette => recette.nom)
}

export function getCategories(recettes) {
    return recettes.map(recette => recette.categorie )
}

export function getTempsRecettes(recettes) {
    return recettes.map(recette => recette.temp_preparation )
}

export function getIngredientsRecette(recettes) {
    return recettes.map(recette => {
        return recette.ingredients.map(ingredient => `${ingredient.nom}: ${ingredient.quantite}`);
    });
}
