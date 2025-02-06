# Project Development Tools and Useful Commands:

---

## 🚀 Vite Installation

-Installing **Vite**:

`npm i -D vite`

---

## 🧪 Jest Installation

-Installing **Jest**:

`npm i -D jest`

---

## 🌐 Cross-Environment for Jest\*\*

-Installing **Cross-Environment**:

`npm i -D cross-env`

---

## 📜 Scripts for Running Jest with Cross-Env

-Add to **package.json**

`"scripts": {`

`"test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest",`

`"watch": "cross-env NODE_OPTIONS=--experimental-vm-modules jest --watch"`

`}`

---

# Kino-sida: Recensioner och Genomsnittsbetyg

### Hämta recensioner för en film

`GET /movie/:movieId/reviews`  
Hämtar en lista med recensioner för en specifik film.

### Svarsexempel

{
"reviews": [
{
"id": 1,
"rating": 5,
"comment": "Fantastisk film!",
"author": "Alfred"
},
{
"id": 2,
"rating": 4,
"comment": "Väldigt underhållande.",
"author": "Henrik"
}
],
"meta": {
"currentPage": 1,
"totalPages": 5
}
}

### Hämta genomsnitt betyg för en film

`GET /movie/:movieId/ratings/average`
Hämtar genomsnittsbetyget från användarrecensioner om minst 5 betyg finns.
Om färre än 5 betyg finns, hämtas betyget från IMDB istället.

### Svarsexempel (användarrecensioner)

{
"averageRating": 4.2
}

### Svarsexempel (IMDB)

{
"averageRating": 4.2
}
