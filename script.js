const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill_color"),
    sizeSlider = document.querySelector("#slide"),
    colorBtn = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color_picker"),
    clearCanvas = document.querySelector(".clear"),
    saveImg = document.querySelector(".save"),





    cvx = canvas.getContext("2d")
let prevMouseX, prevMouseY,
    cndn = false, brushwidth = 5,
    selectedTool = "brush", selectedColor = "#000",
    snapshot;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    if (!fillColor.checked) {
        cvx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    else {
        cvx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);

    }

}
const drawCircle = (e) => {
    cvx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    cvx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    if (!fillColor.checked) {

        cvx.stroke();
    }
    else {
        cvx.fill();
    }

}

const drawTriangle = (e) => {
    cvx.beginPath();
    cvx.moveTo(prevMouseX, prevMouseY);
    cvx.lineTo(e.offsetX, e.offsetY)
    cvx.lineTo(2 * prevMouseX - e.offsetX, e.offsetY);
    cvx.closePath();
    if (!fillColor.checked) {

        cvx.stroke();
    }
    else {
        cvx.fill();
    }


}
const startdraw = (e) => {
    cndn = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    cvx.beginPath();
    cvx.lineWidth = brushwidth;
    cvx.strokeStyle = selectedColor;
    cvx.fillStyle = selectedColor;
    snapshot = cvx.getImageData(0, 0, canvas.width, canvas.height);
}
const draw = (e) => {
    if (!cndn) return;
    cvx.putImageData(snapshot, 0, 0);
    if (selectedTool == "brush" || selectedTool == "eraser") {
        cvx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        cvx.lineTo(e.offsetX, e.offsetY);
        cvx.stroke();
    }
    else if (selectedTool == "rectangle") {
        drawRect(e);
    }

    else if (selectedTool == "circle") {
        drawCircle(e);
    }
    else if (selectedTool == "triangle") {
        drawTriangle(e);
    }


}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {


        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
        // prompt("hello everyone");

    });
});
sizeSlider.addEventListener("change", () => brushwidth = sizeSlider.value);

colorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = (window.getComputedStyle(btn).getPropertyValue("background-color"));
    })
})
colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
})

clearCanvas.addEventListener("click", () => {
    cvx.clearRect(0, 0, canvas.width, canvas.height);
})

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();

})



canvas.addEventListener('mousedown', startdraw)
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => cndn = false);