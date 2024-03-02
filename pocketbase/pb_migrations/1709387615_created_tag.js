/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tfifi9i1jftph64",
    "created": "2024-03-02 13:53:35.033Z",
    "updated": "2024-03-02 13:53:35.033Z",
    "name": "tag",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ruttjtee",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_NOilN2D` ON `tag` (`name`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("tfifi9i1jftph64");

  return dao.deleteCollection(collection);
})
