function sidebarNav() {
  const body = document.querySelector("body"),
    headerHamburger = document.getElementsByClassName("header__hamburger"),
    headerHamburgerIcon = document.querySelector(".header__hamburger svg"),
    asideMenu = document.getElementsByClassName("sidebar")

  headerHamburger[0].addEventListener("click", () => {
    body.classList.toggle("body--overflow-hidden")
    asideMenu[0].classList.toggle("sidebar--show")
    headerHamburgerIcon.classList.toggle("header__hamburger--blue")
  })
}

function headerBackgroundScroll() {
  const scrollPos = 0,
    header = document.getElementsByClassName("header"),
    headerHamburgerIcon = document.querySelector(".header__hamburger svg"),
    headerLogo = document.getElementsByClassName("header__logo")

  window.addEventListener("scroll", () => {
    const windowYOffset = window.scrollY

    if (windowYOffset > scrollPos) {
      header[0].classList.add("header--background-solid")
      headerHamburgerIcon.classList.add("header__hamburger--blue")
      headerLogo[0].classList.add("header__hamburger--blue")
    } else if (windowYOffset === scrollPos) {
      header[0].classList.remove("header--background-solid")
      headerHamburgerIcon.classList.remove("header__hamburger--blue")
      headerLogo[0].classList.remove("header__hamburger--blue")
    }
  })
}

headerBackgroundScroll()
sidebarNav()

export default {}
