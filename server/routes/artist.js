const router = require('express').Router();

// our artist model
const artist = require('../models/artist');

router.post('/save', async (req, res) => {
    const newArtist = new artist({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    });

    try {
        const savedArtist = await newArtist.save();
        res.status(200).send({ success: true, artist: savedArtist });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

// obtener un artista
router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    try {
        const data = await artist.findOne(filter);
        if (data) {
            return res.status(200).send({ success: true, artist: data });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
    
});


// obtener todos los artistas
router.get("/getAll", async (req, res) => {
    try {

        const data = await artist.find().sort({ createdAt: 1 });
        if (data) {
            return res.status(200).send({ success: true, artist: data });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
    
});

// Actualizar un artista
router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    const update = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    };
    const options = {
        upsert: true,
        new: true
    };

    try {
        const result = await artist.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.status(200).send({ success: true, data: result });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
})

// Eliminar un artista
router.delete('/delete/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    try {
        const result = await artist.deleteOne(filter);
        if (result) {
            return res.status(200).send({ success: true, msg: "Dato eliminado", data: result });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

module.exports = router;