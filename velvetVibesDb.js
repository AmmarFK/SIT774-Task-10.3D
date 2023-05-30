let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('velvet-vibes-db');

db.serialize(function () {

    db.run(`CREATE TABLE IF NOT EXISTS Users (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname VARCHAR(30),
        surname VARCHAR(30),
        username VARCHAR(15) UNIQUE,
        password VARCHAR(25),
        email VARCHAR(30),
        DateofBirth DATE,
        IsActive BOOLEAN)`);

    db.run(`CREATE TABLE IF NOT EXISTS Products (
        ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
        ProductName VARCHAR(30),
        Description VARCHAR(100),
        Price DECIMAL(10,5),
        Quantity INTEGER,
        CategoryID INT NOT NULL,
        Brand VARCHAR(30),
        Image VARCHAR(500),
        CreatedOn DATETIME,
        ModifiedOn DATETIME)`);

    db.run(`CREATE TABLE IF NOT EXISTS Reviews (
        ReviewID INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30),
        feedback VARCHAR(100),
        rating VARCHAR(15))`);

    db.run(`CREATE TABLE IF NOT EXISTS Contact (
        ContactID INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30),
        email VARCHAR(30),
        phone VARCHAR(15),
        message VARCHAR(100))`);

    //db.run(`DELETE FROM Users`);
    //db.run(`DELETE FROM Reviews`);
    //db.run(`DELETE FROM Contact`);
    //db.run('DELETE FROM Products');

    // db.run(`INSERT INTO Users (firstname, surname, username, password, email, DateofBirth, IsActive) VALUES ("Admin", "1", "admin", "admin123", "admin@example.com", "1999-11-10", 1)`);
    // db.run(`INSERT INTO Users (firstname, surname, username, password, email, DateofBirth, IsActive) VALUES ("John", "Doe", "johndoe", "john123", "johndoe@example.com", "1990-01-01", 1)`);
    // db.run(`INSERT INTO Users (firstname, surname, username, password, email, DateofBirth, IsActive) VALUES ("Jane", "Smith", "janesmith", "jane123", "janesmith@example.com", "1992-05-10", 1)`);
    // db.run(`INSERT INTO Users (firstname, surname, username, password, email, DateofBirth, IsActive) VALUES ("Michael", "Johnson", "michaelj", "michael123", "michaeljohnson@example.com", "1988-09-15", 1)`);
    // db.run(`INSERT INTO Users (firstname, surname, username, password, email, DateofBirth, IsActive) VALUES ("Emily", "Davis", "emilydavis", "emily123", "emilydavis@example.com", "1995-03-20", 1)`);

    db.each("SELECT * FROM Users", function (err, row) {
        console.log("[Users] First Name: " + row.firstname + "  Surname: " + row.surname + "  Username: " + row.username + " Password: " + row.password + " Email: " + row.email + " Date of Birth: " + row.DateofBirth + " IsActive " + row.IsActive);
    });

    db.each("SELECT * FROM Reviews", function (err, row) {
        console.log("[Reviews] Name: " + row.name + "  Feedback: " + row.feedback + "  Rating: " + row.rating);
    });

    db.each("SELECT * FROM Contact", function (err, row) {
        console.log("[Contact] Name: " + row.name + "  Email: " + row.email + "  Phone: " + row.phone + " Message: " + row.message);
    });

    // db.run(`INSERT INTO Products (ProductName, Description, Price, Quantity, CategoryID, Brand, Image, CreatedOn, ModifiedOn) VALUES ("Dress", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae efficitur leo. Fusce commodo nisl eget dui maximus semper.", 30.5, 12, 1, "Versace","", "2022-05-10", null)`);

    // db.each("SELECT * FROM Products", function (err, row) {
    //     console.log("[Products] Product Name: " + row.ProductName + "  Description: " + row.Description + "  Price: " + row.Price + " Quantity: " + row.Quantity + " CategoryID: " + row.CategoryID + " Brand: " + row.Brand + " Image: " + row.Image + " CreatedOn: " + row.CreatedOn + " ModifiedOn: " + row.ModifiedOn);
    // });
});
db.close(); 