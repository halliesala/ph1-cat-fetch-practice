console.log("Welcome to CatGPT")

// ### Get Cat Facts

// Make a fetch request to `http://localhost:3000/facts`. The response will include an array of cat fact objects. For each cat fact, make a new `<p>` with textContent for the fact and append it to the `#cat-facts` div.
const catFactsDiv = document.querySelector('#cat-facts');
fetch('http://localhost:3000/facts')
.then(response => response.json())
.then(data => {
    data.forEach(catFactObject => {
        const catFactText = catFactObject.fact;
        const newP = document.createElement('p');
        newP.textContent = catFactText;
        catFactsDiv.appendChild(newP);
    })
});

// ### Get Cat Tasks

// Make a fetch request to `http://localhost:3000/tasks`. The response will include an array of tasks to do for the cats (these are js objects). For each task, make a new `<li>` with textContent for the task and append it to the `#cat-tasks` div.
const catTasksOl = document.querySelector('#cat-tasks');
fetch('http://localhost:3000/tasks')
.then(resp => resp.json())
.then(data => {
    data.forEach(taskObject => {
        const newLi = document.createElement('li');
        newLi.textContent = taskObject.content;
        catTasksOl.appendChild(newLi);
        addCrossoutEventListener(newLi);
    })
});

// ### Get Cat Names

// Make a fetch request to `http://localhost:3000/names`. The response will include an array of objects which include keys for `name` and `title`. In the `cat-names` div append an `<h2>` for each name AND an `<h3>` for each title so it reads like this:

// ```html
// <h2>Octavia</h2>
// <h3>Meowing Queen</h3>

// <h2>Ursula</h2>
// <h3>Baroness of Scritches</h3>
// ```

const catNamesDiv = document.querySelector('#cat-names');
fetch('http://localhost:3000/names')
.then(resp => resp.json())
.then(data => {
    data.forEach(nameObject => {
        const newh2 = document.createElement('h2');
        newh2.textContent = nameObject.name;
        catNamesDiv.appendChild(newh2);
        const newh3 = document.createElement('h3');
        newh3.textContent = nameObject.title;
        catNamesDiv.appendChild(newh3);
    })
})

// ### Get Cat Pictures

// Make a fetch request to `http://localhost:3000/pictures`. The response will include an array of objects with `img_url` keys. For each `img_url` create a new image with a `src` attribute of the `img_url` and append it to the `#cat-pics` div.
const catPicsDiv = document.querySelector('#cat-pics');
fetch(`http://localhost:3000/pictures`)
.then(resp => resp.json())
.then(data => {
    console.log(data);
    console.log(data[0]);
    console.log(data[0].img_url);
    data.forEach(imgUrlObj => {
        const newImg = document.createElement('img');
        newImg.src = imgUrlObj.img_url;
        catPicsDiv.appendChild(newImg);
    })
})

// ### BONUS Cross Out List Items

// When a task `<li>` in the `#cat-tasks` div is clicked, change its style so that it is crossed out. If clicked again, it becomes uncrossed.

const addCrossoutEventListener = (node) => {
    let isCrossed = false;
    node.addEventListener('click', (e) => {
        node.style.textDecoration = isCrossed? '' : 'line-through';
        isCrossed = !isCrossed;
    })
} 



// ### Advanced BONUS Deliverables

// Only attempt these deliverables once you've learned the `POST` method!

// 1. Create a new form in `index.html`:

// ```html
// <form>
//   <input type="text" placeholder="add an image url"/>
//   <input type="submit" value="Add Photo"/>
// </form>
// ```

// When the form is submitted, create a new image tag with a `src` of the url the user typed into the form. This image gets appended to . Additionally, make a POST request to `http://localhost:3000/pictures` with these headers:

// ```js
// headers: {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
// }
// ```

// and a body similar to this one:

// ```js
// body: JSON.stringify({ img_url: "http://catphotos.com/example.url" })
// ```

const imageForm = document.querySelector('#image-form');
imageForm.addEventListener('submit', (e) => {
    // Add image to page
    e.preventDefault();
    const imgUrl = e.target['text-input'].value;
    const newImg = document.createElement('img');
    // newImg.src = imgUrl;
    //catPicsDiv.appendChild(newImg);
    e.target.reset();

    // Post url to db
    const OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'img_url': imgUrl,
        }),
    }
    fetch(`http://localhost:3000/pictures`, OPTIONS)
    .then(resp => resp.json())
    .then(data => {
        newImg.src = data.img_url;
        catPicsDiv.appendChild(newImg);
    });
})

// 2. Create a similar form for the task list. When the form is submitted, make a similar POST request with a body similar to this one:

// ```js
// body: JSON.stringify({ content: "Play with the cattos!" })
// ```

// Additionally, be sure to append the new task item to the task list.

const taskForm = document.querySelector('#task-form');
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // add new li to page
    const userSubmittedText = e.target['text-input'].value;
    const newLi = document.createElement('li');
    taskForm.reset();
    
    // Post new task to db
    const OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            content: userSubmittedText,
        }),
    };
    fetch(`http://localhost:3000/tasks`, OPTIONS)
    .then(resp => resp.json())
    .then(data => {
        newLi.textContent = data.content;
        catTasksOl.appendChild(newLi);
    });
})


