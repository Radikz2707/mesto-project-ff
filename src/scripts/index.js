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
const profileInfo = pageContent.querySelector('.profile');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const popups = Array.from(document.querySelectorAll('.popup'));
let target; // в него будет падать открытый popup

function openPopup(popup) {
	popup.classList.add('popup_is-opened');
	return popup;
}
function closePopup(popup) {
	popup.classList.remove('popup_is-opened');
}
function keyChecker(evt) {
	if (evt.keyCode === 27) {
		target = popupChecker();
		closePopup(target);
	}
}
function popupChecker() {
	popups.forEach(function (popup) {
		if (popup.classList.contains('popup_is-opened')) {
			target = popup;
		}
	});
	return target;
}
function clickChecker(evt) {
	target = popupChecker();
	const closeButton = target.querySelector('.popup__close');
	const popupContent = target.querySelector('.popup__content');
	if ((evt.target === closeButton || evt.target === target) && evt.target !== popupContent) {
		closePopup(target);
	}
}
profileEditButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	target = openPopup(popupEdit);
});
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	target = openPopup(popupNew);
});

document.addEventListener('keydown', keyChecker);
pageContent.addEventListener('click', clickChecker);
