// animation pour le titre WILD-E
anime.timeline({loop: true})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 1000,
    offset: '-=600'
  })
  .add({
    targets: '.ml5',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 5000
  })
  ;

// Partie pour faire l'animation de scroll
// objet contenant tous les selecteurs dont on à besoin
  const SELECTORS = { 
    section: '[data-section]',
    scrollTo: '[data-scroll-to]',
    scrollDir: '[data-scroll-dir]'
  }


  const sectionsArray = Array.from(document.querySelectorAll(SELECTORS.section)) //on récupère toutes les sections de la page
  const scrollToElements = document.querySelectorAll(SELECTORS.scrollTo) //On récupère les endroit ou on peut scroll
  const scrollDirElements = document.querySelectorAll(SELECTORS.scrollDir) // On récupère les boutons pour le scroll
  
  let currentSectionIndex = 0 // On définit une variable pour la section dans laquelle on se trouve  
  
  const getScrollTarget = dir => { // fonction pour savoir ou on doit scroll
    if (dir === 'prev' && currentSectionIndex > 0) {
      currentSectionIndex--
      return sectionsArray[currentSectionIndex]
    }
    if (dir === 'next' && currentSectionIndex < sectionsArray.length-1) {
      currentSectionIndex++
      return sectionsArray[currentSectionIndex]
    }
    return false
  }
  
  scrollDirElements.forEach(el => {  //fonction pour ecouter le click sur les boutons fleches et faire le scroll 
    el.addEventListener('click', () => {
      const direction = el.dataset.scrollDir
      const target = getScrollTarget(direction)
      
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    })
  })
  
  scrollToElements.forEach(el => { //fonction pour ecouter le click sur les liens de la nav et faire le scroll 
    el.addEventListener('click', e => {
      e.preventDefault()
      const targetId = el.getAttribute('href')
      const target = document.querySelector(targetId)
      
      if (target) {
        sectionsArray.forEach((section, index) => {
          if (section.id === targetId.replace('#','')) {
            currentSectionIndex = index
          }
        })
        target.scrollIntoView({ behavior: 'smooth' });
      }
    })
  })

      // fonction pour afficher / masquer une side nav (on ne s'en sert plus)
      // function shownav() {
      //   var plus = document.getElementById("btn-plus");
      //   var nav = document.getElementById("side-nav");
      //   if (nav.style.display=="none") {
      //     nav.style.display="block";
      //     plus.innerHTML="-";
      //   }
      //   else {
      //     nav.style.display="none";
      //     plus.innerHTML="+";
      //   }
      // }
