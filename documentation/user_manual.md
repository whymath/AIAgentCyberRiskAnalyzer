# Cybersecurity Risk Assessment Tool
## User Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Primary Metrics](#primary-metrics)
   - [AgentHarm Score](#agentharm-score)
   - [AgentBench Score](#agentbench-score)
   - [SWE-Bench Resolved](#swe-bench-resolved)
4. [Derived Risk Parameters](#derived-risk-parameters)
5. [Risk Model](#risk-model)
6. [Understanding Results](#understanding-results)
7. [Advanced Features](#advanced-features)
8. [Glossary](#glossary)

## Introduction

The Cybersecurity Risk Assessment Tool provides quantitative analysis of cybersecurity risks related to AI systems, specifically focusing on potential vulnerabilities and exploit paths in deployed AI agents and language models. The tool calculates risk exposure based on benchmark metrics that evaluate different aspects of AI safety and capability.

This application is designed for:
- Cybersecurity professionals assessing AI implementation risks
- AI safety researchers analyzing model vulnerabilities
- Organizations evaluating the deployment risk of third-party AI systems
- Risk management teams quantifying financial exposure from AI deployments

## Getting Started

The application features an intuitive interface with two main tabs:
1. **AI Benchmark Metrics**: Primary input parameters based on established AI benchmarks
2. **Risk Parameters**: Derived secondary metrics that directly feed into the risk calculation

To perform a risk assessment:
1. Navigate to the "AI Benchmark Metrics" tab
2. Adjust the sliders to reflect your AI system's benchmark scores
3. Observe how these changes affect the derived risk parameters
4. Click "Calculate Risk" to generate a comprehensive risk assessment
5. Review the visual and numerical risk analysis results

## Primary Metrics

The tool uses three primary metrics based on established AI benchmarks that serve as indicators of potential cybersecurity risks.

### AgentHarm Score

**Scale**: 0-100% (linear)

The AgentHarm Score is derived from the AgentHarm benchmark, which evaluates the vulnerability of large language model (LLM) agents to harmful prompting attacks. This benchmark includes 110 explicitly malicious tasks across 11 harm categories such as fraud, cybercrime, and harassment.

**Interpretation**:
- Higher values indicate greater vulnerability to harmful prompts
- A higher score means the AI system is more likely to comply with malicious requests
- This metric directly influences both attack success probability and potential financial impact

**Reference**: AgentHarm benchmark evaluates LLM robustness against misuse through direct prompting attacks, particularly focusing on multi-step harmful tasks when integrated with external tools.

### AgentBench Score

**Scale**: 0.1-10.0 (logarithmic)

The AgentBench Score measures an AI system's agency capabilities based on the AgentBench benchmark, which evaluates LLM performance across diverse interactive environments. The logarithmic scale reflects that small improvements at higher score levels represent significant capability jumps.

**Interpretation**:
- Higher values indicate more advanced agent capabilities
- More capable agents can both protect against attacks and represent larger risk surfaces
- Exponential improvements occur at the upper end of the scale

**Reference**: AgentBench tests various aspects of agent behavior including reasoning, decision-making, and multi-turn interactions across eight distinct environments, revealing disparities between commercial and open-source LLMs in areas of planning and instruction adherence.

### SWE-Bench Resolved

**Scale**: 0-100% (linear)

The SWE-Bench Resolved metric represents the percentage of software engineering tasks an AI system can successfully complete based on the SWE-bench benchmark. This benchmark assesses a model's ability to resolve real-world GitHub issues through appropriate code patches.

**Interpretation**:
- Higher values indicate greater code generation and modification capabilities
- Advanced code capabilities can enable an AI system to create or exploit vulnerabilities
- Directly influences the persistence success probability in attack scenarios

**Reference**: SWE-bench comprises 2,294 tasks from actual GitHub issues and pull requests across 12 popular Python repositories, emphasizing challenges like understanding extensive code contexts and coordinating changes across multiple files.

## Derived Risk Parameters

The primary metrics are used to calculate five derived risk parameters that directly feed into the risk calculation model:

1. **Number of Attacks (per year)**
   - Calculated from: AgentHarm Score × AgentBench Score × SWE-Bench Resolved
   - Represents the estimated frequency of attack attempts against systems with similar characteristics

2. **Spearphishing Success Probability (%)**
   - Calculated from: AgentHarm Score × AgentBench Score
   - Represents the likelihood of successful social engineering attacks using the AI system

3. **Malware Success Probability (%)**
   - Calculated from: AgentHarm Score × SWE-Bench Resolved
   - Represents the likelihood of successfully deploying malicious code through the AI system

4. **Persistence Success Probability (%)**
   - Calculated primarily from: SWE-Bench Resolved
   - Represents the likelihood that a compromised system will remain undetected

5. **Financial Severity (per breach in $M)**
   - Calculated from: AgentHarm Score × AgentBench Score × SWE-Bench Resolved
   - Represents the potential financial impact of a single successful breach in millions of dollars

## Risk Model

The tool employs a comprehensive quantitative risk model that:

1. **Calculates Breach Probability**:
   - Per attack probability = Spearphishing × Malware × Persistence probabilities
   - Annual breach probability = 1 - (1 - per attack probability)^number of attacks

2. **Estimates Expected Breaches**:
   - Expected annual breaches = per attack probability × number of attacks

3. **Quantifies Financial Exposure**:
   - Annual risk exposure = expected annual breaches × financial severity

4. **Derives Risk Score**:
   - Composite score (0-100) based on weighted risk factors
   - Thresholds categorize risk as Low (<40), Medium (40-69), or High (≥70)

5. **Provides Comparative Analysis**:
   - Worst case = financial severity × 3
   - Industry average = fixed at $5.2M based on industry standards

## Understanding Results

The risk assessment results are presented in three sections:

### Summary Dashboard
- Annual Risk Exposure: Expected financial loss in millions of dollars per year
- Risk Level: Categorical risk level (Low, Medium, High)
- Risk Score: Numerical score (0-100) indicating overall risk
- Risk Breakdown: Key factors contributing to the calculated risk

### Risk Visualization
- Radar chart showing the relationship between all input parameters
- Visual representation of the attack surface and vulnerability areas

### Financial Impact
- Bar chart comparing expected loss, worst-case scenario, and industry average
- Provides perspective on relative risk position

## Advanced Features

The tool includes several advanced features:

### Logarithmic Scale for AgentBench Score
The AgentBench Score uses a logarithmic scale to represent the non-linear nature of AI capability improvements. Small changes at the upper end of the scale represent significant capability jumps, which is reflected in the derived risk parameters.

### Relationship Visualization
The relationship between primary metrics and derived parameters is visualized in a radar chart, helping users understand how changes in AI benchmark scores affect various risk factors.

### Tabbed Interface
The tabbed interface allows users to focus either on primary AI benchmarks or derived risk parameters, providing flexibility in how they approach the risk assessment process.

## Glossary

- **Annual Risk Exposure**: Expected financial loss from security breaches over a year
- **Breach Probability**: Likelihood of at least one successful breach occurring
- **Expected Annual Breaches**: Average number of breaches expected in a year
- **Risk Score**: Composite rating of overall risk on a scale of 0-100
- **Risk Level**: Categorical classification of risk (Low, Medium, High)
- **Worst Case**: Maximum reasonable financial loss from a single breach
- **Industry Average**: Typical financial impact based on industry data

---

*This documentation is intended for cybersecurity professionals and risk analysts evaluating AI-related security risks. The risk model provides estimates based on current understanding of AI vulnerabilities and should be used as one component of a comprehensive security strategy.*