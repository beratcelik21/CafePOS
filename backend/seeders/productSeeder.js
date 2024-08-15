const Product = require("../models/Product")

const products = [
    {name:"Espresso", price:2.5},
    {name:"Cappucino", price:3.0},
    {name:"Latte", price:3.5},
    {name:"Americano", price:2.0},
    {name:"Mocha", price:3.75},

]

const  seedProducts = async () => {
    try {
        await Product.bulkCreate(products)
        console.log("Products seeded successfully")
        
    } catch (err) {
        console.log("Error seeding products:", err)
    }
}
seedProducts()