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
