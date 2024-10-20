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
> http://localhost:1221/details/670bd3adc2bbe4d04d71029d

* Menu wrt the restaurants
> http://localhost:1221/menu/9

# Page 4

* Details of the selected Menu.
> (POST) http://localhost:1221/menuDetails
{"id":[1,2,3]}

* Place Order
> (POST) http://localhost:1221/placeOrder
# this will add in postman (body=>raw)
{
    "orderId":4,
    "name":"Anurag",
    "address":"home 55",
    "phone":9874563210,
    "cost":774,
    "menuItem": [
        12.10
    ]
}
# Page 5

* View All order / with or without email
> http://localhost:1221/orders?email=aakash@gmail.com
> http://localhost:1221/orders

* Update order details
> (PUT) http://localhost:1221/updateOrder
{
    "_id":"670bd38cc2bbe4d04d71024c",
    "status":"Deliver"
}
* Delete Order  
(DELETE) loccalhost:1221/deleteOrder

{
    "_id":"62514d69f5aec503b2e0f2aa"
}
   