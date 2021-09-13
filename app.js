const express = require('express');
const bodyParser = require('body-parser'); // this is a middleware use to tidy up the reques tobject before we use them
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json())
// MongoClient.connect(connectionString, (err, client) => {
// ... do something here
// }))
MongoClient.connect('mongodb+srv://aditya:aditya123@nodetutorial.3abll.mongodb.net/tutorials?retryWrites=true&w=majority')
    .then(client => {
        const db = client.db('todo-list');
        const todos = db.collection('tasks');//this helps store a collection of things (similar to boxes in a room), make a collection director basically;

        // POST is the CREATE operation.
        // can be triggered through JS or a <form> element
        app.post('/tasks', (req, res) => {
            todos.insertOne(req.body)
                .then(result => {
                    console.log(result);
                    res.redirect('/')
                })
                .catch(error => console.log(error));
        })
        //READ and render with template engine 
        app.get('/', (req, res) => {
            const cursor = db.collection('tasks').find().toArray()
                // But this cursor object contains all quotes from our database! It has a bunch of method that lets us get our data. For example, we can use toArray to convert the data into an array.
                .then(results => {
                    res.render('index.ejs', { tasks: results })
                })
                .catch(error => console.error(error))
        })
        // UPDATE using JS
        //method to be used , find one and update 
        // quotesCollection.findOneAndUpdate(
        //   query,
        //   update,
        //   options
        // )
        // .then(result => {/* ... */ })
        // .catch(error => console.error(error))
        // query lets us filter the collection with key-value pairs. If we want to filter quotes to those written by Yoda, we can set name: 'Yoda' as a query
        //update tells mongo waht to change
        app.put('/tasks', (req, res) => {
            todos.findOneAndUpdate(
                { name: 'Code' },
                {
                    $set: {
                        name: req.body.name,
                        time: req.body.time
                    }
                },
                {
                    upsert: true //inserts a document if no document can be updated
                }
            )
                .then(result => {
                    res.json('Success');
                })
                .catch(error => console.error(error))
            console.log(req.body)
        })

        //DELETE
        // quotesCollection.deleteOne(
        //     query,
        //     options
        //   )
        //     .then(result => {/* ... */})
        //     .catch(error => console.error(error))
        app.delete('/tasks', (req, res) => {
            todos.deleteOne(
                { name: req.body.name },
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No task to delete')
                    }
                    res.json(`Task Deleted`)
                })
                .catch(error => console.error(error))
        })
    })
    .catch(console.error)


app.use(bodyParser.urlencoded({ //.use() method is used to use middlewares
    extended: true
}))
app.listen(3000, function () {
    console.log('listening on 3000');
})
// GET request is a READ operation
// a get request is handled with a .get method
//app.get(endpoint, callback)  : endpoint is the route / any thing that comes after the .com thing
//callback is the function which should be executed after get request

// app.get('/', (req, res) => {
//     // res.send('Hello World');  //localhost: 3000 shows hello world now
//     res.sendFile(__dirname + '/index.html'); // sends an html 
// })


