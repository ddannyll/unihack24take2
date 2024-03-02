/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gzhmt6x5tpa2r84",
    "created": "2024-03-02 13:48:56.489Z",
    "updated": "2024-03-02 13:48:56.489Z",
    "name": "meetup",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jvxfbuvz",
        "name": "meetupName",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8nefolkj",
        "name": "users",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("gzhmt6x5tpa2r84");

  return dao.deleteCollection(collection);
})
