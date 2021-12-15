const {Category}= require("../model/category");


module.exports ={
    getCategoryById:async function (userId){
        return await Category.findById(userId);
        },
    getCategoryByPredicate:async function (obj){
        return await Category.findOne(obj);
    },
    getCategoriesByPredicate:async function (obj){
        return await Category.find(obj);
    },
    createCategory:async function(category){
        const _category = new Category(category)
        await _category.save();
        return _category;
    },
    deleteCategory:async function(categoryId){
       await Category.findByIdAndDelete(categoryId);
    },
    updateCategory:async function(categoryId,category){
       return await Category.findByIdAndUpdate(categoryId,category)
    }
}