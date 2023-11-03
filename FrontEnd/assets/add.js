const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupérer valeurs titre filtre
  const title = document.getElementById("title").value;
  const filter = document.getElementById("filter").value;
  const image = document.getElementById("image").files[0];

  console.log("Filtre choisi : " + filter);

  const existingFilters = ["Objets", "Appartements", "Hotels & restaurants"];

  // Vérifier si les champs "Titre" et "Filtre" sont vides
  if (title.trim() === "") {
    // Afficher une erreur
    alert("Veuillez remplir le champ Titre.");
    return; // erreur si champ pas rempli
  }

  // FormData pour envoyer les données et l'image à l'API
  const formData = new FormData();
  formData.append("title", title);
  formData.append("filter", filter);
  formData.append("image", image);

  // Fetch pour envoyer les données à l'API avec token
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //   displayedImages.push(data);

      // Réinitialisation du formulaire et fermeture du modal
      uploadForm.reset();
    })
    .catch((error) => {
      console.error("Erreur lors du téléversement de l'image : " + error);
    });
});
