//import gamesDataStore from "../gameDataStore.js";
import gamesDataStore from "../services/gamesDataStore.js";

const filterById = (id) => {
  return gamesDataStore.filter((game) => game.id === id);
};

const indexOfGame = (id) => {
  return gamesDataStore.indexOf(filterById(id)[0]);
};

const getAll = async () => {
  return gamesDataStore;
};

const getGame = async (id) => {
  return filterById(id)[0];
};

const addGame = async (GameInfo) => {
  const newId = gamesDataStore[gamesDataStore.length - 1].id + 1;

  gamesDataStore.push({
    id: newId,
    ...GameInfo,
  });

  return gamesDataStore;
};

const updateGame = async (id, GameInfo) => {
  const index = indexOfGame(id);

  if (index !== -1) {
    gamesDataStore[index] = { id: gamesDataStore[index].id, ...GameInfo };
    return gamesDataStore;
  } else {
    return "Game not found";
  }
};

const deleteGame = async (id) => {
  const index = indexOfGame(id);
  if (index !== -1) {
    gameDataStore.splice(index, 1);
    return "Game deleted";
  } else {
    return "Game not found";
  }
};

export default { getAll, getGame, deleteGame, addGame, updateGame };
