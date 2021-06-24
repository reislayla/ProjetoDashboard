// Database connection
var db = require('../routes/conn');
// Create uuid
const { v4: uuidv4 } = require('uuid');

// Controller responsible for the New Chart section

// Render table according to the query
module.exports.createTable = function(req, res) {
    
    // User query
    var query = req.body.query;
    console.log("User query: ", query);
  

    // Select table and columns according to the query
    db.query(query, function(error, results, fields){    
        if(error) {
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
        } else {            
            res.send({
                results
            })
        }
        console.log("User query results: ", results)
    });
}

// Save new chart
module.exports.createChart = function(req, res) {

    // New chart with respective settings
    var chart = {
        "id": uuidv4(),
        "name": req.body.name, 
        "description": req.body.description,
        "query": req.body.query,
        "chart_type": req.body.chartType,
        "gender": req.body.gender,
        "visible":req.body.dashvisible,
        "config": req.body.config
    }

    //New chart information
    console.log("New chart information", chart);

    //Database query to save chart
    db.query('INSERT INTO dashboard SET?', chart, function(error, results, fields){    
        if(error) {
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
        } else {
            res.json({
                results
            })
        }
    });
}

