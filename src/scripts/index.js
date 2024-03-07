'use strict';

import '../styles/index.css'; // добавьте импорт главного файла стилей
// import { initialCards } from './cards';
import {
	removeCard,
	createCard,
	likeButtonClick,
	toggleRemoveButton,
} from '../components/card';
import { openPopup, closePopup, handleOverlayClick } from '../components/modal';
import { ValidationConfig } from '../components/constant';
import { clearValidation, enableValidation } from '../components/validation';
import {
	getUserInfo,
	getInitialCards,
	updateProfile,
	newPlace,
} from '../components/api';

enableValidation(ValidationConfig);

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
const avatar = profileInfo.querySelector('.profile__image');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__description');
const cardList = document.querySelector('.places__list');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupCard = pageContent.querySelector('.popup_type_image');
const popupImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__caption');
let userId = '';
let howManyLikes = 0;

// const newCard = createCard(
// 	card,
// 	removeCard,
// 	openCardImagePopup,
// 	likeButtonClick
// );

function changeProfile(user) {
	profileTitle.textContent = user.name;
	profileJob.textContent = user.about;
	avatar.style.backgroundImage = `url(${user.avatar})`;
	updateProfile();
}

Promise.all([getInitialCards(), getUserInfo()]).then(([cards, user]) => {
	changeProfile(user);
	userId = user._id;
	cards.forEach(card => {
		howManyLikes = card.likes.length;
		const newCard = createCard(
			card,
			removeCard,
			openCardImagePopup,
			likeButtonClick,
			userId,
			howManyLikes
		);
		cardList.append(newCard);
	});
});

popups.forEach(popup => {
	popup
		.querySelector('.popup__close')
		.addEventListener('click', () => closePopup(popup));
	popup.addEventListener('click', handleOverlayClick);
});

function handleEditFormSubmit(evt) {
	evt.preventDefault();
	const name = nameInput.value;
	const job = jobInput.value;
	profileTitle.textContent = name;
	profileJob.textContent = job;
	closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
	evt.preventDefault();
	const card = {
		name: placeInput.value,
		link: placeLink.value,
		_id: userId,
	};
	newPlace(card);
	cardList.prepend(
		createCard(
			card,
			removeCard,
			openCardImagePopup,
			likeButtonClick,
			userId,
			howManyLikes
		)
	);
	closePopup(popupNew);
	placeInput.value = '';
	placeLink.value = '';
}

function openCardImagePopup({ name, link }) {
	// тут запишем полученное в src и alt
	popupImage.src = link;
	popupImage.alt = name;
	popupCardCaption.textContent = name;
	openPopup(popupCard);
}

profileEditButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileJob.textContent;
	clearValidation(popupEditForm, ValidationConfig);
	openPopup(popupEdit);
});
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	clearValidation(popupNewForm, ValidationConfig);
	openPopup(popupNew);
});
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupNewForm.addEventListener('submit', handleAddFormSubmit);
