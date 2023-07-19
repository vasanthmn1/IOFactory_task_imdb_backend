// const movieMode = require("../model/movieModel");

const actorModel = require("../model/actorModel");
const movieModel = require("../model/movieModel");
const producerModel = require("../model/producer.model");

const createProducer = async (req, res) => {
    const { name, gender, dob, bio } = req.body;

    try {
        const producer = new producerModel({ name, gender, dob, bio });
        await producer.save();

        res.json(producer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create producer' });
    }
};

module.exports = {
    createProducer,
};


const createActor = async (req, res) => {
    const { name, gender, dob, bio } = req.body;

    try {
        const actor = new actorModel({ name, gender, dob, bio });
        await actor.save();

        res.json(actor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create actor', error });
    }
};



const createMovie = async (req, res) => {
    const { name, yearOfRelease, producer, actors } = req.body;

    try {
        const movie = new movieModel({ name, yearOfRelease, producer, actors });
        await movie.save();

        // Update actors' movies array
        await actorModel.updateMany(
            { _id: { $in: actors } },
            { $push: { movies: movie._id } }
        );

        // Update producer's movies array
        await producerModel.findByIdAndUpdate(producer, { $push: { movies: movie._id } });

        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create movie' });
    }
};

const getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.find()
            .populate('actors', 'name')
            .populate('producer', 'name');

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};


module.exports = {
    createProducer,
    createMovie,
    createActor,
    getAllMovies
}