const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');

const port = 8080;

app.use(compression({
    threshold: 0
}));
app.use('/build', express.static('build'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
});
app.listen(port);