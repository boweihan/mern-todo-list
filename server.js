var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // lets us use req.body
var Todo = require('./model/todos');

var app = express();
var router = express.Router();
var port = process.env.API_PORT || 3001;

// free tier creds, gonna commit this straight to github
mongoose.connect('mongodb://admin:admin@ds153869.mlab.com:53869/todolist');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  // Don't cache requests for now
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'TodoList Server Booted Up!' });
});

// routes
router
  .route('/todos')
  .get((req, res) => {
    Todo.find()
      .sort('dueDate')
      .exec((err, comments) => {
        if (err) res.send(err);
        res.json(comments);
      });
  })
  .post((req, res) => {
    var todo = new Todo();
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.status = req.body.status;
    todo.dueDate = req.body.dueDate;
    todo.save((err, todo) => {
      if (err) res.send(err);
      res.json({ message: 'Todo successfully added!', todo });
    });
  });

router
  .route('/todos/:todo_id')
  .put((req, res) => {
    Todo.findById(req.params.todo_id, (err, todo) => {
      if (err) res.send(err);
      todo.title = req.body.title ? req.body.title : todo.title;
      todo.description = req.body.description
        ? req.body.description
        : todo.description;
      todo.status = req.body.status ? req.body.status : todo.status;
      todo.dueDate = req.body.dueDate ? req.body.dueDate : todo.dueDate;
      todo.save((err, todo) => {
        if (err) res.send(err);
        res.json({ message: 'Todo has been updated!', todo });
      });
    });
  })
  .delete(function(req, res) {
    Todo.remove({ _id: req.params.todo_id }, function(err, todo) {
      if (err) res.send(err);
      res.json({ message: 'Todo has been deleted', todo });
    });
  });

router.route('/todos/filter').get((req, res) => {
  // handle status filter
  let statusFilter = req.query.status;
  let titleFilter = req.query.title;

  let query = {};
  if (statusFilter) {
    query.status = statusFilter;
  }
  if (titleFilter) {
    query.title = { $regex: titleFilter, $options: 'i' };
  }

  if (Object.keys(query).length > 0) {
    Todo.find(query)
      .sort('dueDate')
      .exec((err, comments) => {
        if (err) {
          console.log(err);
          res.send(err);
        }
        res.json(comments);
      });
  }
});

// use router configuration to handle all /api routes
app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
