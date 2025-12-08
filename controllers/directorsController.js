const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const directorsController ={}

////////FOR TEST PURPOSES ONLY///////////
const fs = require("fs");
const path = require("path");
const filePath = path.join(process.cwd(), "tests", "directorRes.json");
///////////////////////////////////////
//////////////////////////////////////

directorsController.getAllDirectors = async function (req, res) {
    //#swagger.tags = ['Directors']
    try {
           const directors = await mongodb
               .getDatabase()
               .db("Cinema")
               .collection("Directors")
               .find()
               .toArray();
           res.setHeader('Content-Type', 'application/json');
           res.status(200).json(directors);

    /////// Writing to JSON file FOR TESTING PURPOSES ONLY /////
    try {
    // Overwrite the file with only the new actors array
    const report = { statusCode:200, status: "success", message: "Directos data retrieved successfully", data: directors };
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
    } catch (err) {
    console.error("Error writing file:", err);
    }
    /////
           
       } catch (error) {
           res.status(500).json({ message: error });
       }
    }
directorsController.getDirectorById = async (req, res) => {
    //#swagger.tags = ['Directors']
    try {
        const directorId = new ObjectId(req.params.id);

        const director = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Directors")
            .findOne({ _id: directorId });
        if (!director) {
            return res.status(404).json({ message: "Director not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(director);
    /////// Writing to JSON file FOR TESTING PURPOSES ONLY /////
    try {
    // Overwrite the file with only the new actors array
    const report = { statusCode:200, status: "success", message: "Director data retrieved successfully", data: director };
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
    } catch (err) {
    console.error("Error writing file:", err);
    }
    /////
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

directorsController.createDirector = async (req, res) => {
    //#swagger.tags = ['Directors']
    try {
        const director = {
            fullName: req.body.fullName,
            age: req.body.age,
            nationality: req.body.nationality,
            knownFor: req.body.knownFor,   // array of movie titles
            awardsCount: req.body.awardsCount
        };

        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Directors")
            .insertOne(director);

        if (result.acknowledged) {
            return res.status(201).json({
                message: "Director created successfully",
                id: result.insertedId
            });
        } else {
            return res.status(500).json({ message: "Failed to create director profile." });
        }

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

directorsController.updateDirector = async (req, res) => {
    //#swagger.tags = ['Directors']
    try {
        const directorId = new ObjectId(req.params.id);

        const director = {
            fullName: req.body.fullName,
            age: req.body.age,
            nationality: req.body.nationality,
            knownFor: req.body.knownFor,   // array of movie titles
            awardsCount: req.body.awardsCount
        };

        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Directors")
            .replaceOne({ _id: directorId }, director);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Director not found" });
        }
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: "Director updated successfully" });
        }
        return res.status(200).json({ message: "No changes were made" });

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};


directorsController.deleteDirector = async (req, res) => {
    //#swagger.tags = ['Directors']
    try {
        const directorId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db("Cinema")
            .collection("Directors")
            .deleteOne({ _id: directorId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Director not found" });
        }
        return res.status(200).json({ message: "Director deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};




module.exports = directorsController;