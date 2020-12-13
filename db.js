const mongoose = require('mongoose')
const dbName = 'mini-twitter'

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.p8ow8.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => console.log('Database connected successfully'))
.catch((err) => {
    console.log('Connecting to database failed!!!\n',
        err.name, '\n',
        err.message, '\n',
        err
    )
})