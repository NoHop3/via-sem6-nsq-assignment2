exports = function (changeEvent) {
  const collection = context.services
    .get("Cluster0")
    .db("sep6-nsq-assignment2")
    .collection("orderLog");

  if (changeEvent.documentKey) {
    const orderInsertedId = changeEvent.documentKey._id;
    collection.insertOne({ orderLoggedId: orderInsertedId, status: "Created" });
  }

  if (changeEvent.updateDescription) {
    const updatedFields = changeEvent.updateDescription.updatedFields;
    collection.insertOne({
      orderLoggedId: updatedFields._id,
      updateDescription: updatedFields,
      status: "Updated",
    });
  }
};