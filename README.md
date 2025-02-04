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

Denna del av Kino-sidan fokuserar på att visa recensioner och beräkna genomsnittsbetyg för filmer. All data hämtas från ett CMS-API och presenteras.

## Funktioner

### Recensioner

- Visa recensioner (betyg, kommentar och namn) för en film.
- Paginering: Max 5 recensioner per sida med knappar för att bläddra.

### Genomsnittsbetyg

- Beräkna och visa genomsnittsbetyget för en film.
- Om det finns färre än 5 recensioner, hämta betyget från IMDB.

## API-dokumentation

### Hämta recensioner

`GET /movie/:movieId/reviews`  
**Parametrar**:

- `page`: Sidnummer (standard: 1).
- `pageSize`: Antal recensioner per sida (standard: 5).
