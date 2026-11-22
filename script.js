const popularRoutes = [
  ["Nairobi", "Garissa", "7h 30m · 390 km", "1,500"],
  ["Nairobi", "Wajir", "12h 00m · 700 km", "3,000"],
  ["Nairobi", "Mandera", "18h 00m · 1,100 km", "5,000"],
  ["Nairobi", "Addis Ababa", "28h 00m · 1,550 km", "7,500"],
  ["Addis Ababa", "Nairobi", "28h 00m · 1,550 km", "7,500"],
  ["Nairobi", "Isiolo", "5h 00m · 285 km", "1,200"],
  ["Nairobi", "Marsabit", "10h 00m · 560 km", "2,200"],
  ["Eldoret", "Kakuma", "4h 30m · 280 km", "2,500"],
  ["Kakuma", "Eldoret", "4h 30m · 280 km", "2,500"]
];

const timetable = [
  ["Nairobi", "Garissa", "1,500", "06:30 · 10:00 · 15:30 · 19:00", "7h 30m · 390 km"],
  ["Nairobi", "Wajir", "3,000", "07:00 · 20:30", "12h 00m · 700 km"],
  ["Nairobi", "Mandera", "5,000", "06:30 · 10:00 · 15:30 · 19:00", "18h 00m · 1,100 km"],
  ["Nairobi", "Addis Ababa", "7,500", "06:30 · 20:30", "28h 00m · 1,550 km"],
  ["Addis Ababa", "Nairobi", "7,500", "06:30 · 20:30", "28h 00m · 1,550 km"],
  ["Nairobi", "Isiolo", "1,200", "06:30 · 10:00 · 15:30 · 19:00", "5h 00m · 285 km"],
  ["Nairobi", "Marsabit", "2,200", "06:30 · 10:00 · 15:30 · 19:00", "10h 00m · 560 km"],
  ["Nairobi", "Moyale", "2,500", "07:00 · 16:30 · 19:30", "15h 00m · 780 km"],
  ["Nairobi", "Kakuma", "3,500", "07:00 · 15:30 · 19:00", "12h 30m · 850 km"],
  ["Nairobi", "Kainuk", "2,500", "07:00 · 19:00", "10h 00m · 520 km"],
  ["Nairobi", "Lodwar", "2,000", "07:00 · 15:30 · 19:00", "10h 00m · 530 km"],
  ["Nairobi", "Lokichar", "2,200", "08:30 · 19:30", "10h 00m · 520 km"],
  ["Nakuru", "Kakuma", "3,000", "10:00 · 17:00 · 21:30", "10h 30m · 650 km"],
  ["Garissa", "Wajir", "1,300", "06:30 · 10:00 · 15:30 · 19:00", "5h 30m · 310 km"],
  ["Garissa", "Dadaab", "900", "06:30 · 10:00 · 15:30 · 19:00", "3h 00m · 120 km"],
  ["Wajir", "Mandera", "1,600", "06:30 · 10:00 · 15:30 · 19:00", "6h 30m · 400 km"],
  ["Eldoret", "Kakuma", "2,500", "10:00 · 19:30", "4h 30m · 280 km"],
  ["Kakuma", "Eldoret", "2,500", "10:00 · 19:30", "4h 30m · 280 km"],
  ["Kitale", "Kakuma", "2,000", "15:30 · 20:30", "7h 00m · 430 km"],
  ["Kakuma", "Kitale", "2,000", "15:30 · 20:30", "7h 00m · 430 km"]
];

const routeGrid = document.getElementById("routeGrid");
popularRoutes.forEach(([from, to, duration, fare]) => {
  const card = document.createElement("a");
  card.className = "route-card";
  card.href = "#bookingForm";
  card.innerHTML = `<div class="route-card-head"><span>${from} → ${to}</span><b>→</b></div><p>${duration}</p><p>From KES ${fare}</p>`;
  card.addEventListener("click", () => {
    document.getElementById("fromSelect").value = from;
    document.getElementById("toSelect").value = to;
    updateFare();
  });
  routeGrid.appendChild(card);
});

const routeTable = document.getElementById("routeTable");
timetable.forEach(([from, to, fare, departures, duration]) => {
  const card = document.createElement("a");
  card.className = "trip-card";
  card.href = "#bookingForm";
  card.innerHTML = `<div class="trip-head"><span>${from} - ${to}</span><strong>KES ${fare}</strong></div><p>D: ${departures} — ${duration}</p><div class="badges"><span>Economy Plus</span><span>Business Class</span><span>VIP Recliner</span></div>`;
  routeTable.appendChild(card);
});

document.getElementById("menuButton").addEventListener("click", (event) => {
  const nav = document.getElementById("nav");
  nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open"));
});

const dateInput = document.getElementById("travelDate");
const today = new Date();
const isoToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
dateInput.value = isoToday;
dateInput.min = isoToday;

let passengers = 1;
const passengerCount = document.getElementById("passengerCount");
const seatLabel = document.getElementById("seatLabel");
const minusPassenger = document.getElementById("minusPassenger");

function updateFare() {
  const from = document.getElementById("fromSelect").value;
  const to = document.getElementById("toSelect").value;
  const route = popularRoutes.find(([rFrom, rTo]) => rFrom === from && rTo === to);
  const fallback = timetable.find(([rFrom, rTo]) => rFrom === from && rTo === to);
  const fare = route ? route[3] : fallback ? fallback[2] : "1,500";
  const numericFare = Number(fare.replace(/,/g, ""));
  document.getElementById("farePerSeat").textContent = fare;
  document.getElementById("fareTotal").textContent = (numericFare * passengers).toLocaleString("en-US");
  passengerCount.textContent = passengers;
  seatLabel.textContent = passengers === 1 ? "seat" : "seats";
  document.getElementById("seatCountText").textContent = `${passengers} ${passengers === 1 ? "seat" : "seats"}`;
  minusPassenger.disabled = passengers <= 1;
}

document.getElementById("minusPassenger").addEventListener("click", () => {
  if (passengers > 1) passengers--;
  updateFare();
});
document.getElementById("plusPassenger").addEventListener("click", () => {
  if (passengers < 6) passengers++;
  updateFare();
});
document.getElementById("swapButton").addEventListener("click", () => {
  const from = document.getElementById("fromSelect");
  const to = document.getElementById("toSelect");
  const oldFrom = from.value;
  from.value = to.value;
  to.value = oldFrom;
  updateFare();
});
document.getElementById("fromSelect").addEventListener("change", updateFare);
document.getElementById("toSelect").addEventListener("change", updateFare);
document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("whatsappBooking").scrollIntoView({ behavior: "smooth", block: "center" });
});
document.getElementById("whatsappBooking").addEventListener("click", () => {
  const from = document.getElementById("fromSelect").value;
  const to = document.getElementById("toSelect").value;
  const date = document.getElementById("travelDate").value;
  const total = document.getElementById("fareTotal").textContent;
  const message = `Hello Liban Bus, I'd like to book ${passengers} seat(s) from ${from} to ${to} on ${date}. Estimated total: KES ${total}.`;
  window.open(`https://wa.me/254785133968?text=${encodeURIComponent(message)}`, "_blank");
});

updateFare();
