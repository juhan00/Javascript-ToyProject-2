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
  accountCashAddComma(str){
    return this.accountCash.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  //이번달 남은 일수 계산하기
  dayLeft(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const totalDay = new Date(year,month,0).getDate();

    return totalDay - day;
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
}

//json 데이터 가져오기 로컬
// fetch('../json/accounts.json')
//   .then(res => res.json())
//   .then(obj => {setMain(obj)});

//json 데이터 가져오기 서버
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
    accountCashEl.innerHTML = `${accountList[i].accountCashAddComma()}<span>원</span>`; 
    notiDateEl.innerText = accountList[i].dayLeft(); 
    notiCashEl.innerText = accountList[i].cashLeft(); 
    barColorEl.style.width = `${accountList[i].cashAmount()}%`; 
    barColorEl.style.backgroundColor = accountList[i].useColor; 

    //히스토리 영역
    const historyEl = currentSectionEl.querySelector('.account_history');
    const saveItemAreaEl = currentSectionEl.querySelector('.save_list .scroll_area');
    const saveItemUlEl = document.createElement('ul');//저금통 ul 생성
    saveItemAreaEl.insertBefore(saveItemUlEl, saveItemAreaEl.firstChild);//저금통 ul 버튼앞에 넣기
    
    for (let k = 0; k < accountList[i].saveList.length; k++){//저금통 개수만큼 실행
      const saveItemliEl = document.createElement('li');//저금통 ul 생성
      saveItemUlEl.appendChild(saveItemliEl);//저금통 li 넣기
      
      const saveTitle = accountList[i].saveList[k].title;
      const saveGoal = accountList[i].saveList[k].saveGoal;
      const saveCash = accountList[i].saveList[k].saveCash;
      const saveColor = accountList[i].saveList[k].color;
      const saveAmount = accountList[i].saveAmount(saveGoal, saveCash);

      const saveItemHtml = 
      `<div class="save_item">
        <div class="title">
          <h4>${saveTitle}</h4>
          <strong>${saveCash}</strong>
        </div>
        <div class="color" style="background-color:${saveColor};width:${saveAmount}%;"></div>
      </div>`;//저금통 html'

      saveItemliEl.innerHTML = saveItemHtml;//저금통 li에 html 넣기 
    }

  }
}






