const express = require('express');
const cors = require ('cors');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

const mongoURI = 'mongodb://localhost:27017/todolist';
mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error: ", err));

const todoSchema = new mongoose.Schema({
  itemDescription: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('todoItems', todoSchema);
// module.exports=Todo;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    console.log("Default route");
    res.send("welcome to the todolist api");
});

app.post('/add-item', async (req, res) => {
    const { itemDescription } = req.body;
     console.log("Request received:");
    console.log("itemDescription:", itemDescription); 
    try {
        const newItem = new Todo({ itemDescription, completed: false });
        await newItem.save();
        console.log("Saved item:", newItem);
        res.status(201).json({ message: "Item added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add item." });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
