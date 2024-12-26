@echo off
title Presser Beta modif par Maxou

if exist node_modules\ (
  echo Vous l'avez deja installe
  echo Accédez au dossier "config" pour les parametres du bot et "src" pour démarrer le script
  pause
  exit
) else (
  call npm i >> NUL
  echo Installe avec succes!
  echo Veuillez réexécuter ce fichier.
  pause
  exit
)