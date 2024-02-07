'use strict';

import '../styles/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './cards';

const pageContent = document.querySelector('.page__content');
const popupEdit = pageContent.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_description');
const popupNew = pageContent.querySelector('.popup_type_new-card');
const profileInfo = pageContent.querySelector('.profile');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__description');
const popups = Array.from(document.querySelectorAll('.popup'));
const cardList = document.querySelector('.places__list');
const cards = Array.from(cardList.querySelectorAll('.card'));
nameInput.value = profileTitle.textContent;
jobInput.value = profileJob.textContent;
const popupCard = pageContent.querySelector('.popup_type_image');
const popupImage = popupCard.querySelector('.popup__image');

function createCard(card, removeCard) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const removeButton = cardElement.querySelector('.card__delete-button');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardTitle.textContent = card.name;

	cardList.addEventListener('click', PopupImage);

	// Функция слушателя реализация 1ый способ
	// const removeButtonClick = evt => {
	// 	const cardItem = evt.target.closest('.card')
	// 	removeCard(cardItem)
	// }

	// Функция слушателя реализация 2ой способ
	const removeButtonClick = () => removeCard(cardElement);

	removeButton.addEventListener('click', removeButtonClick);
	return cardElement;
}
function removeCard(cardNode) {
	cardNode.remove();
}
initialCards.forEach(card => {
	const newCard = createCard(card, removeCard);
	cardList.append(newCard);
});
//-----------------------------------------------------

function openPopup(popup) {
	// функция для открытия попапа
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyChecker);
	return popup;
}
function closePopup(popup) {
	// функция для закрытия попапа
	if (!popup) {
		return;
	}
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', keyChecker);
}
function keyChecker(evt) {
	// функция для закрытия попапа по кнопке ESC
	const target = findOpenPopup();
	const ESC_CODE = 27;
	if (evt.keyCode === ESC_CODE) {
		closePopup(target);
	}
}
function findOpenPopup() {
	// функция для определения попапа, который открыт в данный момент
	return popups.find(popup => popup.classList.contains('popup_is-opened'));
}

function handleCloseButtonClick(evt) {
	const popup = evt.target.closest('.popup');
	closePopup(popup);
}

function handleOverlayClick(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	}
}

popups.forEach(popup => {
	popup
		.querySelector('.popup__close')
		.addEventListener('click', handleCloseButtonClick);
	popup.addEventListener('click', handleOverlayClick);
});

profileEditButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	openPopup(popupEdit);
});
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	openPopup(popupNew);
});
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
}
popupEditForm.addEventListener('submit', handleEditFormSubmit);

function PopupImage(evt) {
	const card = evt.target;
	const src = card.src;
	const alt = card.alt;
	openCardImagePopup(alt, src);
}

function openCardImagePopup({ name, link }) {
		// тут запишем полученное в src и alt
		popupImage.src = link;
		popupImage.alt = name;
		openPopup(popupImage);
	};

