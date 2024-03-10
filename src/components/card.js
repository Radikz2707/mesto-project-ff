let howManyLikes; // счетчик лайков
let ownerId; // id создателя карточки
let likes = [];

function renderLikes({ likes, likeButton, likesCounterBox, profileId }) {
	if (
		likes.some(like => {
			return like._id === profileId;
		})
	) {
		likeButton.classList.add('card__like-button_is-active');
	} else {
		likeButton.classList.remove('card__like-button_is-active');
	}
	likesCounterBox.textContent = likes.length;
}

export function createCard(
	card,
	openCardImagePopup,
	cardToRemove,
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
	likes = card.likes;
	howManyLikes = likes.length; // количество пользователей равно длине массива likes
	likesCounterBox.textContent = howManyLikes; // отображаем в карточке количество лайков

	renderLikes({ likes, likeButton, likesCounterBox, profileId });
	ownerId = card.owner._id;

	// функции-колбеки
	const openPopupImage = () => openCardImagePopup(card);
	const likeButtonClick = () => {
		
	};
	const removeButtonClick = () => {
		cardToRemove._id = card._id;
		cardToRemove.card = cardElement;
		openDeletePopup();
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