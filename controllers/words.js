const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const Word =require('../models/word.js')

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




router.post('/', async (req, res) => {
    const { word } = req.body;
    try {
        // this is the code to add the word to the database and to set the dificulty as the word length
        const newWord = new Word({ word, difficulty: word.length });
        await newWord.save();
    // const addedWord = await Word.create(jsonData)
   

        res.status(201).json(newWord); // 201 Created
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.get('/',async (req, res) => {
    try {
       
    const createdWord = await Word.find()
    res.status(201).json(createdWord); 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:wordId',async (req, res) => {
    try {
       
    const foundWord = await Word.findById(req.params.wordId)
    res.status(201).json(foundWord); 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})



router.delete('/:wordId',async (req, res) => {
    try {
       
    const deletedWord = await Word.findByIdAndDelete(req.params.wordId)
    res.status(201).json(deletedWord); 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})
router.put('/:wordId',async (req, res) => {
    try {
       
    const updatedPet = await Word.findByIdAndUpdate(req.params.petId, req.body, {new: true })
    res.status(201).json(updatedWord); 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;