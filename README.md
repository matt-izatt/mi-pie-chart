<div style="text-align: center;">
<h1>MI Pie Chart</h1>
<hr>
An SVG pie chart built with Typescript and D3.

This package is part of a group of basic charts for use in any web application.

[![Build](https://github.com/matt-izatt/mi-pie-chart/actions/workflows/build.yml/badge.svg)](https://github.com/matt-izatt/mi-pie-chart/actions/workflows/build.yml)
![npm](https://img.shields.io/npm/v/mi-pie-chart?logo=npm)
![GitHub](https://img.shields.io/github/license/matt-izatt/mi-pie-chart)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=matt-izatt_mi-pie-chart&metric=bugs)](https://sonarcloud.io/dashboard?id=matt-izatt_mi-pie-chart)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=matt-izatt_mi-pie-chart&metric=code_smells)](https://sonarcloud.io/dashboard?id=matt-izatt_mi-pie-chart)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=matt-izatt_mi-pie-chart&metric=ncloc)](https://sonarcloud.io/dashboard?id=matt-izatt_mi-pie-chart)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=matt-izatt_mi-pie-chart&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=matt-izatt_mi-pie-chart)
</div>

---

### Installation

```
npm install mi-pie-chart
```

---

### Usage

To use first import `PieChart` class from mi-pie-chart.

```typescript
import { PieChart } from 'mi-pie-chart';
```

Next instantiate the pie chart.

```typescript
const pieChart = new PieChart('#figure-1', someData, someConfig, someStyles);
```

The `PieChart` class accepts four arguments:

| Argument      | Required | Description                                                         |
| :------------ | :------- | :------------------------------------------------------------------ |
| `elementId`   | Yes      | The id of the  html element you would like to contain the pie chart |
| `data`        | Yes      | The data you wish to display                                        |
| `config`      | No       | Config options                                                      |
| `styles`      | No       | Override the default styles                                         |

---

### Data

Data must conform to the `PieData` interface. This can be imported:

```typescript
import { PieChart, PieData } from 'mi-pie-chart';
```

---

### Config

Data must conform to the `PieConfig` interface. This can be imported:

```typescript
import { PieChart, PieConfig } from 'mi-pie-chart';
```

---

### Styles

Data must conform to the `PieStyles` interface. This can be imported:

```typescript
import { PieChart, PieStyles } from 'mi-pie-chart';
```
