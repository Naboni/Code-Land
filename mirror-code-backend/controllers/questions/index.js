const admin = require('firebase-admin');
const { app } = require('../../configs/firebase');

const db = admin.firestore(app);

async function getTopics() {
  console.log('==================');
  const topics = await db.collection('topics').get();
  const documentSnapshot = topics.docs;
  return documentSnapshot.map((snapshot) => snapshot.data());
}

module.exports = { getTopics };
