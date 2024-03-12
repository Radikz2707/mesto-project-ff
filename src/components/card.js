function renderLikes({ likes, likeButton, likesCounterBox, profileId }) {
	if (likes.some(like => like._id === profileId)) {
		likeButton.classList.add('card__like-button_is-active');
	} else {
		likeButton.classList.remove('card__like-button_is-active');
	}
	likesCounterBox.textContent = likes.length;
}

function removeCardCallbackFactory(cardNode) {
	return function () {
		cardNode.remove();
	};
}

export function createCard(
	card,
	openCardImagePopup,
	profileId,
	openDeletePopup,
	onPutLike,
	onDeleteLike
) {
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
	// секция для счетчика лайков и кнопки установки лайка
	const likesBox = cardElement.querySelector('.card__like-box'); // сама секция
	const likeButton = likesBox.querySelector('.card__like-button'); // кнопка лайка
	const likesCounterBox = likesBox.querySelector('.likes'); // поле для счетчика лайков
	let likes = card.likes;
	renderLikes({ likes, likeButton, likesCounterBox, profileId });
	let ownerId = card.owner._id;

	// функции-колбеки
	const openPopupImage = () => openCardImagePopup(card);
	const likeButtonClick = () => {
		if (likeButton.classList.contains('card__like-button_is-active')) {
			onDeleteLike(card._id)
				.then(card => {
					likeButton.classList.remove('card__like-button_is-active');
					likesCounterBox.textContent = card.likes.length;
				})
				.catch(err => console.log(err));
		} else {
			onPutLike(card._id)
				.then(card => {
					likeButton.classList.add('card__like-button_is-active');
					likesCounterBox.textContent = card.likes.length;
				})
				.catch(err => console.log(err));
		}
	};
	const removeButtonClick = () => {
		openDeletePopup(card._id, removeCardCallbackFactory(cardElement));
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
