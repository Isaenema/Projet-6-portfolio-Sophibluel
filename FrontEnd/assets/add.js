const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupérer valeurs titre filtre
  const title = document.getElementById("title").value;
  const filter = document.getElementById("filter");

  const image = document.getElementById("image").files[0];

  const existingFilters = ["Objets", "Appartements", "Hotels & restaurants"];

  // Vérifier si les champs "Titre" et "Filtre" sont vides
  if (title.trim() === "") {
    // Afficher une erreur
    alert("Veuillez remplir le champ Titre.");
    return; // erreur si champ pas rempli
  }

  const categoryId = await getCategoryID(filter.value);

  // FormData pour envoyer les données et l'image à l'API
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", categoryId);
  formData.append("image", image);

  // Fetch pour envoyer les données à l'API avec token

  let response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
  afficherImages();
});
async function getCategoryID(categoryId) {
  try {
    let response = await fetch(
      `http://localhost:5678/api/categories?name=${categoryId}`
    );
    let data = await response.json();

    if (data.length > 0) {
      // Renvoyer l'ID de la première catégorie trouvée
      return data[0].id;
    } else {
      console.error("Catégorie non trouvée");
      return null;
    }
  } catch (error) {
    console.error("Erreur de récupération d'ID :", error);
    return null;
  }
}
