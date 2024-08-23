const router = require('express').Router();

// our song model
const song = require('../models/song');

// save a song
router.post('/save', async (req, res) => {
    const newSong = new song({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    });

    try {
        const savedSong = await newSong.save();
        res.status(200).send({ success: true, song: savedSong });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

// get a song
router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    try {
        const data = await song.findOne(filter);
        if (data) {
            return res.status(200).send({ success: true, song: data });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});


// get all songs
router.get("/getAll", async (req, res) => {
    try {
        const data = await song.find().sort({ createdAt: 1 });
        if (data) {
            return res.status(200).send({ success: true, song: data });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});
        
// update a song
router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    const update = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    };
    const options = {
        upsert: true,
        new: true
    };

    try {
        const result = await song.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.status(200).send({ success: true, data: result });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
})

// delete a song

router.delete('/delete/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    try {
        const result = await song.findOneAndDelete(filter);
        if (result) {
            return res.status(200).send({ success: true, data: result });
        } else {
            res.status(400).send({ success: false, msg: "Data not found" });
        }    
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});


module.exports = router;