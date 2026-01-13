const express = require("express");
require('dotenv').config();

//const { Sequelize,QueryTypes, Model, DataTypes } = require("sequelize");


const {sequelize, User, Book } = require('../models');





//***************************************************************************************** */
//************************************ONE TO ONE********************************* */
//***************************************************************************************** */

exports.getTodos = async (req, res) => {

  try {
  const users = await User.findAll({  include: [
        {
          model: Book,
          as: 'book'   // 🔥 DOIT matcher User.hasOne(... as: 'book')
        }
      ]
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }


}


exports.createTodos = async (req, res) => {

 const firstName = req.body.firstName;
 const lastName =req.body.lastName;
 //this.userid =req.body.userId;
 const bookname =req.body.name;

 console.log ('DATA from create HAS ONE ==> firstName ' , firstName , 'lastName ' , lastName , 'bookname  ' , bookname )


const user = await User.create(
  {
    firstName: firstName ,
    lastName:  lastName,
    //createdAt: false,
    //updatedAt: false , 
    book: {
      // you can specify the attributes of the associated model you want to create
      name: bookname,
     // createdAt: false,
       //  updatedAt: false 
      
    },
  },
  {
    // you must specify which associated models must be created here
    include: [

      {

        model :Book,
        as :'book'
      }
    ],
    
  },
);

const userWithBook = await User.findByPk(user.id , {
  include: [

      {

        model :Book,
         as: 'book'
      }
    ],
});


res.json(userWithBook);



    }

//UPDATE ONE HERE 

exports.updateTodos = async (req, res) => {

    console.log('--> HAS ONE update !!' );

  const updatename=  req.body.name;

  const upid = req.body.id;


  console.log('name to update :' , updatename);

  console.log('id  to update :' , upid);



  try {

 const result2= await Book.update({
    name: updatename,
    //createdAt: false,
    //updatedAt: false 
   },

  {
    where: { userId: upid }
  }
)


res.json({"id" : upid , "name" :  updatename});



} catch (error) {
      
  res.json({ error: 'Cannot Update' });

  }
  
}



//DELETE ALL HERE!!

exports.deleteAllTodos = async (req, res) => {

  console.log("deleteAllTodos running..");

  const userId = req.params.id;

  console.log('id to delete:', userId);

  const t = await sequelize.transaction();

  try {
    //  1. Supprimer les livres du user
    await Book.destroy({
      where: { userId },
      transaction: t
    });

    //  2. Supprimer le user
    await User.destroy({
      where: { id: userId },
      transaction: t
    });

    // ✅ 3. Commit
    await t.commit();

    return res.json({
      success: true,
      userId
    });

  } catch (error) {
    // ❌ Annulation complète
    await t.rollback();
    console.error(error);

    return res.status(500).json({
      success: false,
      error: 'Delete failed'
    });
  }

  
}