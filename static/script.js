// Example D3.js code to create an interactive timeline
const margin = {top: 20, right: 30, bottom: 40, left: 55},
    width = 1024 - margin.left - margin.right,
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

svg.append("g")
    .call(d3.axisLeft(y).tickFormat(d => Math.abs(d) + (d < 0 ? " BCE" : " CE")));

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

const periods = [
    {name: "Early Bronze Age", start: -3300, end: -2000},
    {name: "Bronze Age", start: -2000, end: -1200},
    {name: "Iron Age", start: -1200, end: -600},
    {name: "Classical Antiquity", start: -600, end: 476},
    {name: "Middle Ages", start: 476, end: 1492},
    {name: "Modern Period", start: 1492, end: 2023}
];

svg.selectAll(".period")
    .data(periods)
  .enter().append("rect")
    .attr("class", "period")
    .attr("x", 0)
    .attr("y", d => Math.min(y(d.start), y(d.end)))
    .attr("width", width)
    .attr("height", d => Math.abs(y(d.end) - y(d.start)))
    .attr("fill", "lightblue")
    .attr("opacity", 0.5);

svg.selectAll(".period-label")
    .data(periods)
  .enter().append("text")
    .attr("class", "period-label")
    .attr("x", width / 2)
    .attr("y", d => (y(d.start) + y(d.end)) / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(d => d.name);

svg.selectAll(".event")
    .data(data)
  .enter().append("circle")
    .attr("class", "event")
    .attr("cx", d => x(d.continent) + x.bandwidth() / 2)
    .attr("cy", d => y(d.year))
    .attr("r", 5)
    .attr("fill", "red")
  .append("title")
    .text(d => `${d.year}: ${d.event} (${d.continent})\n${d.summary}`);