var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-base-advanced');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) console.log('bark');
  console.log('meow');
  mongoose.connection.close();
});
