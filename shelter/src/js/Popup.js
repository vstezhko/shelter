export const Popup = () => {
    const body = document.querySelector('body')
    const cards = document.querySelectorAll('.card')
    const closePopupBtn = document.querySelector('.close-popup-btn')
    const modalLayout = document.querySelector('.modal-layout')
    const popupWrapper = document.querySelector('.popup-wrapper')

    const toggleCardHandler = () => {
        body.classList.toggle('lock')
        modalLayout.classList.toggle('modal-layout_active')
        popupWrapper.classList.toggle('popup-wrapper_active')
    }

    closePopupBtn.onclick = toggleCardHandler

    cards.forEach(card => {
        card.onclick = toggleCardHandler
    })

    modalLayout.onclick = (e) => {
        if (e.target === modalLayout) {
            toggleCardHandler()
        }
    }
}