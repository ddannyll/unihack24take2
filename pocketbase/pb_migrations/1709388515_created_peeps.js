/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "cth72wesulj1nca",
    "created": "2024-03-02 14:08:35.247Z",
    "updated": "2024-03-02 14:08:35.247Z",
    "name": "peeps",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x75lkgxz",
        "name": "data",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cth72wesulj1nca");

  return dao.deleteCollection(collection);
})
