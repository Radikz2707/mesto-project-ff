import { findOpenPopup } from '../scripts';

function openPopup(popup) {
	// функция для открытия попапа
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyChecker);
	return popup;
}

function keyChecker(evt) {
	// функция для закрытия попапа по кнопке ESC
	const target = findOpenPopup();
	const ESC_CODE = 27;
	if (evt.keyCode === ESC_CODE) {
		closePopup(target);
	}
}

function closePopup(popup) {
	// функция для закрытия попапа
	if (!popup) {
		return;
	}
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', keyChecker);
}

function handleCloseButtonClick(evt) {
	const popup = evt.target.closest('.popup');
	closePopup(popup);
}

function handleOverlayClick(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	}
}

export { openPopup, closePopup, handleCloseButtonClick, handleOverlayClick };
