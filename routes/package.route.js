const express = require('express');
const Router = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const role=require("../middleware/role_middleware");
const {getPackageById, createPackage, updatePackage, deletePackage, getPackagesByPredicate, addToCategory, addPlatform} = require("../repository/package.repository");
const ROLES = require('../models/role');

    /**
 * @openapi
 *components:
 *    schemas:
 *      Package:
 *        type: object
 *        required:
 *          - packageName
 *          - packageAlias
 *          - numberOfHashtags
 *          - numberOfSongs
 *          - numberOfFrames
 *          - numberOfImages
 *          - infographicLink
 *        properties:
 *           packageName:
 *            type: string
 *            description: name of the package.
 *           packageAlias:
 *            type: string
 *            description: unique name of the package.
 *           numberOfHashtags:
 *            type: number
 *            description: number of hashtags allowed.
 *           numberOfSongs:
 *            type: number
 *            description: number of songs allowed.
 *           numberOfFrames:
 *            type: number
 *            description: number of frames allowed.
 *           numberOfImages:
 *            type: number
 *            description: number of images allowed.
 *           infographicLink:
 *            type: string
 *            description: link to the infographic video of the package.
 *           categories:
 *            type: string
 *            description: array of categories to be assigned to.
 */



    /**
 * @openapi
 * /v1/package:
 *   get:
 *     description: all packages
 *     tags:
 *        [Package]
 *     responses:
 *       200:
 *         description: Returns all packages.
 */
Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await getPackagesByPredicate());
})



/**
 * @openapi
 * /v1/package/{id}:
 *   get:
 *     description: gets a single package
 *     tags:
 *        [Package]
 *     responses:
 *       200:
 *         description: Returns an package.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: package id
 */
Router.get("/:id",async(req,res)=>{ 
    const package = await getPackageById(req.params.id)
    if(!package)response(res,RESPONSETYPE.NOTFOUND,"Package not found.");

    response(res,RESPONSETYPE.OK, package);
})




/**
 * @openapi
 * /v1/package:
 *   post:
 *     description: create a package
 *     tags:
 *        [Package]
 *     responses:
 *       200:
 *         description: Returns a the new package.
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *              schema:    
 *                  $ref: '#/components/schemas/Package'
 */
Router.post("/", 
auth_middleware(),
role(ROLES.ADMIN),
validatePackage(),async(req,res)=>{ 
    var errors = validationResult(req).array()
    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    // if(req.body.infographicLink){
    //     req.body.infographicLink = `{link:${req.body.infographicLink}}`
    // }
    
    response(res,RESPONSETYPE.OK,await createPackage(req.body));
})



/**
 * @openapi
 * /v1/package/{id}/category/{categoryId}:
 *   post:
 *     description: adds a category to a package
 *     tags:
 *        [Package]
 *     responses:
 *       200:
 *         description: Returns 200.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: package id
 */
Router.post("/:id/category/:categoryId", 
auth_middleware(),
role(ROLES.ADMIN),
validatePackage(),async(req,res)=>{ 
    var errors = validationResult(req).array()
    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    // if(req.body.infographicLink){
    //     req.body.infographicLink = `{link:${req.body.infographicLink}}`
    // }
    
    response(res,RESPONSETYPE.OK,await addToCategory(req.params.id,req.params.categoryId));
})



/**
 * @openapi
 * /v1/package/{id}/platform/{platformId}:
 *   post:
 *     description: adds a platform to a package
 *     tags:
 *        [Package]
 *     responses:
 *       200:
 *         description: Returns 200.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: package id
 */
 Router.post("/:id/platform/:platformId", 
 auth_middleware(),
 role(ROLES.ADMIN),
 validatePlatfromPrice(),async(req,res)=>{ 
     var errors = validationResult(req).array()
     if(errors.length != 0){
         response(res,RESPONSETYPE.BAD_REQUEST,errors)
     }
     
     response(res,RESPONSETYPE.OK,await addPlatform(req.params.id,req.params.platformId,req.body.price));
 })






/**
 * @openapi
 * /v1/package/{id}:
 *   put:
 *     description: edits a single package
 *     tags:
 *        [Package]
 *     responses:
 *       200:
 *         description: Returns an package.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: package id
 */
Router.put("/:id", 
auth_middleware(),
role(ROLES.ADMIN),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }

    // if(req.body.infographicLink){
    //     req.body.infographicLink = `${req.body.infographicLink}}`
    // }
    
    response(res,RESPONSETYPE.OK,await updatePackage(req.params.id,req.body));
})







/**
 * @openapi
 * /v1/package/{id}:
 *   delete:
 *     description: deletes package
 *     tags:
 *        [Package]
 *     responses:
 *       200:
 *         description: ok message.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: package id
 */
Router.delete("/:id", 
auth_middleware(),
role(ROLES.ADMIN),
async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await deletePackage(req.params.id));
})




module.exports = Router 



function validatePackage(){
    return [  
    check('packageName', 'Package Name is required'),
    check('packageAlias', 'Package Alias is required'),
    check('numberOfHashtags', 'numberOfHashtags is required'),
    check('numberOfSongs', 'numberOfSongs is required'),
    check('numberOfFrames', 'numberOfFrames is required'),
    check('numberOfImages', 'numberOfImages is required'),
    check('infographicLink', 'infographicLink is not correct').isArray({max:2}),
   ]
   }

   function validatePlatfromPrice(){
    return [  
    check('price', 'price is required'),
   ]
   }