const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const studModel = require("./models/student");
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(5000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server running on 5000 port")
    }
})

mongoose.connect("mongodb://localhost/stud", () => {
    console.log("connected to db")
}, (err) => {
    console.log(err);
})


app.post("/students", (req, res) => {
    const date = new Date()
    studModel.create({
        isDeleted: false,
        name: req.body.name,
        gender: req.body.gender,
        class: req.body.class,
        age: req.body.age,
        grade_point: req.body.grade_point,
        time: date
    }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get("/students", (req, res) => {
    studModel.find().then((allData) => {
        res.status(200).send(allData);
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get("/students/:id", (req, res) => {
    studModel.find({ name: req.params.id }).then((oneData) => {
        if(oneData[0].isDeleted===false){
            res.status(200).send(oneData);
        }else{
            res.status(400).send("No record found");
        }
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.delete("/students/:id/:type", (req, res) => {
    studModel.find({ name: req.params.id }).then((odata) => {
        console.log(odata[0].isDeleted)
        if (odata[0].isDeleted) {
            res.status(404).send("No record found")
        } else if (req.params.type === "soft") {
            studModel.updateOne({ name: req.params.id }, { $set: { isDeleted: true } }).then((uData) => {
                console.log(uData.modifiedCount)
                if (uData.modifiedCount) {
                    res.status(200).send("removed sucessfully")
                } else {
                    res.status(400).send('not deleted');
                }
            }).catch((err) => {
                res.send(err)
            })
        } else {
            studModel.deleteOne({ name: req.params.id }).then(() => {
                res.send("student deleted sucessfully")
            }).catch((err) => {
                res.send(err)
            })
        }
    })

})
