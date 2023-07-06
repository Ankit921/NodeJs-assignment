const Customer=require('../models/Customer');
const mongoose=require('mongoose');


exports.homepage = async (req, res) => {

    // const messages = await req.consumeFlash('info');
    const locals = {
      title: 'NodeJs',
      description: 'Free NodeJs Result Management System'
    }

    let perPage = 10;
    let page = req.query.page || 1;

    try {
      const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Customer.count();

      res.render('index', {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        
      });

    } catch (error) {
      console.log(error);
    }
}


//get

exports.addCustomer=async(req,res)=>{
 
const locals={
    title:'Add new student',
    description:'Add new student'
}

    res.render('customer/add',locals);
}


//post

exports.postCustomer=async(req,res)=>{
console.log(req.body);

const newCustomer=new Customer({
    Name:req.body.Name,
    Score:req.body.Score,
    Roll_No:req.body.Roll_No,
    Birth:req.body.Birth,
    email:req.body.email,
})

try {
    await Customer.create(newCustomer);
    //  await req.flash("info", "New student has been added.");
   res.redirect('/');
    }
 catch (error) {
    console.log(error);
    
}
}
    

exports.view = async (req, res) => {

  try {
    const customer = await Customer.findOne({ _id: req.params.id })

    const locals = {
      title: "View Student Data",
      description: "Free NodeJs Result Management System",
    };

    res.render('customer/view', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}


exports.edit = async (req, res) => {

  try {
    const customer = await Customer.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit Student Data",
      description: "Free NodeJs Result Management System",
    };

    res.render('customer/edit', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}


exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id,{
      Name: req.body.Name,
      Score: req.body.Score,
      Roll_No: req.body.Roll_No,
      email: req.body.email,
      Birth: req.body.Birth,
      updatedAt: Date.now()
    });
    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}


exports.searchCustomers = async (req, res) => {

  const locals = {
    title: "Search Student Data",
    description: "Free NodeJs Result Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { Name: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        
      ]
    });

    res.render("search", {
      customers,
      locals
    })
    
  } catch (error) {
    console.log(error);
  }

}