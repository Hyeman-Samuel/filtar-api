// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const categorySchema = new Schema({
// categoryName: {type:String,required:true},
// dataCreated:{type:String,required:true,default:Date.now()},
// packages:[{type:mongoose.Schema.Types.ObjectId,ref:'Packages'}]
// });




// const Category = mongoose.model('Categories', categorySchema);

// module.exports = {
//     Category
// }




module.exports = (sequelize, Sequelize) => {
    const categorySchema={
      categoryName: {
          type: Sequelize.STRING
        },
        dataCreated: { 
          type: Sequelize.DATE, 
          defaultValue: Sequelize.NOW }
      }

    const Category = sequelize.define("category",categorySchema);
  
    return {Category};
  };