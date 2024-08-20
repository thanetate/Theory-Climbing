import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Thane Tate",
      email: "thanetate1@gmail.com",
      password: bcrypt.hashSync("Pooh5791"),
      isAdmin: true,
    },
    {
      name: "Bailee Gasche",
      email: "bailee.gasche@icloud.com",
      password: bcrypt.hashSync("Family5791"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "COMING SOON",
      slug: "product-1",
      category: "Shirts",
      image: "/Images/coming-soon.jpg",
      price: 1,
      brand: "theory",
      rating: 5,
      numReviews: 0,
      countInStock: 100,
      description: "Product Coming Soon...",
      isFeatured: true,
      banner: "", //image
    },
    {
      name: "COMING SOON",
      slug: "product-2",
      category: "Shirts",
      image: "/Images/coming-soon.jpg",
      price: 1,
      brand: "theory",
      rating: 5,
      numReviews: 0,
      countInStock: 100,
      description: "Product Coming Soon...",
      isFeatured: true,
      banner: "", //image
    },
  ],
};

export default data;
