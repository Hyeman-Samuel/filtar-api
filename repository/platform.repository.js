const Platform = require("../utility/mysql").platform
const PLATFORM = require("../constants/platform")
const { uuid } = require('uuidv4');

module.exports ={
    getPlatformById:async function (platformId){
        return await Platform.findOne({"id":platformId});
        },
    getPlatformByPredicate:async function (obj){
        return await Platform.findOne(obj);
    },
    getPlatformByPredicate:async function (obj){
        return await Platform.findAll(obj);
    },
    createPlatform:async function(platform){
        const _platform = await Platform.create({id:uuid(),
            platformName:PLATFORM.SNAPCHAT})
        await _platform.toJSON();
        return _platform;
    },
    deletePlatfrom:async function(platformId){
        const _platform = await Platform.findOne({"id":platformId});
        await _platform.destroy()
    },
    updatePlatform:async function(platformId,platform){
        const _platform = await Platform.findOne({"id":platformId});
        _platform.set(platform)
       return await _platform.save()
    }
}