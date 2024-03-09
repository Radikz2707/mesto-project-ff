'use strict';

import '../styles/index.css'; // добавьте импорт главного файла стилей
import { createCard } from '../components/card';
import { openPopup, closePopup, handleOverlayClick } from '../components/modal';
import { ValidationConfig } from '../components/constant';
import { clearValidation, enableValidation } from '../components/validation';
import {
	getUserInfo,
	getInitialCards,
	onEditProfile,
	onNewPlace,
	onDeleteCard,
	onPutLike,
	onDeleteLike,
	onChangeAvatar,
} from '../components/api';

enableValidation(ValidationConfig);

const pageContent = document.querySelector('.page__content');
const popups = Array.from(document.querySelectorAll('.popup')); //Массив попапов
const cardList = document.querySelector('.places__list'); //Секция карт
// Форма профиля
const popupEdit = pageContent.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_description');
// Форма добавления карты
const popupNew = pageContent.querySelector('.popup_type_new-card');
const popupNewForm = popupNew.querySelector('.popup__form');
const placeInput = popupNewForm.querySelector('.popup__input_type_card-name');
const placeLink = popupNewForm.querySelector('.popup__input_type_url');
// Данные пользователя и кнопки
const profileInfo = pageContent.querySelector('.profile');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const avatar = profileInfo.querySelector('.profile__image');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__description');
// Форма изменения аватара
const popupEditAvatar = pageContent.querySelector('.popup_type_edit_avatar');
const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form');
const avatarLink = popupEditAvatarForm.querySelector(
	'.popup__input_type_avatar_link'
);
// Попап изображения карты
const popupCard = pageContent.querySelector('.popup_type_image');
const popupImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__caption');
// попап удаления карточки
const deletePopup = pageContent.querySelector('.popup_type_delete-card');
const deletePopupForm = deletePopup.querySelector('.popup__form');

let profileId = ''; // ID профиля

// Функция редактирования профиля и отправки данных профиля на сайт
function editProfile(profile) {
	profileTitle.textContent = profile.name;
	profileJob.textContent = profile.about;
	onEditProfile(profile);
}

Promise.all([getInitialCards(), getUserInfo()]).then(([cards, profile]) => {
	profileId = profile._id;
	editProfile(profile);
	cards.forEach(card => {
		cardList.append(createCard(card, openCardImagePopup, removeCard, profileId));
	});
});
// функция удаления карточки
function removeCard(cardElement) {
	console.log(cardElement);
	openPopup(deletePopup);
	deletePopupForm.addEventListener('submit', handleDeleteFormSubmit)	
}

//Вешаем слушатели  на кнопку закрытия попапа и оверлей
popups.forEach(popup => {
	popup
		.querySelector('.popup__close')
		.addEventListener('click', () => closePopup(popup));
	popup.addEventListener('click', handleOverlayClick);
});
// Слушатель на кнопку открытия попапа редактирования профиля
profileEditButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileJob.textContent;
	clearValidation(popupEditForm, ValidationConfig);
	openPopup(popupEdit);
});
// Слушатель на кнопку открытия попапа добавления карты
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	placeInput.value = '';
	placeLink.value = '';
	clearValidation(popupNewForm, ValidationConfig);
	openPopup(popupNew);
});

// Функция-колбек слушателя сабмита формы редактирования профиля
function handleEditFormSubmit(evt) {
	evt.preventDefault();
	const newProfile = {
		name: nameInput.value,
		about: jobInput.value,
	};
	onEditProfile(newProfile).then(newProfile => editProfile(newProfile));
	closePopup(popupEdit);
}
// Функция-колбек слушателя сабмита формы добавлениЯ карты
function handleAddFormSubmit(evt) {
	evt.preventDefault();
	const card = {
		name: placeInput.value,
		link: placeLink.value,
	};
	cardList.prepend(createCard(card, openCardImagePopup,removeCard, profileId));
	onNewPlace(card);
	closePopup(popupNew);
}
// Функция-колбек попапа изображения карты
function openCardImagePopup({ name, link }) {
	// тут запишем полученное в src и alt
	popupImage.src = link;
	popupImage.alt = name;
	popupCardCaption.textContent = name;
	openPopup(popupCard);
}

function handleDeleteFormSubmit(evt, cardElement, cardId)	{
	evt.preventDefault();
	closePopup(deletePopup);
	cardElement.remove();
	onDeleteCard(cardId);
}
// Слушатели на кнопки сабмит форм
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupNewForm.addEventListener('submit', handleAddFormSubmit);
