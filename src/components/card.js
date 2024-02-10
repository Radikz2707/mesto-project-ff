export function createCard(
	card,
	removeCard,
	openCardImagePopup,
	likeButtonClick
) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const removeButton = cardElement.querySelector('.card__delete-button');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	const like = cardElement.querySelector('.card__like-button');
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardTitle.textContent = card.name;

	const openPopupImage = () => openCardImagePopup(card);
	cardImage.addEventListener('click', openPopupImage);

	const likeButton = () => likeButtonClick(like);
	like.addEventListener('click', likeButton);

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

export function removeCard(cardNode) {
	cardNode.remove();
}

export function likeButtonClick(like) {
	like.classList.toggle('card__like-button_is-active');
}