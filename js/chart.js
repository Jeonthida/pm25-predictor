let pm25ChartInstance;

function renderChart() {
    const ctx = document.getElementById('pm25Chart').getContext('2d');

    // ถ้าไม่มีข้อมูล dataset ให้แสดงข้อความแจ้งเตือน
    if (dataset.length === 0) {
        console.warn("❌ ไม่มีข้อมูลใน dataset - กราฟจะไม่แสดงผล");
        return;
    }

    // ลบกราฟเดิมถ้ามีอยู่
    if (pm25ChartInstance) {
        pm25ChartInstance.destroy();
    }

    // สร้างกราฟใหม่
    pm25ChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataset.map((_, i) => `Data ${i + 1}`),
            datasets: [
                {
                    label: 'Predicted PM2.5',
                    data: dataset.map(d => d.result),
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    console.log("✅ กราฟถูกอัปเดตแล้ว!");
}
