import prisma from '../prisma/client.js';

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL database');
    return prisma;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

export default connectDB;
