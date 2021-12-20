// 드래그(영역 확장) 기능

const dragEl = document.querySelector('.drag_bar')
const hisEl = document.querySelector('.account_history')

dragEl.addEventListener('click', function () {
  hisEl.classList.toggle('expand')
})



// JSON 연동

// const requestURL = '/accounts.json';
// const request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function() {
//   const accInfo = request.response;
//   headerInfo(accInfo)
//   accStatus(accInfo)
// }

fetch('https://05castle.github.io/team-study/accounts.json')
  .then(res => res.json())
  .then(accInfo => {
    headerInfo(accInfo),
    accStatus(accInfo)
  })

function headerInfo(info) {
  const h3El = document.querySelector('header h3');
  h3El.innerText = info['accounts'][0]['accountName'];
}

function accStatus(status) {
  const accNum = document.querySelector('.account_info .num strong');
  const accCash = document.querySelector('.account_info .cash');
  accNum.innerText = status['accounts'][0]['accountNum'];
  accCash.innerText = status['accounts'][0]['accountCash'];
}