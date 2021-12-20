// const requestURL = "../account.json";
// const requestObject = new XMLHttpRequest();
// requestObject.open('GET', requestURL);
// requestObject.responseType = 'json';
// requestObject.send();
// requestObject.onload = () => {
//   StaticRange(requestObject.responseType.response);
// }

fetch("https://05castle.github.io/team-study/accounts.json")
  .then(res => res.json())
  .then(obj => { start(obj) });

  function start(){}