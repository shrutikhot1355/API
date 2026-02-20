const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

/*
#CREATE STUDENT
*/
app.post('/students', async (req, res) => {
    const { name, department, email } = req.body;

    if (!name || !department || !email) {
        return res.status(400).json({ message:"All fields are required" });
    }

    const sql = 'INSERT INTO students (name, department, email) VALUES (?, ?, ?)';
    db.query(sql, [name, department, email], (err, result) => {
        if (err)  return res.status(500).json(err);
        res.status(201).json({ message: "Student added successfully" });
    });
});

/*
GET ALL STUDENTS
*/
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

/*UPDATE STUDENT*/
app.put('/students/:id', (req, res) => {
    const {name, department, email} = req.body;
    const {id} = req.params;

    const sql = 'UPDATE students SET name = ?, department = ?, email = ? WHERE id = ?';
    db.query(sql, [name, department, email, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Student updated successfully" });
    });             
});

/*DELETE STUDENT*/
app.delete('/students/:id', (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Student deleted successfully" });
    });
});

/*     */
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

