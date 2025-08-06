const express = require("express"); 
const router = express.Router();
const { explainLegalText} = require("../services/openai")

router.post("/", async (req, res) => { 
    try { 
        const { text } = req.body; 

        if(!text || text.length < 20){ 
            return res.status(400).json({error : "Text is too short or missing.. "}); 
        }
        
        const explanation = await explainLegalText(text); 
        res.json({explanation}); 
    } catch(err){ 
        console.error(err); 
        res.status(500).json({ error: "Failed to process legal text. "}); 
    }
}); 

module.exports = router; 