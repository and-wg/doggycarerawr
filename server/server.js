//serverkod osv
import express from "express"
import mongoose from "mongoose";
import cors from "cors"

const app = express();
app.use(cors())
const PORT = 4000;
app.use(express.json());


mongoose.connect('mongodb+srv://ragnar525:1234@doggy-care.2ervazx.mongodb.net/?retryWrites=true&w=majority&appName=doggy-care', { useNewUrlParser: true, useUnifiedTopology: true })

const dogsDataSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  age: Number,
  breed: String,
  info: String,
  present: Boolean,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }]
});

const Dog = mongoose.model('Dog', dogsDataSchema);

app.use(express.json());

app.get('/dogs', async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (error) {
    console.error('Error fetching dogs:', error);
    res.status(500).send('Failed to fetch dogs.');
  }
});

app.post('/dogs/addDogProfile', async (req, res) => {
  const { name, nickname, age, breed, info, present, friends } = req.body;
  try {
    const newDog = new Dog({ name, nickname, age, breed, info, present: present || false, friends});
    await newDog.save();
    res.status(201).send('Dog profile added successfully!');
  } catch (error) {
    console.error('Error adding dog profile:', error);
    res.status(500).send('Failed to add dog profile.');
  }
});



app.get('/dogs/:id', async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id).populate('friends');
    if(!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }
    res.json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/dogs/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, nickname, age, breed, info, present, friends } = req.body; 
  try {
    const updatedDog = await Dog.findByIdAndUpdate(id, { name, nickname, age, breed, info, present, friends }, { new: true });
    if (!updatedDog) {
      return res.status(404).json({ message: 'Dog not found.' });
    }
    res.status(200).json(updatedDog);
  } catch (error) {
    console.error('Error updating dog:', error);
    res.status(500).send('Failed to update dog. SERVER');
  }

});

app.delete('/dogs/:id', async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) {
      return res.status(404).json({ message: 'Dog not found.' });
    }
    res.json({ message: 'Dog deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});