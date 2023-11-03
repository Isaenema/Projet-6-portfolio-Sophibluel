document.addEventListener("DOMContentLoaded", function () {
  // Récupération des données depuis l'API et affichage des images
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      function afficherImages(filtre) {
        const galleryContainer = document.querySelector(".gallery");
        galleryContainer.innerHTML = "";

        data.forEach((item) => {
          if (filtre === "Tous" || item.category.name === filtre) {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");

            img.src = item.imageUrl;
            img.alt = item.title;
            figcaption.textContent = item.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            galleryContainer.appendChild(figure);
          }
        });
      }

      afficherImages("Tous");

      const filters = [
        "Tous",
        "Objets",
        "Appartements",
        "Hotels & restaurants",
      ];
      const filterButtons = document.querySelectorAll(".filter-button");

      filterButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const selectedFilter = filters[index];
          afficherImages(selectedFilter);

          filterButtons.forEach((btn) => btn.classList.remove("selected"));
          button.classList.add("selected");
        });
      });
    });

  // Gestionnaire d'événements logout & edit
  const logoutButton = document.getElementById("login-status");
  const editIcon = document.querySelector("#edit-icon");
  const editText = document.querySelector("#edit-text");

  logoutButton.addEventListener("click", function () {
    // Supprimer l'état de connexion du stockage local
    localStorage.removeItem("isAuthenticated");
    // Réinitialiser l'affichage login
    logoutButton.textContent = "Login";

    // Masquer modifier
    editIcon.style.display = "none";
    editText.style.display = "none";
  });

  const loginStatusElement = document.getElementById("login-status");

  // Vérifie si l'utilisateur est connecté via localstorage

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated === "true") {
    // User co text = logout
    loginStatusElement.textContent = "Logout";
    // Afficher l'icône et le paragraphe "Modifier" lorsque l'utilisateur est connecté
    editIcon.style.display = "inline"; // Afficher icon
    editText.style.display = "inline"; // Afficher modifier

    // Afficher le bandeau "Mode création" lorsque l'utilisateur est connecté
    const bandeau = document.querySelector(".bandeau");
    bandeau.style.display = "flex";
  } else {
    // Utilisateur pas connecté, met à jour le texte en "Login"
    loginStatusElement.textContent = "Login";
    // Masquer l'icon quand logout
    editIcon.style.display = "none"; // Masquer icon
    editText.style.display = "none"; // Masquer modifier

    // Masquer le bandeau "Mode création" quand loguot
    const bandeau = document.querySelector(".bandeau");
    bandeau.style.display = "none";
  }

  // Evenlistener pour l'ouverture du modal
  const modal = document.getElementById("myModal");
  const imageGallery = document.querySelector(".image-gallery");
  const addPhotoButton = document.getElementById("add-photo-button");

  // Eventlistener pour l'icon et texte "Modifier"
  editIcon.addEventListener("click", function () {
    openModal();
  });

  editText.addEventListener("click", function () {
    openModal();
  });

  function openModal() {
    // Ouvrir le modal
    modal.style.display = "flex";

    // Croix pour fermer le modal
    const closeButton = document.querySelector(".close");

    // Fermer le modal en cliquant sur la croix
    closeButton.addEventListener("click", closeModal);

    // Fonction pour fermer le modal
    function closeModal() {
      modal.style.display = "none"; // Masquer le modal
    }

    // Charger les photos depuis l'API
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        // Effacer le contenu précédent de la galerie
        imageGallery.innerHTML = "";

        // Ajouter chaque photo à la galerie avec icon poubelle
        displayedImages = data.slice(); // Copier la liste d'images depuis l'API

        displayedImages.forEach((item) => {
          const imgContainer = document.createElement("div");
          imgContainer.classList.add("image-container");

          const img = document.createElement("img");
          img.src = item.imageUrl;
          img.alt = item.title;
          imgContainer.appendChild(img);

          const deleteIcon = document.createElement("i");
          deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
          deleteIcon.addEventListener("click", function () {
            // Appeler l'API Swagger pour supprimer l'image
            const imageId = item.id;
            deleteImage(imageId).then(() => {
              // Supprimer l'élément de l'image de la galerie
              imgContainer.remove();
              // Mettre à jour la liste des images affiché en excluant celle supprimée
              displayedImages = displayedImages.filter(
                (image) => image.id !== imageId
              );
            });
          });

          imgContainer.appendChild(deleteIcon);
          imageGallery.appendChild(imgContainer);
        });
      });
  }

  // Gestionnaire d'événement pour le bouton "Ajouter une photo"
  addPhotoButton.addEventListener("click", function () {});

  // Fonction pour appeler l'API Swagger pour supprimer une image
  function deleteImage(imageId) {
    return fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
    });
  }
});
