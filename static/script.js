// Example D3.js code to create an interactive timeline
const margin = {top: 20, right: 30, bottom: 40, left: 100},
    width = 1600 - margin.left - margin.right,
    height = 5000 - margin.top - margin.bottom;

const svg = d3.select("#timeline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
    .domain(["Americas", "Africa", "Europe", "Asia", "Pacific"])
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([-3300, 2023])
    .range([height, 0]);

// Add vertical axis with each step corresponding to 100 years
svg.append("g")
    .call(d3.axisLeft(y).tickFormat(d => Math.abs(d) + (d < 0 ? " BCE" : " CE")).ticks((2023 + 3300) / 100));

// Add horizontal axis for continents
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Add white lines every 100 years and make them more visible
for (let year = -3300; year <= 2023; year += 100) {
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(year))
        .attr("y2", y(year))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4,4"); // Dashed lines for better visibility
}

const periods = [
    {name: "Early Bronze Age", start: -3300, end: -2000},
    {name: "Bronze Age", start: -2000, end: -1200},
    {name: "Iron Age", start: -1200, end: -600},
    {name: "Classical Antiquity", start: -600, end: 476},
    {name: "Middle Ages", start: 476, end: 1492},
    {name: "Modern Period", start: 1492, end: 2023}
];

// Add rectangles for each historical period with old yellow color
svg.selectAll(".period")
    .data(periods)
  .enter().append("rect")
    .attr("class", "period")
    .attr("x", 0)
    .attr("y", d => Math.min(y(d.start), y(d.end)))
    .attr("width", width)
    .attr("height", d => Math.abs(y(d.end) - y(d.start)))
    .attr("fill", "#f4e1a1") // Old yellow color
    .attr("opacity", 0.5);

// Add vertical text for each period
svg.selectAll(".period-label")
    .data(periods)
  .enter().append("text")
    .attr("class", "period-label")
    .attr("x", -margin.left + 10)
    .attr("y", d => (y(d.start) + y(d.end)) / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .attr("transform", d => `rotate(-90, ${-margin.left + 10}, ${(y(d.start) + y(d.end)) / 2})`)
    .text(d => d.name);

// Add thick lines to divide each period
svg.selectAll(".period-line")
    .data(periods)
  .enter().append("line")
    .attr("class", "period-line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d.start))
    .attr("y2", d => y(d.start))
    .attr("stroke", "black")
    .attr("stroke-width", 3);

svg.selectAll(".event")
    .data(data)
  .enter().append("circle")
    .attr("class", "event")
    .attr("cx", d => x(d.continent) + x.bandwidth() / 2)
    .attr("cy", d => y(d.year))
    .attr("r", 5)
    .attr("fill", "red")
    .on("click", function(event, d) {
        alert(`${d.year}: ${d.event} (${d.continent})\n${d.summary}`);
    })
  .append("title")
    .text(d => `${d.year}: ${d.event} (${d.continent})\n${d.summary}`);