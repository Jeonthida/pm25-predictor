document.addEventListener("DOMContentLoaded", () => {
    loadDataset();
    loadChart(); // ✅ โหลดกราฟตอนเปิดหน้าเว็บ
});

function loadDataset() {
    fetch("dataset.php?action=fetch")
        .then(res => res.json())
        .then(data => {
            let tableBody = document.querySelector("#datasetTable tbody");
            tableBody.innerHTML = "";

            if (data.error) {
                tableBody.innerHTML = "<tr><td colspan='12'>ไม่มีข้อมูล</td></tr>";
                return;
            }

            data.forEach(row => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${row.date}</td>
                        <td>${row.pm25}</td>
                        <td>${row.temperature}</td>
                        <td>${row.humidity}</td>
                        <td>${row.wind_speed}</td>
                        <td>${row.weight1}</td>
                        <td>${row.weight2}</td>
                        <td>${row.weight3}</td>
                        <td>${row.weight4}</td>
                        <td>${row.bias}</td>
                        <td>${row.prediction ?? '-'}</td>
                        <td><button onclick="deleteData(${row.id})">❌ ลบ</button></td>
                    </tr>`;
            });

            loadChart(); // ✅ โหลดกราฟทุกครั้งที่มีการเปลี่ยนแปลงข้อมูล
        })
        .catch(error => console.error("เกิดข้อผิดพลาด:", error));
}

function deleteData(id) {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) return;

    fetch("dataset.php?action=delete", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${encodeURIComponent(id)}`
    })
    .then(res => res.json())
    .then(data => {
        alert(data.success || data.error);
        loadDataset(); // ✅ โหลดข้อมูลใหม่หลังลบ
    })
    .catch(error => console.error("เกิดข้อผิดพลาด:", error));
}

function loadChart() {
    fetch("dataset.php?action=fetch")
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                console.warn("ไม่มีข้อมูลในฐานข้อมูล");
                return;
            }

            let labels = data.map(row => row.date);
            let predictions = data.map(row => row.pm25);

            let ctx = document.getElementById("predictionChart").getContext("2d");
            if (window.myChart) window.myChart.destroy(); // ✅ ล้างกราฟเก่า

            window.myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "ค่าฝุ่น PM2.5",
                        data: predictions,
                        borderColor: "blue",
                        borderWidth: 2,
                        fill: false
                    }]
                }
            });
        })
        .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดกราฟ:", error));
}
