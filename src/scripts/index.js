'use strict';

import '../styles/index.css'; // добавьте импорт главного файла стилей
import { createCard } from '../components/card';
import { openPopup, closePopup, handleOverlayClick } from '../components/modal';
import { validationConfig } from '../components/constant';
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

enableValidation(validationConfig);

const pageContent = document.querySelector('.page__content');
const popups = Array.from(document.querySelectorAll('.popup')); //Массив попапов
const cardList = document.querySelector('.places__list'); //Секция карт
// Форма профиля
const popupEdit = pageContent.querySelector('.popup_type_edit');
const formEditPopup = popupEdit.querySelector('.popup__form');
const nameInput = formEditPopup.querySelector('.popup__input_type_name');
const jobInput = formEditPopup.querySelector('.popup__input_type_description');
const formEditPopupButton = formEditPopup.querySelector('.popup__button');
const buttonOriginalText = formEditPopupButton.textContent;
// Форма добавления карты
const popupNew = pageContent.querySelector('.popup_type_new-card');
const popupNewForm = popupNew.querySelector('.popup__form');
const popupNewFormButton = popupNewForm.querySelector('.popup__button');
const placeInput = popupNewForm.querySelector('.popup__input_type_card-name');
const placeLink = popupNewForm.querySelector('.popup__input_type_url');
// Данные пользователя и кнопки
const profileInfo = pageContent.querySelector('.profile');
const buttonEditProfile = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profileInfo.querySelector('.profile__add-button');
const avatar = profileInfo.querySelector('.profile__image');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__description');
// Форма изменения аватара
const avatarEditPopup = pageContent.querySelector('.popup_type_edit_avatar');
const formEditAvatar = avatarEditPopup.querySelector('.popup__form');
const buttonEditAvatar = formEditAvatar.querySelector('.popup__button');
const avatarLink = formEditAvatar.querySelector(
	'.popup__input_type_avatar_link'
);
// Попап изображения карты
const popupCard = pageContent.querySelector('.popup_type_image');
const popupImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__caption');
// попап удаления карточки
const deletePopup = pageContent.querySelector('.popup_type_delete-card');
const formDeletePopup = deletePopup.querySelector('.popup__form');
const buttonDeletePopup = formDeletePopup.querySelector('.popup__button');

let profileId = ''; // ID профиля
const caption = 'Сохранение...';

const cardToRemove = {
	_id: null,
	removeFn: null,
};

function changeButtonCaption(btnElement, caption) {
	btnElement.textContent = caption;
}

// Функция заполнения данных профиля, полученными с сервера
function editProfile(profile) {
	profileTitle.textContent = profile.name;
	profileJob.textContent = profile.about;
	avatar.style.backgroundImage = `url(${profile.avatar})`;
}

Promise.all([getInitialCards(), getUserInfo()])
	.then(([cards, profile]) => {
		profileId = profile._id;
		editProfile(profile);
		cards.forEach(card => {
			cardList.append(
				createCard(
					card,
					openCardImagePopup,
					profileId,
					openDeletePopup,
					onPutLike,
					onDeleteLike
				)
			);
		});
	})
	.catch(err => console.log(err));

//Вешаем слушатели  на кнопку закрытия попапа и оверлей
popups.forEach(popup => {
	popup
		.querySelector('.popup__close')
		.addEventListener('click', () => closePopup(popup));
	popup.addEventListener('click', handleOverlayClick);
});
// Слушатель на кнопку открытия попапа редактирования профиля
buttonEditProfile.addEventListener('click', function (evt) {
	evt.stopPropagation();
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileJob.textContent;
	clearValidation(formEditPopup, validationConfig);
	openPopup(popupEdit);
});
// Слушатель на кнопку открытия попапа добавления карты
profileAddButton.addEventListener('click', function (evt) {
	evt.stopPropagation();
	placeInput.value = '';
	placeLink.value = '';
	clearValidation(popupNewForm, validationConfig);
	openPopup(popupNew);
});
// Слушатель на аватар для открытия попапа редактирования аватара
avatar.addEventListener('click', function (evt) {
	evt.stopPropagation();
	avatarLink.value = '';
	clearValidation(formEditAvatar, validationConfig);
	openPopup(avatarEditPopup);
});
// Открытие попапа удаления карточки
function openDeletePopup(cardId, removeFn) {
	cardToRemove._id = cardId;
	cardToRemove.removeFn = removeFn;
	openPopup(deletePopup);
}

// Функция-колбек слушателя сабмита формы редактирования профиля
function handleEditFormSubmit(evt) {
	evt.preventDefault();
	const newProfile = {
		name: nameInput.value,
		about: jobInput.value,
	};
	changeButtonCaption(formEditPopupButton, caption);
	onEditProfile(newProfile)
		.then(profile => {
			editProfile(profile);
			closePopup(popupEdit);
		})
		.catch(err => console.log(err))
		.finally(() => {
			changeButtonCaption(formEditPopupButton, buttonOriginalText);
		});
}
// Функция-колбек слушателя сабмита формы добавлениЯ карты
function handleAddFormSubmit(evt) {
	evt.preventDefault();
	const newPlace = {
		name: placeInput.value,
		link: placeLink.value,
	};
	changeButtonCaption(popupNewFormButton, caption);
	onNewPlace(newPlace)
		.then(newPlace => {
			cardList.prepend(
				createCard(
					newPlace,
					openCardImagePopup,
					profileId,
					openDeletePopup,
					onPutLike,
					onDeleteLike
				)
			);
			closePopup(popupNew);
		})
		.catch(err => console.log(err))
		.finally(() => {
			changeButtonCaption(popupNewFormButton, buttonOriginalText);
		});
}
// Функция-колбек попапа изображения карты
function openCardImagePopup({ name, link }) {
	// тут запишем полученное в src и alt
	popupImage.src = link;
	popupImage.alt = name;
	popupCardCaption.textContent = name;
	openPopup(popupCard);
}
// функция-колбек попапа удаления карточки
function handleDeleteFormSubmit(evt) {
	evt.preventDefault();
	onDeleteCard(cardToRemove._id)
		.then(() => {
			cardToRemove.removeFn();
			closePopup(deletePopup);
		})
		.catch(err => console.log(err));
}
// функция-колбек попапа редактирования аватара
function handleEditAvatarFormSubmit(evt) {
	evt.preventDefault();
	const avatarUrl = avatarLink.value;
	changeButtonCaption(buttonEditAvatar, caption);
	onChangeAvatar(avatarUrl)
		.then(profile => {
			editProfile(profile);
			closePopup(avatarEditPopup);
		})
		.catch(err => console.log(err))
		.finally(() => {
			changeButtonCaption(buttonEditAvatar, buttonOriginalText);
		});
}

// Слушатели на кнопки сабмит форм
formEditPopup.addEventListener('submit', handleEditFormSubmit);
popupNewForm.addEventListener('submit', handleAddFormSubmit);
buttonDeletePopup.addEventListener('click', handleDeleteFormSubmit);
formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);
