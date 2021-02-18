let data = [
    { id: 1, name: 'Karthick', age:21 },
    { id: 2, name: 'Gokul', age:24 },
    { id: 3, name: 'prasanth', age:25},
    { id: 4, name: 'lazer', age:23 },
];

var express = require('express')
var app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {

    res.send(JSON.stringify(data));
  })
  app.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id); //It will check the id values
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});
  
  // POST method route
  app.post('/', function (req, res) {
    let itemId = data.map(item => item.id);
    //let ageNum = data.map(item => item.age);
    let newId = itemId.length > 0 ? Math.max.apply(Math, itemId) + 1 : 1;
   // let ageNum1 = ageNum.length > 0 ? Math.max.apply(Math, ageNum) + 1 : 1;

    // create an object of new Item
      let newItem={
        id: newId, // generated in above step
        name: req.body.name, // value of `title` get from POST req
        age: req.body.age, // generated in above step
        }
    data.push(newItem);
    res.status(201).json(newItem);
  })

  app.put('/:id',function(req,res){//id found then start the update function
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if(found){
        let updated= {
            id:found.id,
            name:req.body.name,
            age:req.body.age
        };
        let updateindex=data.indexOf(found);
        console.log(updateindex);
        data.splice(updateindex,1,updated);
        res.send('Success');
    }
    else{
        res.send('FailedSuccess');
    }
});
app.delete('/:id',function(req,res){
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
});

if (found) {
    // if item found then find index at which the item is
    // stored in the `data` array
    let targetIndex = data.indexOf(found);

    // splice means delete item from `data` array using index
    data.splice(targetIndex, 1);
}

// return with status 204
// success status response code 204 indicates
// that the request has succeeded
res.send('Not Found');
})

  app.listen(port, () => {
    console.log(`Running Successfully`);
  })