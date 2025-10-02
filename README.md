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
- **Fonctionnalités** :  
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
cd strapi```bash
