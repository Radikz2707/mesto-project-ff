function renderLikes({ likes, likeButton, likesCounterBox, profileId }) {
	if (likes.some(like => like._id === profileId)) {
		likeButton.classList.add('card__like-button_is-active');
	} else {
		likeButton.classList.remove('card__like-button_is-active');
	}
	likesCounterBox.textContent = likes.length;
}
// Функция удаления карточки
export function removeCard(cardNode) {
	cardNode.remove();
}

function toggleLikeButton(
	likeButton,
	cardId,
	onPutLike,
	onDeleteLike,
	likesCounterBox,
	profileId
) {
	const likeAction = likeButton.classList.contains(
		'card__like-button_is-active'
	)
		? onDeleteLike
		: onPutLike;

	likeAction(cardId)
		.then(({ likes: newLikes }) => {
			renderLikes({
				likes: newLikes,
				likeButton,
				likesCounterBox,
				profileId,
			});
		})
		.catch(err => console.log(err));
}

function toggleRemoveButton(
	ownerId,
	profileId,
	removeButton,
	removeButtonClick
) {
	ownerId !== profileId
		? removeButton.classList.add('card__delete-button_disabled')
		: removeButton.addEventListener('click', removeButtonClick);
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
	const likes = card.likes;
	renderLikes({ likes, likeButton, likesCounterBox, profileId });
	const ownerId = card.owner._id;

	// функции-колбеки
	const openPopupImage = () => openCardImagePopup(card);
	const likeButtonClick = () =>
		toggleLikeButton(
			likeButton,
			card._id,
			onPutLike,
			onDeleteLike,
			likesCounterBox,
			profileId
		);

	const removeButtonClick = () => {
		openDeletePopup(card._id, cardElement);
	};
	toggleRemoveButton(ownerId, profileId, removeButton, removeButtonClick);
	// слушатели
	cardImage.addEventListener('click', openPopupImage);
	likeButton.addEventListener('click', likeButtonClick);
	// возвращаем созданную карточку
	return cardElement;
}
