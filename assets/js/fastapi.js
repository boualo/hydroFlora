async function predictWater() {

    const data = {
        pH: 6.2,
        TDS: 900,
        water_level: 1,
        DHT_temp: 25,
        DHT_humidity: 60,
        water_temp: 23
    };

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    console.log("Prediction:", result);

    if(result.water_change_needed == 1){
        document.getElementById("model_response").innerText = "Water change needed!";
        document.getElementById("model_response").style.color = "red";
    }
    else{
        document.getElementById("model_response").innerText = "Water conditions are good.";
        document.getElementById("model_response").style.color = "green";
    }

}
setInterval(predictWater, 5000);