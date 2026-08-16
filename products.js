/*
  ============================
  VAELT PRODUCT DATA
  ============================
  EDIT PRODUCTS HERE.

  1. Put your photos in the /images folder.
  2. Change the image file names below.
  3. Give every product a DIFFERENT code.
  4. Save the file and refresh the website.

  Example:
  image: "images/my-shoe.jpg"
  gallery: ["images/my-shoe.jpg", "images/my-shoe-side.jpg"]
*/

const STORE = {
  phone: "923001234567", // Change to your WhatsApp number WITHOUT + or spaces
  displayPhone: "+92 300 1234567",
  instagram: "#"
};

const products = [
  {
    code: "VAELT-001",
    brand: "Nike",
    name: "Air Runner",
    category: "running",
    price: 6500,
    size: "UK 9",
    condition: "Excellent",
    image: "images/shoe-1.svg",
    gallery: ["images/shoe-1.svg", "images/shoe-1-side.svg"],
    description: "Preloved Nike running shoes in excellent condition. Clean upper with comfortable cushioning and good outsole grip."
  },
  {
    code: "VAELT-002",
    brand: "Adidas",
    name: "Classic Street",
    category: "sneakers",
    price: 5800,
    size: "UK 8",
    condition: "Very Good",
    image: "images/shoe-2.svg",
    gallery: ["images/shoe-2.svg", "images/shoe-2-side.svg"],
    description: "Classic Adidas-inspired street sneaker listing. Replace the sample photos and details with your actual pair."
  },
  {
    code: "VAELT-003",
    brand: "New Balance",
    name: "Daily Runner",
    category: "running",
    price: 7200,
    size: "UK 10",
    condition: "Excellent",
    image: "images/shoe-3.svg",
    gallery: ["images/nike-af1.jpg", "images/shoe-3-side.svg"],
    description: "Comfort-focused running pair with a lightweight feel. Add your own inspection notes here."
  },
  {
    code: "VAELT-004",
    brand: "Vans",
    name: "Canvas Classic",
    category: "casual",
    price: 4500,
    size: "UK 8",
    condition: "Good",
    image: "images/shoe-4.svg",
    gallery: ["images/shoe-4.svg", "images/shoe-4-side.svg"],
    description: "Everyday casual pair. Update the condition and measurements with your actual product information."
  },
  {
    code: "VAELT-005",
    brand: "Puma",
    name: "Court Low",
    category: "sneakers",
    price: 5200,
    size: "UK 9",
    condition: "Very Good",
    image: "images/shoe-5.svg",
    gallery: ["images/shoe-5.svg", "images/shoe-5-side.svg"],
    description: "Clean low-profile sneaker. Add exact model, material and authenticity evidence for your listing."
  },
  {
    code: "VAELT-006",
    brand: "Leather Select",
    name: "Oxford Classic",
    category: "formal",
    price: 6000,
    size: "UK 9",
    condition: "Excellent",
    image: "images/shoe-6.svg",
    gallery: ["images/shoe-6.svg", "images/shoe-6-side.svg"],
    description: "Classic formal shoe listing. Replace this sample information with your actual pair."
  }
];
