// popups
const popups = document.querySelectorAll('.popup');

const popupElementEdit = document.querySelector('.popup_edit_form');
const popupElementAdd = document.querySelector('.popup_add_form');
const popupElementZoomImage = document.querySelector('.popup_image');


// popups open button
const popupEditOpenButton = document.querySelector('.info__edit-button');
const popupAddOpenButton = document.querySelector('.info__add-button');


// popups close button
const popupEditCloseButton = popupElementEdit.querySelector('.popup__close');
const popupAddCloseButton = popupElementAdd.querySelector('.popup__close');
const popupImageCloseButton = popupElementZoomImage.querySelector('.popup__close');

// popup data
const popupImage = document.querySelector('.popup__place-image');
const popupImageDescr = document.querySelector('.popup__place-descr');

// popup forms and inputs
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const nameEditInput = popupElementEdit.querySelector('.popup__input_field_name');
const postEditInput = popupElementEdit.querySelector('.popup__input_field_post');
const namePlaceInput = popupElementAdd.querySelector('.popup__input_field_place-name');
const linkPlaceInput = popupElementAdd.querySelector('.popup__input_field_place-link');


// info profile data
const nameProfile = document.querySelector('.info__profile-name');
const postProfile = document.querySelector('.info__profile-post');

// template for cards and wrapper cards
const cardPlaceTemplate = document.querySelector('#card-place').content.querySelector('.card-place');
const cardElemGridContainer = document.querySelector('.elements__grid-container');


function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByKey);

  closePopupByOverlay(popup);

}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByKey);


}

function closePopupByOverlay(popup) {

  popup.addEventListener('click', (e) => {

    if (e.currentTarget == e.target) {

      closePopup(popup);
    }

  });

}

function closePopupByKey(e) {


  if (e.key === 'Escape') {

    const openPopup = document.querySelector('.popup_opened');

    closePopup(openPopup);

  };
}

function fillEditPopupInputsFromPage() {

  nameEditInput.value = nameProfile.textContent;
  postEditInput.value = postProfile.textContent;

}

function formAboutUserSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameEditInput.value;
  postProfile.textContent = postEditInput.value;

  closePopup(popupElementEdit);

}

function formNewPlaceSubmitHandler(evt) {

  evt.preventDefault();

  renderCard({name: namePlaceInput.value, link: linkPlaceInput.value}, cardElemGridContainer);

  formElementAdd.reset();


  closePopup(popupElementAdd);

  const buttonSubmitNewPlace = evt.target.querySelector('.popup__button-form');

  disableSubmitButton(buttonSubmitNewPlace, 'popup__button-form_inactive');

}

formElementEdit.addEventListener('submit', formAboutUserSubmitHandler);
formElementAdd.addEventListener('submit', formNewPlaceSubmitHandler);
popupAddOpenButton.addEventListener('click', () => openPopup(popupElementAdd));
popupAddCloseButton.addEventListener('click', () => closePopup(popupElementAdd));
popupEditOpenButton.addEventListener('click', () => {
  openPopup(popupElementEdit);
  fillEditPopupInputsFromPage();
});
popupEditCloseButton.addEventListener('click', () => closePopup(popupElementEdit));
popupImageCloseButton.addEventListener('click', () => closePopup(popupElementZoomImage));



//Шесть карточек из коробки
function displayCards(arr) {
  arr.forEach((item) => {
    renderCard(item, cardElemGridContainer);
  });

}

function createCard(cardData) {

    const cardElement = cardPlaceTemplate.cloneNode(true);

    const cardElemImage = cardElement.querySelector('.card-place__img');

    cardElemImage.src = cardData.link;

    cardElemImage.alt = `Изображение ${cardData.name}`;

    cardElement.querySelector('.card-place__name').textContent = cardData.name;

    cardElement.querySelector('.card-place__like').addEventListener('click', likeCard);

    cardElement.querySelector('.card-place__delete').addEventListener('click', deleteCard);

    cardElemImage.addEventListener('click', openPopupImage);

    return cardElement;
}

function renderCard(cardData, cardsContainer) {
  const cardElement = createCard(cardData);

  cardsContainer.prepend(cardElement);
}

displayCards(initialCards);


function likeCard(evt) {
  const target = evt.target;

  target.classList.toggle('card-place__like_active');
}

function openPopupImage(evt) {
  const target = evt.target;
  popupImage.src = target.src;
  popupImage.alt = target.alt;

  popupImageDescr.textContent = target.nextElementSibling.nextElementSibling.textContent;
  openPopup(popupElementZoomImage);
}


function deleteCard(evt) {
  const target = evt.target;
  target.closest('.card-place').remove();
}
