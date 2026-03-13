(() => {
  // ✅ Currency formatter (MAD)
  const formatMAD = (amount) =>
    new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD" }).format(amount);

  const payRows = document.getElementById("payRows");
  const nextPayout = document.getElementById("nextPayout");
  const earned = document.getElementById("earned");
  const impact = document.getElementById("impact");

  const waterImpact = document.getElementById("waterImpact");
  const greenArea = document.getElementById("greenArea");
  const foodProduced = document.getElementById("foodProduced");
  const co2Impact = document.getElementById("co2Impact");

  const list = window.HF.payments.list();
  const imp = window.HF.payments.impact();

  // Table
  payRows.innerHTML = list
    .map(
      (p) => `
      <tr>
        <td><strong>${p.month}</strong></td>
        <td>${formatMAD(p.amount)}</td>
        <td>
          <span class="status-pill ${p.status === "paid" ? "paid" : "pending"}">
            ${p.status.toUpperCase()}
          </span>
        </td>
        <td><a class="link" href="#" onclick="window.HF.toast('Invoice opened (demo).','good'); return false;">${p.invoice}</a></td>
      </tr>
    `
    )
    .join("");

  // Summary
  nextPayout.textContent = formatMAD(list[0].amount);
  const total = list.filter((x) => x.status === "paid").reduce((a, x) => a + x.amount, 0);
  earned.textContent = formatMAD(total);
  impact.textContent = total > 1000 ? "A+" : "A";

  // Impact (these are already strings with units)
  waterImpact.textContent = imp.waterSaved;
  greenArea.textContent = imp.greenArea;
  foodProduced.textContent = imp.foodProduced;
  co2Impact.textContent = imp.co2Avoided;

  document.getElementById("requestAccess")?.addEventListener("click", () => {
    window.HF.toast("Access schedule request sent (demo).", "good");
  });
})();
