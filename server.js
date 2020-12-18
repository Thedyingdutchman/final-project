const express = require('express');
const app = express();
const mysql = require('mysql');
const crypto = require('crypto');

var fs = require('fs');
var bodyParser = require('body-parser');

const port = process.env.port || 3000;

app.use('/', express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



let rawdata = fs.readFileSync('budget-data.json');
let myBudget = JSON.parse(rawdata);
console.log(myBudget);

app.get('/budget' , (req, res) => {
    res.json(myBudget);
});

//MySQL Server information

var connection = mysql.createConnection({
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9382862',
    password: 'Phx8UEjni8',
    database: 'sql9382862'
});

app.use(express.json());
//app.use(express.urlencoded({extend: true}));


// Users API

app.post('/users/login', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = crypto.createHmac('sha256', password)
                    .update('I love cupcakes')
                    .digest('hex');
    connection.connect();
    connection.query('select * from users where username = (?) and password = md5((?))', [username, password], function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.post('/api/signup', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = crypto.createHmac('sha256', password)
                    .update('I love cupcakes')
                    .digest('hex');
    const email = new Email(); //transform into Mysql format
    connection.connect();
    connection.query('INSERT INTO user VALUES ("", ?, ?, email)', [username, hashedPassword, new Email()], function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

// Budget API

app.post('/budget', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('INSERT INTO budget (bid, title, budget, userid) VALUES (?, ?, ?, ?)', function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.get('/budget', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('Select INSERT INTO budget (bid, title, budget, userid) VALUES (?, ?, ?, ?)', function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.put('/budget', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('Update INSERT INTO budget (bid, title, budget, userid) VALUES (?, ?, ?, ?)', function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.delete('/budget', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('Delete INSERT INTO budget (bid, title, budget, userid) VALUES (?, ?, ?, ?)', function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

// Expenses API

app.post('/expenses', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('INSERT INTO expenses (eid, bid, expenses, month) VALUES (?, ?, ?, ?)', [username, budgetID, expenses, month], function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.get('/expenses', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('Select INSERT INTO expenses (eid, bid, expenses, month) VALUES (?, ?, ?, ?)', [username, budgetID, expenses, month], function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.put('/expenses', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('Update INSERT INTO expenses (eid, bid, expenses, month) VALUES (?, ?, ?, ?)', [username, budgetID, expenses, month], function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.delete('/expenses', async (req, res) => {
    const {username, password} = req.body;
    connection.connect();
    connection.query('Delete INSERT INTO expenses (eid, bid, expenses, month) VALUES (?, ?, ?, ?)', [username, budgetID, expenses, month], function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });

});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});