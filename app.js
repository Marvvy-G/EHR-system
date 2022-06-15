//Routes
const 
userRoute        = require("./routes/user"),
authRoute        = require("./routes/auth"),
productRoute     = require("./routes/products"),
cartRoute        = require("./routes/cart"),
orderRoute       = require("./routes/order"),
authPatientRoute = require("./routes/authpatient"),
patientRoute     = require("./routes/patient"),
doctorRoute      = require("./routes/doctor"),
pharmacyRoute    = require("./routes/pharmacy"),
historyRoute     = require("./routes/history"),
labProductsRoute = require("./routes/labProducts"),
labOrdersRoute   = require("./routes/labOrders"),
labRoute         = require("./routes/lab")
//technologies
const 
express    = require ("express"),
app        = express(),
bodyParser = require("body-parser"),
mongoose   = require("mongoose"),
dotenv     = require("dotenv")

dotenv.config(); 

//Database connection

mongoose.connect("mongodb+srv://bellsehr:bellsehr123@bellsehr.bwuj4eh.mongodb.net/?retryWrites=true&w=majority");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Routes Application
app.use("/api/pharmacy/", pharmacyRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order",orderRoute);
app.use("/api/authpatient", authPatientRoute);
app.use("/api/patient", patientRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/history", historyRoute);
app.use("/api/labProducts/", labProductsRoute);
app.use("/api/labOrders",labOrdersRoute);
app.use("/api/lab", labRoute);

const port = process.env.PORT || 5000 ;

app.listen(port, function(){
    console.log("ehr server side");
    });