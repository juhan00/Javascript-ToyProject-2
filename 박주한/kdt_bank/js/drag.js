//드래그
function dragMotion(dragItem, container, direction){
  const dragItemEl = document.querySelector(dragItem);
  const containerEl = document.querySelector(container);
  const moveDirection = direction;
  const indiEl = document.querySelector(".indi");
  const headerEl = document.querySelector("header");
  const blankHeight = indiEl.clientHeight + headerEl.clientHeight;
  const itemStartPosition = containerEl.offsetTop;
  const itemDrageHeight = itemStartPosition - blankHeight;
  const itemHeight = containerEl.clientHeight;
  const itemMaXHeight = window.innerHeight - blankHeight;
  const speedTime = 300;
  let activeItem = null;
  let active = false;
  let xOffset, initialX, currentX, yOffset, initialY, currentY;
  

  containerEl.addEventListener('touchstart', dragStart, false);
  containerEl.addEventListener('touchend', dragEnd, false);
  containerEl.addEventListener('touchmove', drag, false);

  //드래그 시작
  function dragStart(e) {
    
    activeItem = containerEl;  

    if (e.target === dragItemEl) {
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
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

    }

  }

  //드래그 중
  function drag(e) {
    if (active) {
      console.log(`드래그중:${e.type}`);

      //타겟 움직인 거리 계산
      if (e.type === 'touchmove') {
        e.preventDefault();
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      // if(moveDirection === 'yMove'){
        if(currentY <= -itemDrageHeight){//최대 높이까지 오면
          moveMotion(false);
          setTranslate(activeItem, 0 , 'open');
          return;
        }else if(currentY === 0){//최소 높이까지 오면
          moveMotion(false);
          setTranslate(activeItem, 0 , 'close');
          return;
        }else if(currentY < 0){//최소 높이 이하를 제외한 경우
          //타겟 y축 움직인 값 저장하기
          yOffset = currentY;   
          moveMotion(false);  
          //드래그 모션 실행
          setTranslate(activeItem, currentY);
        }
      // }
      

    }
  }
  
  //드래그 끝
  function dragEnd(e) {
    if (active) {
      console.log(`드래그끝:${e.type}`);

      if(moveDirection === 'yMove'){
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
      }

      activeOff();
    }
  }

  //드래그 모션
  function setTranslate(el, yMove, openStatus) {
    if(moveDirection === 'yMove'){
      if(openStatus === 'open'){
        el.style.height = `${itemMaXHeight}px`;
        activeOff(el);
      }else if(openStatus === 'close'){
        el.style.height = `${itemHeight}px`;
        activeOff(el);
      }else{
        el.style.height = `${itemHeight - yMove}px` ;
      }    
    }
  }

  function activeOff(){
    active = false;
  }

  function moveMotion(use){
    if(use === true){
      activeItem.style.transition = `all ${speedTime}ms ease`;
    }else{
      activeItem.style.transition = 'none';  
    }
  }
 
}
