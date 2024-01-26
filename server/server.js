const express = require('express');
const fs = require('fs/promises');
const cors = require('cors'); // Ajout du middleware cors

const app = express();
const port = 3001;

const ESCROWS_FILE_PATH = 'escrows.json';
const CONTRACTS_FILE_PATH = 'contracts.json';

// Middleware pour permettre à Express de traiter les données JSON
app.use(express.json());

// Utilisation du middleware cors pour gérer les en-têtes CORS
app.use(cors());




// Endpoint pour stocker un nouvel escrow
app.post('/api/escrows', async (req, res) => {
    const { id, contract, arbiter, beneficiary, approved, value, handleApprove } = req.body;
  
    try {
      let escrows;
  
      try {
        // Tentative de charger les escrows existants depuis le fichier
        escrows = JSON.parse(await fs.readFile(ESCROWS_FILE_PATH, 'utf-8'));

      } catch (readError) {
        // Si le fichier n'existe pas, initialiser le tableau d'escrows avec un tableau vide
        escrows = [];
      }
  
      // Ajouter le nouvel escrow
      escrows.push({ id, contract, arbiter, beneficiary, approved, value, handleApprove });

      // Enregistrer le tableau mis à jour dans le fichier
      await fs.writeFile(ESCROWS_FILE_PATH, JSON.stringify(escrows));
      
      res.status(201).json({ message: 'Escrow created successfully' });

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });



    }
  });
  

// Endpoint pour récupérer tous les escrows
app.get('/api/escrows', async (req, res) => {
  try {
    // Charger les escrows depuis le fichier
    const escrows = JSON.parse(await fs.readFile(ESCROWS_FILE_PATH, 'utf-8')) || [];

    res.status(200).json(escrows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
