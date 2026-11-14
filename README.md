# Exemples BERKIOS

Exemples d'applications pour apprendre BERKIOS Studio, BERKIOS Code et BERKIOS Core. Chaque exemple est expliqué de A à Z sur **https://docs.berkios.com/galerie/**.

## Les 10 premiers exemples

| # | Exemple | Type | Niveau |
|---|---|---|---|
| 01 | Bonjour BERKIOS | Core | Débutant |
| 02 | Remise et total à payer | Core | Débutant |
| 03 | Compte bancaire | Core | Intermédiaire |
| 04 | Ma première application | Code | Débutant |
| 05 | Gestion de stock | Code | Intermédiaire |
| 06 | Gestion des clients | Studio | Débutant |
| 07 | Messages et dialogues | Code | Débutant |
| 08 | Navigation latérale repliable | Studio | Intermédiaire |
| 09 | Outil en ligne de commande | Code | Intermédiaire |
| 10 | Échéances et chronomètre | Studio | Intermédiaire |

## Organisation du dépôt

```
catalog.json            Catalogue lu par le site de documentation
examples/<id>/          Un dossier par exemple (sources + README)
scripts/build-release.mjs   Fabrique dist/<id>.zip pour chaque exemple
.github/workflows/release.yml   Publie la release quand on pousse un tag
```

## Publier une release

1. Ajoutez ou modifiez un exemple dans `examples/<id>/`, puis décrivez-le dans `catalog.json`.
2. Vérifiez : `node scripts/build-release.mjs`
3. Publiez :
   ```bash
   git add -A && git commit -m "Exemples v1.0.0"
   git tag v1.0.0 && git push origin main v1.0.0
   ```
   Le workflow crée la release GitHub avec un fichier `<id>.zip` par exemple.

La Galerie de **docs.berkios.com** lit la **dernière release** (fichiers `.zip`) et `catalog.json` : un exemple ajouté ici apparaît sans modifier le site.

## Utiliser un exemple

- **Studio** : ouvrez le Studio, **Fichier → Importer**, choisissez le fichier `.berkios.json`, puis passez en mode **Aperçu**.
- **Code** (`.bk`) : `berkios valider fichier.bk`, puis `berkios apercu fichier.bk`.
- **Core** (`.bks`) : `berkios core fichier.bks`.

## Ajouter votre exemple

Un exemple = un dossier `examples/NN-nom/` avec ses fichiers et un `README.md`. Choisissez un identifiant en minuscules, chiffres et tirets : il devient le nom du fichier `.zip`.

## Licence

MIT.
