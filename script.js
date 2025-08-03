fetch('status.json')
  .then(res => res.json())
  .then(data => {
    const table = document.querySelector("tbody");
    data.forEach(site => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${site.name}</td>
        <td><a href="${site.url}" target="_blank">${site.url}</a></td>
        <td>${site.status}</td>
        <td>${site.timestamp}</td>
      `;
      row.style.color = site.status === "up" ? "green" : "red";
      table.appendChild(row);
    });
  });
