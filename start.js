const app = require('./server');
const mongodb = require('./data/database');
const port = process.env.PORT || 8000;

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => console.log(`Database running on port ${port}`));
    }
});
