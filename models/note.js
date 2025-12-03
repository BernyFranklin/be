const logger = require('../utils/logger')
const config = require('../utils/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url, { family: 4 })
    .then( () => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true,
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, retrunedObject) => {
        retrunedObject.id = retrunedObject._id.toString()
        delete retrunedObject._id
        delete retrunedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)