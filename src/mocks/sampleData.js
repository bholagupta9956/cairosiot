import { events as pointMachineEvents } from './pointMachineEvents.js';
import { events as dcMachineEvents } from './dcMachineEvents.js';
import { events as signalEvents } from './signalEvents.js';

export const devices = [
    {
      "meta": {
        "id": "01FVYWAS3WGPJY0YTJWBD4DZPS",
        "name": "Point Machine - 001",
        "model": "JAR-PM-V2",
        "lat": "12.123",
        "lng": "77.123",
        "installation_date": "12 Feb 2021",
        "device_type": "point_machine",
      },
      "latest_data": [
        pointMachineEvents[0],
        pointMachineEvents[1]
      ],
      "events": pointMachineEvents,
    },
    {
      "meta": {
        "id": "APL123FAWDWA1",
        "isAlert": true,
        "name": "Point Machine - 002",
        "model": "JAR-PM-V2",
        "lat": "12.214",
        "lng": "77.214",
        "device_type": "point_machine",
        "installation_date": "12 Mar 2021",
      },
      "latest_data": [
        pointMachineEvents[0],
        pointMachineEvents[1]
      ],
      "events": pointMachineEvents,
    },
    {
      "meta": {
        "id": "DPL123FA5WDWA",
        "name": "DC Track - 001",
        "model": "JAR-DC-V1",
        "lat": "12.223",
        "lng": "77.323",
        "device_type": "dc_track",
        "installation_date": "12 Feb 2021"
      },
      "latest_data": [
        dcMachineEvents[0],
        dcMachineEvents[1]
      ],
      "events": dcMachineEvents,
    },
    {
        "meta": {
          "id": "DPL123FA5WDWA1",
          "name": "DC Track - 002",
          "model": "JAR-DC-V1",
          "isAlert": true,
          "lat": "12.114",
          "lng": "77.114",
          "device_type": "dc_track",
          "installation_date": "12 Feb 2021"
        },
        "latest_data": [
          dcMachineEvents[0],
          dcMachineEvents[1]
        ],
        "events": dcMachineEvents,
    },
    {
      "meta": {
        "id": "APL123FA5W4DWA",
        "name": "Signal - 001",
        "lat": "12.124",
        "lng": "77.124",
        "device_type": "signal",
        "model": "SIGNAL-MC-V2",
        "installation_date": "15 Feb 2021"
      },
      "latest_data": [
        signalEvents[0],
        signalEvents[1],
        signalEvents[2]
      ],
      "events": signalEvents
    }
  ];