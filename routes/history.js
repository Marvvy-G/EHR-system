const router = require("express").Router();
//Models
const
vital = require("../models/vital"),
visit = require("../models/visit"),
Patient = require("../models/patients"),
lab = require("../models/lab")


router.get("/nurse/:id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        res.status(500).json(foundPatient);
        if(err){
            console.log(err);
        } 
})
});
//create lab result
//check this route for that lab validation error
router.post("/lab/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if (err){
            console.log(err);
        } else {
            lab.create(req.body, function(err, lab){
                if (err){
                    console.log(err)
                } else {
                    patient.save();
                    patient.lab.push(lab);
                    res.status(500).json(lab)
                }
            })
        }
    })
})

//create a visit
router.post("/visit/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if(err){
            console.log(err);
            res.status(200).json("redirect to index");
        } else {
            visit.create(req.body, function(err, visit){
                if (err){
                    console.log(err);
                }   else 
                {
                    patient.save();
                    patient.visit.push(visit);
                   res.status(500).json(visit);
                  
                }
            });
        }

    });
});
//create a vital
router.post("/vital/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if (err){
            console.log(err);
        } else {
            vital.create(req.body, function(err, vital){
                if (err){
                    console.log(err)
                } else {
                    patient.save();
                    patient.vital.push(vital);
                    res.status(500).json(vital)
                }
            })
        }
    })
});



router.get("/visit/:id", function(req, res){ 
    Patient.findById(req.params.id).populate("visit vital lab").exec(function(err, patient){
        res.status(500).json(patient);
        if(err){
            console.log(err);}
    });
});



module.exports = router;
