// 드래그(영역 확장) 기능
const dragEl = document.querySelector('.drag_bar')
const hisEl = document.querySelector('.account_history')

dragEl.addEventListener('click', function () {
  hisEl.classList.toggle('expand')
})



// JSON 연동
fetch('/accounts.json')
  .then(res => res.json())
  .then(accountData => {
    startJsonInput(accountData);
  })


function startJsonInput(accData) {
  const firstAccount = accData['accounts'][0]

  // 헤더 계좌 이름 집어넣기
  const h3El = document.querySelector('header h3');
  h3El.innerText = firstAccount['accountName'];


  // 계좌 정보 반영하기
  const accNum = document.querySelector('.account_info .num strong');
  const accCash = document.querySelector('.account_info .cash');
  const barColorEl = document.querySelector('.bar_color')
  const barGoalEl = document.querySelector('.use_cash')
  const barPer = `${firstAccount['useCash']/firstAccount['useGoal']*100}`
  function addComma(won) {
    const str = `${won}`
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

  accNum.innerText = firstAccount['accountNum'];
  accCash.innerHTML = addComma(`${firstAccount['accountCash']} <span>원</span>`)
  barColorEl.style.width = `${barPer}%`
  barColorEl.style.backgroundColor = `${firstAccount['useColor']}`
  barGoalEl.style.left = `calc(${barPer}% - 4px)`


  // 저금통 만들기
  const saveUl = document.querySelector('.save_item')
  for (let i = 0; i < firstAccount['saveList'].length; i++){
    const saveLi = document.createElement('li')
    const saveDiv = document.createElement('div')
    const saveTitle = document.createElement('p')
    const saveCash = document.createElement('span')
    const savePer = `${firstAccount['saveList'][i]['saveCash']/firstAccount['saveList'][i]['saveGoal']*100}`
  
    saveUl.appendChild(saveLi)
    saveLi.appendChild(saveDiv)
    saveDiv.appendChild(saveTitle)
    saveDiv.appendChild(saveCash)
  
    saveTitle.innerText = firstAccount['saveList'][i]['title']
    saveCash.innerHTML = `${firstAccount['saveList'][i]['saveCash']}원`
    saveDiv.style.width = `${savePer}%`
    saveDiv.style.backgroundColor = `${firstAccount['saveList'][i]['color']}`
  }


  // 사용 내역 배열 역순
  const historyArr = firstAccount['accountHistory']
  const reverseArr = historyArr.reverse()
  
  // 사용 내역 영역 만들기
  const recentUl = document.querySelector('.recent')
  let day = ''
  let listIndex = 0

  for (let i = 0; i < reverseArr.length; i++) {
    const recentHistory = reverseArr[i]['history']
    const historyDate = reverseArr[i]['date']
    const historyPrice = reverseArr[i]['price']
    const incomeOrNot = reverseArr[i]['income']
    const newRecentList = document.createElement('ul')
    const newDayTitle = document.createElement('div')
    const newHistory = document.createElement('li')
    
    // 인컴 확인하는 함수
    function checkIncome(history) {
      if (incomeOrNot === 'in') {
        history.innerHTML = addComma(`${recentHistory}<span class="income">+ ${historyPrice}</span>`)
      } else {
        history.innerHTML = addComma(`${recentHistory}<span>${historyPrice}</span>`)
      }
    }
    
    // 해당 날짜 지출내역 추려서 합산하는 함수
    function sumSpending (accountHistory, date) {
      const spendHistory = accountHistory.filter(arr => arr.income === 'out' && arr.date === date)
      const totalSpending = spendHistory.reduce((total, current) => total + current.price, 0)
      return addComma(totalSpending)
    }

    // 사용 내역 집어넣기
    if (day !== historyDate) { 
      const newDayBoundary = document.createElement('li')
      recentUl.appendChild(newDayBoundary)
      
      newDayBoundary.appendChild(newDayTitle)
      newDayTitle.classList.add('recent_tit')
      newDayTitle.innerHTML = `${historyDate}<span>${sumSpending(reverseArr, historyDate)}원 지출</span>`
      
      newDayBoundary.appendChild(newRecentList)
      newRecentList.classList.add('recent_list')
      newRecentList.appendChild(newHistory)
      checkIncome(newHistory)
      
      day = historyDate
      listIndex++
    } else {
      const recentList = document.querySelector(`.recent li:nth-child(${listIndex}) .recent_list`)
      recentList.appendChild(newHistory)
      checkIncome(newHistory)
    }
  }
}