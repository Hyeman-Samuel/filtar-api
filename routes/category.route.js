const express = require('express');
const Router = express.Router();
const passport = require('passport');
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const role=require("../middleware/role_middleware");
const Role = require("../model/role")
const {getCategoriesByPredicate,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory} = require("../repository/category.repository")

Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await getCategoriesByPredicate());
})

Router.get("/:id",async(req,res)=>{ 
    const category = await getCategoryById(req.params.id);
    if(!category)response(res,RESPONSETYPE.NOTFOUND,"Category not found.");

    response(res,RESPONSETYPE.OK,);
})

Router.get("/:id/events",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})


Router.post("/", 
passport.authenticate('jwt', { session: false }),
role([Role.ADMIN]),
validateCategory(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    const category = {categoryName:req.body.categoryName}
    response(res,RESPONSETYPE.OK,await createCategory(category));
})


Router.put("/", 
passport.authenticate('jwt', { session: false }),
role([Role.ADMIN]),
validateCategory(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }

    const category = {categoryName:req.body.categoryName}
    response(res,RESPONSETYPE.OK,await updateCategory(req.params.id,category));
})

Router.delete("/:id", 
passport.authenticate('jwt', { session: false }),
role([Role.ADMIN])
,async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await deleteCategory(req.params.id));
})




module.exports = Router 



function validateCategory(){
    return [  check('categoryName', 'Name is required'),
   ]
   }