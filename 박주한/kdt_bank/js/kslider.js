const kSlider = function(target, option) {
  
  // const toBeLoaded = document.querySelectorAll(`${target} img`);
  // let loadedImages = 0;
  // toBeLoaded.forEach(item => {
  //   item.onload = () => {
  //     loadedImages += 1;
  //     if(loadedImages === toBeLoaded.length){
  //       innerName(target, option);
  //     }else{
  //       return;
  //     }
  //   }
  // });


  //이미지 로드 여부
  window.onload = (function(target, option){
    return () => {
      innerName(target, option);
    }
  })(target, option);

  // innerName(target, option);


  // 돔 준비
  function innerName(target, option) {
    const slider = document.querySelector(`${target}`);
    slider.classList.add('k_list');

    
    const kindSlider = document.createElement('div');
    const kindWrap = document.createElement('div');
    
    slider.parentNode.insertBefore(kindWrap, slider);
    kindSlider.className = 'kind_slider';
    kindWrap.className = 'kind_wrap';
    kindSlider.appendChild(slider);
    kindWrap.appendChild(kindSlider);
  
    const moveButton = document.createElement('div');
    moveButton.className = 'arrow';
    const prevA = document.createElement('a');
    const nextA = document.createElement('a');
    moveButton.className = 'arrow';
    prevA.className = 'prev';
    nextA.className = 'next';
    prevA.textContent = '이전';
    nextA.textContent = '다음';
    prevA.href = '';
    nextA.href = '';
    moveButton.appendChild(prevA);
    moveButton.appendChild(nextA);
    kindWrap.appendChild(moveButton);


    const slideLis = slider.querySelectorAll('.k_list > *');
    
    const liWidth = slideLis[0].clientWidth;
    
    slideLis.forEach( item => {
      item.classList.add('k_item');
      item.style.width = `${liWidth}px`;
    });
    
    // 옵션 예외처리와 셋팅
    const OPTION = (option => {
      const OPTION = {...option};//option 객체를 새 메모리에 복사?
      if (OPTION.speed <= 0){
        throw new Error('0 이상의 값을 사용하세요');//에러 메시지 출력
      }else{
        return Object.freeze(OPTION);//값을 동결?
      }
    })(option);

    let moveDist = -liWidth;
    let currentNum = 1;
    let speedTime = OPTION.speed;

  

    // 클론 만들기
    const cloneA = slideLis[0].cloneNode(true);
    const cloneC = slideLis[slideLis.length - 1].cloneNode(true);
    slider.insertBefore(cloneC, slideLis[0]);
    slider.appendChild(cloneA);
  
    // 넓이 구하기
    const slideCloneLis = slider.querySelectorAll('.k_list > *');
    
    const sliderWidth = liWidth * slideCloneLis.length;
    
    slider.style.width = sliderWidth + 'px';
    slider.style.left = `${moveDist}px`;

    moveButton.addEventListener('click', moveSlide);

    function moveSlide(e){
      e.preventDefault();//a 태그 새로고침 막기
      // debugger; 코드 멈춤 

      if(e.target.className === 'next'){ 
        move(-1);
        if(currentNum === (slideCloneLis.length - 1)){
          setTimeout(() => {
            slider.style.transition = 'none';
            moveDist = -liWidth;
            slider.style.left = `${-liWidth}px`;
            currentNum = 1;
          }, speedTime);
        }
      }else{  
        move(1);
        if(currentNum === 0){  
          setTimeout(() => {
            slider.style.transition = 'none';
            moveDist = -liWidth * (slideCloneLis.length - 2);
            slider.style.left = `${moveDist}px`;
            currentNum = slideCloneLis.length - 2;
            
          }, speedTime);
        } 
      }

      function move(direction){        
        currentNum += (-1 * direction)
        moveDist += liWidth * direction;
        slider.style.transition = `all ${speedTime}ms ease`;
        slider.style.left = `${moveDist}px`; 
      }

    }
  }

  dragMotion('.home section', '.home', 'xMove');//슬라이드 드래그 시작
  
  
}