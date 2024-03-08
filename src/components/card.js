// import { deleteCard, putLike } from './api';

export function createCard(
	card,
	removeCard,
	openCardImagePopup,
	likeButtonClick,
	userId,
	howManyLikes,
	putLike,
	deleteLike,
	deleteCard
) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const removeButton = cardElement.querySelector('.card__delete-button');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	const like = cardElement.querySelector('.card__like-button');
	const likesBox = cardElement.querySelector('.likes');
	likesBox.textContent = howManyLikes;
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardTitle.textContent = card.name;
	const openPopupImage = () => openCardImagePopup(card);
	cardImage.addEventListener('click', openPopupImage);

	Array.from(card.likes).forEach(item => {
		if (item._id === userId) {
			likeButtonClick(like);
		}
	});

	const likeButton = () => {
		if (like.classList.contains('card__like-button_is-active')) {
			likeButtonClick(like);
			deleteLike(card._id).then(res => {
				likesBox.textContent = res.likes.length;
			});
		} else {
			likeButtonClick(like);
			putLike(card._id).then(res => {
				likesBox.textContent = res.likes.length;
			});
		}
	};
	like.addEventListener('click', likeButton);

	// Функция слушателя реализация 1ый способ
	// const removeButtonClick = evt => {
	// 	const cardItem = evt.target.closest('.card')
	// 	removeCard(cardItem)
	// }

	// Функция слушателя реализация 2ой способ
	const removeButtonClick = () => {
		deleteCard(card._id);
		removeCard(cardElement);
	};
	let ownerId = card.owner._id;
	if (ownerId !== userId) {
		removeCard(removeButton);
	} else {
		removeButton.addEventListener('click', removeButtonClick);
	}
	return cardElement;
}

export function removeCard(cardNode) {
	cardNode.remove();
}

export function likeButtonClick(like) {
	like.classList.toggle('card__like-button_is-active');
}
