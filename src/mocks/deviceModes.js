export const deviceModes = {
  'point_machine': [
    {
        "modeId": "001",
        "parameters": [
            {
                "key": "100",
                "name": "Timestamp"
            },
            {
                "key": "101",
                "name": "Position"
            },
            {
                "key": "102",
                "name": "Average Peak Current",
                "unit": "mA"
            },
            {
                "key": "103",
                "name": "Average Peak Voltage",
                "unit": "V"
            },
            {
                "key": "104",
                "name": "Execution Time",
                "unit": "MS"
            },
            {
                "key": "105",
                "name": "Current",
                "unit": "MS",
                "type": "line_graph"
            }
        ]
    },
    {
        "modeId": "002",
        "parameters": [
            {
                "key": "100",
                "name": "Timestamp"
            },
            {
                "key": "101",
                "name": "Position"
            },
            {
                "key": "102",
                "name": "Average Peak Current",
                "unit": "mA"
            },
            {
                "key": "103",
                "name": "Average Peak Voltage",
                "unit": "V"
            },
            {
                "key": "104",
                "name": "Execution Time",
                "unit": "MS"
            },
            {
                "key": "105",
                "name": "Current",
                "unit": "MS",
                "type": "line_graph"
            }
        ]
    }
  ],
  'dc_track': [
    {
        "modeId": "001",
        "parameters": [
            {
                "key": "100",
                "name": "Timestamp"
            },
            {
                "key": "101",
                "name": "Position"
            },
            {
                "key": "102",
                "name": "Avg Current",
                "unit": "mA"
            },
            {
                "key": "103",
                "name": "Avg Voltage",
                "unit": "V"
            },
            {
                "key": "104",
                "name": "Avg Track Feed Charger Current",
                "unit": "mA"
            },
            {
                "key": "105",
                "name": "Avg Track Feed Charger Voltage",
                "unit": "V"
            }
        ]
    },
    {
        "modeId": "002",
        "parameters": [
            {
                "key": "100",
                "name": "Timestamp"
            },
            {
                "key": "101",
                "name": "Position"
            },
            {
                "key": "102",
                "name": "Avg Voltage Drop",
                "unit": "V"
            },
            {
                "key": "103",
                "name": "Avg Voltage",
                "unit": "mA"
            },
            {
                "key": "104",
                "name": "Avg Current",
                "unit": "mA"
            },
            {
                "key": "105",
                "name": "Relay Status"
            }
        ]
    }
  ]
};