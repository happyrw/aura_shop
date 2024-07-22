// lib/categories.ts

export type SimpleSubcategory = string[];

export type NestedSubcategory = {
    name: string;
    items: string[]
};

export type Subcategories = {
    [key: string]: SimpleSubcategory | NestedSubcategory;
};

export type Category = {
    name: string;
    subcategories: Subcategories | SimpleSubcategory;
};

export type Categories = {
    [key: string]: Category;
};

export const categories: Categories = {
    men: {
        name: "Men",
        subcategories: {
            tops: ["T-Shirts", "Shirts", "Polos", "Sweaters", "Hoodies & Sweatshirts"],
            bottoms: ["Jeans", "Trousers", "Shorts"],
            outerwear: ["Jackets", "Coats", "Blazers"],
            accessories: ["Belts", "Hats", "Scarves", "Bags"],
            shoes: ["Sneakers", "Boots", "Formal Shoes"]
        }
    },
    women: {
        name: "Women",
        subcategories: {
            tops: ["T-Shirts", "Blouses", "Sweaters", "Hoodies & Sweatshirts"],
            bottoms: ["Jeans", "Skirts", "Trousers", "Leggings"],
            dresses: ["Casual Dresses", "Evening Dresses", "Maxi Dresses", "Midi Dresses"],
            outerwear: ["Jackets", "Coats", "Blazers"],
            accessories: ["Belts", "Hats", "Scarves", "Bags"],
            shoes: ["Sneakers", "Heels", "Flats", "Boots"]
        }
    },
    kids: {
        name: "Kids",
        subcategories: {
            boys: {
                name: "Boys",
                items: ["Tops", "Bottoms", "Outerwear", "Accessories", "Shoes"]
            },
            girls: {
                name: "Girls",
                items: ["Tops", "Bottoms", "Dresses", "Outerwear", "Accessories", "Shoes"]
            },
            babies: {
                name: "Babies",
                items: ["Bodysuits", "Rompers", "Sets", "Outerwear", "Accessories", "Shoes"]
            },
            shoes: ["Sneakers", "Boots", "Sandals"]
        }
    },
    electronics: {
        name: "Electronics",
        subcategories: {
            mobiles: ["Smartphones", "Feature Phones", "Mobile Accessories"],
            computers: ["Laptops", "Desktops", "Tablets", "Computer Accessories"],
            tvs: ["LED TVs", "Smart TVs", "4K TVs", "TV Accessories"],
            audio: ["Headphones", "Speakers", "Home Theaters"],
            cameras: ["DSLR", "Mirrorless", "Action Cameras", "Camera Accessories"]
        }
    },
    fashion: {
        name: "Fashion",
        subcategories: {
            clothing: ["Men's Clothing", "Women's Clothing", "Kids' Clothing"],
            footwear: ["Men's Footwear", "Women's Footwear", "Kids' Footwear"],
            accessories: ["Bags", "Watches", "Jewelry", "Sunglasses"]
        }
    },
    food: {
        name: "Food",
        subcategories: {
            beverages: ["Soft Drinks", "Juices", "Water", "Tea & Coffee"],
            snacks: ["Chips", "Nuts", "Cookies", "Chocolates"],
            groceries: ["Fruits", "Vegetables", "Dairy Products", "Bakery Items"],
            frozen: ["Frozen Vegetables", "Frozen Meats", "Ice Cream"]
        }
    },
    beauty_and_personal_care: {
        name: "Beauty & Personal Care",
        subcategories: {
            skincare: ["Moisturizers", "Cleansers", "Serums", "Sunscreens"],
            haircare: ["Shampoos", "Conditioners", "Hair Oils", "Hair Treatments"],
            makeup: ["Foundations", "Lipsticks", "Eye Makeup", "Makeup Tools"],
            personal_care: ["Oral Care", "Bath & Body", "Feminine Care", "Men's Grooming"]
        }
    },
    home_and_living: {
        name: "Home & Living",
        subcategories: {
            furniture: ["Living Room", "Bedroom", "Office Furniture"],
            decor: ["Wall Art", "Clocks", "Photo Frames", "Lamps"],
            kitchen: ["Cookware", "Tableware", "Kitchen Tools"],
            bedding: ["Bedsheets", "Pillows", "Blankets", "Mattress"]
        }
    },
    sports_and_outdoors: {
        name: "Sports & Outdoors",
        subcategories: {
            sports: ["Cricket", "Football", "Basketball", "Tennis"],
            fitness: ["Yoga", "Gym Equipment", "Fitness Accessories"],
            outdoor: ["Camping", "Hiking", "Cycling", "Fishing"]
        }
    },
    automotive: {
        name: "Automotive",
        subcategories: {
            car_accessories: ["Car Electronics", "Car Care", "Car Parts"],
            bike_accessories: ["Bike Helmets", "Bike Covers", "Bike Parts"],
            oils_and_fluids: ["Engine Oil", "Brake Fluid", "Coolant"]
        }
    },
    accessories: {
        name: "Accessories",
        subcategories: {
            bags: ["Backpacks", "Handbags", "Wallets", "Travel Bags"],
            jewelry: ["Necklaces", "Bracelets", "Earrings", "Rings"],
            watches: ["Smartwatches", "Analog Watches", "Digital Watches"],
            eyewear: ["Sunglasses", "Prescription Glasses", "Contact Lenses"]
        }
    }
};

