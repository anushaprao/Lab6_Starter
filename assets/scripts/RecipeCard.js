// RecipeCard.js

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inherit everything from HTMLElement

		// EXPOSE - START (All expose numbers start with A)
		// **A1**: Attach the shadow DOM to this Web Component (leave the mode open)
		this.attachShadow({ mode: 'open' });

		// **A2**: Create an <article> element - This will hold our markup once our data is set
		const article = document.createElement('article');

		// **A3**: Create a style element - This will hold all of the styles for the Web Component
		const style = document.createElement('style');

		// **A4**: Insert all of the styles from cardTemplate.html into the <style> element
		style.textContent = `
  			/* Card styles */
  			article {
				display: flex;
				flex-direction: column;
				width: 250px;
				margin: 16px;
				border: 1px solid #eaeaea;
				border-radius: 8px;
				overflow: hidden;
				box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  			}
  			article img {
				width: 100%;
				height: auto;
  			}
  			article h3 {
				margin: 16px;
				font-size: 1.2em;
 			}
  			article p {
				margin: 8px 16px;
				font-size: 0.9em;
  			}
  			article a {
				text-decoration: none;
				color: black;
  			}
  			article a:hover {
				color: blue;
  			}
`			;

			// **A5**: Append the <style> and <article> elements to the Shadow DOM
			this.shadowRoot.append(style, article);
		}

	/**
	 * Called when the .data property is set on this element.
	 *
	 * For example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 *
	 * @param {Object} data - The data to pass into the <recipe-card> must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }
	 */
	set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // **A6**: Select the <article> we added to the Shadow DOM in the constructor
    const article = this.shadowRoot.querySelector('article');

    // **A7**: Set the contents of the <article> with the <article> template given in cardTemplate.html
    article.innerHTML = `
      <img src="${data.imgSrc}" alt="${data.imgAlt}">
      <h3><a href="${data.titleLnk}">${data.titleTxt}</a></h3>
      <p class="organization">${data.organization}</p>
      <p class="rating">Rating: ${data.rating} (${data.numRatings} reviews)</p>
      <p class="time">Time: ${data.lengthTime}</p>
      <p class="ingredients">Ingredients: ${data.ingredients}</p>
    `;
  }
}

// **A8**: Define the Class as a customElement so that you can create it with <recipe-card>
customElements.define('recipe-card', RecipeCard);
