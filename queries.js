function viewAll() {
    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

function 

module.exports = queries;