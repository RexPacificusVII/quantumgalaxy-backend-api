# QuantumGalaxy Backend API

**NOTE: This is still a work in progress. Some links or functions might change over time.**

**API Link**: [https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com)

## Functions and Endpoints:

endpoints:
  POST - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/register
  POST - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/login
  POST - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/logout
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/{id}
  PATCH - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/{id}
  DELETE - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/{id}
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/{id}
  POST - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products
  PATCH - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/{id}
  DELETE - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/{id}
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/search
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/filter
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/{id}
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/products/{product_id}
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/users/{user_id}
  POST - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews
  PATCH - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/{id}
  DELETE - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/{id}
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs/{id}
  POST - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs
  PATCH - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs/{id}
  DELETE - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs/{id}
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news
  GET - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news/{id}
  POST - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news
  PATCH - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news/{id}
  DELETE - https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news/{id}

<!-- | **Function** | **Method** | **HTTP Path** |
|---|---|---|
| [listProducts](#listproducts) | `GET` | [API_URL/products](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products) |
| [getProduct](#getproduct) | `GET` | [API_URL/products/{id}](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/{id}) |
| [listUsers](#listusers) | `GET` | [API_URL/users](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users) |
| [getUser](#getuser) | `GET` | [API_URL/users/{id}](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/{id}) |
| [listReviews](#listreviews) | `GET` | [API_URL/reviews](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews) |
| [getReview](#getreview) | `GET` | [API_URL/reviews/{id}](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/{id}) |
| [listProductReviews](#listproductreviews) | `GET` | [API_URL/reviews/products/{productId}](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/products/{productId}) |
| [listUserReviews](#listuserreviews) | `GET` | [API_URL/reviews/users/{userId}](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews/users/{userId}) |
| [registerUser](#registeruser) | `POST` | [API_URL/users/register](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/register) |
| [loginUser](#loginuser) | `POST` | [API_URL/users/login](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/login) |
| [addReview](#addreview) | `POST` | [API_URL/reviews](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/reviews) |
| [searchProducts](#searchproducts) | `GET` | [API_URL/products/search](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/search) |
| [filterProducts](#filterproducts) | `GET` | [API_URL/products/filter](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/products/filter) |
| [listBlogs](#listblogs) | `GET` | [API_URL/blogs](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs) |
| [getBlog](#getblog) | `GET` | [API_URL/blogs/{id}](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/blogs/{id}) |
| [listNews](#listproducts) | `GET` | [API_URL/news](https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/news) | -->

## Sample Data Structure

```json
{
  "products": [
    {
      "rating": {
        "rate": 4.67,
        "count": 3
      },
      "_id": "6556d68eb47d6ece8821076d",
      "name": "iPhone 13 Pro - 128GB, Graphite",
      "brand": "Apple",
      "price": 39949.99,
      "discount": 0,
      "description": "Experience the power of the A15 Bionic chip and the stunning Pro camera system on the iPhone 13 Pro. With 128GB of storage, you'll capture and store memories in style.",
      "features": [
        "A15 Bionic chip",
        "Pro camera system with 12MP wide, 12MP ultrawide, and 12MP telephoto cameras",
        "Super Retina XDR display with ProMotion",
        "Ceramic Shield front cover",
        "All-new battery design for up to 1.5 hours longer battery life"
      ],
      "category": [
        "Smartphones and Accessories"
      ],
      "subcategory": [
        "iPhones"
      ],
      "image": [
        "https://my-gadget-api-images.s3.ap-southeast-2.amazonaws.com/001-00.jpg",
        "https://my-gadget-api-images.s3.ap-southeast-2.amazonaws.com/001-01.jpg",
        "https://my-gadget-api-images.s3.ap-southeast-2.amazonaws.com/001-02.jpg"
      ],
      "created_at": "2023-11-17T06:46:45.431Z",
      "__v": 0
    }
  ]
}
```

```json
{
  "users": [
    {
      "_id": "6556d7d9b47d6ece882107ee",
      "first_name": "Frederick James",
      "last_name": "Bunal",
      "email": "bunal.frederickjames@email.com",
      "image": "https://my-gadget-api-images.s3.ap-southeast-2.amazonaws.com/user0001.jpg",
      "role": "admin",
      "created_at": "2023-11-17T06:36:56.243Z",
      "__v": 0
    }
  ]
}
```

```json
{
  "reviews": [
    {
      "_id": "6556e8aeb47d6ece882108ad",
      "product_id": "6556d68eb47d6ece8821076d",
      "user_id": "6556d7d9b47d6ece882107f0",
      "rating": 5,
      "comment": "I'm absolutely impressed with the iPhone 13 Pro! The camera quality is outstanding.",
      "created_at": "2023-11-17T06:46:45.431Z",
      "__v": 0
    }
  ]
}
```
```json
{
  "blogs": [
    {
      "_id": "6556d81eb47d6ece882107f9",
      "title": "E3 2023: The Future of Gaming Revealed",
      "author": "QuantumGalaxy",
      "date_published": "2023-11-17T06:46:45.431Z",
      "image": "https://my-gadget-api-images.s3.ap-southeast-2.amazonaws.com/blog001-00.jpg",
      "category": "Tech Event Coverage",
      "tags": [
        "E3 2023",
        "Gaming Trends",
        "Game Announcements",
        "Virtual Reality"
      ],
      "summary": "Dive into the exciting world of gaming as we explore the highlights and revelations from E3 2023.",
      "content": "The Electronic Entertainment Expo 2023 (E3 2023), one of the most anticipated gaming events, offered gamers a glimpse of the future. In this blog post, we'll dive into the exhilarating world of gaming and highlight the most noteworthy announcements and trends unveiled at E3 2023..."
    }
  ]
}
```
```json
{
  "news": [
    {
      "_id": "6556da44b47d6ece88210808",
      "source": "GSMArena.com",
      "author": "Michail",
      "title": "Samsung Galaxy Z Flip5 Retro announced - GSMArena.com news - GSMArena.com",
      "description": "The new limited edition Galaxy Z Flip5 pays homage to the legendary Samsung E700 from 2003. Samsung has rich history in the flip phone market and it is now...",
      "url": "https://www.gsmarena.com/samsung_galaxy_z_flip5_retro_announced-news-60395.php",
      "url_image": "https://fdn.gsmarena.com/imgroot/news/23/10/samsung-galaxy-z-flip5-retro-ofic/-952x498w6/gsmarena_00.jpg",
      "published_at": "2023-11-17T06:46:45.431Z",
      "content": "Samsung has rich history in the flip phone market and it is now paying homage to one of its more influential models from two decades ago the Samsung E700 - with a limited edition Galaxy Z Flip5 Retro. Flip5 Retro features the same iconic indigo blue and silver colors as the E700 and comes with some nostalgic pixel graphics UI tweaks and cityscape animation on its Flex Window cover screen. Samsung ships the phone in a neat box with logos of both the Z Flip5 and the E700 as well as Flipsuit cards with stickers featuring the various Samsung logos from past eras. The package also includes a Samsung E700 collector card engraved with a unique serial number. The Galaxy Z Flip5 Retro will be available in limited quantities in South Korea from November 1 as well as in the UK, France, Germany, Spain and Australia from November 2. Consumers in these markets can purchase the limited edition device exclusively through Samsung's official website. Pricing details were not provided yet."
    }
  ]
}
```
