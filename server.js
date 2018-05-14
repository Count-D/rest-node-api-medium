const express = require('express');
const {mongoose} = require('./db/mongoose');
const {User} = require('./model/user');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post("/users", async (req, res) => {
    try{
    let user = new User(req.body);
        await user.save()
        await res.send(`${user.email} saved to database`);
    } catch (err){
            res.status(400).send("Unable to save to database");
        };
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
        }

      try {
        const user = await User.findById(id)
            if(!user){
               return res.status(404).send();
            }
            await res.send(`Hello ${user.email}`); 
      } catch (e){
            res.status(400).send();
        }
    });

    app.patch('/users/:id', async (req, res) => {
        const id = req.params.id;
        const body = req.body;

        if(!ObjectID.isValid(id)){
            return res.status(404).send();
            }
        try {
            const user = await User.findByIdAndUpdate(id, {$set: body}, {new: true});
                if(!user){
                   return res.status(404).send();
                }
                await res.send(`User: ${user.email} is Changed`);
            } catch(e){
                res.status(400).send();
            }
    });

    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;

        if(!ObjectID.isValid(id)){
            return res.status(404).send();
            }
        try {
            const user = await User.findByIdAndRemove(id)
            if(!user){
                return res.status(404).send();
                    }
                await res.send(`User ${user.email} is Removed!`);
            } catch (e){
                res.status(400).send();
            }
    });

app.listen(3000, () => console.log('App is listening on port 3000!'));

