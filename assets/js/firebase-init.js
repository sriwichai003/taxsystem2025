import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5EjwEF3MQxYRO4NWK70OEaPKC3KrQgsU",
  authDomain: "swaa01-c5632.firebaseapp.com",
  databaseURL:
    "https://swaa01-c5632-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "swaa01-c5632",
  storageBucket: "swaa01-c5632.firebasestorage.app",
  messagingSenderId: "64740739912",
  appId: "1:64740739912:web:c246c32c5309f7170a417d",
  measurementId: "G-4JNP6SXQWJ",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ดึงวันที่ปัจจุบันในรูปแบบ YYYY-MM-DD เพื่อใช้เป็นชื่อตำแหน่งในฐานข้อมูล
const today = new Date().toISOString().slice(0, 10);
const dailyVisitorRef = ref(db, "dailyVisits/" + today);

function incrementDailyVisitors() {
  runTransaction(dailyVisitorRef, (currentValue) => {
    return (currentValue || 0) + 1;
  });
}

onValue(dailyVisitorRef, (snapshot) => {
  const data = snapshot.val();
  const countElement = document.getElementById("visitorCount");
  if (countElement) {
    countElement.innerText = (data || 0).toLocaleString();
  }
});

incrementDailyVisitors();
