const express = require("express");
const pool = require("./db");
const app = express();
app.use(express.json());
app.set("json spaces", 2);
 
// ---------- PRODUCTS ----------
app.get("/products/getAll", async (req, res) => {
  const r = await pool.query("SELECT * FROM products ORDER BY id");
  res.json(r.rows);
});
 
app.get("/products/getProductById/:id", async (req, res) => {
  const r = await pool.query("SELECT * FROM products WHERE id=$1", [req.params.id]);
  if (!r.rows.length) return res.status(404).json({ message: "Topilmadi" });
  res.json(r.rows[0]);
});
 
app.post("/products/createProduct", async (req, res) => {
  const { name, price, quantity } = req.body;
  const r = await pool.query(
    "INSERT INTO products(name, price, quantity) VALUES($1,$2,$3) RETURNING *",
    [name, price, quantity]
  );
  res.status(201).json(r.rows[0]);
});
 
app.put("/products/updateProduct/:id", async (req, res) => {
  const { name, price, quantity } = req.body;
  const r = await pool.query(
    "UPDATE products SET name=$1, price=$2, quantity=$3 WHERE id=$4 RETURNING *",
    [name, price, quantity, req.params.id]
  );
  if (!r.rows.length) return res.status(404).json({ message: "Topilmadi" });
  res.json(r.rows[0]);
});
 
app.delete("/products/deleteProduct/:id", async (req, res) => {
  const r = await pool.query("DELETE FROM products WHERE id=$1 RETURNING *", [req.params.id]);
  if (!r.rows.length) return res.status(404).json({ message: "Topilmadi" });
  res.json({ message: "O'chirildi" });
});
 
// ---------- USERS ----------
app.get("/users/getAll", async (req, res) => {
  const r = await pool.query("SELECT * FROM users ORDER BY id");
  res.json(r.rows);
});
 
app.get("/users/getUserById/:id", async (req, res) => {
  const r = await pool.query("SELECT * FROM users WHERE id=$1", [req.params.id]);
  if (!r.rows.length) return res.status(404).json({ message: "Topilmadi" });
  res.json(r.rows[0]);
});
 
app.post("/users/createUser", async (req, res) => {
  const { name, email } = req.body;
  const r = await pool.query(
    "INSERT INTO users(name, email) VALUES($1,$2) RETURNING *",
    [name, email]
  );
  res.status(201).json(r.rows[0]);
});
 
app.put("/users/updateUser/:id", async (req, res) => {
  const { name, email } = req.body;
  const r = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, req.params.id]
  );
  if (!r.rows.length) return res.status(404).json({ message: "Topilmadi" });
  res.json(r.rows[0]);
});
 
app.delete("/users/deleteUser/:id", async (req, res) => {
  const r = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [req.params.id]);
  if (!r.rows.length) return res.status(404).json({ message: "Topilmadi" });
  res.json({ message: "O'chirildi" });
});
 
app.listen(3000, () => console.log("Server: http://localhost:3000"));
 