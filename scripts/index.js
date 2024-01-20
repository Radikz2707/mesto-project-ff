'use strict'
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list')
function createCard(card, removeCard) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	cardImage.src = card.link
	cardImage.alt = card.name
	const cardTitle = cardElement.querySelector('.card__title')
	cardTitle.textContent = card.name
	const removeButton = cardElement.querySelector('.card__delete-button')
	const removeButtonClick = evt => {
		const cardItem = evt.target.closest('.card')
		removeCard(cardItem)
	}
	removeButton.addEventListener('click', removeButtonClick)
	return cardElement
}
function removeCard(cardNode) {
	cardNode.remove()
}
initialCards.forEach(function (card) {
	const newCard = createCard(card, removeCard)
	cardList.append(newCard)
})
