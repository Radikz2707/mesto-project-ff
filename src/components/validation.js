function enableValidation(validationConfig) {
	let { formSelector } = validationConfig;
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach(formElement => {
		setEventListeners(formElement, validationConfig);
	});
}

function clearValidation(formElement, validationConfig) {
	let { inputSelector, submitButtonSelector } = validationConfig;
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	inputList.forEach(inputElement => {
		hideInputError(formElement, inputElement, validationConfig);
	});
	toggleButtonState(inputList, buttonElement, validationConfig);
}

function hasInvalidInput(inputList) {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid;
	});
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
	let { inactiveButtonClass } = validationConfig;
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(inactiveButtonClass);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(inactiveButtonClass);
	}
}

function setEventListeners(formElement, validationConfig) {
	let { inputSelector, submitButtonSelector } = validationConfig;
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, buttonElement, validationConfig);
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, validationConfig);
			toggleButtonState(inputList, buttonElement, validationConfig);
		});
	});
}

function showInputError(
	formElement,
	inputElement,
	errorMessage,
	validationConfig
) {
	let { inputErrorClass, errorClass } = validationConfig;
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
	let { inputErrorClass, errorClass } = validationConfig;
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
}

function isValid(formElement, inputElement, validationConfig) {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity('');
	}
	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationConfig
		);
	} else {
		hideInputError(formElement, inputElement, validationConfig);
	}
}

export { enableValidation, clearValidation };
