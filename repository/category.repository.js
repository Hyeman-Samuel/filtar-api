const Category = require("../persistence/mysql").category
const { uuid } = require('uuidv4');

module.exports ={
    getCategoryById:async function (categoryId){
        return await Category.findOne({"id":categoryId});
        },
    getCategoryByPredicate:async function (obj){
        return await Category.findOne(obj);
    },
    getCategoriesByPredicate:async function (obj){
        return await Category.findAll(obj);
    },
    createCategory:async function(category){
        category.id = uuid()
        const _category = await Category.create(category)
        await _category.toJSON();
        return _category;
    },
    deleteCategory:async function(categoryId){
        const _category = await Category.findOne({"id":categoryId});
        await _category.destroy()
    },
    updateCategory:async function(categoryId,category){
        const _category = await Category.findOne({"id":categoryId});
        _category.set(category)
       return await _category.save()
    }
}