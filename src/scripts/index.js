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
const popupEditForm = popupEdit.querySelector('.popup__form');
let nameInput = popupEditForm.querySelector('.popup__input_type_name');
let jobInput = popupEditForm.querySelector('.popup__input_type_description');
const popupNew = pageContent.querySelector('.popup_type_new-card');
const profileInfo = pageContent.querySelector('.profile');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__description');
const popups = Array.from(document.querySelectorAll('.popup'));
const cardsSection = document.querySelector('.places__list');
const cards = Array.from(cardsSection.querySelectorAll('.card'));
let target = ''; // в него будет падать открытый popup
nameInput.value = profileTitle.textContent;
jobInput.value = profileJob.textContent;

function openPopup(popup) {
	// функция для открытия попапа
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyChecker);
	return popup;
}
function closePopup(popup) {
	// функция для закрытия попапа
	popup.classList.remove('popup_is-opened');
	target = '';
	document.removeEventListener('keydown', keyChecker);
}
function keyChecker(evt) {
	// функция для закрытия попапа по кнопке ESC
	if (evt.keyCode === 27) {
		target = popupChecker();
		closePopup(target);
	}
}
function popupChecker() {
	// функция для определения попапа, который открыт в данный момент
	popups.forEach(function (popup) {
		if (popup.classList.contains('popup_is-opened')) {
			target = popup;
		}
	});
	return target;
}
function clickChecker() {
	target = popupChecker(); // открытый попап, если он открыт, то он будет в target
	if (target === '') {
		// если ни один попап не открыт...
		return;
	} else {
		const closeButton = target.querySelector('.popup__close'); // кнопка в открытом попапе
		popupListener(closeButton, target);
		closePopup(target);
	}
}
function popupListener(closeButton, target)	{
	closeButton.addEventListener('click', clickChecker)
	target.addEventListener('click', clickChecker);
}

profileEditButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	target = openPopup(popupEdit);
});
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	target = openPopup(popupNew);
});

pageContent.addEventListener('click', clickChecker);

function handleEditFormSubmit(evt) {
	evt.preventDefault();
	let name = nameInput.value;
	let job = jobInput.value;
	profileTitle.textContent = name;
	profileJob.textContent = job;
	target = popupChecker();
	closePopup(target);
}
popupEditForm.addEventListener('submit', handleEditFormSubmit);
