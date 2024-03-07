const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7/',
	headers: {
		authorization: 'b89de6ef-3048-4fb3-a03c-5526d5660f24',
		'Content-Type': 'application/json',
	},
};

export const getUserInfo = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'GET',
		headers: config.headers,
	}).then(res => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Что-то пошло не так: ${res.status}`);
	});
};

export const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'GET',
		headers: config.headers,
	}).then(res => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Что-то пошло не так: ${res.status}`);
	});
};

export const updateProfile = () => {
	fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: 'Radik Zalalov',
			about: 'best programmist',
		}),
	})
		.then(res => {
			if (res.ok) {
				res.json();
			}
		})
		.catch(err => console.log(err.status));
};

export const newPlace = (card) =>	{
	fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: card.name,
			link: card.link,
			_id: userId,
		})
	})
	.then(res => {
		if(res.ok)	{
			res.json();
		}
	})
	.catch(err => console.log(err.status));
}