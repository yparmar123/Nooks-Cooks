const products = [
    {
        name: "Chicken Teriyaki",
        img: "/img/Chicken_Teriyaki_plate_2_x300.jpg",
        price: 11.95
    },
    {
        name: "Butter Chicken with Mixed Vegetables",
        img: "/img/Bombay_Spiced_Chicken_plate_1_x300.jpg",
        price: 11.95
    },
    {
        name: "Sundried Tomato and Basil Pesto Chicken Linguini",
        img: "/img/Sun-dried_Tomato_and_Basil_Pesto_Chicken_Linguine_plate_1_x300.jpg",
        price: 10.76
    },
    {
        name: "Roast Chicken and Homemade Pan Gravy",
        img: "/img/Roasted_Chicken_and_Gravy_plate_1_x300.jpg",
        price: 11.95
    }
];

const packages = [
    {
        name: "Weight Loss Package",
        img: "/img/pf-53859440--WEIGHTLOSSNBV2500x.jpg",
        price: 145.00,
        desc: "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
        top: true,
        meals: 10,
        category: "Weight Loss"
    },
    {
        name: "Keto Package",
        img: "/img/pf-8661c283--KETONBV2500x.jpg",
        price: 159.00,
        desc: "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
        top: false,
        meals: 12,
        category: "Keto"
    },
    {
        name: "Muscle Gain Package",
        img: "/img/pf-15920cc6--MuscleGainNBV2500x.jpg",
        price: 159.00,
        desc: "Higher protein and calorie portions to support your muscle gain momentum",
        top: true,
        meals: 12,
        category: "Muscle Gain"
    },
    {
        name: "Fat Burner Package",
        img: "/img/pf-754d17d4--FATBURNERNBV2500x.jpg",
        price: 159.00,
        desc: "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
        top: true,
        meals: 12,
        category: "Fat Burner"
    }
];

module.exports.ProductsDB = products;
module.exports.PackagesDB = packages;