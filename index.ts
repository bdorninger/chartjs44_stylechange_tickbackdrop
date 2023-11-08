///

import './style.css';

import colorLib, { Color } from '@kurkle/color';

import {
  AnimationsSpec,
  Chart,
  ChartConfiguration,
  ChartEvent,
  registerables,
  Tick,
  TickOptions,
} from 'chart.js';

Chart.register(...registerables);

// import dragData from 'chartjs-plugin-dragdata';
// import zoomPlugin from 'chartjs-plugin-zoom';

// import { TracePlugin } from './trace';

// CROSSHAIR no import method yields a stable, usable plugin object....
// imports undefined
// import CrosshairPlugin from 'chartjs-plugin-crosshair';

// import CrosshairPlugin from 'chartjs-plugin-crosshair'; // this one imports undefined
// import Interpolate from 'chartjs-plugin-crosshair';

/* this one imports an object with one entry "default": {} resulting in an   
   error on initializing the chart plugins when resgistered as imported
   if registered via CrosshairPlugin.default, the chart is being drawn,
   but the crosshair/zoom does still not work
   Debugging shows, the register method did not fail, but didn't insert anything into the plugin registry either
*/
// import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';
//import * as CrosshairPlugin from 'chartjs-plugin-crosshair';
// import { LineElement, LineProps, Segment, TooltipItem } from 'chart.js';

// DRAG SEGMENT: API incompatible!
// import ChartJSdragSegment  from 'chartjs-plugin-dragsegment'; // API incompatible (chart.js 2.x?)

const DATA_COUNT = 7;
let col: Color;
const ctx = (
  document.getElementById('myChart') as HTMLCanvasElement
).getContext('2d');

const tempRange = document.getElementById('tempRange');
tempRange.addEventListener('change', onTempValueChange);

const selPos = document.getElementById('posSel');
selPos.addEventListener('change', onSelectionPositionChange);

// const crosshair = new TracePlugin();
//console.log(`crosshair: ${JSON.stringify(crosshair)}`, crosshair.id);
// console.log(`dragdate: ${JSON.stringify(ChartJSdragDataPlugin)}`);
// const plugins = [CH.CrosshairPlugin];
// const dragData = ChartJSdragDataPlugin;
// Chart.register(dragData /*crosshair*/);
//Interaction.modes.interpolate = Interpolate;

// const reg = Chart.registry.plugins;

const selectionBarData = [
  { x: 2.5, y: -0.5 },
  { x: 2.5, y: 20 },
];

const config: ChartConfiguration<'line'> = {
  type: 'line',
  data: {
    // labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
    datasets: [
      {
        label: '  Temperature',
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 13 },
          { x: 3, y: 13.2 },
          { x: 4, y: 15 },
          { x: 5, y: 17 },
          { x: 6, y: 18 },
        ],
        borderWidth: 2,
        pointRadius: 7,
        borderColor: '#ff0016',
        backgroundColor: '#00ffee',
        hidden: false,
        fill: false,
        segment: {
          borderWidth: (ctx, opt) => (ctx.p0.y === ctx.p1.y ? 10 : undefined),
          borderColor: (ctx, opt) =>
            ctx.p0.y === ctx.p1.y
              ? colorLib('#ffaa00').alpha(0.2).rgbString()
              : undefined,
          backgroundColor: (ctx, opt) => {
            //console.log('line', l.start);
            return ctx.p0.y === ctx.p1.y ? '#ffffff' : undefined;
          },
          borderCapStyle: () => undefined,
          borderDash: () => undefined,
          borderDashOffset: () => undefined,
          borderJoinStyle: () => undefined,
        },
      },
      {
        label: '  Temperature HiLite',
        data: [
          { x: 2, y: 13 },
          { x: 3, y: 13.2 },
        ],
        borderWidth: 10,
        borderColor: colorLib('#ffaa00').alpha(0.4).rgbString(),
        backgroundColor: '#00ffee',
        hidden: false,
        fill: false,
      },
      {
        label: undefined,
        hidden: true,
        data: selectionBarData,
        borderWidth: 35,
        borderColor: colorLib('#ff00aa').alpha(0.2).rgbString(),
        pointRadius: 0,
        fill: false,
      },
      {
        label: '  Pressure hi',
        data: [
          { x: 1, y: 6 },
          { x: 2, y: 5.5 },
          { x: 3.5, y: 4.7 },
          { x: 4, y: 3.7 },
          { x: 5, y: 8 },
          /*{ x: 6, y: 12 },
          { x: 7, y: 11.5 },*/
        ],

        fill: '+1',
        tension: 0.0,
        borderWidth: 3,

        borderColor: colorLib('#0d0cff').alpha(0.4).rgbString(),
        backgroundColor: colorLib('#035000').alpha(0.4).rgbString(),
        pointHitRadius: 25,
        borderCapStyle: 'square',
        borderJoinStyle: 'bevel', // round, miter
        pointStyle: 'rect', // "circle" | "cross" | "crossRot" | "dash" | "line" | "rect" | "rectRounded" | "rectRot" | "star" | "triangle" | HTMLImageElement | HTMLCanvasElemen
        pointRadius: 6,
        pointRotation: 60,
        // stepped: 'middle', // true/false, 'before', ' middle' 'after'
      },
      {
        label: '  Pressure act',
        data: [
          { x: 1, y: 4 },
          { x: 2, y: 5 },
          { x: 3.5, y: 4 },
          { x: 4, y: 3 },
          { x: 5, y: 7 },
          { x: 6, y: 11 },
          { x: 7, y: 10 },
        ],

        fill: false,
        tension: 0.0,
        borderWidth: 3,
        borderColor: '#4dc9f6',
        backgroundColor: '#035000',
        pointHitRadius: 25,
        borderCapStyle: 'square',
        borderJoinStyle: 'bevel', // round, miter
        pointStyle: 'rect', // "circle" | "cross" | "crossRot" | "dash" | "line" | "rect" | "rectRounded" | "rectRot" | "star" | "triangle" | HTMLImageElement | HTMLCanvasElemen
        pointRadius: 6,
        pointRotation: 45,
        // stepped: 'middle', // true/false, 'before', ' middle' 'after'
      },
      {
        label: '  Pressure lo',
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 3.5 },
          { x: 3.5, y: 2 },
          { x: 4, y: 1.9 },
          { x: 5, y: 6 },
          { x: 6, y: 8 },
          { x: 7, y: 7.5 },
        ],

        fill: '-1',
        tension: 0.0,
        borderWidth: 3,

        borderColor: colorLib('#ff0c00').alpha(0.8).rgbString(),
        backgroundColor: colorLib('#f35a0f').alpha(0.8).rgbString(),
        pointHitRadius: 25,
        borderCapStyle: 'square',
        borderJoinStyle: 'bevel', // round, miter
        pointRadius: 10,
        // pointBackgroundColor: '#ffffff',
        pointStyle: 'rectRounded', // "circle" | "cross" | "crossRot" | "dash" | "line" | "rect" | "rectRounded" | "rectRot" | "star" | "triangle" | HTMLImageElement | HTMLCanvasElemen
        // rotation: 90,
        // stepped: 'middle', // true/false, 'before', ' middle' 'after'
      },

      /*{
        label: '  Velocity',
        data: [7, 11, 5, 8, 3, 7],
        fill: false,
        tension: 0.4,
        borderWidth: 4,
        borderDash: [12, 4, 4, 4],
        borderColor: '#4dc900',
        backgroundColor: '#ffffff',
        pointHitRadius: 5,
      },*/
    ],
  },
  options: {
    // animation: false,
    /* animation: {
      duration: 0,
    },*/
    backgroundColor: 'grey',
    responsive: false,
    scales: {
      y: {
        //offset: true,
        min: 0,
        max: 20,
        bounds: 'data',
        //suggestedMin: 0,
        //suggestedMax: 20,
        ticks: {
          stepSize: 2,
        },
      },
      x: {
        /*position: {
          y: 4,
        },*/
        //offset: true,
        type: 'linear',
        title: {
          display: true,
          text: 'Foo',
        },
        ticks: {
          callback: function (val: number, index: number, ticks: Tick[]) {
            // Hide every 2nd tick label
            return val % 2 === 0 ? String(val) : '';
          },
          color: 'green',
        },
        min: 0,
        max: 10,
        // bounds: 'data'
      },
      x2: {
        type: 'linear',
        position: 'top',
        ticks: {
          callback: function (val: number, index: number, ticks: Tick[]) {
            // Hide every 2nd tick label
            return index === 0 || index === ticks.length - 1 ? 'FOO' : '0';
          },
          color: 'green',
          backdropColor: 'yellow',
          showLabelBackdrop: true,
          align: 'inner',
        },
      },
    },
    onHover: function (e: ChartEvent) {
      const point = chart.getElementsAtEventForMode(
        e.native,
        'nearest',
        { intersect: true },
        false
      );
      if (point.length) {
        (e.native.target as HTMLElement).style.cursor = 'grab';
      } else {
        (e.native.target as HTMLElement).style.cursor = 'default';
      }
    },
    onClick: function (e: ChartEvent) {
      console.log(
        `chart ev ${e.type}@${e.x},${e.y}`,

        chart.getElementsAtEventForMode(
          e.native,
          'dataset', // index, dataset, point, nearest, x,y
          { intersect: false },
          false
        ),
        e
      );
      return true;
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

const chart = new Chart<'line'>(ctx, config);

tempRange.setAttribute('value', String(chart.data.datasets[0].borderWidth));

export function onTempValueChange(ev: any) {
  // ev.preventDefault();
  console.log(`changed`, ev, ev.target.checked);
  const chk = ev.target.checked as boolean;
  chart.data.datasets[0].borderWidth = chk ? 2 : 5;
  // chart.data.datasets[0].pointRadius = ev.target.value;
  chart.data.datasets[0].pointBorderWidth = chk ? 2 : 5;
  chart.data.datasets[0].pointBackgroundColor = chk ? `#ffffff` : `#000000`;
  chart.update();
}

export function onSelectionPositionChange(ev: any) {
  // ev.preventDefault();
  console.log(`spchanged`, ev, ev.target.checked);
  const chk = ev.target.checked as boolean;
  chart.data.datasets[5].borderWidth = chk ? 2 : 5;
  chart.data.datasets[5].pointBorderWidth = chk ? 2 : 5;
  chart.data.datasets[5].pointBackgroundColor = chk ? `#ffffff` : `#000000`;
  chart.update();
}
