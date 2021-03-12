import * as D3 from "d3";

/**
 * Defines the data which will be displayed on the chart
 */
export interface PieData {
  label: string;
  value: number;
  color?: string;
  hoverColor?: string;
}


/**
 * Defines config which overrides the default config of the chart
 */
export interface PieConfig {
  /**
   * The amount of space between the chart segments and the edge of the container
   */
  margin?: number;
  /**
   * Default set to false
   */
  disableTooltips?: boolean;
  /**
   * Default set to false
   */
  disableHover?: boolean;
}


/**
 * Defines styles which override the default styles of the chart
 */
export interface PieStyles {
  /**
   * The color of the segments fill
   */
  segmentFillColor?: string;
  /**
   * The color of the segments stroke
   */
  segmentStrokeColor?: string;
  /**
   * The width of the segments stroke in px
   */
  segmentStrokeWidth?: number;
  /**
   * The color of the segments fill when hovered
   */
  segmentHoverFillColor?: string;
}


/**
 * Creates and draws an svg pie chart using D3
 *
 * @param elementId - The id of the parent element of the chart (including '#')
 * e.g. for `<figure id="pie-chart"></figure>` elementId = '#pie-chart'
 * @param data - The data used to calculate the segments and draw the labels
 * @param config - Defines config which overrides the default config of the chart
 * @param styles - Defines styles which override the default styles of the chart
 *
 */
export class PieChart {

  private svg;
  private pieData;
  private radius;
  private width: number;
  private height: number;

  constructor(
    private elementId: string,
    private data: PieData[],
    private config?: PieConfig,
    private styles?: PieStyles
  ) {
    this.setupSvg();
    this.draw();
  }

  public draw(): void {
    this.calculateDimensions();
    this.setupGroups();
    this.setupData();
    this.drawSegments();
  }

  private setupSvg(): void {
    this.svg = D3.select(this.elementId)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
  }

  private calculateDimensions(): void {
    const svgWidth = parseInt(D3.select("svg").style("width"), 10);
    const svgHeight = parseInt(D3.select("svg").style("height"), 10);
    const margin = this.config?.margin || 5;
    this.width = svgWidth - margin;
    this.height = svgHeight - margin;
    this.radius = Math.min(this.width, this.height) / 2 - margin;
  }

  private setupGroups(): void {
    this.svg.select(".pie-content")
      .remove();

    this.svg.append("g")
      .attr("class", "pie-content")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`);
  }

  private setupData(): void {
    const pieGenerator = D3.pie()
      .value((datum: any) => datum.value)
      .sort(null);
    // @ts-ignore
    this.pieData = pieGenerator(this.data);
  }

  private drawSegments(): void {
    const arc = D3.arc()
      .innerRadius(0)
      .outerRadius(this.radius);

    const segments = this.svg.select(".pie-content")
      .selectAll("path.segment")
      .data(this.pieData)
      .enter()
      .append("path")
      .attr("class", "segment")
      .attr("d", arc)
      .attr("fill", datum => datum.data?.color || this.styles?.segmentFillColor || "#E9EAEF")
      .attr("stroke", () => this.styles?.segmentStrokeColor || "#FFFFFF")
      .style("stroke-width", () => (this.styles?.segmentStrokeWidth || 3) + "px");

    segments.transition()
      .ease(D3.easeLinear)
      .duration(1200)
      .attrTween("d", datum => this.segmentTween(datum, arc));

    if (!this.config.disableHover) {
      segments
        .on("mouseover", (d, i, n) => this.handleMouseOver(d, i, n, this.styles))
        .on("mouseout", (d, i, n) => this.handleMouseOut(d, i, n, this.styles));
    }
  }

  private segmentTween(datum: any, arc: any): any {
    const angleInterpolation = D3.interpolate(0, 2 * Math.PI);
    const originalEnd = datum.endAngle;
    return t => {
      const currentAngle = angleInterpolation(t);
      if (currentAngle < datum.startAngle) {
        return "";
      }
      datum.endAngle = Math.min(currentAngle, originalEnd);
      return arc(datum);
    };
  }

  private handleMouseOver(datum: any, index: number, nodes: any[], styles): void {
    D3.select(nodes[index])
      .transition()
      .duration(100)
      // @ts-ignore
      .attr("fill", datum => datum.data?.hoverColor || styles?.segmentHoverFillColor || "#188B87");
  }

  private handleMouseOut(datum: any, index: number, nodes: any[], styles): void {
    D3.select(nodes[index])
      .transition()
      .duration(100)
      // @ts-ignore
      .attr("fill", datum => datum.data?.color || styles?.segmentFillColor || "#E9EAEF");
  }

}

export const defaultPieData: PieData[] = [
  {
    label: "Red",
    value: 5,
    color: "red"
  },
  {
    label: "Blue",
    value: 10,
    color: "blue"
  },
  {
    label: "Purple",
    value: 15,
    color: "purple"
  },
  {
    label: "Green",
    value: 20,
    color: "green",
    hoverColor: "blue"
  },
  {
    label: "Yellow",
    value: 25,
    color: "yellow"
  }
];

export const defaultPieConfig: PieConfig = {
  margin: 5,
  disableHover: false
};

export const defaultPieStyles: PieStyles = {
  segmentFillColor: "dodgerblue",
  segmentHoverFillColor: "blue",
  segmentStrokeColor: "white",
  segmentStrokeWidth: 3
};
