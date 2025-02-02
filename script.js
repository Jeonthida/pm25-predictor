document.getElementById('predict-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const pm25 = parseFloat(document.getElementById('pm25').value);
    const temp = parseFloat(document.getElementById('temperature').value);
    const humidity = parseFloat(document.getElementById('humidity').value);
    const windSpeed = parseFloat(document.getElementById('windSpeed').value);

    const w_pm25 = parseFloat(document.getElementById('w_pm25').value);
    const w_temp = parseFloat(document.getElementById('w_temp').value);
    const w_humidity = parseFloat(document.getElementById('w_humidity').value);
    const w_windSpeed = parseFloat(document.getElementById('w_windSpeed').value);

    neuralNet.updateWeights([w_pm25, w_temp, w_humidity, w_windSpeed]);

    const input = [pm25 / 500, temp / 50, humidity / 100, windSpeed / 10]; 
    const predictedValue = neuralNet.predict(input);

    document.getElementById('predicted-result').textContent = predictedValue.toFixed(2);

    dataset.push({ pm25, temp, humidity, windSpeed, result: predictedValue });
    updateTable();
    renderChart();
});

document.addEventListener("DOMContentLoaded", function () {
    const inputContainer = document.getElementById("dynamic-inputs");
    const addInputBtn = document.getElementById("add-input");

    let inputCount = 4; // ✅ เริ่มต้นที่ 4 Input

    function addInputField() {
        inputCount++;
        const inputId = `input-${inputCount}`;
        const weightId = `weight-${inputCount}`;
        const nameId = `input-name-${inputCount}`;

        // ✅ สร้างกล่องรวม Input และ Weight ให้อยู่ด้วยกัน
        const inputGroup = document.createElement("div");
        inputGroup.id = `input-group-${inputCount}`;
        inputGroup.classList.add("input-group");
        inputGroup.innerHTML = `
            <input type="text" id="${nameId}" placeholder="ชื่อ Input ${inputCount}" class="input-name">
            <input type="number" id="${inputId}" required placeholder="ค่า Input">
            <input type="number" id="${weightId}" step="0.01" value="0.1" class="weight-input">
            <button type="button" class="remove-input" data-id="${inputCount}">❌</button>
        `;
        inputContainer.appendChild(inputGroup);

        // ✅ เมื่อเปลี่ยนชื่อ Input → ชื่อ Weight เปลี่ยนตาม
        document.getElementById(nameId).addEventListener("input", function () {
            document.getElementById(weightId).setAttribute("placeholder", `Weight ของ ${this.value.trim() || `Input ${inputCount}`}`);
        });

        // ✅ ให้ปุ่มลบลบ Input ทั้งเซ็ตออกไป
        inputGroup.querySelector(".remove-input").addEventListener("click", function () {
            removeInputField(inputCount);
        });

        console.log(`✅ เพิ่ม Input ${inputCount}`);
    }

    function removeInputField(id) {
        const inputDiv = document.getElementById(`input-group-${id}`);
        if (inputDiv) {
            inputDiv.remove();
            console.log(`❌ ลบ Input ${id}`);
        }
    }

    addInputBtn.addEventListener("click", function () {
        addInputField();
    });
});
