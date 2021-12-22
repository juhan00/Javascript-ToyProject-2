//드래그
(function(){
  const dragItem = document.querySelector(".drag_bar");
  const container = document.querySelector(".account_history");
  const indiEl = document.querySelector(".indi");
  const headerEl = document.querySelector("header");
  let blankHeight = indiEl.clientHeight + headerEl.clientHeight;
  let itemStartPosition = container.offsetTop;
  let itemDrageHeight = itemStartPosition - blankHeight;
  let itemHeight = container.clientHeight;
  let itemMaXHeight = window.innerHeight - blankHeight;
  let speedTime = 300;
  let activeItem = null;
  let active = false;
  let yOffset, initialY, currentY;
  

  container.addEventListener('touchstart', dragStart, false);
  container.addEventListener('touchend', dragEnd, false);
  container.addEventListener('touchmove', drag, false);
  container.addEventListener('mousedown', dragStart, false);
  container.addEventListener('mouseup', dragEnd, false);
  container.addEventListener('mousemove', drag, false);

  //드래그 시작
  function dragStart(e) {
    
    activeItem = container;  

    if (e.target === dragItem) {
      active = true;    
    }

    console.log(`드래그:${e.type}`);
    
    if (activeItem !== null) {

      //타겟 세로 위치 0
      if (!yOffset) {
        yOffset = 0;
      }
      
      //타겟 초기 세로 위치
      if (e.type === 'touchstart') {
        //터치 세로위치에서 움직임 값 빼서 초기 위치 계산
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialY = e.clientY - yOffset;
      }

    }

  }

  //드래그 중
  function drag(e) {
    if (active) {
      console.log(`드래그중:${e.type}`);

      //타겟 세로 움직인 거리 계산
      if (e.type === 'touchmove') {
        e.preventDefault();
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentY = e.clientY - initialY;
      }

      if(currentY <= -itemDrageHeight){//최대 높이까지 오면
        moveMotion(false);
        // openTranslate(activeItem);
        setTranslate(activeItem, 0 , 'open');
        return;
      }else if(currentY === 0){//최소 높이까지 오면
        moveMotion(false);
        // closeTranslate(activeItem);
        setTranslate(activeItem, 0 , 'close');
        return;
      }else if(currentY < 0){//최소 높이 이하를 제외한 경우
        //타겟 y축 움직인 값 저장하기
        yOffset = currentY;   
        moveMotion(false);  
        //드래그 모션 실행
        setTranslate(activeItem, currentY);
      }

    }
  }
  
  //드래그 끝
  function dragEnd(e) {
    if (active) {
      console.log(`드래그끝:${e.type}`);

      if(currentY > -(itemDrageHeight/2)){//드래그 영역 1/2 아래일 경우
        yOffset = 0;
        moveMotion(true);
        setTranslate(activeItem, 0 , 'close'); 
      }else{//드래그 영역 1/2 이상일 경우
        if(yOffset !== 0){
          yOffset = -250;
          moveMotion(true);
          setTranslate(activeItem, 0 , 'open'); 
        }   
      }

      activeOff();
    }
  }

  //드래그 모션
  function setTranslate(el, yMove, openStatus) {
    if(openStatus === 'open'){
      // el.style.transform = `translateY(${-itemDrageHeight}px)`;
      el.style.height = `${itemMaXHeight}px`;
      activeOff(el);
    }else if(openStatus === 'close'){
      // el.style.transform = `translateY(0px)`;
      el.style.height = `${itemHeight}px`;
      activeOff(el);
    }else{
      el.style.height = `${itemHeight - yMove}px` ;
      //el.style.transform = `translateY(${yMove}px)`;

    }    
  }

  function activeOff(){
    active = false;
    //activeItem = null;
  }

  function moveMotion(use){
    if(use === true){
      activeItem.style.transition = `all ${speedTime}ms ease`;
    }else{
      activeItem.style.transition = 'none';  
    }
  }
 
}());
