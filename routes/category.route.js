const express = require('express');
const Router = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const role=require("../middleware/role_middleware");
const Role = require("../model/role")
const {getCategoriesByPredicate,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory} = require("../repository/category.repository")
const {getEventsByPredicate}= require("../repository/event.repository")
    /**
 * @openapi
 *components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - categoryName
 *        properties:
 *           categoryName:
 *            type: string
 *            description: name of the category.
 */


    /**
 * @openapi
 * /v1/category:
 *   get:
 *     description: all categories 
 *     tags:
 *        [Category]
 *     responses:
 *       200:
 *         description: Returns all category token.
 */
Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await getCategoriesByPredicate());
})

/**
 * @openapi
 * /v1/category/{id}:
 *   get:
 *     description: gets a single category
 *     tags:
 *        [Category]
 *     responses:
 *       200:
 *         description: Returns a catgeory.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: category id
 */
Router.get("/:id",async(req,res)=>{ 
    const category = await getCategoryById(req.params.id);
    if(!category)response(res,RESPONSETYPE.NOTFOUND,"Category not found.");

    response(res,RESPONSETYPE.OK,category);
})

/**
 * @openapi
 * /v1/category/{id}/events:
 *   get:
 *     description: gets all events in a single category
 *     tags:
 *        [Category]
 *     responses:
 *       200:
 *         description: Returns events.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: category id
 */
Router.get("/:id/events",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,getEventsByPredicate({category:req.params.id}));
})

/**
 * @openapi
 * /v1/category:
 *   post:
 *     description: create a category 
 *     tags:
 *        [Category]
 *     security:
 *     bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Returns a the new category.
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *              schema:    
 *                  $ref: '#/components/schemas/Category'
 */
Router.post("/", 
auth_middleware(),
role([Role.ADMIN]),
validateCategory(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    const category = {categoryName:req.body.categoryName}
    response(res,RESPONSETYPE.OK,await createCategory(category));
})


/**
 * @openapi
 * /v1/category/{id}:
 *   put:
 *     description: edit a category 
 *     tags:
 *        [Category]
 *     security:
 *        bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a the new category.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:    
 *                  $ref: '#/components/schemas/Category'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: category id
 */
Router.put("/:id", 
auth_middleware(),
role([Role.ADMIN]),
validateCategory(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }

    const category = {categoryName:req.body.categoryName}
    response(res,RESPONSETYPE.OK,await updateCategory(req.params.id,category));
})


/**
 * @openapi
 * /v1/category/{id}:
 *   delete:
 *     description: deletes category
 *     tags:
 *        [Category]
 *     responses:
 *       200:
 *         description: ok message.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: category id
 */
Router.delete("/:id", 
auth_middleware(),
role([Role.ADMIN])
,async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await deleteCategory(req.params.id));
})




module.exports = Router 



function validateCategory(){
    return [  check('categoryName', 'Name is required'),
   ]
   }