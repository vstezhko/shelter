import {pets} from "./pets";
import {Popup} from "./Popup";


export const Slider = () => {

    if (document.querySelector('.our-friends__cards_wrap')) {
        return
    }

    const btnRight = document.querySelector(".button_arrow.right")
    const btnLeft = document.querySelector(".button_arrow.left")

    const cardsContainer = document.querySelector('.our-friends__cards')

    let petsArray = [0, 1, 2, 3, 4, 5, 6, 7]

    const defineCardsPerPage = () => {
        if (cardsContainer.offsetWidth >=990) {
            return 3
        } else if (cardsContainer.offsetWidth >=550) {
            return 2
        } else {
            return 1
        }
    }
    let cardsPerPage = defineCardsPerPage()

    const generateBlock = (prevArray=[], blockLength) => {
        const newBlock = []
        const min = 0;
        const max = petsArray.length;
        for (let i = 0; newBlock.length < blockLength; i++) {
            let randomNum = Math.floor(Math.random() * (max - min)) + min
            if (!newBlock.includes(randomNum) && ![...prevArray].includes(randomNum)) {
                newBlock.push(randomNum)
            }
        }
        return newBlock
    }
    let petsArrayForRender = []

    let leftSlide = ''
    let rightSlide = ''


    petsArrayForRender = generateBlock(petsArrayForRender, cardsPerPage)
    renderCards(petsArrayForRender, 'center')



    btnRight.addEventListener('click', ()=> {
        const newPets = generateBlock(petsArrayForRender, cardsPerPage)
        petsArrayForRender = newPets
        renderCards(newPets, 'right')

        const rightToCenter = document.querySelector('.slider-block.right')
        const centerToLeft =document.querySelector('.slider-block.center')

        rightToCenter.classList.add('animation_rightToCenter')
        centerToLeft.classList.add('animation_centerToLeft')
        rightToCenter.classList.remove('right')
        rightToCenter.classList.add('center')
        centerToLeft.classList.remove('center')
        centerToLeft.classList.add('left')


        leftSlide = cardsContainer.children[0]
        rightSlide = ''

        setTimeout(()=>{
            rightToCenter.classList.remove('animation_rightToCenter')
            cardsContainer.removeChild(cardsContainer.children[0])
        }, 500)

    })
    btnLeft.addEventListener('click', ()=> {
        const newPets = generateBlock(petsArrayForRender, cardsPerPage)
        petsArrayForRender = newPets
        renderCards(newPets, 'left')

        const leftToCenter = document.querySelector('.slider-block.left')
        const centerToRight =document.querySelector('.slider-block.center')

        leftToCenter.classList.add('animation_leftToCenter')
        centerToRight.classList.add('animation_centerToRight')
        leftToCenter.classList.remove('left')
        leftToCenter.classList.add('center')
        centerToRight.classList.remove('center')
        centerToRight.classList.add('right')

        rightSlide = cardsContainer.children[0]
        leftSlide = ''

        setTimeout(()=>{
            leftToCenter.classList.remove('animation_leftToCenter')
            cardsContainer.removeChild(cardsContainer.children[0])
        }, 500)
    })



    function renderCards (showedPets, side) {

        if (side==='right' && rightSlide) {
            rightSlide.classList.value = "slider-block right"
            cardsContainer.appendChild(rightSlide)
            return
        }

        if (side==='left' && leftSlide) {
            leftSlide.classList.value = "slider-block left"
            cardsContainer.appendChild(leftSlide)
            return
        }

        const block = document.createElement('div')
        block.classList.add('slider-block')
        block.style.gap = `${(cardsContainer.offsetWidth-270*cardsPerPage)/(cardsPerPage-1 !== 0 ? cardsPerPage-1 : 1)}px`
        block.style.width = `${cardsContainer.offsetWidth}px`
        block.classList.add(`${side}`)
        showedPets.forEach(pet => {
            const petCard = document.createElement('div')
            petCard.id = pets[pet].name
            petCard.classList.add('card')
            petCard.innerHTML = `
                <img src=${pets[pet].img} alt=${pets[pet].name}>
                <p class="pets-card-title">${pets[pet].name}</p>
                <div class="button button_secondary">Learn more</div>
            `
            block.appendChild(petCard)
        })

        cardsContainer.appendChild(block)

        Popup()
    }


    window.addEventListener('resize', function() {
        const sliders = document.querySelectorAll('.slider-block')
        sliders.forEach(slider => {
            slider.style.gap = `${(cardsContainer.offsetWidth-270*cardsPerPage)/(cardsPerPage-1 !== 0 ? cardsPerPage-1 : 1)}px`
            slider.style.width = `${cardsContainer.offsetWidth}px`
        })

        if (cardsPerPage !== defineCardsPerPage()) {
            cardsPerPage = defineCardsPerPage()
            cardsContainer.innerHTML = ''
            petsArrayForRender = generateBlock(petsArrayForRender, cardsPerPage)
            renderCards(petsArrayForRender, 'center')
        }
    });

}