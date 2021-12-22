//각 계좌정보 셋팅 클래스
class SetAccount{
  constructor(data){
    this.accountNum = data.accountNum;
    this.accountName = data.accountName;
    this.accountCash = data.accountCash;
    this.useGoal = data.useGoal;
    this.useCash = data.useCash;
    this.useColor = data.useColor;
    this.saveList = data.saveList;
    this.accountHistory = data.accountHistory;
  }

  //콤마 추가
  accountCashAddComma(data){
    const str = `${data}`;
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  setDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const setDate = {day:day, month:month, year:year, date:date}
    return setDate;
  }

  //이번달 남은 일수 계산하기
  dayLeft(){
    const totalDay = new Date(this.setDate().year,this.setDate().month,0).getDate();
    return totalDay - this.setDate().day;
  }
  //이번달 남은 돈
  cashLeft(){
    return this.useGoal - this.useCash;
  }
  //목표금액 사용량
  cashAmount(){
    return (this.useCash/this.useGoal) * 100;
  }
  //저금통 저장량
  saveAmount(saveGoal, saveCash){
    return (saveCash/saveGoal) * 100;
  }

  //recent 날짜 역순 정렬
  recentReverse(){
    let sortAccountHistory = this.accountHistory.sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });

    return sortAccountHistory;
  }

  //recent 날자별 지출
  sumDateUseCash(date){
    const dayHistoryList = this.accountHistory.filter(arr => {
      return arr.date === date;
    });

    let sumUseCash = 0;

    dayHistoryList.forEach(arr => {
      if(arr.income === 'out'){
        sumUseCash += arr.price;
      }   
    });  
    return this.accountCashAddComma(sumUseCash);
  }

  //지출 income 체크
  checkIncome(cash, income){
    if(income === 'in'){
      return `<strong class="orange">+${cash}</strong>`;
    }else{
      return `<strong>${cash}</strong>`;
    }
  }

  //몇일전 표시
  changeDayAgo(date){
    function setDays(date, days) { 
      const clone = new Date(date); 
      clone.setDate(date.getDate() + days); 
      return clone; 
    }
    const today = new Date();
    const daysAgo0 = setDays(today, 0).toISOString().split("T")[0];
    const daysAgo1 = setDays(today, -1).toISOString().split("T")[0];
    const daysAgo2 = setDays(today, -2).toISOString().split("T")[0];
    const daysAgo3 = setDays(today, -3).toISOString().split("T")[0];
    const daysAgo4 = setDays(today, -4).toISOString().split("T")[0];
    const daysAgo5 = setDays(today, -5).toISOString().split("T")[0];

    if(daysAgo0 === date){
      return '오늘';
    }else if(daysAgo1 === date){
      return '어제';
    }else if(daysAgo2 === date){
      return '2일전';
    }else if(daysAgo3 === date){
      return '3일전';
    }else if(daysAgo4 === date){
      return '4일전';
    }else if(daysAgo5 === date){
      return '5일전';
    }else{
      return date;
    }  
  }

}

// // json 데이터 가져오기 로컬
// fetch('../json/accounts.json')
//   .then(res => res.json())
//   .then(obj => {setMain(obj)});

// json 데이터 가져오기 서버
fetch('https://05castle.github.io/team-study/accounts.json')
  .then(res => res.json())
  .then(obj => {setMain(obj)});



//메인화면 생성
function setMain(obj){
  // 돔 준비
  const homeEl = document.querySelector('.home');
  const homeSectionEl = homeEl.querySelector('section');

  const accountList = [];
  
  //계좌들을 분리해서 setAccount 이후 배열로 저장
  for(let i = 0; i < obj.accounts.length; i++){
    //계좌별 셋팅 후 배열 정보로 저장
    accountList.push(new SetAccount(obj.accounts[i]));

    if(i !== 0){
      //클론 만들기
      const cloneSection = homeSectionEl.cloneNode(true);
      homeEl.appendChild(cloneSection);
    }

    // 상단 데이터
    const currentSectionEl = document.querySelector(`section:nth-child(${i+1})`);
    const accountNameEl = currentSectionEl.querySelector('header h3');
    const accountNumEl = currentSectionEl.querySelector('.account_info .info .num');
    const accountCashEl = currentSectionEl.querySelector('.account_info .info > .cash');
    const barColorEl = currentSectionEl.querySelector('.account_info .info .graph .bar_color');
    const notiDateEl = currentSectionEl.querySelector('.account_info .info .noti .date');
    const notiCashEl = currentSectionEl.querySelector('.account_info .info .noti .cash');

    accountNameEl.innerText = accountList[i].accountName; 
    accountNumEl.innerText = accountList[i].accountNum; 
    accountCashEl.innerHTML = `${accountList[i].accountCashAddComma(accountList[i].accountCash)}<span>원</span>`; 
    notiDateEl.innerText = accountList[i].dayLeft(); 
    notiCashEl.innerText = accountList[i].cashLeft(); 
    barColorEl.style.width = `${accountList[i].cashAmount()}%`; 
    barColorEl.style.backgroundColor = accountList[i].useColor; 




    //히스토리 영역
    const historyEl = currentSectionEl.querySelector('.account_history');
    

    //저금통 영역
    const saveItemAreaEl = currentSectionEl.querySelector('.save_list .scroll_area');
    const saveItemUlEl = document.createElement('ul');//저금통 ul 생성
    saveItemAreaEl.insertBefore(saveItemUlEl, saveItemAreaEl.firstChild);//저금통 ul 버튼앞에 넣기
    
    const saveList = accountList[i].saveList;
    
    saveList.forEach(item => {
      const saveItemliEl = document.createElement('li');//저금통 ul 생성
      saveItemUlEl.appendChild(saveItemliEl);//저금통 li 넣기
      const saveTitle = item.title;
      const saveGoal = item.saveGoal;
      const saveCash = item.saveCash;
      const saveColor = item.color;
      const saveAmount = accountList[i].saveAmount(saveGoal, saveCash);

      const saveItemHtml = 
      `
      <div class="save_item">
        <div class="title">
          <h4>${saveTitle}</h4>
          <strong>${accountList[i].accountCashAddComma(saveCash)}</strong>
        </div>
        <div class="color" style="background-color:${saveColor};width:${saveAmount}%;"></div>
      </div>
      `;//저금통 html'

      saveItemliEl.innerHTML = saveItemHtml;//저금통 li에 html 넣기 
    });


    //recent 영역
    const recentUlEl = document.createElement('ul');//recent ul 생성
    recentUlEl.classList.add('recent');
    historyEl.appendChild(recentUlEl);//히스토리에 recent ul 넣기
    

    let sortAccountHistory = accountList[i].recentReverse();//데이터 역순 정렬 받아오기
    let historyDate = null;
    let dateIndex = 0;

    sortAccountHistory.forEach(item => {
  
      if(historyDate !== item.date){//현재 배열 날짜가 historyDate와 같지 안을때    
        const recentLiEl = document.createElement('li');//recent li 생성
        recentUlEl.appendChild(recentLiEl);//recent ul에 li 넣기

        const recentTitEl = document.createElement('div');//recent title div생성
        recentTitEl.classList.add('recent_tit');
        recentLiEl.appendChild(recentTitEl);
        const recentTitHtml =
        `
          <h4>${accountList[i].changeDayAgo(item.date)}</h4>
          <strong>${accountList[i].sumDateUseCash(item.date)}원 지출</strong>
        `;
        recentTitEl.innerHTML = recentTitHtml;//recent title 넣기

        const recentInnerUlEl = document.createElement('ul');//recent inner ul 생성
        recentInnerUlEl.classList.add('recent_list');
        recentLiEl.appendChild(recentInnerUlEl);//recent li에 inner ul 넣기
        const recentInnerLiEl = document.createElement('li');//recent inner li 생성   
        recentInnerUlEl.appendChild(recentInnerLiEl);//recent inner ul에 inner li 넣기
        recentInnerLiEl.innerHTML = `${item.history} ${accountList[i].checkIncome(item.price, item.income)}`;  

        dateIndex = dateIndex + 1;
      }else{          
        const recentInnerLiEl = document.createElement('li');//recent inner li 생성   
        const recentInnerUlEl = currentSectionEl.querySelector(`.recent li:nth-child(${dateIndex}) .recent_list`);      
        recentInnerUlEl.appendChild(recentInnerLiEl);//recent inner ul에 inner li 넣기
        recentInnerLiEl.innerHTML = `${item.history} ${accountList[i].checkIncome(item.price, item.income)}`;//inner li에 데이터 넣기
      }    
      historyDate = item.date; //historyDate에 현재 배열 날짜 넣기
      
    });

  }
}






