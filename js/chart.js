let pm25ChartInstance; // เก็บ instance ของ Chart

function renderChart() {
    const ctx = document.getElementById('pm25Chart').getContext('2d');

    // ✅ ลบกราฟเก่า ถ้ามีอยู่ก่อน
    if (pm25ChartInstance) {
        pm25ChartInstance.destroy();
    }

    // ✅ สร้างกราฟใหม่
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
            maintainAspectRatio: false, // ✅ ป้องกันไม่ให้กราฟขยายสูงเกินไป
            aspectRatio: 2, // ✅ ควบคุมสัดส่วนของกราฟ
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    console.log("✅ กราฟอัปเดตแล้ว!");
}
