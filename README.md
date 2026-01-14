
## &#127808; SERVER EXPRESS

##  &#128165; Front-end du projet :

https://github.com/Seb2810/angular-front2

## Demarrer le server avec : 

cd C:/express-server2

node ./bin/www
 
## config du server
```js
const express = require("express");
require('dotenv').config();

const cors = require('cors');
const { Sequelize, Model, DataTypes } = require("sequelize");
const createError = require('http-errors');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const auteurManyRoutes = require('./routes/auteurmany.route');

const auteurHasONeRoutes = require('./routes/author.route');

const auteurMtmRoutes = require('./routes/mtm.route');


const app = express();
app.use(cors({
  origin: [
    'http://localhost:4200'
    ]
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ===================== ROUTES ===================== */

app.use('/', indexRouter);


app.use('/auteurmany', auteurManyRoutes);

app.use('/author', auteurHasONeRoutes);

app.use('/mtm', auteurMtmRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 module.exports = app;
```

##  auteur one to many
```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auteur extends Model {
  

  }
Auteur.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Auteur',
      timestamps: true
    }
  );

  Auteur.associate = (models) => {
    Auteur.hasMany(models.Roman, {
      foreignKey: {
        name: 'auteurId',
        allowNull: false
      },
      as: 'romans',
      onDelete: 'CASCADE',   // 🔥
      hooks: true            // 🔥 OBLIGATOIRE
    });
  };

  return Auteur;
};
```
 
##  roman one to many

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {


  class Roman extends Model {}

  Roman.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Roman',
      timestamps: true
    }
  );

  Roman.associate = (models) => {
    Roman.belongsTo(models.Auteur, {
      foreignKey: {
        name: 'auteurId',
        allowNull: false
      },
      as: 'auteur',
      onDelete: 'CASCADE'
    });
  };

  return Roman;
};
```


##  migration pour ajouter le DELETE CASCADE

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 🔥 Supprimer l'ancienne contrainte si elle existe
    await queryInterface.removeConstraint('Romans', 'Romans_auteurId_fkey')
      .catch(() => {});

    // 🔥 Ajouter la FK avec CASCADE
    await queryInterface.addConstraint('Romans', {
      fields: ['auteurId'],
      type: 'foreign key',
      name: 'Romans_auteurId_fkey',
      references: {
        table: 'Auteurs',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Romans', 'Romans_auteurId_fkey');
  }
};
```
##  auteurmany.controller

```js


    const {sequelize ,Roman, Auteur } = require('../models');


    exports.getmanyTodos= async (req, res) => {

      try {
        const tasks2 = await Auteur.findAll({  include: [
        {
          model: Roman,
          as: 'romans'  
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
     
      const booknamemany =req.body.name;
      console.log('firstName' ,   firstName );
      console.log('lastName' ,  lastName );
      console.log('Name' ,   booknamemany );
     
     await Auteur.create(
       {
         firstName: firstName ,
         lastName:  lastName,
     , 
         romans: {
        
           name:  booknamemany,
       
           
         },
       },
       {
       
         include: [
        {
          model: Roman,
          as: 'romans'  
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

                res.json(roman); 

              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Update failed' });
              }
            };


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

                await t.commit(); 

                return res.json({ success: true, deleted });
              } catch (error) {
                await t.rollback(); 
                console.error(error);

                return res.status(500).json({
                  success: false,
                  error: error.message
                });
              }


             }

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
              
             
             }
        

         auteurmany.route
            
            const express = require('express');
            const router = express.Router();
            
            const {
             getmanyTodos,
              createManyTodos,
              createManyRoman,   // ✅ AJOUT ICI
              updateRoman,
              deleteOnemanyTodos,
              deleteAllmanyTodos
            } = require('../controller/auteurmany.controller.js');
            
            // ONE TO ONE
            router.get('/', getmanyTodos);
            router.post('/add', createManyTodos);
            router.post('/add-one', createManyRoman);
            router.put('/update', updateRoman);
            
            // ✅ D’ABORD la plus longue
            router.delete('/delete-all/:id', deleteAllmanyTodos);
            
            // ✅ ENSUITE la plus courte
            router.delete('/delete/:id', deleteOnemanyTodos)

             module.exports = router;

   ```
