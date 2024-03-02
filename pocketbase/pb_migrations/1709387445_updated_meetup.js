/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzhmt6x5tpa2r84")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehntzvzy",
    "name": "messages",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "z71osnvb68ejuue",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzhmt6x5tpa2r84")

  // remove
  collection.schema.removeField("ehntzvzy")

  return dao.saveCollection(collection)
})
