import Appelement from '/js/component/listelement/element.js';
import { openDB } from '../node_modules/idb/build/esm/index.js';

(async function(document) {
    const app = document.querySelector('#app');
    const skeleton = app.querySelector('.skeleton');
    const listPage = app.querySelector('[page=list]');
    let inputdata = document.getElementById("input");

    skeleton.removeAttribute('active');
    listPage.setAttribute('active', '');

    try {
        const data = await fetch('http://localhost:3000/elements');
        const json = await data.json();

        const database = await openDB('app-new', 1, {
            upgrade(db) {
                db.createObjectStore('elements', {
                    keyPath: 'id',
                    // If it isn't explicitly set, create a value by auto incrementing.
                    autoIncrement: true,
                });
            }
        });
        if(navigator.onLine) {
            await database.put('elements', json, 'elements');
        }
        const elements = await database.get('elements', 'elements');

        const cards = elements.map(item => {

            let elementList = new Appelement();
            elementList.initElement(item.title,item.id);

            listPage.appendChild(elementList);



            return elementList;
        });

        let addinput = document.getElementById("add");

        addinput.addEventListener("click", () => {
            let elementList = new Appelement();
            var request = database.put(inputdata.value);
            fetch('http://localhost:3000/elements', {
                method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({title:inputdata.value})

        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            elementList.initElement(data.title, data.id);

            return data;
        });

        listPage.appendChild(elementList);
        return elementList;
        });

        const deleteelement = document.getElementsByName('button');
        console.log(deleteelement);

        deleteelement.forEach(btn => {
        btn.addEventListener("element-delete", function(e)
            {
                const id = e.dataset.id;
                console.log(id);

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

            })});
            // setTimeout(() => {
            // 	const image = cardElement.querySelector('img');


    }catch(error){
            console.error(':)',error);
        }

})(document);
