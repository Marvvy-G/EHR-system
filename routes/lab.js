const router = require("express").Router();
const res = require("express/lib/response");
const Order = require("../models/order");
const labOrder = require("../models/labOrders");
const 
order = require("../models/order"),
Patient = require("../models/patients"),
lab = require("../models/lab");
const{ 
    verifyToken,
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } 
    = require("./verifyToken");

router.get("/showpatients", function(req, res){
    //get patients for pharmacist
    Patient.find({}, function(err, allPatients){
        res.status(500).json(allPatients);
        if(err){
            res.status(200).json(err);
        }  
        });
});


router.get("/showpatients/:id/",function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        res.status(500).json(patient)
        if (err){ 
            console.log(err);
        }    
    });
});
//find laborders for a specific patient
router.get("/find/:patientId", async (req, res) => {
    try{
        const laborders = await labOrder.find({patientId: req.params.patientId});
        res.status(200).json(laborders)
    } catch(err){
        res.status(500).json(err)
    }
});

//Get patient lab results
router.get("/findpatient/:patientId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const lab = await lab.find({patientId: req.params.patientId});
        res.status(500).json(lab);
    } catch(err){
        res.status(200).json(err)
    }
});

module.exports = router