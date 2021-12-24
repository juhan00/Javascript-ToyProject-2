const kSlider = function(target, option) {
  
  innerName(target, option);

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
    prevA.innerHTML = '이전';
    nextA.innerHTML = '다음';
    prevA.href = '';
    nextA.href = '';
    moveButton.appendChild(prevA);
    moveButton.appendChild(nextA);
    kindWrap.appendChild(moveButton);

    const slideLis = slider.querySelectorAll('.k_list > *');
    const liWidth = document.body.offsetWidth;    
    setScreenWidth(slideLis, liWidth);
    
    const OPTION = (option => {
      const OPTION = {...option};
      if (OPTION.speed <= 0){
        throw new Error('0 이상의 값을 사용하세요');
      }else{
        return Object.freeze(OPTION);
      }
    })(option);

    let moveDist = -liWidth;
    let currentNum = 1;
    let speedTime = OPTION.speed;

    const cloneA = slideLis[0].cloneNode(true);
    const cloneC = slideLis[slideLis.length - 1].cloneNode(true);
    slider.insertBefore(cloneC, slideLis[0]);
    slider.appendChild(cloneA);
  
    const slideCloneLis = slider.querySelectorAll('.k_list > *');
    const sliderWidth = liWidth * slideCloneLis.length;
    
    slider.style.width = sliderWidth + 'px';
    slider.style.left = `${moveDist}px`;

    moveButton.addEventListener('click', moveSlide);  

    function moveSlide(e){
      e.preventDefault();

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

  function setScreenWidth(el, liWidth){ 
    el.forEach( item => {
      item.classList.add('k_item');
      item.style.width = `${liWidth}px`;
    });
  }

  window.addEventListener('resize', function() { 
    window.location.href=window.location.href;
  }, true);
}

