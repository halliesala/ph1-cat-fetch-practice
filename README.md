# Fetch Practice

## Getting Started

To get started, run json-server with `json-server --watch db.json`. If you cannot run the server, first install the json-server package with `npm install -g json-server`.

You'll be writing all of your code in `src/index.js` with the exception of certain bonus deliverables.

## Core Deliverables

### Get Cat Facts

Make a fetch request to `http://localhost:3000/facts`. The response will include an array of cat fact objects. For each cat fact, make a new `<p>` with textContent for the fact and append it to the `#cat-facts` div.

### Get Cat Tasks

Make a fetch request to `http://localhost:3000/tasks`. The response will include an array of tasks to do for the cats (these are js objects). For each task, make a new `<li>` with textContent for the task and append it to the `#cat-tasks` div.

### Get Cat Names

Make a fetch request to `http://localhost:3000/names`. The response will include an array of objects which include keys for `name` and `title`. In the `cat-names` div append an `<h2>` for each name AND an `<h3>` for each title so it reads like this:

```html
<h2>Octavia</h2>
<h3>Meowing Queen</h3>

<h2>Ursula</h2>
<h3>Baroness of Scritches</h3>
```

### Get Cat Pictures

Make a fetch request to `http://localhost:3000/pictures`. The response will include an array of objects with `img_url` keys. For each `img_url` create a new image with a `src` attribute of the `img_url` and append it to the `#cat-pics` div.

### BONUS Cross Out List Items

When a task `<li>` in the `#cat-tasks` div is clicked, change its style so that it is crossed out. If clicked again, it becomes uncrossed.

## Hints

1. Always console.log the data you get back from the server! Every fetch will return something slightly different so be sure you know what you're getting and how to get to the inner data such as the name, title, fact, etc.

2. You will have to iterate (using a `for` loop or `.forEach`) with every single deliverable.

3. Be clear on what you're making and where it's going! You may have to make more than one element when looping through the array.

4. If you get stuck, don't forget you're allowed to look things up! Syntax is something that's especially easy to find on the internet.

### Advanced BONUS Deliverables

Only attempt these deliverables once you've learned the `POST` method!

1. Create a new form in `index.html`:

```html
<form>
  <input type="text" placeholder="add an image url"/>
  <input type="submit" value="Add Photo"/>
</form>
```

When the form is submitted, create a new image tag with a `src` of the url the user typed into the form. This image gets appended to . Additionally, make a POST request to `http://localhost:3000/pictures` with these headers:

```js
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

and a body similar to this one:

```js
body: JSON.stringify({ img_url: "http://catphotos.com/example.url" })
```

2. Create a similar form for the task list. When the form is submitted, make a similar POST request with a body similar to this one:

```js
body: JSON.stringify({ content: "Play with the cattos!" })
```

Additionally, be sure to append the new task item to the task list.
