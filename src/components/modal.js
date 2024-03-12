const popups = Array.from(document.querySelectorAll('.popup'));

function openPopup(popup) {
	// функция для открытия попапа
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
	// функция для закрытия попапа по кнопке ESC
	const ESC_CODE = 27;
	if (evt.keyCode === ESC_CODE) {
		// const target = popups.find(popup =>
		// 	popup.classList.contains('popup_is-opened')
		// );
		const target = document.querySelector('.popup_is-opened');
		closePopup(target);
	}
}

function closePopup(popup) {
	// функция для закрытия попапа
	if (!popup) {
		return;
	}
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', closeByEsc);
}

function handleOverlayClick(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	}
}

export { openPopup, closePopup, handleOverlayClick };
