import { loadCultureFiles } from '../common/culture-loader';
/**
 * Getting started -  Html Node
 */

import {
    Diagram, NodeModel, HtmlModel
} from '@syncfusion/ej2-diagrams';
import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';

(window as any).default = (): void => {
    loadCultureFiles();
    let shape: HtmlModel = { type: 'HTML' };
    let node1: NodeModel = {
        id: 'node', offsetX: 450, offsetY: 200, width: 300, height: 300, shape: shape
    };
    //initialize the diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: '640px', nodes: [node1], snapSettings: { constraints: 0 },
        nodeTemplate: '#nodetemplate', created: created
    });
    diagram.appendTo('#diagram');
    function created(): void {
        diagram.fitToPage();
    }
    //Add Gauge control to Diagram.
    let circularGauge: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        axes: [{
            lineStyle: { width: 10, color: 'transparent' },
            labelStyle: {
                position: 'Inside', useRangeColor: false,
                font: { size: '12px', fontFamily: 'Roboto', fontStyle: 'Regular' }
            }, majorTicks: { height: 10, offset: 5, color: '#9E9E9E' }, minorTicks: { height: 0 },
            annotations: [{
                content: '<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>',
                radius: '30%', angle: 0, zIndex: '1'
            }, {
                content: '<div><span style="font-size:20px; color:#424242; font-family:Regular">65 MPH</span></div>',
                radius: '40%', angle: 180, zIndex: '1'
            }],
            startAngle: 210, endAngle: 150, minimum: 0, maximum: 120, radius: '80%',
            ranges: [{ start: 0, end: 40, color: '#30B32D' }, { start: 40, end: 80, color: '#FFDD00' },
            { start: 80, end: 120, color: '#F03E3E' }],
            pointers: [{
                value: 65, radius: '60%', color: '#757575', pointerWidth: 8,
                cap: { radius: 7, color: '#757575' }, needleTail: { length: '18%', color: '#757575' }
            }]
        }]
    });
    circularGauge.appendTo('#gauge');

};

