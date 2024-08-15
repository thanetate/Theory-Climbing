import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
        name: 'Product 1',
        slug: 'product-1',
        category: 'Shirts',
        image: '/images/fashion-1.jpeg',
        price: 120,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        countInStock: 6,
        description: 'High quality product',
        isFeatured: true,
        banner: '', //image
    },
    {
        name: 'Product 2',
        slug: 'product-2',
        category: 'Shirts',
        image: '/images/fashion-2.jpeg',
        price: 130,
        brand: 'Addidas',
        rating: 2.5,
        numReviews: 8,
        countInStock: 6,
        description: 'High quality product',
        isFeatured: true,
        banner: '', //image
    },
],
}

export default data
