import { LitElement, html, css } from 'lit-element';

export default class Appelement extends LitElement {
    constructor(){
        super();
        this.title = "";
        this.id = "";
    }

    static get properties() {
        return {
            title: {type: String}
        };
    }
    static get styles(){
        return css`
        .card {
		  position: relative;
		  margin-bottom: 12px;
		  overflow: hidden;
		  border-radius: 5px;
		  box-shadow: var(--app-header-shadow);
		  margin: 1rem;
		}
		.card a {
		  display: block;
		  text-decoration: none;
		}
		
		.card figure {
		  position: relative;
		  min-height: 30vh;
		  padding: 0;
		  margin: 0;
		  background-color: hsla(0, 0%, 15%, 0.64);
		}
		.card img {
		  display: block;
		  object-fit: cover;
		  width: 100%;
		  height: 100%;
		  max-height: 40vh;
		}
		.card .placeholder {
		  background-repeat: no-repeat;
		  background-size: cover;
		  background-position: center;
		  position: absolute;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		 
		}
		.card main {
		  padding: 1rem;
		  background-color: var(--app-card-color);
		}
		/**
		  * Persist animation using : animation-fill-mode set to forward 
		  * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
		  */
		.fade {
		  -webkit-animation: fadeout 2s forwards; /* Safari and Chrome */
		  -moz-animation: fadeout 2s forwards; /* Firefox */
		  -ms-animation: fadeout 2s forwards; /* Internet Explorer */
		  -o-animation: fadeout 2s forwards; /* Opera */
		  animation: fadeout 2s forwards;
		}
		
		/* Key frame animation */
		@keyframes fadeout {
		  from { opacity: 1; }
		  to   { opacity: 0; }
		}
		
		/* Firefox */
		@-moz-keyframes fadeout {
		  from { opacity: 1; }
		  to   { opacity: 0; }
		}
		
		/* Safari and Chrome */
		@-webkit-keyframes fadeout {
		  from { opacity: 1; }
		  to   { opacity: 0; }
		}
		
		@media (min-width: 600px) {
		
		}
		
		/* Wide layout: when the viewport width is bigger than 460px, layout
		changes to a wide layout. */
		@media (min-width: 460px) {
		  .card {
			flex-basis: 21%;
			margin: 2%;
		  }
		  .card figure {
			min-height: 20vh;
			height: 20vh;
			overflow: hidden;
		  }
}
		`};




    initElement(title,id) {
        this.title = title;
        this.id= id
    }
    deleteElement() {
        this.shadowRoot.querySelector('button').addEventListener('delete-element', () =>{
            let id = this.this.shadowRoot.querySelector('button').value;
            fetch('http://localhost:3000/elements/'+id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: inputdata.value})
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            });

        })};


    render(){
        return html`
            <article class="card">
				<main>
				<h1>${this.title}</h1>
				<button type="submit" value="">delete</button>
				</main>
			</article>
			
			`};
}
customElements.define('app-element', Appelement);