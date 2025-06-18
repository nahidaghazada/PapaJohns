const categoryMenu = document.getElementById('categoryMenu');
const DATA = JSON.parse(localStorage.getItem("DATA")) || [];
const modal = document.getElementById('modal')

function check() {
    if (DATA.length == 0) {
        fetch("https://papa-johns-data-eta.vercel.app/category")
            .then(res => res.json())
            .then(info => {
                console.log(info)
                DATA.length = 0
                DATA.push(...info);
                localStorage.setItem("DATA", JSON.stringify(DATA))
                show(); 
            })
        }
}
check()

function show() {
    categoryMenu.innerHTML = "";
    DATA
        .map(item => {
            const url = item.id == 222 ? "/index.htm" : `/pages/category.htm?cat=${item.slug}`
            categoryMenu.innerHTML += `
            <li>
              <a href=${url}>${item.category}</a>
            </li>
        `;
        });
}
show()

let swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

const openClose = () => modal.classList.toggle("sideBar")