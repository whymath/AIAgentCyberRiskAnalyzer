# AI Cybersecurity Risk Assessment Tool

A web-based quantitative cybersecurity risk assessment tool for evaluating the security implications of AI systems using benchmark metrics.

![Risk Assessment Tool](https://via.placeholder.com/800x400?text=AI+Cybersecurity+Risk+Assessment+Tool)

## Overview

This application provides a comprehensive risk assessment framework for evaluating cybersecurity risks associated with AI systems. It uses primary metrics derived from established AI benchmarks to calculate risk exposure, expected breach probability, and potential financial impact.

## Features

- **Dual Input Modes**:
  - AI Benchmark Metrics (primary inputs)
  - Risk Parameters (derived metrics)

- **Primary Metrics**:
  - AgentHarm Score: Measures vulnerability to harmful prompting
  - AgentBench Score: Evaluates agent capabilities using a logarithmic scale
  - SWE-Bench Resolved: Assesses code generation and modification abilities

- **Risk Analysis**:
  - Quantitative risk calculation model
  - Visual representation of risk factors
  - Comparative analysis with industry averages

- **Interactive Interface**:
  - Real-time updates of derived parameters
  - Radar chart visualization of relationships between metrics
  - Financial impact assessment

## Getting Started

1. Navigate to the "AI Benchmark Metrics" tab
2. Adjust the sliders to reflect your AI system's benchmark scores
3. Observe how these changes affect the derived risk parameters
4. Click "Calculate Risk" to generate a comprehensive risk assessment
5. Review the results in the risk assessment panel

## Use Cases

- Cybersecurity professionals evaluating AI deployment risks
- AI safety researchers analyzing model vulnerabilities
- Organizations assessing third-party AI systems
- Risk management teams quantifying financial exposure

## Documentation

For detailed information on how to use the tool and understand its outputs, please refer to the [User Manual](documentation/user_manual.md).

## Built With

- React.js - Frontend framework
- Chart.js - Visualization library
- Node.js/Express - Backend server
- Tailwind CSS - Styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*This tool is designed as a risk assessment aid and should be used as part of a comprehensive security strategy. The risk calculations are based on current understanding of AI vulnerabilities and should not be considered absolute predictions.*