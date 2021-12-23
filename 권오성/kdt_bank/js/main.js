// 드래그(영역 확장) 기능

const dragEl = document.querySelector('.drag_bar')
const hisEl = document.querySelector('.account_history')

dragEl.addEventListener('click', function () {
  hisEl.classList.toggle('expand')
})



// JSON 연동
fetch('https://05castle.github.io/team-study/accounts.json')
  .then(res => res.json())
  .then(accInfo => {
    headerInfo(accInfo),
    accStatus(accInfo),
    saveList(accInfo)
  })


  // 계좌 이름
function headerInfo(info) {
  const h3El = document.querySelector('header h3');
  h3El.innerText = info['accounts'][0]['accountName'];
}


// 계좌 정보
function accStatus(status) {
  const accNum = document.querySelector('.account_info .num strong');
  const accCash = document.querySelector('.account_info .cash');
  const barColorEl = document.querySelector('.bar_color')
  const barGoalEl = document.querySelector('.goal')
  const barPer = `${status['accounts'][0]['useCash']/status['accounts'][0]['useGoal']*100}`
  
  accNum.innerText = status['accounts'][0]['accountNum'];
  accCash.innerHTML = `${status['accounts'][0]['accountCash']} <span>원</span>`
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  barColorEl.style.width = `${barPer}%`
  barColorEl.style.backgroundColor = `${status['accounts'][0]['useColor']}`
  barGoalEl.style.left = `calc(${barPer}% - 4px)`
}


// 저금통
function saveList(item) {
  const saveUl = document.querySelector('.save_item')
  for (let i = 0; i < item['accounts'][0]['saveList'].length; i++){
    const saveLi = document.createElement('li')
    const saveDiv = document.createElement('div')
    const saveTitle = document.createElement('p')
    const saveCash = document.createElement('span')
    const savePer = `${item['accounts'][0]['saveList'][i]['saveCash']/item['accounts'][0]['saveList'][i]['saveGoal']*100}`
  
    saveUl.appendChild(saveLi)
    saveLi.appendChild(saveDiv)
    saveDiv.appendChild(saveTitle)
    saveDiv.appendChild(saveCash)
  
    saveTitle.innerText = item['accounts'][0]['saveList'][i]['title']
    saveCash.innerHTML = `${item['accounts'][0]['saveList'][i]['saveCash']}원`
    saveDiv.style.width = `${savePer}%`
    saveDiv.style.backgroundColor = `${item['accounts'][0]['saveList'][i]['color']}`
  }
}
