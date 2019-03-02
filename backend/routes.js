const express = require('express');
const router = express.Router();
const Game = require('./game.model');
router.get('/', (req, res, next) => {
    res.send('Prueba');

});

router.get('/todos', (req, res, next) => {
    Game.findAll().then(juegos => {
        return res
            .status(200)
            .json(juegos);
    }).catch(err => console.log(err));


});

router.post('/anadir', (req, res, next) => {
    // const post = req.body;
    const title = req.body.title;
    const consoles = req.body.console;
    const game = new Game(null, title, consoles);
    Game.create({
        title: title,
        console: consoles,
    }).then(data => {
        console.log(data);
        res.status(201).json(data);
    })

    /* res.status(201).json({
         message: 'post added'
     });*/
});

router.put('/editar/:id', (req, res, next) => {
    console.log(req.params.id);
    /*  Game.update({
          title: req.body.title,
          console: req.body.console
      }, {
          where: {
              id: req.params.id
          }
      });*/
    Game.findByPk(req.params.id).then((game) => {

        game.title = req.body.title;
        game.console = req.body.console;
        return game.save();
        //  res.status(200).json("borrado");
    }).then(() => {
        res.status(201).json("actualizado");
    }).catch(err => console.log(err));


});

router.delete('/eliminar/:id', (req, res, next) => {
    console.log(req.params.id);
    Game.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json("borrado");
    }).catch(err => console.log(err));


});


module.exports = router;