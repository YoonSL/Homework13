
var todoList = require("../data");


module.exports = function(app) {

  app.get("/api/todos", function(req, res) {
    todoList.Todo.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/todos", function(req, res) {
    todoList.Todo.create({
      text: req.body.text,
    }).then(function(data) {
      res.json(data);
    })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.put("/api/todos", function(req, res) {
    todoList.Todo.update({
        complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data);
    })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.delete("/api/todos/", function(req, res) {
    todoList.Todo.destroy({
      where: {
        id: req.body.id
      }
      
    }).then(function(data) {
      res.json(data);
      console.log(data);
    });
  });
  
};
