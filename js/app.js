import AppCard from '/js/component/card/card.js';
import { openDB } from '../node_modules/idb/build/esm/index.js';
import checkConnectivity from "./connection.js";

(async function(document){
	const app = document.querySelector('#app');
	const skeleton = app.querySelector('.skeleton');
	const listPage = app.querySelector('[page=list]');

	checkConnectivity();
	document.addEventListener('connection-changed',({detail}) => {
        console.log(detail)
    })

	skeleton.removeAttribute('active');
	listPage.setAttribute('active', '');

	// const data = await fetch('/data/spacex.json');
	//
	// const json = await data.json();

	// Load Card CSS

	try {
        const data = await fetch('data/spacex.json');

        const json = await data.json();

        const database = await openDB('app-store', 1, {
            upgrade(db) {
                db.createObjectStore('articles')
            }
        });
        if(navigator.onLine){
            await database.put('articles', json, 'articles');
        }

        const articles = await database.get('articles', 'articles');

        const cards = articles.map(item => {

            const cardElement= new AppCard();

            cardElement.initCard(item.image,
                item.placeholder,
                item.content.title,
                item.content.description,
                cardElement);

            listPage.appendChild(cardElement);

            //feature detection if IntersectionObserver is not available
            if (!IntersectionObserver in window) {
                //const image = cardElement.querySelector('img');
                cardElement.swapImage();
            }

            return cardElement;
            // setTimeout(() => {
            // 	const image = cardElement.querySelector('img');
        });
        const callback = function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.addEventListener('image-loaded', card.swapImage());
                    // const src = image.dataset.src;
                    // image.src = src;
                    //
                    // image.onload = () => {
                    //     image.parentNode
                    //         .querySelector('.placeholder')
                    //         .classList.add('fade');
                    // }
                }
            });
        }
            const io = new IntersectionObserver(callback);

            cards.forEach(card => {
                io.observe(card);
            });
    }catch(error){
		console.error(':)',error);
	}




	// debugger;
})(document);