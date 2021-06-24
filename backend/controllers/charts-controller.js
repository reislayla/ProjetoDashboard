// Database connection
var db = require('../routes/conn');

// Controller responsible for the Chart section in the side menu 

// Create table with dashboards in Charts Menu (Name, Description and Chart_type)
module.exports.chartTable = function(req, res, next) {

    //Database query to select all dashboards
    db.query('SELECT dashboard.id AS id, dashboard.name AS name, dashboard.description AS description, dashboard.query AS query, chart_type.description AS chart_type, dashboard.gender AS gender, dashboard.visible AS visible, dashboard.config AS config FROM dashboard JOIN chart_type ON dashboard.chart_type = chart_type.id', function (error, results, rows) {
      
    if(error) {
            console.log("There are some error with query");
        } 
        else {

            console.log("Database results: ", results);
            res.json({
                results
            });        
        }
    });
}

// Individual information for each chart (Eye button)
module.exports.chartInfo = function(req, res, next) {

    // ID
    var id = req.params;
    console.log("Id to be consulted", id);
    
    // Database query to select chart to edit 
    db.query('SELECT * FROM dashboard WHERE id = ?', [id.chartId], function (error, results, fields) {
      
    if(error) {
            console.log("There are some error with query");
        } 
        else {
            
            //Verify the chart information 
            //console.log("Database results: ", results);

            res.json({
                results                
            });        
        }
    });
}

// Individual information for each chart (Remove button)
module.exports.removeChart = function(req, res, next) {

    //ID
    var id = req.params;
    console.log("Id to be removed", id);
    
    // Database query to select chart to remove 
    db.query('DELETE * FROM dashboard WHERE id = ?', [id], function (error, results, fields) {
      
    if(error) {
            console.log("There are some error with query");
        } 
        else {
            console.log("Removed");
        
        }
    });
}


