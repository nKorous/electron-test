/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

window.addEventListener('DOMContentLoaded', () => {
  const pokemonInput = document.getElementById('pokemon-input') as HTMLInputElement;
  const fetchPokemonBtn = document.getElementById('fetch-pokemon-btn');
  const pokemonInfoDiv = document.getElementById('pokemon-info');

  pokemonInput?.addEventListener('input', () => {
    fetchPokemonBtn!.disabled = pokemonInput.value.trim().length < 4;
  });

  fetchPokemonBtn?.addEventListener('click', async () => {
    const pokemonName = pokemonInput.value.trim().toLowerCase();
    if (pokemonName) {
      const pokemonData = await window.preloadData.fetchPokemon(pokemonName);
      pokemonInfoDiv!.innerHTML = `
        <h3>${pokemonData.name} (ID: ${pokemonData.id})</h3>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
        <p>Height: ${pokemonData.height}</p>
        <p>Weight: ${pokemonData.weight}</p>
      `;
    }
  });

});
