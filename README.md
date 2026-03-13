# HydroFlora: Autonomous Urban Hydroponic Farming System

## Project Overview

# HydroFlora is an innovative IoT-enabled urban agriculture system designed to optimize hydroponic crop production in limited urban spaces.
The system integrates IoT sensors, cloud computing, and artificial intelligence to monitor environmental conditions, detect anomalies, and maintain optimal plant growth with minimal human intervention.

# HydroFlora addresses key global challenges such as:

Urban food security

Water efficiency in agriculture

Autonomous farming systems

Sustainable food production in cities

The system operates as a closed-loop hydroponic ecosystem capable of monitoring water quality, environmental conditions, and system health in real time.

## Key Features

Autonomous Environmental Monitoring

## Continuous monitoring of hydroponic parameters such as:

pH

TDS (Total Dissolved Solids)

Water level

Temperature

Humidity

Water temperature

NPK

Dissolved Oxygen Sensor

CO2 level

EC

Closed-Loop Water Recycling

A sustainable water management system that reduces waste by recycling and regulating the hydroponic nutrient solution.

Intelligent Monitoring Dashboard

A web-based dashboard providing real-time visualization of system parameters and alerts.

Cloud-Based Data Processing

Sensor data is transmitted to Huawei Cloud using MQTT for storage, monitoring, and processing.

AI-Based Anomaly Detection

Machine learning models implemented with Huawei MindSpore detect abnormal sensor readings and system malfunctions.

Rule-Based Plant Health Monitoring

Agronomic rules evaluate hydroponic conditions and provide recommendations when corrective actions are required.

## System Architecture

# HydroFlora follows a three-layer IoT architecture.

Perception Layer (Edge Layer)

## Edge devices based on ESP32 microcontrollers collect environmental data using sensors such as:

pH sensor

TDS sensor

Temperature sensor

Humidity sensor

Water level sensors

Dissolved Oxygen Sensor

NPK sensor

EC sensor

CO2 sensor

These devices perform initial sensing and transmit data to the cloud.

Network Layer

Sensor data is transmitted using the MQTT protocol, enabling lightweight and efficient communication between IoT devices and the cloud infrastructure.

c) Application Layer

## The application layer includes:

A web-based monitoring dashboard

An AI anomaly detection engine

A plant health evaluation system

Users can monitor hydroponic system conditions and receive alerts in real time.

## AI Integration

# HydroFlora integrates artificial intelligence to enhance monitoring and decision-making.

The AI component is implemented using Huawei MindSpore and trained using Huawei ModelArts.

## AI Tasks

## The AI system performs:

Sensor anomaly detection

Detection of abnormal environmental patterns

Early warning of system failures

## Example anomalies detected by the AI model include:

unrealistic sensor values

abnormal pH fluctuations

incorrect humidity readings

sensor malfunction patterns

## Rule-Based Plant Health Evaluation

In addition to the AI anomaly detection system, HydroFlora includes a rule-based decision engine that evaluates plant health conditions based on known agronomic thresholds.

This hybrid approach combines AI-based monitoring with domain-specific rules, improving reliability and interpretability.

## AI System Workflow

Hydroponic Sensors
(pH, TDS, temperature, humidity)
        ↓
ESP32 IoT Edge Device
        ↓
MQTT Data Transmission
        ↓
Huawei Cloud Platform
        ↓
AI Model Training (MindSpore + ModelArts)
        ↓
AI Anomaly Detection
        ↓
Rule-Based Plant Health Evaluation
        ↓
HydroFlora Dashboard
        ↓
Alerts and System Recommendations

## Technologies Used

## Hardware

ESP32 Microcontrollers

Hydroponic sensors (pH,  temperature, humidity, water level)

## IoT Technologies

MQTT protocol

IoT sensor nodes

## Cloud Platform

Huawei Cloud

Huawei ModelArts

## Software & AI

Python

MindSpore

Pandas

NumPy

Jupyter Notebook

## Frontend

HTML

CSS

JavaScript

## Project Structure

# HydroFlora/
│
├── dashboard/
│   ├── index.html
│   ├── dashboard.html
│
├── ai_models/
│   ├── mindspore_hydroponic_training_model.ipynb

│   ├── training_notebook.ipynb
│
├── dataset/
│   ├── IoTData--Raw--.csv
│
├── api/
│   ├── server.py
│
└── README.md

## Installation and Setup

## Prequisites

Arduino IDE (for ESP32 firmware)

Python 3.8+

Huawei Cloud account with ModelArts enabled

## Setup Steps

Clone the project repository.

Upload the firmware to ESP32 sensor nodes.

Install required Python libraries

Configure Huawei Cloud credentials.

## Running the Application

Step 1: Start the ESP32 sensor nodes.

Step 2: Ensure devices are connected to Wi-Fi and transmitting data.

## Step 3: Launch the HydroFlora dashboard:

open index.html

Step 4: Run the AI anomaly detection server.

11. Hydroponic IoT Sensor Dataset

## Dataset Overview

The Hydroponic IoT Sensor Dataset contains time-series telemetry data collected from a small-scale hydroponic monitoring system.

The dataset includes environmental measurements and actuator states responsible for maintaining optimal hydroponic conditions.

## Dataset Details

File:  IoTData--Raw--.csv

Total records: 50,570

Number of features: 13

Data type: Raw time-series telemetry

Reference: https://www.kaggle.com/datasets/itsmonir31/hydroponics-datasets

## Dataset Structure

## Dataset Collection Context

The data were collected using an Arduino/ESP-based IoT monitoring system connected to multiple environmental sensors.

## The system records:

water chemistry parameters

environmental conditions

actuator activation events

Collection period: 26 November 2023 – 26 December 2023

Sampling frequency:  Irregular (event-driven logging)

## Basic Statistics

## Example statistics from the dataset:

pH
Mean ≈ 6.00
Range: 0.27 – 11.57

TDS
Mean ≈ 1154 ppm
Range: -283 – 2278 ppm

Temperature
Mean ≈ 24.32 °C

Humidity
Mean ≈ 71.71 %

## Actuator Activation Frequency

These values show that actuator activations are relatively sparse compared to the number of sensor readings.

## Future Improvements

## Possible future enhancements include:

reinforcement learning for automated nutrient optimization

integration with mobile applications

large-scale deployment across multiple rooftops

additional environmental sensing capabilities

## Contributors

Project developed by: Team EchoGuardians
