const cards = document.getElementById('cards')
let cat = new URLSearchParams(location.search).get("cat")
const DETAILDATA = []

fetch(`http://localhost:3000/${cat}`)
    .then(res => res.json())
    .then(info => { 
        DETAILDATA.push(...info);
        showCards();
    })

function showCards() {
    DETAILDATA.map(item => {
        cards.innerHTML += `
                                <a href="details.htm?category=${item.category}&id=${item.id}" class="w-full sm:w-[48%]  h-[400px] lg:w-[30%] xl:w-[23%] my-5 shadow-md rounded-md">
                                <img class="w-full h-[55%] object-cover" src="${item.img}" alt="pizza">
                                <div class="flex justify-between mt-4 mb-2">
                                    <p class="font-bold text-[18px] mr-2">${item.title}</p>
                                    <button class="text-[14px] bg-green-700 text-white uppercase font-bold p-[8px] rounded-md">Bunu seç</button>
                                </div>
                                <p class="px-2">${item.composition}</p>
                                </a>
                           `
    })

}

