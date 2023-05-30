let express = require('express');
const session = require('express-session');
//const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const fs = require('fs');

let app = express();
const upload = multer({ dest: 'uploads/' });
// Set up session middleware
app.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: true
}));

// Set up Handlebars as the template engine
//app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('public_html', path.join(__dirname, 'public_html'));

let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('velvet-vibes-db');

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

//Here we are configuring express to use inbuilt body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  if (req.session.user !== undefined) {
    res.redirect('/Index');
  }
  else {
    res.render('login');
  }

});

app.post('/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var db_username = "";
  var db_password = "";
  var db_name = "";
  var db_email;
  var db_dob = "";
  var db_isActive = "";
  const htmlMessage = '<p class="text-primary">Since you are not registered you were redirected to the sign up form</p>';
  const invalidCredMsg = '<p class="text-danger">Incorrect username or password!</p>';

  const query = 'SELECT * FROM Users WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    else {
      if (row) {
        db_username = row.username;
        db_password = row.password;
        db_name = (row.firstname).concat(" ", row.surname);
        db_email = row.email;
        db_dob = row.DateofBirth;
        db_isActive = row.IsActive;
      }
      else {
        db_username;
        db_password;
      }
      if (db_username != "" && db_username != null && db_username != 'undefined') {
        if(db_password != password)
        {
          //res.locals.message = invalidCredMsg;
          res.render('login', { invalidCredMsg });
        }
        else
        {
          req.session.user = { db_username, db_name, db_email };
          res.render('Index', { user: req.session.user });
          res.redirect('/Index');
        }
      }
      else {
        res.locals.message = htmlMessage;
        res.render('signup');
      }
    }
  });
});

app.get('/signup', (req, res) => {
  const message = res.locals.message;

  res.render('signup', { message });
});

app.post('/signup', function (req, res, next) {
  let fname = req.body.fname;
  let surname = req.body.surname;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let dob = req.body.dob;
  let isAvtive = 1;

  let stmt = db.run(`INSERT INTO Users (firstname, surname, username, password, email, DateofBirth, IsActive) VALUES ("${fname}", "${surname}", "${username}", "${password}", "${email}", "${dob}", "${isAvtive}")`);

  setTimeout(() => {
    res.render('login');
  }, 1500);

});

app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      // Redirect the user to the login page or any other desired page
      res.render('login');
    }
  });
});

app.get('/Index', async (req, res) => {
  user = req.session.user;
  let feedbackData = "";

  if (user) {
    if (req.session.user.db_username == 'admin') {
      res.redirect('admin');
    }
    else {
      try {
        feedbackData += '<table class="table table-bordered table-striped">';
        feedbackData += '<thead class="thead-dark"><tr>';
        feedbackData += '<th>Name</th><th>Feedback</th><th>Rating</th>';
        feedbackData += '<tr></thead><tbody>';
        const rows = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM Reviews', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });

        if (rows.length === 0) {
          feedbackData += '<tr><td colspan="3"> No data found </td></tr>';
        } else {
          rows.forEach(function (row) {
            feedbackData += '<tr>';
            feedbackData += '<td>' + row.name + '</td>';
            feedbackData += '<td>' + row.feedback + '</td>';
            feedbackData += '<td>' + row.rating + '</td></tr>';
          });
        }

        feedbackData += '</tbody></table>';

        res.render('index', { feedbackData, user });
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    }
  } else {
    res.render('login');
  }
});

app.get('/admin', async (req, res) => {
  let user = req.session.user;
  let feedbackData = "";
  let queryData = "";
  if (user) {
    if (!req.session.user.db_username == 'admin') {
      res.redirect('Index');
    }
    else {
      try {
        feedbackData += '<table class="table table-bordered table-striped">';
        feedbackData += '<thead class="thead-dark"><tr>';
        feedbackData += '<th>Name</th><th>Feedback</th><th>Rating</th>';
        feedbackData += '<tr></thead><tbody>';

        queryData += '<table class="table table-bordered table-striped">';
        queryData += '<thead class="thead-dark"><tr>';
        queryData += '<th>Name</th><th>Email</th><th>Phone</th></th><th>Message</th>';
        queryData += '<tr></thead><tbody>';

        const rows = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM Reviews', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });

        if (rows.length === 0) {
          feedbackData += '<tr><td colspan="3"> No data found </td></tr>';
        } else {
          rows.forEach(function (row) {
            feedbackData += '<tr>';
            feedbackData += '<td>' + row.name + '</td>';
            feedbackData += '<td>' + row.feedback + '</td>';
            feedbackData += '<td>' + row.rating + '</td></tr>';
          });
        }

        const rows2 = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM Contact', (err, rows2) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows2);
            }
          });
        });

        if (rows2.length === 0) {
          queryData += '<tr><td colspan="3"> No data found </td></tr>';
        } else {
          rows2.forEach(function (row) {
            queryData += '<tr>';
            queryData += '<td>' + row.name + '</td>';
            queryData += '<td>' + row.email + '</td>';
            queryData += '<td>' + row.phone + '</td>'
            queryData += '<td>' + row.message + '</td></tr>';
          });
        }

        queryData += '</tbody></table>';
        feedbackData += '</tbody></table>';

        res.render('admin', { feedbackData, queryData, user });
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    }
  } else {
    res.render('login');
  }
});

//Feedback post method
app.post('/feedback', function (req, res, next) {
  let name = req.body.name;
  let feedback = req.body.feedback;
  let rating = req.body.rating;

  let stmt = db.run(`INSERT INTO Reviews (name, feedback, rating) VALUES ("${name}", "${feedback}", "${rating}")`);

  res.redirect('/Index');
});

//Contact post method
app.post('/contact', function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let message = req.body.message;

  let stmt = db.run(`INSERT INTO Contact (name, email, phone, message) VALUES ("${name}", "${email}", "${phone}", "${message}")`);

  setTimeout(() => {
    res.redirect('contact.html');
  }, 1500);
});

app.post('/products', upload.single('Image'), (req, res) => {
  const name = req.body.ProductName;
  const description = req.body.Description;
  const price = req.body.Price;
  const quantity = req.body.Quantity;
  const categoryID = req.body.CategoryID;
  const brand = req.body.Brand;
  const imagePath = req.file.path;
  const createdOn = new Date();
  const formattedDateTime = createdOn.toISOString().slice(0, 19).replace('T', ' ');
  const modifiedOn = "";

  // Read the file and convert it to a buffer
  const imageBuffer = fs.readFileSync(imagePath);

  const query = 'INSERT INTO products (ProductName, Description, Price, Quantity, CategoryID, Brand, Image, CreatedOn, ModifiedOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.run(query, [name, description, price, quantity, categoryID, brand, imageBuffer, formattedDateTime, modifiedOn], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to insert the image into the database.');
    } else {
      //res.status(200).send('Image uploaded successfully.');
      res.redirect('/products');
    }
  });
});

app.get('/products', (req, res) => {
  let productList = "";
  if (req.session.user != undefined) {

    productList += '<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">';
    const query = `
  SELECT
    ProductName,
    Description,
    Price,
    Quantity,
    CASE
      WHEN CategoryID = 1 THEN 'Women'
      WHEN CategoryID = 2 THEN 'Men'
      WHEN CategoryID = 3 THEN 'Kids'
      ELSE 'Men, Women, Kids'
    END AS Category,
    Brand,
    Image,
    datetime(CreatedOn) AS CreatedDateTime,
    ModifiedOn
  FROM products`;
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve the products from the database.');
      } else if (rows.length === 0) {
        productList += '<div class="text-center">No data found</div>';
        res.render('products', { productList });
      } else {
        rows.forEach(function (row) {
          productList += '<div class="col">';
          productList += '<div class="card">';
          productList += '<img src="data:image/jpeg;base64,' + row.Image.toString('base64') + '" class="card-img-top img-fluid" alt="Product Image"">';
          productList += '<div class="card-body">';
          productList += '<h5 class="card-title">' + row.ProductName + '</h5>';
          productList += '<p class="card-text">' + row.Description + '</p>';
          productList += '<ul class="list-unstyled">';
          productList += '<li>Price: $' + row.Price + '</li>';
          productList += '<li>Quantity: ' + row.Quantity + '</li>';
          productList += '<li>Category: ' + row.Category + '</li>';
          productList += '<li>Brand: ' + row.Brand + '</li>';
          const createdDateTime = row.CreatedDateTime;
          const formattedDateTime = new Date(createdDateTime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
          productList += '<li>Created On: ' + formattedDateTime + '</li>';
          productList += '<li>Modified On: ' + row.ModifiedOn + '</li>';
          productList += '</ul>';
          productList += '</div>';
          productList += '</div>';
          productList += '</div>';
        });
        productList += '</div>';
        res.render('products', { productList });
      }
    });
  }
  else {
    res.render('login');
  }

});

app.get('/users', async (req, res) => {
  user = req.session.user;
  let userList = "";

  if (user) {
    try {
      userList += '<table class="table table-bordered table-striped">';
      userList += '<thead class="thead-dark"><tr>';
      userList += '<th>Name</th><th>Username</th><th>Email</th><th>Password</th><th>Date of Birth</th><th>Status</th>';
      userList += '<tr></thead><tbody>';
      const query = `SELECT firstname || ' ' || surname AS name, 
        username, password, email, DateofBirth, 
        CASE
          WHEN IsActive = 1 THEN 'Active'
          ELSE 'In-active'
        END AS IsActive
        FROM Users`;
      const rows = await new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) {
        userList += '<tr><td colspan="3"> No data found </td></tr>';
      } else {
        const encryptionPromises = rows.map(async function (row) {

          const plainTextPassword = row.password;
          //hashing the password with a salt factor of 10
          const encryptedPassword = await bcrypt.hash(plainTextPassword, 10);
          return {
            name: row.name,
            username: row.username,
            password: encryptedPassword,
            email: row.email,
            DateofBirth: row.DateofBirth,
            IsActive: row.IsActive
          };
        });

        const encryptedRows = await Promise.all(encryptionPromises);

        encryptedRows.forEach(function (row) {
          userList += '<tr>';
          userList += '<td>' + row.name + '</td>';
          userList += '<td>' + row.username + '</td>';
          userList += '<td>' + row.email + '</td>';
          userList += '<td>' + row.password + '</td>';
          userList += '<td>' + row.DateofBirth + '</td>';
          userList += '<td>' + row.IsActive + '</td></tr>';
        });
      }

      userList += '</tbody></table>';

      res.render('users', { userList });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.render('login');
  }
});


app.listen(port, function () {
  console.log(`Web server running at: http://localhost:${port}`)
  console.log("Type Ctrl+C to shut down the web server")
})

