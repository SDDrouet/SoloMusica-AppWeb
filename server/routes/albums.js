const router = require('express').Router();

// our album model
const album = require('../models/album');

// save an album
router.post('/save', async (req, res) => {
    const newAlbum = new album({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    });

    try {
        const savedAlbum = await newAlbum.save();
        res.status(200).send({ success: true, album: savedAlbum });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

// get an album
router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    try {
        const data = await album.findOne(filter);
        if (data) {
            return res.status(200).send({ success: true, album: data });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
    
});

// get all albums
router.get("/getAll", async (req, res) => {
    try {

        const data = await album.find().sort({ createdAt: 1 });
        if (data) {
            return res.status(200).send({ success: true, album: data });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
    
});

// update an album
router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    const update = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    };
    const options = {
        upsert: true,
        new: true
    };

    try {
        const updatedAlbum = await album.findOneAndUpdate(filter, update, options);
        res.status(200).send({ success: true, album: updatedAlbum });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

// delete an album

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    try {
        const deletedAlbum = await album.deleteOne(filter);
        res.status(200).send({ success: true, msg: "Dato eliminado", album: deletedAlbum });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});


module.exports = router;