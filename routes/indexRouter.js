const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const {
  filterKeyName,
  filterBanques,
  filterCommerciales,
} = require("../controllers/dataFiltering");
const { insertData } = require("../controllers/database");

const router = express.Router();
router.use(cors());

const upload = multer();

router.post("/api/client", upload.array("fichiers[]"), async (req, res) => {
  let informations_entreprise = {};
  let banques = {};
  let ref_commerciales = {};
  let interlocuteur = {};

  filterKeyName(req.body, informations_entreprise, "info_entreprise.");
  filterKeyName(req.body, interlocuteur, "interlocuteur.");
  filterKeyName(req.body, banques, "banques.");
  filterKeyName(req.body, ref_commerciales, "ref_commerciales.");
  banques = filterBanques(banques, [
    "nom_banque",
    "contact_banque",
    "telephone",
  ]);
  ref_commerciales = filterCommerciales(ref_commerciales, [
    "nom_entreprise",
    "contact_entreprise",
    "telephone",
    "date_debut_relation",
  ]);

  const data = [
    informations_entreprise,
    banques,
    ref_commerciales,
    interlocuteur,
  ];
  let status = await insertData(data, req.files);

  res.send(status);
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = router;
