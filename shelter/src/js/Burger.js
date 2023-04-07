export const Burger = () => {
    const body = document.querySelector('body')
    const menu = document.querySelector('.menu')
    const modalLayout = document.querySelector('.modal-layout')
    const burgerMenu = document.querySelector('.burger-menu')
    const navLinks = document.querySelectorAll('.navigation li')

    const toggleMenuHandle = () => {
        body.classList.toggle('lock')
        menu.classList.toggle('menu_active')
        modalLayout.classList.toggle('modal-layout_active')
        burgerMenu.classList.toggle('burger-menu_active')
    }

    menu.addEventListener('click', ()=>{
        toggleMenuHandle()
    })

    modalLayout.addEventListener('click', (e)=>{
        if (e.target === modalLayout) {
            toggleMenuHandle()
        }
    })

    navLinks.forEach(link => {
        link.addEventListener('click', (e)=> {
            toggleMenuHandle()
        })
    })



}