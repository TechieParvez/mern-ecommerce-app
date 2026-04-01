const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const products = [
  {
    name: "Men's Casual T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 499,
    countInStock: 50,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    name: "Women's Summer Dress",
    description: "Floral summer dress",
    price: 899,
    countInStock: 40,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1520962918287-7448c2878f65"
  },
  {
    name: "Denim Jeans",
    description: "Slim fit jeans",
    price: 1299,
    countInStock: 30,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes",
    price: 1999,
    countInStock: 60,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    name: "Leather Boots",
    description: "Premium leather boots",
    price: 2999,
    countInStock: 25,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
  },
  {
    name: "Smartphone",
    description: "Latest Android smartphone",
    price: 15999,
    countInStock: 20,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    name: "Laptop",
    description: "High performance laptop",
    price: 59999,
    countInStock: 10,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    name: "Wireless Headphones",
    description: "Noise cancelling headphones",
    price: 2499,
    countInStock: 35,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1518441902110-3d1cfc8f8e5e"
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking watch",
    price: 3499,
    countInStock: 30,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
  },
  {
    name: "Backpack",
    description: "Durable travel backpack",
    price: 1499,
    countInStock: 45,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
  },

  // AUTO GENERATE MORE (WITH DIFFERENT IMAGE IDS)
  ...Array.from({ length: 40 }, (_, i) => ({
    name: `Product ${i + 11}`,
    description: `High quality product ${i + 11}`,
    price: Math.floor(Math.random() * 5000) + 500,
    countInStock: Math.floor(Math.random() * 100) + 10,
    category: ["Clothing", "Footwear", "Electronics", "Accessories"][i % 4],
    image: `https://picsum.photos/id/${i + 30}/400/300`
  }))
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();