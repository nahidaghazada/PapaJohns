const content = document.getElementById('content')

const params = new URLSearchParams(location.search)
const cat = params.get('category')   //category gore tutmaq
const id = params.get('id')         // id-e gore tutmaq 
let item = {}
let count = 1
let size = ""
let flag = true
let DETDATA

fetch(`http://localhost:3000/${cat}/${id}`)
    .then(res => {
        return res.json();
    })
    .then(info => {
        item = info;
        DETDATA = info;
        showDetails();
        if (cat == 'pizza' && info.variations.length > 0) {
            DETDATA.sizeValue = info.variations[0].price
            size = info.variations[0].type
            updatePizzaOptions(size, DETDATA.sizeValue)
        }
    })

function showDetails() {
    content.innerHTML = `
        <div id="product" class="min-h-[70vh] flex flex-col sm:flex-row justify-between items-center">
            <div class="w-full sm:w-1/2 xs:mr-5">
                <h4 class="font-bold text-[22px]">${item.title}</h4>
                <p class="mt-4"><b>Tərkibi:</b> ${item.composition}</p>
                <p class="font-bold my-2 text-[18px]">Qiyməti: <span id="qiymetntc">${(count * (DETDATA.sizeValue || item.price)).toFixed(2)}</span>₼</p>
                
                ${item.variations != undefined && item.variations?.length > 0 ? `
                    <div id="productType" class="flex rounded py-2 w-[60%]">
                     <button onclick="handleSize(true, 'Ənənəvi')" class="${flag ? 'bg-green-700' : 'bg-gray-300'} ${flag ? 'text-[#fff]' : 'text-green-700'} px-2 py-1 w-1/2 text-center">Ənənəvi</button>
                     <button onclick="handleSize(false, 'Nazik')" class="${!flag ? 'bg-green-700' : 'bg-gray-300'} ${!flag ? 'text-[#fff]' : 'text-green-700'} px-2 py-1 w-1/2 text-center">Nazik</button>
                    </div>
                    <div class="font-semibold w-[60%]">
                        <select  value="${item.price}" id="sizeSelect" onchange="handleSelect(this)"
                            class="w-full bg-red-700 outline-none my-5 px-3 py-1 text-[15px] text-white">
                            ${item.variations.filter(elment => elment.type == "Ənənəvi")
                .map(elem => `<option ${elem.price == item.price ? 'selected' : ''} value="${elem.price}" > ${elem.size} </option>`).join("")}
                        </select>
                    </div>
                `: ""
        }
                <div class="py-2">
                    <div class="flex items-center sm:text-[20px] text-white py-2">
                        <button onclick="changeCount(-1)" class="w-[50px] bg-red-800 font-black">-</button>
                        <span id="countDiv" class="w-[50px] flex justify-center text-black font-semibold">
                         ${count}
                        </span>
                        <button onclick="changeCount(1)" class="w-[50px] bg-green-600 font-black">+</button>
                    </div>
                    <button onclick='addToBasket("${item.id}","${item.title}","${DETDATA.sizeValue || item.price}","${item.img}",${count},"${item.category}")' class="bg-green-700 text-white w-[200px] p-2 my-5 rounded-md">Səbətə at</button>
                </div>
            </div>
            <div class="w-full sm:w-1/2 flex justify-center">
                <img class="w-full md:w-[80%]" src="${item.img}" alt="img">
            </div>
        </div>
         `

}

function changeCount(x) {
    count += x
    if (count < 1) count = 1
    showDetails(DETDATA)
    updatePizzaOptions(size, DETDATA.sizeValue)
}

function handleSize(position, selectedType) {
    flag = position
    size = selectedType
    showDetails(DETDATA)
    updatePizzaOptions(size, DETDATA.sizeValue)
}

function updatePizzaOptions(type, curr) {
    size = type
    const sizeSelect = document.getElementById('sizeSelect')
    if (cat == "pizza") {
        sizeSelect.innerHTML = "";
        DETDATA.variations
            .filter(item => item.type === type)
            .forEach(item => {
                sizeSelect.innerHTML += `<option value="${item.price}">${item.size}</option>`;
            });
        sizeSelect.value = curr;
    }
}

function handleSelect(el) {
    DETDATA.sizeValue = parseFloat(el.value);
    showDetails();
    updatePizzaOptions(size, DETDATA.sizeValue);
}