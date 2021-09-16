let isDragging = false,
startPos = 0,
currentTranslate = 0,
prevTranslate = 0,
animationID = 0,
selectedCard = ''

const touchStart = (e) => {    
    isDragging = true
    startPos = e.pageX
    
    if (e.target.tagName === "P") {
      selectedCard = e.target.parentNode
      
    //   console.log(e.target.parentNode.classList)

      if (!selectedCard.classList.contains('fully-dragged')) {
        currentTranslate = 0
        prevTranslate = 0 
      } else {
        currentTranslate = -50
        prevTranslate = -50
        selectedCard.classList.remove('fully-dragged')
      }

      animationID = requestAnimationFrame(animation)
    }
  }

  const touchMove = (e) => {
    if (isDragging) {
      currentTranslate = prevTranslate + e.pageX - startPos
    } 

    if (currentTranslate <= -40) {
      currentTranslate = -50
    } 

    if (currentTranslate > 0) {
      currentTranslate = 0
    }
  }
  
  const touchEnd = () => {   
    isDragging = false
    cancelAnimationFrame(animationID)

    prevTranslate = currentTranslate
    
    if (currentTranslate > -40) {
      currentTranslate = 0
      prevTranslate = 0
    }

    if (currentTranslate < 0) {
      selectedCard.classList.add('fully-dragged')
    }

  }

  const animation = () => {
    selectedCard.style.transform = `translateX(${currentTranslate}px)`
    
    if (isDragging) {
      requestAnimationFrame(animation)
    }
  }


const setDragged = () => {
    if (currentTranslate === 0 && prevTranslate === 0) {
        return false
      } else {
        return true
      }
}

export { touchStart, touchMove, touchEnd, setDragged  }