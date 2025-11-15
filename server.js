const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log('Connected to DB and listening on port ' +  port);
        });
    }
});