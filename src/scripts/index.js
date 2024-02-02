'use strict';

import '../styles/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './cards';

const cardList = document.querySelector('.places__list');

function createCard(card, removeCard) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const removeButton = cardElement.querySelector('.card__delete-button');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardTitle.textContent = card.name;

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

const pageContent = document.querySelector('.page__content');
const popupEdit = pageContent.querySelector('.popup_type_edit');
const popupNew = pageContent.querySelector('.popup_type_new-card');
const popupContent = pageContent.querySelector('popup__content');
const profileInfo = pageContent.querySelector('.profile');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
let target; // в него будет падать открытый popup

function openPopup(popup) {
	popup.classList.add('popup_is-opened');
	return popup;
}
function closePopup(popup) {
	popup.classList.remove('popup_is-opened');
}
function keyChecker(evt, popup) {
	if (evt.keyCode === 27) {
		closePopup(popup);
	}
}
function clickChecker(evt) {
	let closeButton;
	let popupIsOpened;
	closeButtons.forEach(button => {
		if (button.closest('.popup_is-opened')) {
			closeButton = button;
			popupIsOpened = closeButton.closest('.popup_is-opened');
			return closeButton, popupIsOpened;
		}
	});
	target =
		evt.target === closeButton
			? popupIsOpened
			: evt.target;
	const targetIf =
		!(target === popupContent) &&
		(popupIsOpened || target === closeButton);
	if (targetIf) closePopup(target);
}
profileEditButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	target = openPopup(popupEdit);
});
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	target = openPopup(popupNew);
});
document.addEventListener('keydown', function (evt) {
	keyChecker(evt, target);
});
pageContent.addEventListener('click', clickChecker);
