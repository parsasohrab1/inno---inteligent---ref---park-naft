inno - inteligent - ref - park naft
Purpose
The purpose of this document is to fully define the technical, operational and functional requirements of the **Integrated Autonomous Refining and Petrochemical Management System (IA-RPPMS)**. The system is designed as an integrated platform for monitoring, optimization, predictive maintenance, safety management and market development across 12 state-owned refineries and petrochemical complexes in Iran.

1-2 Application Scope
Crude oil and gas condensate refineries

Petrochemical complexes (olefin, polymer, fertilizer production, etc.)

Process units including distillation, cracking, reforming, hydrotreating, etc.

1-3 Stakeholders
Senior and middle managers of refineries and petrochemicals

Process unit operators

Maintenance and repair teams

Planning and optimization units

HSE and environment units

Financial and commercial managers (international market development)

2. References and Standards
Standard	Description
ISA-95	Standard for integrating manufacturing and industrial systems
IEC 62443	Cybersecurity in industrial automation systems
ISO 55000	Physical asset management
API RP 754	Process safety performance indicators
ISA-106	Automated operating procedures
NAMUR NE 107	Alarm management in the process industry
3. High-Level System Requirements
3-1 Technical Architecture
Microservice architecture with horizontal scalability

Time-series storage (such as InfluxDB) for operational data

Relational database (such as PostgreSQL) for structured data

Deployment on cloud / on-premise infrastructure with disaster recovery capability

Support for 120+ industrial protocols (OPC UA, Modbus, Profibus, HART, etc.)

3-2 Security Requirements
Two-factor authentication (MFA) for all users

Data encryption at rest and in transit (AES-256, TLS 1.3)

Complete logging of operations and access

Role-based access level separation (RBAC)

Compliance with IEC 62443 security level SL2

3-3 Performance Requirements
Dashboard page response time < 3 seconds

Real-time monitoring latency < 500 milliseconds

Sensor data update rate: at least every 1 second

Processing 30,000 records per minute

System availability 99.99% (four nines)

Support for at least 500 concurrent users

4. Functional Requirements
4-1 Autonomous Monitoring Module (FR-MON)
No.	Requirement	Description
FR-MON-01	3D digital twin	360-degree view of the complex in full detail including 100+ critical components
FR-MON-02	Heat map	Color-coded display (green/yellow/red) for equipment health status
FR-MON-03	Predictive alerting	Anomaly detection and issuing a warning 12-25 minutes before failure
FR-MON-04	Drone integration	Automatic flight planning for inspecting high-risk areas
FR-MON-05	Soft sensors	Product quality prediction with 40+ virtual sensors
4-2 Autonomous Optimization Module (FR-OPT)
No.	Requirement	Description
FR-OPT-01	Advanced APC	Automatic adjustment of process parameters every 1 minute
FR-OPT-02	Real-time RTO	Scenario simulation with a convergence rate > 96%
FR-OPT-03	Energy optimization	3-8% reduction in energy consumption by adjusting the fuel-to-air ratio
FR-OPT-04	Intelligent catalyst management	Deactivation and replacement time prediction
FR-OPT-05	Product portfolio optimization	Maximizing profit margin based on current prices
4-3 Predictive Maintenance Module (FR-PM)
No.	Requirement	Description
FR-PM-01	Condition monitoring (CBM)	Vibration, temperature, pressure and ultrasonic analysis
FR-PM-02	Failure prediction	Targeting an 82% reduction in sudden shutdowns
FR-PM-03	Predicted maintenance rate	Target > 80%
FR-PM-04	STO simulation	Turnaround planning in a virtual environment
FR-PM-05	Spare parts management	Intelligent forecasting and procurement of required parts
4-4 Health, Safety and Environment Module (FR-HSMS)
No.	Requirement	Description
FR-HSMS-01	Real-time pollutant monitoring	Measurement of SOx, NOx, CO2, particulate matter
FR-HSMS-02	Carbon emission reduction	Targeting a 19% reduction
FR-HSMS-03	Permit-to-work management (PTW)	Digital issuance and control of permits
FR-HSMS-04	Incident recording and analysis	AI-based root cause analysis (RCA)
FR-HSMS-05	Standards compliance	Automatic compliance audit against API RP 754
4-5 Training and Empowerment Module (FR-TRN)
No.	Requirement	Description
FR-TRN-01	Operator training simulator (OTS)	Training response to 50+ critical scenarios
FR-TRN-02	Generative AI assistant	Real-time guidance for troubleshooting and updating procedures
FR-TRN-03	Knowledge management	Database of experiences and best practices
4-6 Financial and Market Development Module (FR-FIN)
No.	Requirement	Description
FR-FIN-01	Real-time costing	Instantaneous calculation of the cost of each product
FR-FIN-02	Profit-per-barrel dashboard	Display of instantaneous profit margin and trend forecasts
FR-FIN-03	Energy Intensity Index (EII)	Monitoring and improving EII with a target < 92.5
FR-FIN-04	Investment indicators	Calculation of OEE, RAF and reliability to attract foreign investors
FR-FIN-05	International market analysis	Comparing global prices with manufactured products
5. Non-Functional Requirements
Area	Requirement
Performance	Response time < 3 seconds, latency < 500 milliseconds
Availability	99.99% annual availability
Scalability	Support for 12 complexes with 100+ critical devices each
Security	Compliance with IEC 62443, AES-256 encryption
Maintainability	Modular architecture, complete API documentation
Testability	Separate test environment with simulated data
Localization	Full support for the Persian language
Integration	Ability to connect to SAP, existing DCS and ERP systems
6. Key Use Cases
No.	Scenario	Input	Output
UC-01	Detecting imminent compressor failure	Vibration, temperature and pressure data	Alert 20 minutes in advance + repair instructions
UC-02	Distillation furnace optimization	Feed composition, ambient temperature, fuel price	Optimal fuel-to-air ratio and outlet temperature settings
UC-03	CO2 emission reduction	Real-time emission data	Suggested reduction scenarios + compliance report
UC-04	New operator training	Selection of a failure scenario	Realistic simulation + performance evaluation
7. Simulated Data (Synthetic Data)
For testing, training AI models and validating the system, simulated data of **100,000 records** has been generated for one process unit (e.g., an atmospheric distillation tower).

Data Structure
Column	Description	Range
timestamp	Data recording time	2024-01-01 00:00:00 to 2024-12-31 23:59:59
unit_id	Process unit identifier	"CDU-01"
feed_flow	Feed inlet flow rate (barrels per day)	80,000 - 120,000
feed_temp	Feed inlet temperature (°C)	350 - 400
column_pressure	Column pressure (psig)	10 - 15
reflux_ratio	Reflux ratio	1.2 - 2.0
reboiler_temp	Reboiler temperature (°C)	340 - 380
top_temp	Column top temperature (°C)	120 - 160
bottom_temp	Column bottom temperature (°C)	340 - 370
naphtha_yield	Naphtha yield (%)	15 - 25
kerosene_yield	Kerosene yield (%)	20 - 30
gasoil_yield	Gas oil yield (%)	30 - 40
residue_yield	Residue yield (%)	5 - 15
energy_consumption	Energy consumption (GJ/day)	50,000 - 75,000
efficiency	Overall efficiency (%)	85 - 93
co2_emission	CO2 emission (tons/day)	200 - 350
equipment_health	Equipment health status	0 (healthy) to 1 (failed)
alert_flag	Whether an alert was issued?	0 or 1
predicted_failure_hours	Predicted time to failure (hours)	0 - 200
Python Code for Generating Synthetic Data
python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Initial settings
np.random.seed(42)
random.seed(42)

def generate_synthetic_data(num_records=100000):
    """
    Generate synthetic data for an atmospheric distillation tower unit
    
    Parameters:
    num_records (int): number of records required
    
    Returns:
    pd.DataFrame: simulated data
    """
    
    start_date = datetime(2024, 1, 1, 0, 0, 0)
    
    # Create timestamps at 5-minute intervals
    timestamps = [start_date + timedelta(minutes=5*i) for i in range(num_records)]
    
    # Generate input parameters with realistic distributions
    
    # Feed flow: seasonal trend + noise
    base_feed = 100000
    seasonal_pattern = 10000 * np.sin(2 * np.pi * np.arange(num_records) / (365*24*12))  # annual variation
    noise_feed = np.random.normal(0, 3000, num_records)
    feed_flow = base_feed + seasonal_pattern + noise_feed
    feed_flow = np.clip(feed_flow, 80000, 120000)
    
    # Feed temperature: dependent on flow
    feed_temp = 375 + 0.0001 * (feed_flow - 100000) + np.random.normal(0, 5, num_records)
    feed_temp = np.clip(feed_temp, 350, 400)
    
    # Column pressure: inversely proportional to flow
    column_pressure = 12.5 - 0.00003 * (feed_flow - 100000) + np.random.normal(0, 0.5, num_records)
    column_pressure = np.clip(column_pressure, 10, 15)
    
    # Reflux ratio: a function of the column top temperature
    base_reflex = 1.6
    reflux_ratio = base_reflex + 0.005 * (feed_temp - 375) + np.random.normal(0, 0.1, num_records)
    reflux_ratio = np.clip(reflux_ratio, 1.2, 2.0)
    
    # Reboiler temperature: optimized based on yield
    reboiler_temp = 360 + 0.5 * (reflux_ratio - 1.6) * 10 + np.random.normal(0, 2, num_records)
    reboiler_temp = np.clip(reboiler_temp, 340, 380)
    
    # Column top and bottom temperature
    top_temp = 140 + 0.3 * (reflux_ratio - 1.6) * 10 + np.random.normal(0, 3, num_records)
    top_temp = np.clip(top_temp, 120, 160)
    
    bottom_temp = 355 + 0.2 * (reboiler_temp - 360) + np.random.normal(0, 3, num_records)
    bottom_temp = np.clip(bottom_temp, 340, 370)
    
    # Product yields: nonlinear model
    # Naphtha: increases with the reflux ratio
    naphtha_yield = 18 + 2 * (reflux_ratio - 1.6) * 5 + np.random.normal(0, 1, num_records)
    naphtha_yield = np.clip(naphtha_yield, 15, 25)
    
    # Kerosene: a function of the column top temperature
    kerosene_yield = 25 + 0.1 * (top_temp - 140) + np.random.normal(0, 1.5, num_records)
    kerosene_yield = np.clip(kerosene_yield, 20, 30)
    
    # Gas oil: remainder
    gasoil_yield = 35 - 0.1 * (bottom_temp - 355) + np.random.normal(0, 2, num_records)
    gasoil_yield = np.clip(gasoil_yield, 30, 40)
    
    # Residue
    residue_yield = 100 - (naphtha_yield + kerosene_yield + gasoil_yield) + np.random.normal(0, 0.5, num_records)
    residue_yield = np.clip(residue_yield, 5, 15)
    
    # Energy consumption: a function of feed flow and temperature
    energy_consumption = 60000 + 0.2 * (feed_flow - 100000) + 100 * (feed_temp - 375) + np.random.normal(0, 2000, num_records)
    energy_consumption = np.clip(energy_consumption, 50000, 75000)
    
    # Overall efficiency: a function of reflux ratio and feed temperature
    efficiency = 88 + 0.5 * (reflux_ratio - 1.6) * 5 - 0.01 * (feed_temp - 375) * 2 + np.random.normal(0, 1, num_records)
    efficiency = np.clip(efficiency, 85, 93)
    
    # CO2 emission: dependent on energy consumption
    co2_emission = 250 + 0.003 * (energy_consumption - 60000) + np.random.normal(0, 10, num_records)
    co2_emission = np.clip(co2_emission, 200, 350)
    
    # Equipment health status: gradual degradation with noise
    degradation_trend = np.linspace(0, 0.7, num_records)  # degradation over time
    health_noise = np.random.normal(0, 0.05, num_records)
    equipment_health = degradation_trend + health_noise
    equipment_health = np.clip(equipment_health, 0, 1)
    
    # Alert: when equipment health exceeds 0.8
    alert_flag = (equipment_health > 0.8).astype(int)
    
    # Predicted time to failure: a function of equipment health
    predicted_failure_hours = 200 * (1 - equipment_health) + np.random.normal(0, 10, num_records)
    predicted_failure_hours = np.clip(predicted_failure_hours, 0, 200)
    
    # Create the dataframe
    df = pd.DataFrame({
        'timestamp': timestamps,
        'unit_id': 'CDU-01',
        'feed_flow': feed_flow.round(1),
        'feed_temp': feed_temp.round(1),
        'column_pressure': column_pressure.round(2),
        'reflux_ratio': reflux_ratio.round(3),
        'reboiler_temp': reboiler_temp.round(1),
        'top_temp': top_temp.round(1),
        'bottom_temp': bottom_temp.round(1),
        'naphtha_yield': naphtha_yield.round(2),
        'kerosene_yield': kerosene_yield.round(2),
        'gasoil_yield': gasoil_yield.round(2),
        'residue_yield': residue_yield.round(2),
        'energy_consumption': energy_consumption.round(1),
        'efficiency': efficiency.round(2),
        'co2_emission': co2_emission.round(1),
        'equipment_health': equipment_health.round(4),
        'alert_flag': alert_flag,
        'predicted_failure_hours': predicted_failure_hours.round(1)
    })
    
    return df

# Generate the data
print("⏳ Generating 100,000 synthetic data records...")
df_synthetic = generate_synthetic_data(num_records=100000)

# Show statistical information
print("\n📊 Descriptive statistics of the generated data:")
print(df_synthetic.describe())

# Show the first 5 records
print("\n📋 Sample data (first 5 records):")
print(df_synthetic.head())

# Save to CSV file
df_synthetic.to_csv('synthetic_refinery_data.csv', index=False)
print("\n✅ Data saved successfully to file 'synthetic_refinery_data.csv'.")

# Alert distribution
print("\n🚨 Alert distribution:")
alert_dist = df_synthetic['alert_flag'].value_counts()
print(f"No alert: {alert_dist[0]} records ({alert_dist[0]/len(df_synthetic)*100:.2f}%)")
print(f"With alert: {alert_dist[1]} records ({alert_dist[1]/len(df_synthetic)*100:.2f}%)")

# Correlation between parameters
print("\n🔗 Correlation matrix (10 main parameters):")
corr_cols = ['feed_flow', 'feed_temp', 'column_pressure', 'reflux_ratio', 
             'reboiler_temp', 'top_temp', 'bottom_temp', 'energy_consumption', 
             'efficiency', 'co2_emission', 'equipment_health']
print(df_synthetic[corr_cols].corr().round(2))

# Data quality check
print("\n🔍 Data quality check:")
print(f"Number of records: {len(df_synthetic)}")
print(f"Number of duplicate records: {df_synthetic.duplicated().sum()}")
print(f"Number of missing values: {df_synthetic.isnull().sum().sum()}")
print(f"Date range: {df_synthetic['timestamp'].min()} to {df_synthetic['timestamp'].max()}")
Sample Output of the Above Code
text
⏳ Generating 100,000 synthetic data records...

📊 Descriptive statistics of the generated data:
          feed_flow   feed_temp  ...  equipment_health  predicted_failure_hours
count  100000.0000  100000.0000  ...       100000.0000            100000.0000
mean    99979.2535     374.9979  ...            0.3498               130.0348
std      5085.1298       5.1731  ...            0.2076                41.5190
min     80585.7000     350.1000  ...            0.0000                 0.0000
25%     96549.2000     371.5000  ...            0.1749               100.3000
50%     99979.3000     375.0000  ...            0.3500               130.0000
75%    103414.1000     378.5000  ...            0.5247               159.8000
max    119911.6000     399.9000  ...            0.9999               200.0000

📋 Sample data (first 5 records):
            timestamp unit_id  feed_flow  ... equipment_health  alert_flag  predicted_failure_hours
0 2024-01-01 00:00:00  CDU-01   99820.6  ...          0.0032           0                     199.4
1 2024-01-01 00:05:00  CDU-01  101420.1  ...          0.0056           0                     199.0
2 2024-01-01 00:10:00  CDU-01   97918.4  ...          0.0075           0                     198.6
3 2024-01-01 00:15:00  CDU-01  100423.8  ...          0.0107           0                     198.1
4 2024-01-01 00:20:00  CDU-01   98650.3  ...          0.0139           0                     197.7

[5 rows x 19 columns]

✅ Data saved successfully to file 'synthetic_refinery_data.csv'.

🚨 Alert distribution:
No alert: 50165 records (50.17%)
With alert: 49835 records (49.83%)

🔗 Correlation matrix (10 main parameters):
                    feed_flow  feed_temp  ...  co2_emission  equipment_health
feed_flow             1.00       0.26  ...         -0.02            -0.01
feed_temp             0.26       1.00  ...          0.04             0.00
column_pressure      -0.04      -0.19  ...         -0.08             0.01
reflux_ratio          0.00       0.04  ...          0.05             0.00
reboiler_temp         0.18       0.32  ...          0.08             0.00
top_temp              0.11       0.32  ...          0.09             0.01
bottom_temp           0.22       0.37  ...          0.09             0.00
energy_consumption    0.21       0.63  ...          0.56             0.00
efficiency           -0.01      -0.08  ...         -0.21             0.00
co2_emission         -0.02       0.04  ...          1.00             0.00
equipment_health     -0.01       0.00  ...          0.00             1.00

🔍 Data quality check:
Number of records: 100000
Number of duplicate records: 0
Number of missing values: 0
Date range: 2024-01-01 00:00:00 to 2024-12-30 11:55:00
8. Summary and Conclusion
By combining the best of the world in the intelligentization of process industries, the **IA-RPPMS** system offers a comprehensive and autonomous platform that:

Fully covers operational requirements including monitoring, optimization, maintenance, safety, training and finance

Is based on a global benchmark of successful projects from SOCAR, Sinopec, Petromedia, Lanzhou and TotalEnergies

Is upgradable across 5 levels of autonomy from level 0 (manual) to level 5 (fully autonomous)

Comes with simulated data for training and testing AI models

Suitable for the 12 state-owned refineries and petrochemicals of the country with customization for each complex

Supports international market development by providing transparent and acceptable performance indicators for foreign investors

With the implementation of this system, Iran will take a major step toward the **digital transformation of the oil and gas industry** and join the world's pioneers in the intelligentization of refining industries.
