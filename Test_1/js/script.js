let smallCircle = document.querySelector('.small_circle');
let bigCircle = document.querySelector('.big_circle');


bigCircle.addEventListener("mousemove",
    function mousemove(event) {
        let mouse_x = mouse_y = 0
        mouse_x = event.clientX;
        mouse_y = event.clientY;
        let targetelem = bigCircle.getBoundingClientRect();
        let elemLeft = mouse_x - targetelem.left - 50;
        smallCircle.style.left = elemLeft + 'px';
        let elemTop = mouse_y - targetelem.top - 50;
        smallCircle.style.top = elemTop + 'px';
    })