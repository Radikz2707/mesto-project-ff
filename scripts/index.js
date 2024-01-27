'use strict';

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
function removeCard(cardNode)	{
	cardNode.remove();
}
initialCards.forEach((card) => {
	const newCard = createCard(card, removeCard);
	cardList.append(newCard);
})
