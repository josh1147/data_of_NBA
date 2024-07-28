function deliverLineChart(dataset) {
    d3.select("#mysvg").selectAll("*").remove();

    const xScale = d3.scaleBand()
        .domain(xticklabel)
        .rangeRound([padding, w - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([h - padding, padding]);

    const line = d3.line()
        .x((d, i) => xScale(xticklabel[i]) + xScale.bandwidth() / 2)
        .y(d => yScale(d));

    const svg = d3.select("#mysvg")
        .attr("width", w)
        .attr("height", h);

    svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", (d, i) => xScale(xticklabel[i]) + xScale.bandwidth() / 2)
        .attr("cy", d => yScale(d))
        .attr("r", 5)
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Value: " + d)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
            d3.select(this).transition().duration(200).attr('fill', 'orange').attr('r',8);
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            d3.select(this).transition().duration(200).attr('fill', 'black').attr('r', 5);
        })
        .append("title")
        .text(function (d) {
            return "该数据准确值为" + d;
        });

    // Create X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.20em");

    // Create Y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(d3.axisLeft(yScale));
}
