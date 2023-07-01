### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  Using Promises or using async functions

- What is a Promise?
  A promise is one-time guarantee of future value. They are objects in JS.

- What are the differences between an async function and a regular function?
  async functions always return promises.  Inside of an async function you can use the await keyword to pause until the promise is resolved before moving onto the next line of code.

- What is the difference between Node.js and Express.js?
  Node is a JavaScript environment that runs server-side
  Express is a framework you can use in Node to build your routes. It is similar to Flask for Python.

- What is the error-first callback pattern?
  A function which either returns an error object or any successful data returned by the function. The first argument in the function is reserved for the error object. If any error has occurred during the execution of the function, it will be returned by the first argument.

- What is middleware?
  It is code that runs in the middle of the request / response cycle

- What does the `next` function do?
  The next function is very useful for error handling, when an error is it the next will move on to the code which handles the response.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  Instead of writing the same line three times, a loop should be used.
  Use Promise.all to run the requests in parallel instead of awaiting each line before running the next request.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
