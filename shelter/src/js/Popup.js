import {pets} from "./pets";

export const Popup = () => {
    const body = document.querySelector('body')
    const cards = document.querySelectorAll('.card')
    const closePopupBtn = document.querySelector('.close-popup-btn')
    const modalLayout = document.querySelector('.modal-layout')
    const popupWrapper = document.querySelector('.popup-wrapper')


    const fillCard = (id) => {
        const petInfo = pets.find(pet => {return pet.name === id})

        document.querySelector('.popup__title-block h3').innerHTML = petInfo.name
        document.querySelector('.popup__title-block h4').innerHTML = `${petInfo.type} - ${petInfo.breed}`
        document.querySelector('.popup__text-block h5').innerHTML = petInfo.description


        const items = document.querySelectorAll(`.popup__data-block li span`)

        items.forEach(item => {
            item.innerHTML = `${petInfo[item.id]}`
        })
    }

    const toggleCardHandler = (e) => {
        // if (!document.querySelector('.burger-menu_active')) {
        //     console.log('нет')
        //     return
        // }


        if (document.querySelector('.burger-menu_active')) {
            console.log('!!!!!!!!!!!!1')
            return
        }

        if (document.querySelector('.popup-wrapper_active')) {
            body.classList.toggle('lock')
            modalLayout.classList.toggle('modal-layout_active')
            popupWrapper.classList.toggle('popup-wrapper_active')
            return
        }

        if (!document.querySelector('.popup-wrapper_active')) {
            if (e.target.id || e.target.parentNode.id) {
                fillCard(e.target.id || e.target.parentNode.id)
            }
            body.classList.toggle('lock')
            modalLayout.classList.toggle('modal-layout_active')
            popupWrapper.classList.toggle('popup-wrapper_active')
        }
    }

    closePopupBtn.onclick = toggleCardHandler

    cards.forEach(card => {
        card.onclick = (e) => toggleCardHandler(e)
    })

    modalLayout.onclick = (e) => {
        if (e.target === modalLayout) {
            toggleCardHandler()
        }
    }


}