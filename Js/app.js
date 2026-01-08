// --- 1. ย้ายตัวแปรและฟังก์ชันปฏิทินมาไว้ที่นี่ ---
  var currentMonth = 0; // ใช้ var เพื่อป้องกันปัญหา redeclare
  const year = 2026;
  const holidays2569 = {
    "0-1": "วันขึ้นปีใหม่", "0-2": "ชดเชยวันหยุด", "2-3": "วันมาฆบูชา",
    "3-6": "วันจักรี", "3-13": "วันสงกรานต์", "3-14": "วันสงกรานต์", "3-15": "วันสงกรานต์",
    "4-4": "วันฉัตรมงคล", "4-13": "วันพืชมงคล", "4-31": "วันวิสาขบูชา",
    "5-1": "ชดเชยวิสาขบูชา", "5-3": "วันเฉลิมฯ พระบรมราชินี",
    "6-28": "วันเฉลิมฯ ร.10", "6-29": "วันอาสาฬหบูชา", "6-30": "วันเข้าพรรษา",
    "7-12": "วันแม่แห่งชาติ", "9-13": "วันนวมินทรมหาราช", "9-23": "วันปิยมหาราช",
    "11-5": "วันพ่อแห่งชาติ", "11-7": "ชดเชยวันพ่อ", "11-10": "วันรัฐธรรมนูญ", "11-31": "วันสิ้นปี"
  };

  function renderCalendar(month) {
    const tbody = document.getElementById("calendar-body");
    if (!tbody) return; // ถ้าหน้าปัจจุบันไม่มีตารางปฏิทิน ให้หยุดทำงาน

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

    document.getElementById("calendar-title").innerText = `ปฏิทินวันหยุดสำนักงาน ${monthNames[month]} 2569`;
    document.getElementById("current-month-display").innerText = monthNames[month];
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

  function prevMonth() { currentMonth = currentMonth === 0 ? 11 : currentMonth - 1; renderCalendar(currentMonth); }
  function nextMonth() { currentMonth = currentMonth === 11 ? 0 : currentMonth + 1; renderCalendar(currentMonth); }

  // --- 2. ปรับปรุง Router ---
  async function router() {
    const hash = window.location.hash || "#home";
    const contentArea = document.getElementById("content-area");
    let fileName = (hash.replace("#", "") || "home") + ".html";

    try {
      const response = await fetch(fileName);
      if (!response.ok) throw new Error();
      const html = await response.text();
      contentArea.innerHTML = html;

      // สั่งวาดปฏิทินใหม่ทันทีถ้าเป็นหน้า home
      if (hash === "#home" || hash === "") {
        renderCalendar(currentMonth);
      }
    } catch (error) {
      contentArea.innerHTML = "<p>ไม่สามารถโหลดเนื้อหาได้</p>";
    }

    // อัปเดตเมนู Active
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item.querySelector("a").getAttribute("href") === hash);
    });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", router);
  window.addEventListener("load", router);