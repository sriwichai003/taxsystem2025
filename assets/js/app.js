// --- Calendar Logic ---
var currentMonth = new Date().getMonth();
const year = 2026;
const holidays2569 = {
  "0-1": "วันขึ้นปีใหม่",
  "0-2": "ชดเชยวันหยุด",
  "2-3": "วันมาฆบูชา",
  "3-6": "วันจักรี",
  "3-13": "วันสงกรานต์",
  "3-14": "วันสงกรานต์",
  "3-15": "วันสงกรานต์",
  "4-4": "วันฉัตรมงคล",
  "4-13": "วันพืชมงคล",
  "4-31": "วันวิสาขบูชา",
  "5-1": "ชดเชยวิสาขบูชา",
  "5-3": "วันเฉลิมฯ พระบรมราชินี",
  "6-28": "วันเฉลิมฯ ร.10",
  "6-29": "วันอาสาฬหบูชา",
  "6-30": "วันเข้าพรรษา",
  "7-12": "วันแม่แห่งชาติ",
  "9-13": "วันนวมินทรมหาราช",
  "9-23": "วันปิยมหาราช",
  "11-5": "วันพ่อแห่งชาติ",
  "11-7": "ชดเชยวันพ่อ",
  "11-10": "วันรัฐธรรมนูญ",
  "11-31": "วันสิ้นปี",
};

function renderCalendar(month) {
  const tbody = document.getElementById("calendar-body");
  if (!tbody) return;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  document.getElementById(
    "calendar-title"
  ).innerText = `ปฏิทินวันหยุดสำนักงาน ${monthNames[month]} 2569`;
  document.getElementById("current-month-display").innerText =
    monthNames[month];
  tbody.innerHTML = "";

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.classList.add("other-month");
      } else if (date > daysInMonth) {
        // ช่องว่าง
      } else {
        const holidayName = holidays2569[`${month}-${date}`];
        cell.innerHTML = `<span class="date-num">${date}</span>`;
        if (holidayName) {
          cell.classList.add("is-holiday");
          cell.innerHTML += `<span class="holiday-text">${holidayName}</span>`;
        }
        if (j === 0 || j === 6) cell.classList.add("is-weekend");
        date++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
    if (date > daysInMonth) break;
  }
}

window.prevMonth = function() {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentMonth);
};
window.nextMonth = function() {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  renderCalendar(currentMonth);
};

// --- Land Tax Alert Logic ---
function updateLandTaxAlert() {
  const alertEl = document.getElementById("land-tax-dynamic-alert");
  if (!alertEl) return;
  
  const now = new Date();
  const m = now.getMonth(); 

  let message = "";
  
  if (m === 0 || m === 1) { 
    message = "ภาษีที่ดินและสิ่งปลูกสร้างอยู่ในช่วง<b>การแจ้งรายการที่ดิน</b><br/><u>1 มกราคม - 28 กุมภาพันธ์ 2569</u>";
  } else if (m === 2) { 
    message = "ภาษีที่ดินและสิ่งปลูกสร้างอยู่ในช่วง<b>ประกาศราคาประเมินทุนทรัพย์</b><br/><u>1 มีนาคม - 31 มีนาคม 2569</u>";
  } else if (m === 3) { 
    message = "ภาษีที่ดินและสิ่งปลูกสร้างอยู่ในช่วง<b>การแจ้งการประเมินภาษี</b> <u>1 เมษายน - 30 เมษายน 2569</u><br/>และอยู่ในกำหนด<b>ชำระภาษี</b> <u>1 เมษายน - 31 กรกฎาคม 2569</u>";
  } else if (m >= 4 && m <= 6) { 
    message = "ภาษีที่ดินและสิ่งปลูกสร้างอยู่ในช่วงกำหนด<b>ชำระภาษี</b><br/><u>1 เมษายน - 31 กรกฎาคม 2569</u>";
  } else {
    message = "ภาษีที่ดินและสิ่งปลูกสร้างอยู่ในช่วง<b>แจ้งเตือนผู้ค้างชำระภาษี</b><br/><u>เริ่มตั้งแต่ สิงหาคม 2569</u><br/><br/>ขณะนี้สิ้นสุดระยะเวลาชำระภาษีที่ดินและสิ่งปลูกสร้างตามปกติ (ประจำปี 2569) แล้ว <br/>หากมีภาษีค้างชำระ โปรดติดต่อเจ้าหน้าที่เพื่อชำระภาษี";
  }
  
  alertEl.innerHTML = message;
}

// --- Countdown Timer Logic ---
function initCountdown() {
  const deadline = new Date("2026-07-31T23:59:59").getTime();
  
  function updateClock() {
    const now = new Date().getTime();
    const t = deadline - now;
    
    if (t >= 0) {
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((t % (1000 * 60)) / 1000);
      
      const elDays = document.getElementById('cd-days');
      if (elDays) elDays.innerText = days.toString().padStart(2, '0');
      
      const elHours = document.getElementById('cd-hours');
      if (elHours) elHours.innerText = hours.toString().padStart(2, '0');
      
      const elMinutes = document.getElementById('cd-minutes');
      if (elMinutes) elMinutes.innerText = minutes.toString().padStart(2, '0');
      
      const elSeconds = document.getElementById('cd-seconds');
      if (elSeconds) elSeconds.innerText = seconds.toString().padStart(2, '0');
    } else {
      const elDays = document.getElementById('cd-days');
      if (elDays) {
        elDays.innerText = "00";
        document.getElementById('cd-hours').innerText = "00";
        document.getElementById('cd-minutes').innerText = "00";
        document.getElementById('cd-seconds').innerText = "00";
      }
    }
  }
  
  updateClock();
  if (window.countdownInterval) {
    clearInterval(window.countdownInterval);
  }
  window.countdownInterval = setInterval(updateClock, 1000);
}

// --- Router ---
async function router() {
  const hash = window.location.hash || "#home";
  const contentArea = document.getElementById("content-area");
  let fileName = (hash.replace("#", "") || "home") + ".html";

  try {
    const response = await fetch(fileName);
    if (!response.ok) throw new Error();
    const html = await response.text();
    
    // ใช้ DOMParser เพื่อแกะเฉพาะเนื้อหาหลัก
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const mainContent = doc.querySelector("main.container");
    
    if (mainContent) {
      contentArea.innerHTML = mainContent.innerHTML;
    } else {
      contentArea.innerHTML = doc.body.innerHTML;
    }

    // Initialize scripts based on the loaded page
    if (hash === "#home" || hash === "") {
      renderCalendar(currentMonth);
      updateLandTaxAlert();
      initCountdown(); // Call countdown for home page
      
      // Initialize Swiper for home page
      if (window.Swiper) {
        new Swiper(".alertSwiper", {
          slidesPerView: 1,
          spaceBetween: 24,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
        });
      }
    } else if (hash === "#landTax") {
      updateLandTaxAlert();
    }
  } catch (error) {
    contentArea.innerHTML = "<p style='text-align:center; color:#e53e3e;'>ไม่สามารถโหลดเนื้อหาได้</p>";
  }

  // อัปเดตเมนู Active
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.querySelector("a").getAttribute("href") === hash
    );
  });
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", router);

// --- Global Initialization ---
window.addEventListener("load", () => {
  router();
  
  // Show announcement modal once per session
  const modal = document.getElementById("announcementModal");
  if (!modal) return;
  const closeBtn = document.getElementById("closeModalBtn");
  const announcementImg = document.getElementById("announcementImg");
  
  const announcementImages = [
    "assets/images/image_cms_fjklmnqrstv2.jpg",
    "assets/images/image_cms_agijpqw35678.jpg"
  ];
  let currentImageIndex = 0;
  
  if (!sessionStorage.getItem("announcementShown")) {
    setTimeout(() => {
      modal.classList.add("show");
    }, 500);
    sessionStorage.setItem("announcementShown", "true");
  }
  
  function nextAnnouncement() {
    currentImageIndex++;
    if (currentImageIndex < announcementImages.length) {
      announcementImg.src = announcementImages[currentImageIndex];
    } else {
      modal.classList.remove("show");
    }
  }
  
  closeBtn.addEventListener("click", () => {
    nextAnnouncement();
  });
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      nextAnnouncement();
    }
  });
});
