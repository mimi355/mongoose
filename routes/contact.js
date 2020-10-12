const express= require("express");
const { deleteOne } = require("../models/Contact");
const Contact = require("../models/Contact")
const router = express.Router()

// add person
//@path: localhost:5000/contacts/addContact
// public
router.post("/addContact",(req,res)=>{
const {name,email,age,phone,favoriteFood}= req.body

const person= new Contact({
   name,email,age,phone,favoriteFood 
})  
person.save((err,data)=>{       // add one 
    if(err) {res.send(err)}
    else { res.send(data)}
})
})
/*
const person2= new Contact({
    name,email,age,phone,favoriteFood
})
const person3= new Contact({
    name,email,age,phone,favoriteFood
})
const person4= new Contact({
    name,email,age,phone,favoriteFood
})
const person5= new Contact({
    name,email,age,phone,favoriteFood
})
var arrayOfPeople=[person2,person3,person4,person5]

Contact.create(arrayOfPeople,(err,data)=>{     // add multiple person
    if(err){res.send(err)}
   else{res.send(data)}
   })
});
*/
// find all 
router.get("/all",(req,res)=>{
    Contact.find({})
    .then(data=>res.send(data))
    .catch(err=>res.send(err))
})

//find one person with favoriteFood:["ananas","litchi"]
router.get("/food",(req,res)=>{
    Contact.findOne({favoriteFood:["litchi","orange"]},(err,data)=>{
        if(err){res.send(err)}
        else{res.send(data)}
    })
})
// find byID
router.get("/:personId",(req,res)=>{
    const _id =req.params.personId
    Contact.findById({_id},(err,data)=>{
        if(err){res.send(err)}
        else{res.send(data)}
    })
   
})

// classic updates add hamburger to salah
router .patch("/:personId",(req,res)=>{
    const _id = req.params.personId
    const foodToAdd = 'hamburger';
  
    // .findById() method to find a person by _id with the parameter personId as search key. 
    Contact.findById({_id}, (err, person) => {
      if(err) return console.log(err); 
    
      // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
      person.favoriteFood.push(foodToAdd);
  
      // and inside the find callback - save() the updated Person.
      person.save((err, updatedPerson) => {
        if(err) {console.log(err)}
        else {res.send(updatedPerson)}
      })
    })
  })

//findOneAndUpdate By name

router.put("/:personName",(req,res)=>{
    const name =req.params.personName
    Contact.findOneAndUpdate({name},{$set:{age:20}},{new:true,useFindAndModify:false},(err,data)=>{
        if(err){console.log(err)}
        else{res.send(data)}
    })
})

// delete One document

router.delete("/:personId",(req,res)=>{
    const _id = req.params.personId
Contact.findByIdAndRemove({_id},(err)=>{
    if(err){console.log(err)}
    else{res.send("person deleted")}
})
})

//Delete Many Documents with model.remove()

router.delete("/",(req,res)=>{
Contact.remove({name:"mary"},(err)=>{
    if(err){res.send(err)}
    else{res.send("items delted")}
})
})

//Chain Search Query Helpers to Narrow Search Results
router.get("/",(req,res)=>{
 Contact.find({favoriteFood:"burrito"})
 .sort({name:'asc'})
 .limit(2)
 .select('-age')
 .then(data=>res.send(data))
 .catch(err=>res.send(err))
});

module.exports = router