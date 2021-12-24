//드래그
function dragMotion(dragItem, container){
  const dragItemEl = dragItem;
  const containerEl = container;
  const indiEl = document.querySelector(".status_bar");
  const headerEl = document.querySelector("header");
  const blankHeight = indiEl.clientHeight + headerEl.clientHeight;
  
  const itemStartPosition = containerEl.offsetTop;
  const itemDrageHeight = itemStartPosition - blankHeight;
  const itemHeight = containerEl.clientHeight;
  const itemMaXHeight = window.innerHeight - blankHeight;
  const speedTime = 300;
  let activeItem = null;
  let active = false;
  let yOffset, initialY, currentY;

  containerEl.addEventListener('touchstart', dragStart, false);
  containerEl.addEventListener('touchend', dragEnd, false);
  containerEl.addEventListener('touchmove', drag, false);

  //드래그 시작
  function dragStart(e) {
    activeItem = containerEl;  
    if (e.target === dragItemEl) {
      active = true;    
    }
    if (activeItem !== null) {
      if (!yOffset) {
        yOffset = 0;
      }
      if (e.type === 'touchstart') {
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialY = e.clientY - yOffset;
      }
    }
  }

  //드래그 중
  function drag(e) {
    if (active) {
      if (e.type === 'touchmove') {
        e.preventDefault();
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentY = e.clientY - initialY;
      }
      if(currentY <= -itemDrageHeight){
        moveMotion(false);
        setTranslate(activeItem, 0 , 'open');
        return;
      }else if(currentY === 0){
        moveMotion(false);
        setTranslate(activeItem, 0 , 'close');
        return;
      }else if(currentY < 0){
        yOffset = currentY;   
        moveMotion(false);  
        setTranslate(activeItem, currentY);
      }      
    }
  }

  //드래그 끝
  function dragEnd(e) {
    if (active) {
      if(currentY > -(itemDrageHeight/2)){
        yOffset = 0;
        moveMotion(true);
        setTranslate(activeItem, 0 , 'close'); 
      }else{
        if(yOffset !== 0){
          yOffset = -250;
          moveMotion(true);
          setTranslate(activeItem, 0 , 'open'); 
        }   
      }
      activeOff();
    }
  }

  //드래그 컨테이너 크기 변경
  function setTranslate(el, yMove, openStatus) {
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

  //드래그 활성화 끄기
  function activeOff(){
    active = false;
  }

  //드래그 모션 설정
  function moveMotion(use){
    if(use === true){
      activeItem.style.transition = `all ${speedTime}ms ease`;
    }else{
      activeItem.style.transition = 'none';  
    }
  }
}
