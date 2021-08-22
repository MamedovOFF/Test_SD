const btnSort = document.querySelector('.btnSort')
const btnCreate = document.querySelector('.btnCreate')
const btnClear = document.querySelector('.btnClear')
const group = document.querySelector('.group')

let start = false;
let create = false

btnCreate.onclick = () => {                         // Создание элементов
    if (!create) {
        let n = document.getElementById('num_count').value
        for (let i = 0; i < n; i++) {
            let div = document.createElement("div")
            div.className = "circle"
            div.style.backgroundColor = color();
            div.style.transform = `translateX(${i * 120}px)`;
            group.style.width = `${i * 135}px`
            group.append(div)
        }
        if (n >= 1) create = true;
    }
}

btnClear.onclick = () => {                          // Очистка Элементов
    const elements = document.querySelectorAll(".circle")
    for (let i = 0; i < elements.length; i++)
        elements[i].remove()
    start = false
    create = false;
}

btnSort.onclick = () => {                              // Сортировка
    const arr = [...document.querySelectorAll('.group > .circle')].map((el, index) => ({
        el,
        number: Number(el.style.backgroundColor.replace(/\D+/g, "")),
    }));
    if (start) return;
    start = true;
    sortAnimation(arr);
}

function color() {                                          // Генерация цвета
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

function sortAnimation(arr) {
    let swapped = false;

    function swap(arr, indexA, indexB) {
        const temp = arr[indexA]

        arr[indexA] = arr[indexB];
        arr[indexB] = temp;

        arr[indexB].el.style.transform = `translate(${indexB * 120}px, -120px)`;
        arr[indexA].el.style.transform = `translateX(${indexA * 120}px)`;

        return new Promise(resolve => {
            setTimeout(() => {
                arr[indexB].el.style.transform = `translate(${indexB * 120}px, 0px)`;
                resolve();
            }, 1500);
        });
    }
    
    async function sort() {
        swapped = false;
        let idx = 0;
        for (let i = idx; i < arr.length; i++) {
            if (arr[i + 1] != undefined && arr[i].number > arr[i + 1].number) {
                await swap(arr, i, i + 1);
                swapped = true;
            }
        }
        if (swapped) {
            idx = 0;
            sort();
        }
    }
    sort();
}