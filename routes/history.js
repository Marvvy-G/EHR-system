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
router.post("/visit/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if (err){
            console.log(err);
        } else {
            lab.create(req.body.lab, function(err, lab){
                if (err){
                    console.log(err)
                } else {
                    patient.lab.push(lab);
                    patient.save();
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
            visit.create(req.body.visit, function(err, visit){
                if (err){
                    console.log(err);
                }   else 
                {
                   patient.visit.push(visit);
                   patient.save();
                   res.status(500).json(visit);
                  
                }
            });
        }

    });
});
//create a vital
router.post("/visit/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if (err){
            console.log(err);
        } else {
            vital.create(req.body.vital, function(err, vital){
                if (err){
                    console.log(err)
                } else {
                    patient.vital.push(vital);
                    patient.save();
                    res.status(500).json(vital)
                }
            })
        }
    })
});



router.get("/visit/:id", function(req, res){ 
    Patient.findById(req.params.id).populate("visit", "vital", "lab").exec(function(err, patient){
        res.status(500).json(patient);
        if(err){
            console.log(err);}
    });
});



module.exports = router;
