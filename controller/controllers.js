const express = require("express");
require('dotenv').config();
const mysql = require("mysql");
const cors = require('cors');
const SqlString = require('sqlstring');
const { Sequelize,QueryTypes, Model, DataTypes } = require("sequelize");
const mod= require('../mymodel/models.js');
const modtwo = require('../mymodel/mymodel2.js');
const {Roman, Auteur} = require('../mymodel/mymodel2.js');
const { Book, User } = require('../mymodel/models.js');
const { Ecrivain, Mylivre, Ecrivainlivre } = require('../mymodel/mymodel3.js');

mod.sequelize;
modtwo.sequelize;


//***************************************************************************************** */
//************************************ONE TO ONE********************************* */
//***************************************************************************************** */

exports.getTodos = async (req, res) => {

  try {
  const tasks = await mod.User.findAll({ include: mod.Book  });


  console.log(JSON.stringify(tasks, null, 2));

  //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

  res.json(tasks);

  //res.json(todos);
  } catch (error) {

  res.json({ error: 'Internal Server Error' });

  }


}


exports.createTodos = async (req, res) => {

 const firstName = req.body.firstName;
 const lastName =req.body.lastName;
 //this.userid =req.body.userId;
 const bookname =req.body.name;


const user = await User.create(
  {
    firstName: firstName ,
    lastName:  lastName,
    createdAt: false,
    updatedAt: false , 
    book: {
      // you can specify the attributes of the associated model you want to create
      name: bookname,
      createdAt: false,
         updatedAt: false 
      
    },
  },
  {
    // you must specify which associated models must be created here
    include: [Book],
  },
);

const userWithBook = await User.findByPk(user.id , {
  include: Book
});

//res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

res.json(userWithBook);



    }

//UPDATE ONE HERE 

exports.updateTodos = async (req, res) => {

  const updatename=  req.body.name;

  const upid = req.body.id;

 // res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

console.log('name to update :' , updatename);

console.log('id  to update :' , upid);



  try {

 const result2= await Book.update({
    name: updatename,
    createdAt: false,
    updatedAt: false 
   },

  {
    where: { userId: upid }
  }
)
res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

res.json({"id" : upid , "name" :  updatename});



} catch (error) {
      
  res.json({ error: 'Cannot Update' });

  }
  
}


//DELETE HERE

exports.deleteTodos = async (req, res) => {

  console.log('id to delete ',req.body.id);


const idel= req.body.id;

console.log('id to delete ',idel);

try{
const deleted = await Book.destroy({
  where: {
    id: idel,
  },
});

//res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.json({'id' :  idel });

} catch (error) {
      
  res.json({ error: 'Internal Server Error' });

  }
}

//DELETE ALL HERE!!

exports.deleteAllTodos = async (req, res) => {

  console.log("deleteAllTodos running..");

  console.log('id to delete ',req.body.id);

  const idelall= req.body.id;

  console.log('id to delete ',idelall);
  


  try {
    const finduserbook =  await Book.destroy({
      
       
        where: {
         // userId: Sequelize.col('users.id'),
         userId: idelall,
        }
     
    })
    
  }catch (error) {
    console.error(error);
  
  }
    
  try {

    const finduserbook2 =  await User.destroy({
         where: {
        id: idelall
        }

    })
    
  }catch (error) {
    console.error(error);
  
  }
    

    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.json({'id' :  idelall});
    
  
}

//***************************************************************************************** */
//************************************ONE TO MANY********************************* */
//***************************************************************************************** */

    exports.getmanyTodos= async (req, res) => {

      try {
        const tasks2 = await modtwo.Auteur.findAll({ include: modtwo.Roman });
      
      
        console.log(JSON.stringify(tasks2, null, 2));
      
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      
        res.json(tasks2);
      
        //res.json(todos);
        } catch (error) {
      
        res.json({ error: 'Internal Server Error' });
      
        }

    }
  

    exports.createManyTodos = async (req, res) => {

      const firstName = req.body.firstName;
      const lastName =req.body.lastName;
      //this.userid =req.body.userId;
      const booknamemany =req.body.name;
      console.log('firstName' ,   firstName );
      console.log('lastName' ,  lastName );
      console.log('Name' ,   booknamemany );
     
     await modtwo.Auteur.create(
       {
         firstName: firstName ,
         lastName:  lastName,
         createdAt: false,
         updatedAt: false , 
         romans: {
           // you can specify the attributes of the associated model you want to create
           name:  booknamemany,
           createdAt: false,
              updatedAt: false 
           
         },
       },
       {
         // you must specify which associated models must be created here
         include: [Roman],
       },
     );

   res.json({ name:  booknamemany , firstName : firstName  , lastName : lastName  });
         }

         exports.createManyRoman = async (req, res) => {

                  const booknamemany =req.body.nameval;
                  const idname =req.body.idval;
                  console.log(' this.booknamemany' , booknamemany);
                  console.log(' this.idname' ,  idname);
                    
                const retour = await modtwo.Roman.create(
                    {
                    
                      auteurId: idname,
                      name: booknamemany,
                      createdAt: false,
                      updatedAt: false 
                        
                      });

                res.json(retour);
              
         }


                    exports.updateRoman = async (req, res) => {
              try {
                const { id, name } = req.body;

                if (!id || !name) {
                  return res.status(400).json({ error: 'id and name required' });
                }

                const roman = await modtwo.Roman.findByPk(id);

                if (!roman) {
                  return res.status(404).json({ error: 'Roman not found' });
                }

                roman.name = name;
                await roman.save();

                res.json(roman); // 🔥 retourne le roman mis à jour

              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Update failed' });
              }
            };


  

             //------------------DELETE ONE VALUE CHILD OF ONE TO MANY-------------------

             exports.deleteOnemanyTodos = async(req,res)=>{

              console.log('id to delete ',req.body.id);


              const id = req.body.id;
              
              console.log('id to delete ',id);
              
              try{
              const deleted = await Roman.destroy({
                where: {
                  id: id,
                },
              });
              
              res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
              
              res.json(deleted);
              
              } catch (error) {
                    
                res.json({ error: 'Internal Server Error' });
              
                }

             }

                 //------------------DELETE PARENT AND CHILD OF ONE TO MANY-------------------

             exports.deleteAllmanyTodos = async(req,res)=>{

              const obj =[];

              console.log('id to delete ',req.body.id);


              const ideltm= req.body.id;
              
              console.log('id to delete ',ideltm);

             const tabloteodel = await Roman.findAll({
                attributes: ['id'] , where : {auteurId : ideltm} });
                
                console.log('tabloteodel : ' , tabloteodel);

                tabloteodel.forEach( 
                  (id) => { 
                    console.log(id.dataValues);

                     obj.push(id.dataValues);
                 
                  }
                );
                console.log(obj)

                obj.forEach((obj) => {
                  console.log(
                      obj.id
                  );
              });

              console.log(obj)

              obj.forEach(async (obj) => {
                const delroman = await  Roman.destroy({
                  where: {
                   id: obj.id,
                  }
                })
            });

            const deleted = await Auteur.destroy({
              where: {
               id: ideltm,
              }
            })
            console.log(deleted);

          //  if(deleted)
          try{
            return res.json({ success: true, deleted});

            } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Delete failed' });
            }

          
             }

 //***************************************************************************************** */
//************************************MANY TO MANY********************************* */
//***************************************************************************************** */

         exports.createmtom = async(req,res)=>{

          const firstName = req.body.firstName;
          const lastName =req.body.lastName;
          //this.userid =req.body.userId;
          const bookname =req.body.name;

          console.log('firstName' ,   firstName );
          console.log('lastName' ,   lastName );
          console.log('Name' ,   bookname );

          const myecrivain = await Ecrivain.create({ firstName: firstName, lastName: lastName });
          const addlivre = await Mylivre.create({ name: bookname });
          await myecrivain.addMylivre(addlivre);

          res.json({ name: bookname , firstName : firstName  , lastName : lastName  });


         }

 //---------------SELECT ALL MANY TO MANY VALUE-------------------------

         exports.findmtom = async(req,res)=>{

          try {
          
        const result = await   Ecrivain.findAll({ include: Mylivre });
         
                  
        //console.log('------------------------------------------------------');

        console.log(JSON.stringify(result, null, 2));
              
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

        res.json(result);
                
        } catch (error) {
              
          res.json({ error: 'Internal Server Error' });

          }
    
         }

   //---------------ADD  MANY TO MANY VALUE-------------------------       

         exports.Addmtom = async(req,res)=>{

          const idmtom = req.body.id
            
          const addmylivre = req.body.addmylivre
        
         const myid = await Ecrivain.findOne({where: {id: idmtom }});
        
         console.log('myid : ' ,myid);

          const myl  = await Mylivre.create({ name:  addmylivre  });
         
          console.log('myl : ' ,myl);

          const mylid = await Mylivre.findOne({  attributes: ['id'] , where: {name:addmylivre }});
         
          console.log('mylid : ' ,mylid);

         // const crtelivre = await Ecrivainlivre.create({ mylivreId : this.mylid , ecrivainId : this.myid ,createdAt: false, updatedAt: false });
         const crtelivre =  await myid.addMylivre(myl);
         
          console.log('crtelivre : ' ,crtelivre);

           try{
            return res.json({ name :addmylivre , mylivreId : mylid  , ecrivainId:idmtom});

            } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Delete failed' });
            }


        }

     //-------------MNANY TO MANY UPDATE ROMAN ------------------------
     
     exports.updateMylivre = async (req, res) => {

      console.log("M to M updating livre ....")
        try {
          const { id, name } = req.body;

           console.log(' update request ' ,req.body)

          if (!id || !name) {
            return res.status(400).json({ error: 'id and name required' });
          }
         
          const livre = await Mylivre.findByPk(id);

          if (!livre) {
            return res.status(404).json({ error: 'Livre not found' });
          }

          livre.name = name;
          await livre.save();

          return res.json(livre); //  renvoie le livre MAJ
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Update failed' });
        }
      };


     //-------------MANY TO MANY Delete ONE--------------------

     exports.deleteManytoManyTodos = async(req,res)=>{

      console.log('id to delete ',req.body.id);


      const ideltm= req.body.id;

      const ecrivainid= req.body.idecrivain;
      
      console.log('id to delete ',ideltm);
      console.log('id ecrivain to delete ',ecrivainid);
     
      //select the 2 id values from select to use removeMylivre magic function
      
      try{
     
      const deleted = await Mylivre.findOne({where: {id: ideltm }});
    
      const deletedecrivain = await Ecrivain.findOne({where: {id: ecrivainid}});

      await deletedecrivain.removeMylivre(deleted);

      //await folder.destroy({ transaction: t })
      
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      
      res.json(deleted);
      
      } catch (error) {
            
        res.json({ error: 'Internal Server Error' });
      
        }

     }


       //-------------MANY TO MANY Delete ALL => ECRIVAIN + ALL his booKs-------------------

       exports.deleteAllManytoManyTodos = async(req,res)=>{

        const obj =[];
        const objlivres =[];

        console.log('id to delete ',req.body.id);

        const ecrivaintbl = req.body.id

        try{

        const ecrivaintblx = await Ecrivain.findOne({where: {id:  ecrivaintbl}});
       
        console.log('----------ecrivaintblx---------');
       
        console.log(ecrivaintblx);

        const users2 =  await Ecrivainlivre.findAll({ attributes: ['id' ,'mylivreId'] , where: {ecrivainId: ecrivaintbl}});
       
        console.log('----------ecrivchildren---------' , users2);



        users2.forEach( 
          (mylivreId) => { 

            console.log('mylivreId ' ,mylivreId.dataValues);

            objlivres.push(mylivreId.dataValues);
         
          }
        );
        
        console.log('--------------tablo  id :' , objlivres);

        objlivres.forEach(async (objlivres) => {
        
        const deletedlivres = await Mylivre.findAll({where: {id: objlivres.mylivreId }});

        await  ecrivaintblx.removeMylivre(deletedlivres);

        await Mylivre.destroy({where: {id: objlivres.mylivreId}});

        });

        await Ecrivain.destroy({where: {id: ecrivaintbl}});

            
        console.log('ok');
      
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
          
        res.json(deleted);




      } catch (error) {
            
        res.json({ error: 'Internal Server Error' });
      
        }

       }
