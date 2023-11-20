const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupérer valeurs titre filtre
  const title = document.getElementById("title").value;
  const filter = document.getElementById("filter").value;
  const image = document.getElementById("image").files[0];

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
  formData.append("category", filter);
  formData.append("image", image);

  // Fetch pour envoyer les données à l'API avec token
  console.log(token);
  let response = fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
  if (response.status === 200 || response.status === 201) {
    alert("ok");
  } else {
    alert("pas ok");
  }
});
