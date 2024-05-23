const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const Word =require('../models/word.js')

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




router.post('/', async (req, res) => {
    const { word, sentence} = req.body;
    try {
        // this is the code to add the word to the database and to set the dificulty as the word length
        const newWord = new Word({ word, difficulty: word.length, sentence });
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


// [
//     {
//         "_id": "664f5fb73c142fe47bc08b04",
//         "word": "Blanket",
//         "difficulty": 7,
//         "sentence": "He wrapped himself in a warm blanket on the cold winter night.",
//         "__v": 0
//     },
//     {
//         "_id": "664f5fd63c142fe47bc08b06",
//         "word": "Apple",
//         "difficulty": 5,
//         "sentence": "She ate a juicy apple for her afternoon snack.",
//         "__v": 0
//     },
//     {
//         "_id": "664f60083c142fe47bc08b0a",
//         "word": "Fragrance",
//         "difficulty": 9,
//         "sentence": "The fragrance of the blooming roses filled the garden.",
//         "__v": 0
//     },
//     {
//         "_id": "664f60233c142fe47bc08b0c",
//         "word": "Jewelry",
//         "difficulty": 7,
//         "sentence": "She admired the sparkling jewelry displayed in the store window.",
//         "__v": 0
//     },
//     {
//         "_id": "664f60463c142fe47bc08b0e",
//         "word": "Mischievous",
//         "difficulty": 11,
//         "sentence": "The mischievous cat knocked over the vase while playing.",
//         "__v": 0
//     },
//     {
//         "_id": "664f605d3c142fe47bc08b10",
//         "word": "Quarantine",
//         "difficulty": 10,
//         "sentence": "During the pandemic, they had to quarantine for two weeks after traveling.",
//         "__v": 0
//     },
//     {
//         "_id": "664f60743c142fe47bc08b12",
//         "word": "Conscientious",
//         "difficulty": 13,
//         "sentence": "She is a conscientious student who always completes her assignments on time.",
//         "__v": 0
//     },
//     {
//         "_id": "664f62893c142fe47bc08b14",
//         "word": "Kaleidoscope",
//         "difficulty": 12,
//         "sentence": "Looking through the kaleidoscope, the child was fascinated by the colorful patterns.",
//         "__v": 0
//     },
//     {
//         "_id": "664f62a73c142fe47bc08b16",
//         "word": "Nomenclature",
//         "difficulty": 12,
//         "sentence": "The nomenclature of chemical compounds can be quite complex for beginners.",
//         "__v": 0
//     },
//     {
//         "_id": "664f631b3c142fe47bc08b18",
//         "word": "Serendipity",
//         "difficulty": 11,
//         "sentence": "It was pure serendipity that they found the hidden treasure while hiking.",
//         "__v": 0
//     }
// ]