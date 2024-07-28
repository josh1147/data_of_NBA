//即要部署的数据
var current_data = ex1;
//Width and height
console.log(current_data)

var w = 700;
var h = 320;
var padding=40;
var axisspace = padding;
//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
	.attr("height", h)
	.attr("id", "mysvg")

//x轴的标度标签
//这里要先转化成Date对象 所以有parseTime
var xticklabel;
var parseTime = d3.timeParse("%y")

function deliverBarChart(dataset) {
			//Create bars

	d3.select("#mysvg").selectAll("*").remove();
		var xScale = d3.scaleBand()
						.domain(xticklabel)
						.rangeRound([padding, w-padding])
						.paddingInner(0.05);

		var yScale = d3.scaleLinear()
						.domain([0, d3.max(dataset)])
						.range([ h-padding,padding]);//由于y坐标越大位置靠下 所以要反转

		//Define X axis
		var xAxis = d3.axisBottom()
						.scale(xScale)
						.ticks(5);

		//Define Y axis
	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(5);
	const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
		.style("opacity", 0);
	
	var colorScale = d3.scaleLinear()
		.domain([d3.min(dataset), d3.max(dataset)])
		.range([0.4, 1]);
	
		svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return xScale(xticklabel[i]);
			})
			.attr("y", function(d) {
				return  yScale(d);//这里的定位点是中间上面的点
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d) {
				return h-padding-yScale(d);
			})
			.attr("fill", function(d) {
				return "rgb(0, 0, " + Math.round(colorScale(d) * 255) + ")";
			})
			.on("mouseover", function(event,d) {
				d3.select(this)
					.attr("fill", "orange");
				tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            	tooltip.html("Value: " + d)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
			})
			.on("mouseout", function(d) {
				d3.select(this)
					.transition()
					.duration(250)
					.attr("fill", "rgb(0, 0, " + Math.round(colorScale(d) * 255) + ")");
				tooltip.transition()
                .duration(500)
                .style("opacity", 0);
			})
		.append("title")
			.text(function (d) {
				return "该数据准确值为" + d;
		
	})

		//Create labels
		fontsize=11;
		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d) {
				return d;
			})
			.attr("text-anchor", "middle")
			.attr("x", function(d, i) {
				return xScale(xticklabel[i]) + xScale.bandwidth() / 2;
			})
			.attr("y", function (d) {
				if (h-padding-yScale(d) < fontsize + 3) {
					return yScale(d) - 3 ;
				}
				return yScale(d) + fontsize + 3;
			})
			.attr("font-family", "sans-serif")
			.attr("font-size", fontsize+"px")
			.attr("fill", "white");

					
		//Create X axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (h - axisspace) + ")")
		.call(xAxis)
		//在这个下面设置旋转
		.selectAll("text")
		.attr("transform", "rotate(-45)")
	    .attr("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.20em");
		
		//Create Y axis
		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + axisspace*0.9999 + ",0)")
			//这里不需要再往下移动了因为在y轴构造的时候就已经ok了
			.call(yAxis);
}

function manipulateChart() {
    var elem = document.getElementById("Type-Selector");
    var data_type = elem.options[elem.selectedIndex].value;
    elem = document.getElementById("Player-Selector");
    var player = elem.options[elem.selectedIndex].value;
    var chartTypeElem = document.getElementById("Chart-Type-Selector");
    var chartType = chartTypeElem.options[chartTypeElem.selectedIndex].value;
    
    console.log("选中了" + player + "球星的" + data_type + "数据");
    var player_data = alldata[player];
    xticklabel = player_data["Season"];
    current_data = player_data[data_type];
    console.log(current_data);

    if (chartType === "bar") {
        deliverBarChart(current_data);
    } else if (chartType === "line") {
        deliverLineChart(current_data);
    }

    animation_type = 'animate__animated animate__backInDown';
    function updateText(newText) {
        const paragraph = d3.select('#description-parah');

        // 移除动画类
        paragraph.classed(animation_type, false);

        // 更新文本内容
        paragraph.text(newText);

        // 强制重新渲染以便重新添加动画类
        setTimeout(() => {
            paragraph.classed(animation_type, true);
        }, 0.001); // 设置一个小的延迟来确保类的重新添加被识别
    }
    updateText(metrics.find(m => m.value == data_type).description);
}

manipulateChart(current_data)
d3.select('body')
	.append('p')
	.attr('id', 'description-parah');