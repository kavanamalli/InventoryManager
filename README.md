# Clinical Equipment Management System 🏥

A web-based system built to manage and track clinical or hospital equipment efficiently. The system allows users to add, update, delete, and view items, ensuring seamless inventory control.

## 🚀 Features

- Add new clinical equipment with details (name, type, quantity, price, status, location, etc.)
- Update item quantity and price automatically if item already exists
- Delete equipment entries
- View a list of all items with current details
- Toast notifications for feedback (success/error)

## 🛠️ Technologies Used

### 🔹 Frontend
- HTML5, CSS3
- JavaScript (Vanilla JS)
- DOM manipulation

### 🔹 Backend
- **C#** with **ASP.NET Core (.NET 8)**
- RESTful API with full CRUD operations
- SQLite for lightweight and efficient data storage

## 📷 Output Screenshot

![Equipment Management UI](Screenshot (2).png)

## 📁 Project Structure

```bash
/ClinicalEquipmentManagement/
│
├── InventoryFrontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── InventoryAPI/
│   ├── Controllers/
│   ├── Models/
│   └── Program.cs
│
├── output-screenshot.png
└── README.md
