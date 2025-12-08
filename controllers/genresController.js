const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const genresController = {};

////////FOR TEST PURPOSES ONLY///////////
const fs = require("fs");
const path = require("path");
const filePath = path.join(process.cwd(), "tests", "genreRes.json");
///////////////////////////////////////
//////////////////////////////////////



// GET all genres
genresController.getAllGenres = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genres = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Genres")
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(genres);

    /////// Writing to JSON file FOR TESTING PURPOSES ONLY /////
    try {
    // Overwrite the file with only the new actors array
    const report = { statusCode:200, status: "success", message: "Genres data retrieved successfully", data: genres };
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
    } catch (err) {
    console.error("Error writing file:", err);
    }
    /////

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

// GET genre by ID
genresController.getGenreById = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genreId = new ObjectId(req.params.id);
        const genre = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Genres")
            .findOne({ _id: genreId });
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(genre);

    /////// Writing to JSON file FOR TESTING PURPOSES ONLY /////
    try {
    // Overwrite the file with only the new actors array
    const report = { statusCode:200, status: "success", message: "Genre data retrieved successfully", data: genre };
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
    } catch (err) {
    console.error("Error writing file:", err);
    }
    /////

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

// CREATE a genre
genresController.createGenre = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genre = {
            name: req.body.name,
            description: req.body.description,
            popularMovies: req.body.popularMovies, // array of movie titles
            originDecade: req.body.originDecade
        };

        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Genres")
            .insertOne(genre);

        if (result.acknowledged) {
            return res.status(201).json({
                message: "Genre created successfully",
                id: result.insertedId
            });
        } else {
            return res.status(500).json({ message: "Failed to create genre." });
        }
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

// UPDATE a genre
genresController.updateGenre = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genreId = new ObjectId(req.params.id);
        const genre = {
            name: req.body.name,
            description: req.body.description,
            popularMovies: req.body.popularMovies,
            originDecade: req.body.originDecade
        };

        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Genres")
            .replaceOne({ _id: genreId }, genre);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Genre not found" });
        }
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: "Genre updated successfully" });
        }
        return res.status(200).json({ message: "No changes were made" });
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

// DELETE a genre
genresController.deleteGenre = async (req, res) => {
    //#swagger.tags = ['Genres']
    try {
        const genreId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Genres")
            .deleteOne({ _id: genreId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Genre not found" });
        }
        return res.status(200).json({ message: "Genre deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

module.exports = genresController;
