 # INFORMATION GATHERING

 # page 1

* List of al cities
> http://localhost:1221/location

* List of all restaurants
> http://localhost:1221/restaurants

* Restaurants with respect to city
> http://localhost:1221/restaurants?stateId=2
> http://localhost:1221/restaurants?mealId=3&stateId=1

* List of meals
> http://localhost:1221/meals

# Page 2

* Restaurants on the basic to mealtype
> http://localhost:1221/restaurants?mealId=3

* Restaurants wrt mealType + CuisineType
> http://localhost:1221/filter/1?cuisinId=2

* Restaurants wrt mealType + Cost
> http://localhost:1221/filter/1?hcost=800&lcost=300
> http://localhost:1221/filter/1?hcost=800&lcost=300&cuisineId=1

* Sort on the  basis of price
> http://localhost:1221/filter/1?hcost=800&lcost=300&cuisineId=1

* Pagination
> http://localhost:1221/filter/1?cuisineId=2&skip=1&limit=1

# Page 3

* Details of the page
* Menu wrt the restaurants

# Page 4

* Details of the selected Menu.
* Place Order

# Page 5

* View All order / with or without email
* Update order details
* Delete Order   "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongodb": "^4.13.0"