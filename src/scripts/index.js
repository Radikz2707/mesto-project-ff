'use strict';

import '../styles/index.css'; // добавьте импорт главного файла стилей
import {
	initialCards,
	createCard,
	removeCard,
	likeButtonClick,
} from '../components/cards';
import {
	openPopup,
	closePopup,
	handleCloseButtonClick,
	handleOverlayClick,
} from '../components/modal';

const pageContent = document.querySelector('.page__content');
const popupEdit = pageContent.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_description');
const popupNew = pageContent.querySelector('.popup_type_new-card');
const popupNewForm = popupNew.querySelector('.popup__form');
const placeInput = popupNewForm.querySelector('.popup__input_type_card-name');
const placeLink = popupNewForm.querySelector('.popup__input_type_url');
const profileInfo = pageContent.querySelector('.profile');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__description');
const popups = Array.from(document.querySelectorAll('.popup'));
const cardList = document.querySelector('.places__list');
nameInput.value = profileTitle.textContent;
jobInput.value = profileJob.textContent;
const popupCard = pageContent.querySelector('.popup_type_image');
const popupImage = popupCard.querySelector('.popup__image');

initialCards.forEach(card => {
	const newCard = createCard(
		card,
		removeCard,
		openCardImagePopup,
		likeButtonClick
	);
	cardList.append(newCard);
});

popups.forEach(popup => {
	popup
		.querySelector('.popup__close')
		.addEventListener('click', handleCloseButtonClick);
	popup.addEventListener('click', handleOverlayClick);
});

export function findOpenPopup() {
	// функция для определения попапа, который открыт в данный момент
	return popups.find(popup => popup.classList.contains('popup_is-opened'));
}

function handleEditFormSubmit(evt) {
	evt.preventDefault();
	let name = nameInput.value;
	let job = jobInput.value;
	profileTitle.textContent = name;
	profileJob.textContent = job;
	closePopup(findOpenPopup());
}

function handleAddFormSubmit(evt) {
	evt.preventDefault();
	const card = {
		name: placeInput.value,
		link: placeLink.value,
	};

	cardList.prepend(
		createCard(card, removeCard, openCardImagePopup, likeButtonClick)
	);
	closePopup(popupNew);
	placeInput.value = '';
	placeLink.value = '';
}

function openCardImagePopup({ name, link }) {
	// тут запишем полученное в src и alt
	popupImage.src = link;
	popupImage.alt = name;
	openPopup(popupCard);
}

profileEditButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	openPopup(popupEdit);
});
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	openPopup(popupNew);
});
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupNewForm.addEventListener('submit', handleAddFormSubmit);
