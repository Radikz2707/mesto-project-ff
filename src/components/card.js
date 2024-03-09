let howManyLikes; // счетчик лайков
let ownerId; // id создателя карточки
let cardId; // id карточки

export function createCard(card, openCardImagePopup, removeCard, profileId) {
	// Получение темплейта карточки и ее копирование
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	// кнопка удаления карточки
	const removeButton = cardElement.querySelector('.card__delete-button');
	// Данные карточки
	const cardTitle = cardElement.querySelector('.card__title'); // её заголовок
	const cardImage = cardElement.querySelector('.card__image'); // её изображение
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardTitle.textContent = card.name;
	// секция для счетчика лайков и конпки установки лайка
	const likesBox = cardElement.querySelector('.card__like-box'); // сама секция
	const likeButton = likesBox.querySelector('.card__like-button'); // кнопка лайка
	const likesCounterBox = likesBox.querySelector('.likes'); // поле для счетчика лайков
	howManyLikes = card.likes.length; // количество пользователей равно длине массива likes
	likesCounterBox.textContent = howManyLikes; // отображаем в карточке количество лайков

	ownerId = card.owner._id;
	cardId = card._id;

	// функции-колбеки
	const openPopupImage = () => openCardImagePopup(card);
	const likeButtonClick = () => {
		likeButtonToggle(likeButton);
	};
	const removeButtonClick = () => {
		removeCard(cardElement, cardId);
	};
	// удаление кнопки удаления карточки, если карта создана не пользователем	
	if (ownerId !== profileId) { 
		// если карта создана не пользователем
		removeButton.classList.add('card__delete-button_disabled'); // display: none для кнопки
	} else {
		// иначе вешаем слушатель на кнопку
		removeButton.addEventListener('click', removeButtonClick);
	}
	// слушатели
	cardImage.addEventListener('click', openPopupImage);
	likeButton.addEventListener('click', likeButtonClick);
	// возвращаем созданную карточку
	return cardElement;
}

// функция окрашивания кнопки лайка карточки
function likeButtonToggle(likeButton) {
	likeButton.classList.toggle('card__like-button_is-active');
}
