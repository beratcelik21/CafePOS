const Table = require("../models/Table");
const Tables = [
  { name: "Table 1", status: "available" },
  { name: "Table 2", status: "available" },
  { name: "Table 3", status: "occupied" },
  { name: "Table 4", status: "available" },
  { name: "Table 5", status: "occuipied" },
];

const seedTables = async () => {
  try {
    await Table.bulkCreate(tables);
    console.log("Tables seeded successfully");
  } catch (err) {
    console.log("Error seeding tables:", err);
  }
};

seedTables();
