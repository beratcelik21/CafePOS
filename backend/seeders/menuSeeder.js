const Menu = require('../models/Menu');
const Product = require('../models/Product');

const menus = [
    { name: 'Breakfast Menu', description: 'Morning specials' },
    { name: 'Lunch Menu', description: 'Afternoon specials' },
    { name: 'Dinner Menu', description: 'Evening specials' },
];

const seedMenus = async () => {
    try {
        await Menu.bulkCreate(menus);
        const breakfastMenu = await Menu.findOne({ where: { name: 'Breakfast Menu' } });
        const lunchMenu = await Menu.findOne({ where: { name: 'Lunch Menu' } });
        const dinnerMenu = await Menu.findOne({ where: { name: 'Dinner Menu' } });

        const espresso = await Product.findOne({ where: { name: 'Espresso' } });
        const cappuccino = await Product.findOne({ where: { name: 'Cappuccino' } });

        if (breakfastMenu && espresso) await breakfastMenu.addProduct(espresso);
        if (lunchMenu && cappuccino) await lunchMenu.addProduct(cappuccino);
        if (dinnerMenu && espresso) await dinnerMenu.addProduct(espresso);

        console.log('Menus and products seeded successfully');
    } catch (err) {
        console.error('Error seeding menus:', err);
    }
};

seedMenus();
