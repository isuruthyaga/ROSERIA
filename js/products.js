/**
 * HOW TO ADD A NEW PRODUCT:
 * 1. Copy the code block below (from { to },).
 * 2. Paste it at the bottom of the list (before the last `];`).
 * 3. Change the ID to the next number (e.g., 7, 8, 9...).
 * 4. Put your image in the 'assets/images' folder.
 * 5. Update the 'image' path to match your file name (e.g., "assets/images/my-new-ring.jpg").
 *
 * TEMPLATE:
 * {
 *     id: 7,
 *     name: "YOUR PRODUCT NAME",
 *     price: 00000,
 *     category: "Rings", // Options: Rings, Necklaces, Earrings, Watches, Bracelets
 *     image: "assets/images/YOUR-PHOTO.jpg",
 *     description: "Write a short description here."
 * },
 */

const products = [
    {
        id: 1,
        name: "Royal Diamond Solitaire Ring",
        price: 150000,
        category: "Rings",
        image: "assets/images/ring-platinum.jpg",
        description: "Elegant solitaire diamond ring set in 18k white gold used by royalty."
    },
    {
        id: 2,
        name: "Golden Sun Pendant",
        price: 85000,
        category: "Necklaces",
        image: "assets/images/necklace.jpg",
        description: "Classic 22k gold pendant capturing the essence of the sun."
    },
    {
        id: 3,
        name: "Crimson Ruby Earrings",
        price: 45000,
        category: "Earrings",
        image: "assets/images/earrings.jpg",
        description: "Stunning ruby drop earrings with diamond accents tailored for evening wear."
    },
    {
        id: 4,
        name: "Imperial Gold Watch",
        price: 250000,
        category: "Watches",
        image: "assets/images/watch.jpg",
        description: "Premium Swiss movement gold watch designed for the modern gentleman."
    },
    {
        id: 5,
        name: "Pearl Cluster Bracelet",
        price: 32000,
        category: "Bracelets",
        image: "assets/images/bracelet.jpg",
        description: "Hand-picked freshwater pearls arranged in a delicate cluster."
    },
    {
        id: 6,
        name: "Sapphire Halo Ring",
        price: 120000,
        category: "Rings",
        image: "assets/images/ring.jpg",
        description: "Deep blue sapphire surrounded by a halo of brilliant-cut diamonds."
    },
];
