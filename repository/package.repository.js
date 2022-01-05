const {CategoryPackage,PlatformPackage,Package,Transaction} = require("../persistence/mysql")
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
        let _package = await (await Package.create(package)).toJSON()
        return _package
    },
    addToCategory:async function(packageId,categoryId){
       return await (await CategoryPackage.create({PackageId:packageId,CategoryId:categoryId})).toJSON()
    },
    addToCategories:async function(packageId,categoryIds){
        categoryIds.forEach(async (categoryId) => {
            await CategoryPackage.create({PackageId:packageId,CategoryId:categoryId})
      })
    },
    addPlatform:async function(packageId,platformId,price){
       return await (await PlatformPackage.create({id:uuid,PlatformId:platformId,PackageId:packageId,price:price})).toJSON()  
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