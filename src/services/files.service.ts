export const getUserFiles = () => {
	return fetch("https://jsonplaceholder.typicode.com/posts")
		.then((response) => response.json())
		.then((data) => data);
};
