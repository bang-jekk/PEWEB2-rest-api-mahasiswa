const express = require("express");
const app = express();
const port = 3000;

// agar bisa membaca JSON
app.use(express.json());

// Data Dummy
let students = [
  { id: 1, nama: "Andi", jurusan: "Informatika" },
  { id: 2, nama: "Budi", jurusan: "Sistem Informasi" },
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer" },
  { id: 4, nama: "Jule", jurusan: "Teknik Selingkuh" },
  { id: 5, nama: "Farrah", jurusan: "Teknik Matre" },
];

// 1. Home Endpoint
app.get("/", (req, res) => {
  res.send("API Mahasiswa berjalan");
});

// 2. GET Semua Mahasiswa
app.get("/students", (req, res) => {
  res.json(students);
});

// 3. GET Mahasiswa Berdasarkan ID
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  res.json(student);
});

// 4. POST Tambah Mahasiswa
app.post("/students", (req, res) => {
  const { nama, jurusan } = req.body;

  const newStudent = {
    id: students.length + 1,
    nama,
    jurusan,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Mahasiswa berhasil ditambahkan",
    data: newStudent,
  });
});

// 5. PUT Update Mahasiswa
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, jurusan } = req.body;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  student.nama = nama;
  student.jurusan = jurusan;

  res.json({
    message: "Data mahasiswa berhasil diperbarui",
    data: student,
  });
});

// 6. DELETE Mahasiswa
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: "Mahasiswa berhasil dihapus",
    data: deletedStudent,
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});