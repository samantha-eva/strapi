# Blog Headless avec Strapi & Next.js

## Table des matières

- [Présentation](#présentation)  
- [Prérequis](#prérequis)  
- [Installation](#installation)  
- [Variables d’environnement](#variables-denvironnement)  
- [Lancement de l’application](#lancement-de-lapplication)  
- [Strapi - Admin & contenu](#strapi---admin--contenu)  
- [Endpoints API](#endpoints-api)  
- [Frontend](#frontend)  
- [Pagination & commentaires](#pagination--commentaires)  

---

## Présentation

Ce projet est un **blog headless** utilisant :

- **Backend** : Strapi (CMS headless)  
- **Frontend** : Next.js + Chakra UI  

**Fonctionnalités principales** :  
- Liste d’articles avec pagination (6 articles / page)  
- Page détail article avec contenu HTML, auteur et image de couverture  
- Section commentaires (possibilité de commenter uniquement si connecté)  
- Authentification utilisateur (login via Strapi, JWT stocké côté client)  

---

## Prérequis

- Node.js >= 18  
- npm >= 9  
- Git (pour cloner le repo)  

---

## Installation

### 1️⃣ Cloner le projet

```bash
git clone <URL_DU_REPO>
```

### 2️⃣ Installer les dépendances Backend (Strapi)

```bash
cd cms_strapi/strapi/headless-blog
npm install
```

### 3️⃣ Installer les dépendances Frontend (Next.js)

```bash
cd ../../frontend
npm install
```

---

## Variables d’environnement

Créer un fichier `.env.local` dans le dossier **frontend** avec :  

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

Dans le dossier **backend** Strapi, tu peux également configurer un `.env` si nécessaire pour les secrets.

---

## Lancement de l’application

### Backend Strapi

```bash
cd cms_strapi/strapi/headless-blog
npm run develop
```

Strapi sera accessible sur [http://localhost:1337/admin](http://localhost:1337/admin).

### Frontend Next.js

```bash
cd ../../frontend
npm run dev
```

Le frontend sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## Strapi - Admin & contenu

- Crée un compte admin lors du premier lancement.  
- Configure les **Content Types** : Articles, Commentaires, Utilisateurs.  
- Configure les **Permissions** pour permettre l’accès aux articles et aux commentaires selon la logique souhaitée.  

---

## Endpoints API

Exemples :

- `GET /api/articles` : récupérer tous les articles  
- `GET /api/articles/:slug` : récupérer un article spécifique  
- `POST /api/comments` : ajouter un commentaire  
- `POST /api/auth/local` : login utilisateur  

---

## Frontend

- Next.js avec SSR/SSG pour les pages articles et page d’accueil  
- Chakra UI pour le design responsive et accessible  

---

## Pagination & commentaires

- 6 articles par page sur la page d’accueil  
- Possibilité de commenter uniquement si connecté  
- Les commentaires sont affichés sous l’article
