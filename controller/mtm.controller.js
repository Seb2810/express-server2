const express = require("express");
require('dotenv').config();

//const { Sequelize,QueryTypes, Model, DataTypes } = require("sequelize");


const {sequelize , Ecrivain, Mylivre, Ecrivainlivre  } = require('../models');



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
          await myecrivain.addLivres(addlivre);

          res.json({ name: bookname , firstName : firstName  , lastName : lastName  });


         }

 //---------------SELECT ALL MANY TO MANY VALUE-------------------------

         exports.findmtom = async(req,res)=>{

          try {
          
       // const result = await   Ecrivain.findAll({ include: Mylivre  });
           const result = await Ecrivain.findAll({  include: [
        {
          model: Mylivre,
          as: 'livres'   // 🔥 livres matcher(... as: 'livres')
        }
      ]
    });
                  
        //console.log('------------------------------------------------------');

        console.log(JSON.stringify(result, null, 2));
              
        //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

        res.json(result);
                
        } catch (error) {
              
          res.json({ error: 'Internal Server Error' });

          }
    
         }

   //---------------ADD  MANY TO MANY VALUE-------------------------     
   
   exports.Addmtom = async (req, res) => {
  try {
    const { id, addmylivre } = req.body;

    console.log('→ req.body ' , req.body ) ;

    const ecrivain = await Ecrivain.findByPk(id);

      console.log('→ ecrivain ' , ecrivain );

    if (!ecrivain) {

      return res.status(404).json({ error: 'Ecrivain not found' });
    }

    const livre = await Mylivre.create({ name: addmylivre });

    await ecrivain.addLivre(livre);

    //  RETOURNE LE LIVRE AVEC ID
    return res.json(livre);

  } catch (err) {

    console.error(err);

    return res.status(500).json({ error: 'Add livre failed' });
  }
};


     //-------------MNANY TO MANY UPDATE ROMAN ------------------------
     
     exports.updateMylivre = async (req, res) => {

      console.log("M to M updating livre ....")
        try {
          const { id, name } = req.body;

           console.log(' update request name' ,req.body.name);
           console.log(' update request id' ,req.body.id);

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

      console.log('en cours deleteManytoManyTodos ....');

  const livreId = req.params.id;
  const ecrivainId = req.params.idecrivain;

  console.log('livreId:', livreId);
  console.log('ecrivainId:', ecrivainId);

  const t = await sequelize.transaction();

  try {
    //  1. Récupérer les deux entités DANS la transaction
    const livre = await Mylivre.findOne({
      where: { id: livreId },
      transaction: t
    });

    const ecrivain = await Ecrivain.findOne({
      where: { id: ecrivainId },
      transaction: t
    });

    if (!livre || !ecrivain) {
      throw new Error('Livre ou écrivain introuvable');
    }
    //✅select the 2 id values from select to use removeMylivre magic function
    // 2. Supprimer la relation (table d’association)
    await ecrivain.removeLivre(livre, { transaction: t });

    //  3. Commit
    await t.commit();

    return res.json({ success: true, livreId, ecrivainId });
  } catch (error) {
    await t.rollback(); //  annule la suppression de la relation
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

    
     }


       //-------------MANY TO MANY Delete ALL => ECRIVAIN + ALL his booKs-------------------

       exports.deleteAllManytoManyTodos = async(req,res)=>{


        const ecrivainId = req.params.id;

  const t = await sequelize.transaction();

  try {
    // 1. récupérer TOUS les livres de l’écrivain
    const livres = await Mylivre.findAll({
      include: {
        model: Ecrivain,
        as: 'ecrivains',
        where: { id: ecrivainId },
        attributes: []
      },
      transaction: t
    });

    const livreIds = livres.map(l => l.id);

    // 2. supprimer les relations (table pivot)
    await Ecrivainlivre.destroy({
      where: { ecrivainId },
      transaction: t
    });

    // 3. supprimer les livres
    if (livreIds.length > 0) {
      await Mylivre.destroy({
        where: { id: livreIds },
        transaction: t
      });
    }

    // 4. supprimer l’écrivain
    await Ecrivain.destroy({
      where: { id: ecrivainId },
      transaction: t
    });

    // ✅ tout est OK
    await t.commit();

    res.json({
      success: true,
      deletedEcrivainId: ecrivainId
    });

  } catch (error) {
    await t.rollback();
    console.error(error);

    res.status(500).json({
      error: 'Delete many-to-many failed'
    });
  }

       
       }