# Configuration Base de Données - db_otp

## Installation des dépendances

```bash
npm install @nestjs/config
```

## Configuration Locale (Développement)

1. **Créer le fichier `.env`** à la racine du projet :
```env
# Configuration locale
NODE_ENV=development

# Configuration de l'authentification
JWT_SECRET=dev-secret-jwt-changez-moi-en-production
ADMIN_PASSWORD=admin123

# Configuration de la base de données locale
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=db_otp

# Port de l'application
PORT=3000
```

2. **Créer la base de données MySQL locale** :
```sql
CREATE DATABASE db_otp;
```

## Configuration Production

1. **Utiliser le fichier `.env.production`** (déjà créé) et modifier les valeurs :
```env
NODE_ENV=production
JWT_SECRET=VOTRE-SECRET-JWT-PRODUCTION-SECURISE
ADMIN_PASSWORD=VOTRE-MOT-DE-PASSE-ADMIN-SECURISE
DB_HOST=votre-serveur-production
DB_USERNAME=votre-utilisateur-production
DB_PASSWORD=votre-mot-de-passe-production
DB_DATABASE=db_otp
```

## Démarrage

### Développement
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## Sécurité

- ⚠️ **IMPORTANT** : Changez tous les mots de passe et secrets en production
- La synchronisation automatique est désactivée en production
- SSL est activé automatiquement en production
- Les logs de base de données sont activés uniquement en développement

## Structure de Configuration

- `src/config/database.config.ts` : Configuration centralisée de la base de données
- `.env.development` : Variables d'environnement pour le développement
- `.env.production` : Variables d'environnement pour la production
- `.env.example` : Exemple de configuration
