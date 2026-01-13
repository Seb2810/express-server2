const express = require("express");
require('dotenv').config();

//const { Sequelize,QueryTypes, Model, DataTypes } = require("sequelize");


const {sequelize ,Roman, Auteur } = require('../models');



//***************************************************************************************** */
//************************************ONE TO MANY********************************* */
//***************************************************************************************** */

    exports.getmanyTodos= async (req, res) => {

      try {
        const tasks2 = await Auteur.findAll({  include: [
        {
          model: Roman,
          as: 'romans'   // 🔥 DOIT matcher User.hasOne(... as: 'book')
        }
      ]
          });
      
      
        console.log(JSON.stringify(tasks2, null, 2));
      
        
      
        res.json(tasks2);
      
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
     
     await Auteur.create(
       {
         firstName: firstName ,
         lastName:  lastName,
       //  createdAt: false,
       //  updatedAt: false , 
         romans: {
           // you can specify the attributes of the associated model you want to create
           name:  booknamemany,
         //  createdAt: false,
           //   updatedAt: false 
           
         },
       },
       {
         // you must specify which associated models must be created here
         include: [
        {
          model: Roman,
          as: 'romans'   // 🔥 roman matcher(... as: 'roman')
        }
      ]
       },
     );

        res.json({ name:  booknamemany , firstName : firstName  , lastName : lastName  });
         }



         exports.createManyRoman = async (req, res) => {

                  const booknamemany =req.body.nameval;
                  const idname =req.body.idval;

                  console.log(' this.booknamemany' , booknamemany);
                  console.log(' this.idname' ,  idname);
                    
                const retour = await Roman.create(
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

                const roman = await Roman.findByPk(id);

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

              console.log('id to delete ',req.params.id);

               const id = req.params.id;
              console.log('id to delete ', id);

              const t = await sequelize.transaction();

              try {
                const deleted = await Roman.destroy({
                  where: { id },
                  transaction: t
                });

                if (!deleted) {
                  throw new Error('Roman not found');
                }

                await t.commit(); // ✅ tout est OK

                return res.json({ success: true, deleted });
              } catch (error) {
                await t.rollback(); // 🔥 annule tout
                console.error(error);

                return res.status(500).json({
                  success: false,
                  error: error.message
                });
              }

            

             }

                 //------------------DELETE PARENT AND CHILD OF ONE TO MANY-------------------

             exports.deleteAllmanyTodos = async(req,res)=>{

                    
          const auteurId = req.params.id;
            const t = await sequelize.transaction();

            try {
              await Roman.destroy({
                where: { auteurId },
                transaction: t
              });

              await Auteur.destroy({
                where: { id: auteurId },
                transaction: t
              });

              await t.commit();

              const romans = await Roman.findAll({ where: { auteurId }});
              console.log('ROMANS FOUND:', romans.length);

              res.json({ success: true });

            } catch (error) {
              await t.rollback();
              console.error(error);
              res.status(500).json({ error: 'Delete failed' });
            }
              //delete manuel
              /*
              const obj =[];

              console.log('id to delete ',req.params.id);


              const ideltm= req.params.id;
              
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
            console.log('DElete auteur' ,deleted);

           if(deleted)
          try{
            return res.json({ success: true, deleted});

            } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Delete failed' });
            }
          
          */
             }