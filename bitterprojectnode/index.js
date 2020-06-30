let express = require('Express');
let app = express();
let routes = require('./routes/auth.js');
let home = require('./routes/home.js');
let cors = require('cors');

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({origin:true}))
app.use('/auth', routes);
app.use('/', home);

app.listen(3000, function() {
    console.log("server is running on port 3000");
});
