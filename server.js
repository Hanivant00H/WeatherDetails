const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
    
    const query = req.body.Cityname;
    const apiKey = "91789cfecc5440b0a303456e8c6e8b8b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const windValue = weatherData.wind.speed;
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"; 
        res.write("<p> The windvalue is currently " +windValue+ "</p>");
        res.write("<h1>The temperature in " +query+" is currently " +temp+ " degree Celsius.</h1>");
        res.write("<img src = " +imageURL+">");
        res.send();
        })
    })
});

app.listen(3000, function(){
    console.log("Server is running at port 3000")
})