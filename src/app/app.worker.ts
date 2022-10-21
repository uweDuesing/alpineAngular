/// <reference lib="webworker" />

addEventListener('message', ({data}) => {


  setTimeout(() => {
    const response = `worker response to ${data}`;
    postMessage(response);
  }, 10000)


});
