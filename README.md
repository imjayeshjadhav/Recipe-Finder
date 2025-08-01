# 🍽️ Recipe Finder App

A beautifully crafted cross-platform **Recipe Finder** app built using **React Native (Expo)**, **Node.js (Express)**, **PostgreSQL** (via Drizzle ORM), and **Clerk** for authentication.

Easily search recipes by name or ingredient, browse featured dishes, explore by category, and save your favorites! ❤️

---

## 🚀 Features

- 🔍 **Search Recipes** – by name or ingredient with debounce for performance.
- 🧾 **Filter by Category** – dynamic browsing from TheMealDB categories.
- 🌟 **Featured Recipes** – highlighted meals on the homepage.
- ❤️ **Favorites Management** – save and view your favorite dishes.
- 🔐 **Clerk Auth** – secure user authentication and session management.
- 🌐 **Responsive UI** – built with `react-native` & `expo-image`.

---

## 🛠️ Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | React Native (Expo) ⚛️         |
| Backend   | Node.js + Express 🚀           |
| Database  | PostgreSQL 🐘 + Drizzle ORM 🌧️ |
| Auth      | Clerk 🔐                       |
| API       | [TheMealDB](https://www.themealdb.com/) 🍛 |

---

## 📱 Screens Logic

### 🏠 Home Screen

- Loads featured recipe and a list of 12 random recipes on first mount.
- Fetches and transforms category data from TheMealDB API.
- Displays category filter bar with horizontal scrolling.
- When a category is selected, filters recipes accordingly.
- Shows featured recipe card with image, cook time, servings, and area.
- Supports pull-to-refresh using `RefreshControl`.

### 🔍 Search Screen

- Uses a `TextInput` with debounced input to avoid unnecessary API calls.
- If the search box is empty, fetches 12 random recipes.
- Searches recipes by name first, and if no result is found, falls back to ingredient-based search.
- Filters and transforms results, then displays them in a 2-column grid using `FlatList`.
- Displays loading spinner during API fetch.
- If no result is found, shows a clean “No Results Found” component.

### ❤️ Favourites Screen

- Displays a list of recipes marked as favourites by the logged-in user.
- Recipes are fetched from the backend PostgreSQL DB where they're stored using `userId`.
- Uses `FlatList` to render saved items, supports removing items from favourites.
- Data is tied to Clerk-authenticated user session.
- Allows users to revisit saved recipes easily.

### 🌟 Featured Section

- Highlights one random recipe with prominent design and meta info.
- Fully interactive; navigates to detailed recipe screen on tap.
- Contains visual overlay with badge and details like location, cook time, and servings. 

---

## 💡 Credits

- 🍴 **Recipes API**: [TheMealDB](https://www.themealdb.com)
- 🔐 **Authentication**: [Clerk](https://clerk.dev)
- 🌧️ **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- 📦 **Mobile Framework**: [Expo (React Native)](https://expo.dev)
- 🐘 **Database**: PostgreSQL
- 🧠 **Icons**: [Ionicons](https://ionic.io/ionicons)
- 🎨 **UI Inspiration**: Food recipe apps and clean minimalist designs

