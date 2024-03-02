/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cth72wesulj1nca")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zeivu9d0",
    "name": "field",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cth72wesulj1nca")

  // remove
  collection.schema.removeField("zeivu9d0")

  return dao.saveCollection(collection)
})
