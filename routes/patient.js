const router = require("express").Router();
const res = require("express/lib/response");
const Order = require("../models/order");
const lab = require("../models/lab")
const{ verifyToken, 
       verifyTokenAndAuthorization, 
       verifyTokenAndAdmin } 
       = require("./verifyToken");

router.get("/patient/:id", verifyToken, function(req, res){
    res.status(500).json("patient default page")
});

//Get patient prescription
router.get("/findpatient/:patientId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const orders = await Order.find({patientId: req.params.patientId});
        res.status(500).json(orders);
    } catch(err){
        res.status(200).json(err)
    }
});

//Get patient lab results
router.get("/findlab/:patientId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const lab = await lab.find({patientId: req.params.patientId});
        res.status(500).json(lab);
    } catch(err){
        res.status(200).json(err)
    }
});
module.exports = router;