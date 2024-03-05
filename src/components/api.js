return fetch('https://nomoreparties.co/v1/cohort-42/cards', {
	headers: {
		authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
	},
})
	.then(res => res.json())
	.then(result => {
		console.log(result);
	});
