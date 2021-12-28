const Package= require("../persistence/mysql").package;
const CategoryPackage= require("../persistence/mysql").CategoryPackage;
const { uuid } = require('uuidv4');

module.exports ={
    getPackageById:async function (packageId){
        
        return await Package.findOne({"id":packageId});
        },
    getPackageByPredicate:async function (obj){
        return await Package.findOne(obj);
    },
    getPackagesByPredicate:async function (obj){
        return await Package.findAll(obj);
    },
    createPackage:async function(package){
        package.id = uuid();
        const _package = await Package.create(package)
        await _package.toJSON();
        return _package
    },
    deletePackage:async function(packageId){
        const _package = await Package.findOne({"id":packageId});
        await _package.destroy()
    },
    updatePackage:async function(packageId,package){
        const _package = await Package.findOne({"id":packageId});
        _package.set(package)
       return await _package.save()
    }
}