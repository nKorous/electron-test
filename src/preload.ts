// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";

let someData = "This data is from preload.ts";

const getPokemon = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return data;
};

contextBridge.exposeInMainWorld("preloadData", {
  getSomeData: () => someData,
  setSomeData: (newData: string) => {
    someData = newData;
  },
  fetchPokemon: async (name: string) => await getPokemon(name),
});
