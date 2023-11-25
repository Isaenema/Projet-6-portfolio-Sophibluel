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

    const existingFilters = [
      "Tous",
      "Objets",
      "Appartements",
      "Hotels & restaurants",
    ];

    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach((button, index) => {
      button.textContent = existingFilters[index];
      button.addEventListener("click", () => {
        const selectedFilter = existingFilters[index];
        afficherImages(selectedFilter);

        filterButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
      });
    });

    filterButtons[0].classList.add("selected");
  });

function afficherImages() {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = item.imageUrl;
        img.alt = item.title;
        figcaption.textContent = item.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);

        galleryContainer.appendChild(figure);
      });
    });
}

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

// Vérifie si l'utilisateur est co via localstorage

const isAuthenticated = localStorage.getItem("isAuthenticated");
const token = localStorage.getItem("token");

if (isAuthenticated === "true") {
  // User co text = logout
  loginStatusElement.textContent = "Logout";
  // Afficher l'icon et le p "Modifier" lorsque l'utilisateur est co
  editIcon.style.display = "inline"; // Afficher icon
  editText.style.display = "inline"; // Afficher modifier

  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach((button) => {
    button.style.display = "none";
  });

  // Afficher le bandeau "Mode création" lorsque l'utilisateur est co
  const bandeau = document.querySelector(".bandeau");
  bandeau.style.display = "flex";
} else {
  // Utilisateur pas co, met à jour le texte en "Login"
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

  const filterInput = document.getElementById("filter");
  filterInput.value = "";

  // Croix pour fermer le modal
  const closeButton = document.querySelector(".close");

  // Fermer le modal en cliquant sur la croix
  closeButton.addEventListener("click", closeModal);

  // Fonction pour fermer le modal
  function closeModal() {
    modal.style.display = "none"; // Masquer le modal
  }
  // Eventlistener for the "Ajouter une photo" button
  addPhotoButton.addEventListener("click", function () {
    closeExistingModal(); // ferme modal
    openAddPhotoModal(); // Open the "Ajouter une photo" modal
  });

  // ferme modal
  function closeExistingModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }

  function closeAddPhotoModal() {
    const addPhotoModal = document.getElementById("add-photo-modal");
    addPhotoModal.style.display = "none";
  }

  // Ouvbre modal
  function openAddPhotoModal() {
    const addPhotoModal = document.getElementById("add-photo-modal");
    addPhotoModal.style.display = "flex";
  }

  // ferme sur croix
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      closeExistingModal();
      closeAddPhotoModal();
    });
  });

  //////////////// DELET /////////////////////

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
        deleteIcon.addEventListener("click", function (event) {
          event.preventDefault();
          const imageId = item.id;
          deleteImage(imageId).then(() => {
            // Supprimer l'élément de l'image de la galerie
            imgContainer.remove();
            // Mettre à jour la liste des images affiché en excluant celle supprimée
            displayedImages = displayedImages.filter(
              (image) => image.id !== imageId
            );
            afficherImages();
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
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// // // // // // // VALIDATE BTN // // // // // // // //

const titleInput = document.getElementById("title");
const filterInput = document.getElementById("filter");
const imageInput = document.getElementById("image");
const submitButton = document.querySelector(
  "#add-photo-modal button[type='submit']"
);

// Gestionnaire d'événements pour mettre à jour le style du bouton
function updateSubmitButtonState() {
  // Vérifier si les champs requis sont remplis
  const isTitleEmpty = titleInput.value.trim() === "";
  const isImageSelected = imageInput.files.length > 0;
  const isFilterSelected = filterInput.value !== "";

  // Mettre à jour le style du bouton en fonction de l'état des champs :
  submitButton.disabled = isTitleEmpty || !isImageSelected || !isFilterSelected;
}

// Ajouter des gestionnaires d'événements
titleInput.addEventListener("input", updateSubmitButtonState);
filterInput.addEventListener("change", updateSubmitButtonState);
imageInput.addEventListener("change", updateSubmitButtonState);

// Appel fonction une fois pour mettre à jour l'état
updateSubmitButtonState();

// // // // // // APERCU IMG // // // // // //

// Récupération de l'élément d'aperçu de l'image
const imagePreview = document.getElementById("image-preview");

// Gestionnaire d'événements pour la sélection d'une image
imageInput.addEventListener("change", function () {
  const selectedImage = imageInput.files[0];

  // Vérifier s'il y a une image
  if (selectedImage) {
    // Créer un objet URL pour l'aperçu de l'image
    const imageUrl = URL.createObjectURL(selectedImage);

    // Afficher l'aperçu de l'image
    imagePreview.src = imageUrl;
    imagePreview.style.display = "block";
  } else {
    // Aucune image sélectionnée, masquer l'aperçu
    imagePreview.src = "";
    imagePreview.style.display = "none";
  }

  updateSubmitButtonState();
});
