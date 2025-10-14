import { openDB } from 'idb';
import CONFIG from '../config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME, OUTBOX_OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    }
    if (!database.objectStoreNames.contains(OUTBOX_OBJECT_STORE_NAME)) {
      database.createObjectStore(OUTBOX_OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

const DatabaseHelper = {
  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async cacheStories(stories) {
    const tx = (await dbPromise).transaction(OBJECT_STORE_NAME, 'readwrite');
    await Promise.all(stories.map(story => tx.store.put(story)));
    await tx.done;
  },

  async addStoryToOutbox(story) {
    return (await dbPromise).add(OUTBOX_OBJECT_STORE_NAME, story);
  },

  async getAllStoriesFromOutbox() {
    return (await dbPromise).getAll(OUTBOX_OBJECT_STORE_NAME);
  },

  async deleteStoryFromOutbox(id) {
    return (await dbPromise).delete(OUTBOX_OBJECT_STORE_NAME, id);
  }
};

export default DatabaseHelper;
