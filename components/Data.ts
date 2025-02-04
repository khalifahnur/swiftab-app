const restaurants = [
  {
    Title: "New Restaurants",
    data: [
      {
        id: 101,
        image: require("../assets/images/restaurants/res1.jpeg"),
        restaurantName: "The Gourmet Kitchen",
        location: "South C",
        lat:-1.3159,
        long:36.8225,
        rate: 4.5,
        about: [
          {
            id: 1,
            cuisine: "International",
            location: "Manhattan",
            averageprice: 25,
            hrsofoperation: "10:00 - 22:00",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "John Doe",
                image: "https://example.com/user1.jpg",
                reviewTxt: "Amazing food and great service!",
                rating: 4.8,
              },
            ],
          },
        ],
      },
      {
        id: 102,
        image: require("../assets/images/restaurants/res2.jpeg"),
        restaurantName: "Sushi Paradise",
        location: "South B",
        lat:-1.3065,
        long:36.8367,
        rate: 4.9,
        about: [
          {
            id: 2,
            cuisine: "Japanese",
            location: "Shibuya",
            averageprice: 30,
            hrsofoperation: "11:00 - 23:00",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "Akira Tanaka",
                image: "https://example.com/user2.jpg",
                reviewTxt: "Best sushi in Tokyo!",
                rating: 5,
              },
            ],
          },
        ],
      },
      {
        id: 103,
        image: require("../assets/images/restaurants/res3.jpeg"),
        restaurantName: "Pasta Haven",
        location: "Nairobi CBD",
        lat:-1.2921,
        long:36.8219,
        rate: 4.7,
        about: [
          {
            id: 3,
            cuisine: "Italian",
            location: "Centro Storico",
            averageprice: 18,
            hrsofoperation: "12:00 - 23:00",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "Sophia Rossi",
                image: "https://example.com/user3.jpg",
                reviewTxt: "Best pasta I’ve ever had!",
                rating: 4.9,
              },
            ],
          },
        ],
      },
      {
        id: 104,
        image: require("../assets/images/restaurants/res4.jpeg"),
        restaurantName: "Burger Shack",
        location: "South C",
        lat:-1.3172,
        long:36.8250,
        rate: 4.4,
        about: [
          {
            id: 4,
            cuisine: "American",
            location: "Downtown LA",
            averageprice: 10,
            hrsofoperation: "11:00 - 22:00",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "Alex Johnson",
                image: "https://example.com/user4.jpg",
                reviewTxt: "Juicy burgers and great atmosphere.",
                rating: 4.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    Title: "Recommended Restaurants",
    data: [
      {
        id: 105,
        image: require("../assets/images/restaurants/res5.jpeg"),
        restaurantName: "Spice Symphony",
        location: "Westlands",
        lat:-1.2696,
        long:36.8054,
        rate: 4.8,
        about: [
          {
            id: 5,
            cuisine: "Indian",
            location: "Bandra",
            averageprice: 15,
            hrsofoperation: "12:00 - 23:30",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "Ravi Kumar",
                image: "https://example.com/user5.jpg",
                reviewTxt: "Authentic Indian flavors, highly recommend!",
                rating: 4.9,
              },
            ],
          },
        ],
      },
      {
        id: 106,
        image: require("../assets/images/restaurants/res6.jpeg"),
        restaurantName: "Seafood Delight",
        location: "South B",
        lat:-1.3033,
        long:36.8390,
        rate: 4.6,
        about: [
          {
            id: 6,
            cuisine: "Seafood",
            location: "Darling Harbour",
            averageprice: 22,
            hrsofoperation: "12:00 - 22:00",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "Emily Brown",
                image: "https://example.com/user6.jpg",
                reviewTxt: "Fantastic seafood with a beautiful view.",
                rating: 4.8,
              },
            ],
          },
        ],
      },
      {
        id: 107,
        image: require("../assets/images/restaurants/res7.jpeg"),
        restaurantName: "Vegan Bites",
        location: "Kilimani",
        lat:-1.2927,
        long:36.7865,
        rate: 4.5,
        about: [
          {
            id: 7,
            cuisine: "Vegan",
            location: "Mitte",
            averageprice: 18,
            hrsofoperation: "10:00 - 21:00",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "Linda Müller",
                image: "https://example.com/user7.jpg",
                reviewTxt: "Delicious and healthy vegan options.",
                rating: 4.6,
              },
            ],
          },
        ],
      },
      {
        id: 108,
        image: require("../assets/images/restaurants/res8.jpeg"),
        restaurantName: "Taco Fiesta",
        location: "South C",
        lat:-1.3168,
        long:36.8234,
        rate: 4.8,
        about: [
          {
            id: 8,
            cuisine: "Mexican",
            location: "Condesa",
            averageprice: 10,
            hrsofoperation: "11:00 - 23:00",
          },
        ],
        menu: [
          {
              breakfast: [
                {
                  id: 1,
                  image: require('@/assets/images/menu/breakfast/avocadotoast.png'),
                  name: "Avocado Toast",
                  description: "Toasted bread topped with smashed avocado, sea salt, and a sprinkle of chili flakes.",
                  cost: 8,
                  rate: 4.5
                },
                {
                  id: 2,
                  image: require('@/assets/images/menu/breakfast/pancakes.png'),
                  name: "Pancakes with Maple Syrup",
                  description: "Fluffy pancakes drizzled with rich maple syrup.",
                  cost: 12,
                  rate: 4.8
                },
                {
                  id: 3,
                  image: require('@/assets/images/menu/breakfast/benedict.png'),
                  name: "Eggs Benedict",
                  description: "Poached eggs with hollandaise sauce on an English muffin, served with ham or spinach.",
                  cost: 14,
                  rate: 4.7
                },
                {
                  id: 4,
                  image: require('@/assets/images/menu/breakfast/smoothiebowl.png'),
                  name: "Smoothie Bowl",
                  description: "Blended smoothie base topped with fresh fruits, granola, and nuts.",
                  cost: 10,
                  rate: 4.6
                },
                {
                  id: 5,
                  image: require('@/assets/images/menu/breakfast/oatmeal.png'),
                  name: "Oatmeal with Berries",
                  description: "Creamy oatmeal topped with fresh berries and a drizzle of honey.",
                  cost: 7,
                  rate: 4.4
                },
                {
                  id: 6,
                  image: require('@/assets/images/menu/breakfast/salmol.png'),
                  name: "Salmon Bagel",
                  description: "Bagel with smoked salmon and cream cheese.",
                  cost: 10,
                  rate: 4.6
                }
              ],
              lunch: [
                {
                  id: 7,
                  image: require('@/assets/images/menu/lunch/caesar.png'),
                  name: "Chicken Caesar Salad",
                  description: "Romaine lettuce with grilled chicken, Caesar dressing, and croutons.",
                  cost: 13,
                  rate: 4.5
                },
                {
                  id: 8,
                  image: require('@/assets/images/menu/lunch/sushi.png'),
                  name: "Sushi Platter",
                  description: "Assorted sushi rolls and sashimi served with soy sauce and wasabi.",
                  cost: 20,
                  rate: 4.8
                },
                {
                  id: 9,
                  image: require('@/assets/images/menu/lunch/veg.png'),
                  name: "Vegetarian Wrap",
                  description: "Whole wheat wrap filled with hummus, veggies, and avocado.",
                  cost: 9,
                  rate: 4.3
                },
                {
                  id: 10,
                  image: require('@/assets/images/menu/lunch/basel.png'),
                  name: "Tomato Basil Soup",
                  description: "Creamy tomato soup with a hint of basil, served with a side of bread.",
                  cost: 8,
                  rate: 4.2
                },
                {
                  id: 11,
                  image: require('@/assets/images/menu/lunch/steak.png'),
                  name: "Steak Sandwich",
                  description: "Grilled steak slices with caramelized onions, served in a hoagie roll.",
                  cost: 15,
                  rate: 4.6
                },
                {
                  id: 12,
                  image: require('@/assets/images/menu/lunch/fish.png'),
                  name: "Fish & Chips",
                  description: "Battered fish served with crispy fries.",
                  cost: 15,
                  rate: 4.7
                }
              ],
              dinner: [
                {
                  id: 13,
                  image: require('@/assets/images/menu/dinner/spaghetti.png'),
                  name: "Spaghetti Carbonara",
                  description: "Classic Italian pasta with creamy egg and pancetta sauce.",
                  cost: 18,
                  rate: 4.5
                },
                {
                  id: 14,
                  image: require('@/assets/images/menu/dinner/chicken.png'),
                  name: "Grilled Chicken",
                  description: "Juicy grilled chicken served with a side of vegetables.",
                  cost: 22,
                  rate: 4.6
                },
                {
                  id: 15,
                  image: require('@/assets/images/menu/dinner/veg.png'),
                  name: "Vegetable Stir-Fry",
                  description: "Mixed vegetables stir-fried in a savory sauce, served with rice.",
                  cost: 16,
                  rate: 4.3
                },
                {
                  id: 16,
                  image: require('@/assets/images/menu/dinner/beef.png'),
                  name: "Beef Tacos",
                  description: "Soft tortillas filled with seasoned beef, cheese, and salsa.",
                  cost: 14,
                  rate: 4.4
                },
                {
                  id: 17,
                  image: require('@/assets/images/menu/dinner/paela.png'),
                  name: "Seafood Paella",
                  description: "Traditional Spanish rice dish with shrimp, mussels, and calamari.",
                  cost: 30,
                  rate: 4.8
                },
                {
                  id: 18,
                  image: require('@/assets/images/menu/dinner/lobster.png'),
                  name: "Grilled Lobster",
                  description: "Lobster grilled to perfection with garlic butter.",
                  cost: 40,
                  rate: 4.9
                }
              ]                     
          },
        ],
        review: [
          {
            review: [
              {
                name: "Carlos Reyes",
                image: "https://example.com/user8.jpg",
                reviewTxt: "Authentic Mexican food, highly recommend!",
                rating: 4.9,
              },
            ],
          },
        ],
      },
    ],
  },
];
export default restaurants;
