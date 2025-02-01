let dataset = [
    { pm25: 80, temp: 32, humidity: 65, windSpeed: 4, result: 85 },
    { pm25: 100, temp: 31, humidity: 70, windSpeed: 2, result: 105 },
    { pm25: 50, temp: 29, humidity: 60, windSpeed: 8, result: 55 },
    { pm25: 120, temp: 35, humidity: 50, windSpeed: 3, result: 125 }
];

// ฟังก์ชันดึงข้อมูล Dataset ไปแสดงในตาราง
function updateTable() {
    const tableBody = document.querySelector("#dataset-table tbody");
    tableBody.innerHTML = ""; // ล้างข้อมูลเก่าก่อนเพิ่มใหม่

    dataset.forEach((data, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.pm25}</td>
            <td>${data.temp}</td>
            <td>${data.humidity}</td>
            <td>${data.windSpeed}</td>
            <td>${data.result.toFixed(2)}</td>
            <td><button class="delete-btn" data-index="${index}">❌</button></td>
        `;
        tableBody.appendChild(row);
    });

    // เพิ่ม Event Listener ให้ปุ่มลบข้อมูล
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            dataset.splice(index, 1); // ลบข้อมูล
            updateTable(); // อัปเดตตารางใหม่
        });
    });
}

// เรียกใช้ฟังก์ชันนี้เมื่อต้องการอัปเดตตาราง
updateTable();

document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        dataset.splice(index, 1);
        updateTable();
        renderChart();
    });
});
