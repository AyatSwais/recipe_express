
//node test-db.js
//اختبار نجاح اتصال التطبيق بقاعدة البيانات 

const prisma = require('./src/lib/prisma');

async function main() {
  try {
    await prisma.$connect();

    console.log('Connected to PostgreSQL successfully!');

    const recipes = await prisma.recipe.findMany();

    console.log('Recipes:', recipes);
  } catch (error) {
    console.error('Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();