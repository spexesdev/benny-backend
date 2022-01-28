var express = require('express');
var app = express();
const port = 3001;
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'sql5.freesqldatabase.com',
    user: 'sql5468358',
    password: 'D2C7eiv3Np',
    database: 'sql5468358'
})


app.get('/api/students', (req, res) => {

    try {

        pool.getConnection(function (err, connection) {
            connection.query("select * from students", function (error, results) {
                connection.release();

                if (!error) {
                    const output = {
                        status: 200,
                        data: results,
                        message: 'Students data fetched successfully!'
                    }

                    res.json(output);

                } else {
                    const errorOutput = {
                        status: 401,
                        message: error.message,
                    }

                    res.json(errorOutput);
                }

            })

        })


    } catch (err) {
        const errorOutput = {
            status: 401,
            message: err.message,
        }

        res.json(errorOutput);
    }

})

app.post('/api/post-results', (req, res) => {

    try {

        //Break the response...
        const resp = req;

        //Expected to be sent as an array of numbers
        const str = "UPDATE students SET score = '" + resp.score + "' WHERE id = '" + resp.id + "';";

        pool.getConnection(function (err, connection) {
            connection.query(str, (error, results) => {
                connection.release();

                if (!error) {
                    const output = {
                        status: 200,
                        message: 'Students record updated successfully!',
                        data: {
                            newScore: resp.score
                        }
                    }

                    res.json(output);

                } else {
                    const errorOutput = {
                        status: 401,
                        message: error.message,
                    }

                    res.json(errorOutput);
                }

            })

        })


    } catch (err) {
        const errorOutput = {
            status: 401,
            message: err.message,
        }

        res.json(errorOutput);
    }

})

app.listen(3001, () => {
    console.log(`Node server is running at http://localhost:${port}`);
});
