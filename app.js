const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, (error)=>{
    if(!error){
        console.log("Server is Successfully Running,and App is listening on port "+ PORT);
    }
    else{
        console.log("Error occurred, server can't start", error);
    }
})



app.get('/api', (req, res) => {
    try {
        const slack_name = req.query.slack_name;
        const track = req.query.track;
        const utc_time = new Date().toISOString();
        const currentDate = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[currentDate.getUTCDay()];
        
        if (!slack_name || !track) {
            return res.status(400).json({ error: 'Both parameters (slack_name and track) are required.' });
        }

        const jsonResponse = {
            "slack_name": slack_name,
            "current_day": dayOfWeek,
            "utc_time": utc_time,
            "track": track,
            "github_file_url": "https://github.com/PrimoCrypt/Api-endpoint/blob/main/app.js",
            "github_repo_url": "https://github.com/PrimoCrypt/Api-endpoint",
            "status_code": res.statusCode
        }

        res.setHeader('Content-Type', 'application/json');

        res.json(jsonResponse);
    } catch (error) {
        console.error("Error processing the request:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});