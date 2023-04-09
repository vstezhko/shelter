import {pets} from "./pets";
import {Popup} from "./Popup";

export const Pagination = () => {


    const cardsWrap = document.querySelector('.our-friends__cards_wrap')
    const activePageBtn = document.querySelector('.button_arrow-active.pagination-btn')
    const nextBtns = document.querySelectorAll('.next')
    const prevBtns = document.querySelectorAll('.prev')

    if (!cardsWrap || !activePageBtn) {
        return
    }
    const pagination = document.querySelector('.pagination')

    const cardsPerPage = {
        desktop: 8,
        tablet: 6,
        mobile: 3
    }

    let cardsOnPage
    let petsNames = [0, 1, 2, 3, 4, 5, 6, 7]
    let paginatedPets = []

    function generateRandomPets() {
        let randomSet = new Set();
        const min = 0;
        const max = petsNames.length;
        for (let i = 0; randomSet.size < pets.length; i++) {
            let randomNum = Math.floor(Math.random() * (max - min)) + min
            randomSet.add(randomNum)
        }

        return [...randomSet]
    }

    function getRandomPets() {
        let arr = []
        for (let i = 0; i < 6; i++) {
            let randomArr = generateRandomPets()
            arr.push(...randomArr)
        }
        return arr
    }



    let currentPage = 1
    activePageBtn.innerHTML = `${currentPage}`

    const handlePaginationBtnsAccessability = () => {

        if (currentPage === paginatedPets.length/cardsOnPage) {
            nextBtns.forEach(btn => {
                btn.disabled = true
            })
        } else if (currentPage === 1) {
            prevBtns.forEach(btn => {
                btn.disabled = true
            })
        } else {
            prevBtns.forEach(btn => {
                btn.disabled = false
            })
            nextBtns.forEach(btn => {
                btn.disabled = false
            })
        }
    }

    pagination.addEventListener('click', (e)=>{
            switch (e.target.id) {
                case '': break

                case 'next': {
                    if (currentPage+1 <= paginatedPets.length/cardsOnPage) {
                        currentPage += 1
                    }
                    activePageBtn.innerHTML = `${currentPage}`
                    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))
                    break
                }

                case 'prev': {
                    if (currentPage-1 > 0) {
                        currentPage -= 1
                    }
                    activePageBtn.innerHTML = `${currentPage}`
                    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))
                    break
                }

                case 'first': {
                    currentPage = 1
                    activePageBtn.innerHTML = `${currentPage}`
                    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))
                    break
                }

                case 'last': {
                    currentPage = paginatedPets.length/cardsOnPage
                    activePageBtn.innerHTML = `${currentPage}`
                    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))
                    break
                }
            }
    })

    const correctMaxPage = () => {
        if (paginatedPets.length && currentPage > paginatedPets.length/cardsOnPage) {
            currentPage = paginatedPets.length/cardsOnPage
            activePageBtn.innerHTML = `${currentPage}`
        }
    }

    function getCardsOnPageCount(){
        if (cardsWrap) {
            if (window.innerWidth < 620) {
                if (cardsOnPage !== cardsPerPage.mobile) {
                    cardsOnPage  = cardsPerPage.mobile
                    correctMaxPage()
                    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))
                }
            } else if (window.innerWidth < 1280){
                if (cardsOnPage !== cardsPerPage.tablet) {
                    cardsOnPage  = cardsPerPage.tablet
                    correctMaxPage()
                    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))
                }
            } else if (1280 <= window.innerWidth ) {
                if (cardsOnPage !== cardsPerPage.desktop) {
                    cardsOnPage  = cardsPerPage.desktop
                    correctMaxPage()
                    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))
                }
            }
        }
    }

    function generateCards () {
        paginatedPets = getRandomPets()
    }


    getCardsOnPageCount()
    generateCards()
    renderCards(paginatedPets.slice((currentPage-1)*cardsOnPage, (currentPage-1)*cardsOnPage + cardsOnPage))


    window.addEventListener('resize', function() {
        getCardsOnPageCount()
    });


    function renderCards (showedPets) {
        cardsWrap.innerHTML = ''
        showedPets.forEach(pet => {
            const card = document.createElement('div')
            card.id = pets[pet].name
            card.classList.add('card')
            card.innerHTML = `
            <img src=${pets[pet].img} alt=${pets[pet].name}>
            <p class="pets-card-title">${pets[pet].name}</p>
            <div class="button button_secondary">Learn more</div>
        `
            cardsWrap.appendChild(card)
        })
        Popup()
        handlePaginationBtnsAccessability()
    }
}

