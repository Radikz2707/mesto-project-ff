function enableValidation(ValidationConfig) {
	let { formSelector } = ValidationConfig;
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach(formElement => {
		setEventListeners(formElement, ValidationConfig);
	});
}

function clearValidation(formElement, ValidationConfig) {
	let { inputSelector, submitButtonSelector, inactiveButtonClass } =
		ValidationConfig;
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	inputList.forEach(inputElement => {
		hideInputError(formElement, inputElement, ValidationConfig);
	});
	toggleButtonState(inputList, buttonElement, ValidationConfig);
	buttonElement.classList.add(inactiveButtonClass);
}

function hasInvalidInput(inputList) {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid;
	});
}

function toggleButtonState(inputList, buttonElement, ValidationConfig) {
	let { inactiveButtonClass } = ValidationConfig;
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(inactiveButtonClass);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(inactiveButtonClass);
	}
}

function setEventListeners(formElement, ValidationConfig) {
	let { inputSelector, submitButtonSelector } = ValidationConfig;
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, buttonElement, ValidationConfig);
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, ValidationConfig);
			toggleButtonState(inputList, buttonElement, ValidationConfig);
		});
	});
}

function showInputError(
	formElement,
	inputElement,
	errorMessage,
	ValidationConfig
) {
	let { inputErrorClass, errorClass } = ValidationConfig;
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, ValidationConfig) {
	let { inputErrorClass, errorClass } = ValidationConfig;
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
}

function isValid(formElement, inputElement, ValidationConfig) {
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
			ValidationConfig
		);
	} else {
		hideInputError(formElement, inputElement, ValidationConfig);
	}
}

export { enableValidation, clearValidation };
