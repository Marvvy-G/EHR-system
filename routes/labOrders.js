const router = require("express").Router();
const { query } = require("express");
const res = require("express/lib/response");
const labOrder = require("../models/labOrders")

//CREATE
//add "/:id/order befor giving" and verifyToken,
router.post("/order", async(req, res) =>{
    const newlabOrder = new labOrder(req.body)

try{
    const savedlabOrder = await newlabOrder.save();
    console.log(savedlabOrder)
} catch(err){
    console.log(err)
}
})

//UPDATE a PRODUCTS
router.put("/:id", async (req, res) => {
    try {
        const updatedlabOrder = await labOrder.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedlabOrder); 
    } catch(err){
        res.status(500).json(err);
    } return;
});

//DELETE
router.delete("/:id", async(req, res) => {
    try{
        await labOrder.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    } catch(err){
        res.status(500).json(err)
    }
});


//GET USER Orders
router.get("/find/:userId", async (req, res) => {
    try{
        const laborders = await labOrder.find({userId: req.params.userId});
        res.status(200).json(laborders)
    } catch(err){
        res.status(500).json(err)
    }
});
// GET ALL laborders
router.get("/", async(req, res) => {
    try{
        const laborders = await labOrder.find();    
        res.status(200).json(laborders);
    } catch(err){
        res.status(500).json(err)
    }
});

//GET MONTHLY INCOME

router.get("/income", async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }}},
            {
            $project:{
            month: { $month: "$createdAt" },
        },}

    ]);
    res.status(200).json(income)
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;