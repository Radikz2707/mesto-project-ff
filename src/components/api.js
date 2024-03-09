const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7/',
	headers: {
		authorization: 'b89de6ef-3048-4fb3-a03c-5526d5660f24',
		'Content-Type': 'application/json',
	},
};

function resCheckToOk(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'GET',
		headers: config.headers,
	})
		.then(res => resCheckToOk(res))
		.catch(err => {
			console.log(err);
		});
};

export const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'GET',
		headers: config.headers,
	})
		.then(res => resCheckToOk(res))
		.catch(err => {
			console.log(err);
		});
};

export const onEditProfile = (newProfile) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify(newProfile),
	})
		.then(res => resCheckToOk(res))
		.catch(err => console.log(err));
};

export const onNewPlace = (card) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: card.name,
			link: card.link,
		}),
	})
		.then(res => resCheckToOk(res))
		.catch(err => console.log(err));
};
export const onDeleteCard = cardId => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
		.then(res => resCheckToOk(res))
		.catch(err => {
			console.log(err);
		});
};

export const onPutLike = cardId => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	})
		.then(res => resCheckToOk(res))
		.catch(err => {
			console.log(err);
		});
};

export const onDeleteLike = cardId => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
		.then(res => resCheckToOk(res))
		.catch(err => {
			console.log(err);
		});
};

export const onChangeAvatar = url => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: url,
		}),
	})
		.then(res => resCheckToOk(res))
		.catch(err => {
			console.log(err);
		});
};
