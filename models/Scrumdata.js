const mongoose = require("mongoose");

const ScrumdataSchema = new mongoose.Schema({
    // id: {
    //     type: String
    // },
    sprint: {
        type: Number
    },
    name: {
        type: String
    },
    wentwell: {
        type: String
    },
    wentwrong: {
        type: String
    },
    focusarea: {
        type: String
    },
    remarks: {
        type: String
    }
})

const ScrumdataModel = mongoose.model("scrumdatas",ScrumdataSchema)

module.exports = ScrumdataModel