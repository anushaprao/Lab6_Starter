// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // **A9**: Fetch the recipes array from localStorage
  // If no recipes are found, return an empty array instead of null
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// **A10**: Get a reference to the <main> element
	const mainElement = document.querySelector('main');

	// **A11**: Loop through each recipe in the array
	recipes.forEach(recipeData => {
	  // **A11.1**: Create a <recipe-card> element
	  const recipeCard = document.createElement('recipe-card');
  
	  // **A11.2**: Assign the data to the <recipe-card>
	  recipeCard.data = recipeData;
  
	  // **A11.3**: Append the <recipe-card> to <main>
	  mainElement.appendChild(recipeCard);
	});
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2 - Get a reference to the <form> element
	const form = document.querySelector('form');

	// B3 - Add an event listener for the 'submit' event
	form.addEventListener('submit', event => {
		event.preventDefault(); // Prevent page reload

		// B4 - Create a new FormData object from the <form> element
		const formData = new FormData(form);

		// B5 - Create recipeObject from form data
		const recipeObject = {};
		for (const [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}

		// B6 - Create a new <recipe-card> element
		const recipeCard = document.createElement('recipe-card');

		// B7 - Add the recipeObject data to <recipe-card>
		recipeCard.data = recipeObject;

		// B8 - Append this new <recipe-card> to <main>
		const main = document.querySelector('main');
		main.appendChild(recipeCard);

		// B9 - Get recipes array from localStorage, update, and save
		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);

		// Optional: Reset the form
		form.reset();
	});

	// B10 - Get a reference to the "Clear Local Storage" button
	const clearButton = document.querySelector('button[type="button"]');

	// B11 - Add click event listener to the button
	clearButton.addEventListener('click', () => {
		// B12 - Clear local storage
		localStorage.clear();

		// B13 - Delete the contents of <main>
		const main = document.querySelector('main');
		main.innerHTML = '';
	});
}
