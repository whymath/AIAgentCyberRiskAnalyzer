# Technical Reference Guide
## AI Cybersecurity Risk Assessment Tool

This document provides technical details about the risk calculation model, formulas, and implementation specifics of the AI Cybersecurity Risk Assessment Tool.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Primary to Secondary Metric Conversion](#primary-to-secondary-metric-conversion)
3. [Risk Calculation Model](#risk-calculation-model)
4. [Logarithmic Scale Implementation](#logarithmic-scale-implementation)
5. [Visualization Components](#visualization-components)

## Architecture Overview

The application follows a component-based architecture with:

- **Home Component**: Manages state for primary metrics and derived parameters
- **PrimaryMetricsForm Component**: Handles input for AI benchmark scores
- **RiskInputForm Component**: Displays and optionally allows editing of derived risk parameters
- **RiskResultsDisplay Component**: Shows risk assessment results and visualizations
- **RiskVisualization Component**: Renders the radar chart for parameter visualization
- **FinancialImpactChart Component**: Displays comparative financial impact
- **MetricsRelationship Component**: Shows relationships between primary and derived metrics
- **LogScaleSlider Component**: Implements logarithmic transformation for AgentBench metric

## Primary to Secondary Metric Conversion

### Conversion Formulas

The following formulas are used to convert primary benchmark metrics to derived risk parameters:

```javascript
// Constants for the conversion formulas
const CONSTANTS = {
  ATTACK_MULTIPLIER: 0.7,
  SPEARPHISHING_MULTIPLIER: 3.5,
  MALWARE_MULTIPLIER: 0.5,
  PERSISTENCE_MULTIPLIER: 0.57,
  FINANCIAL_MULTIPLIER: 0.025
};

// Convert primary metrics to risk parameters
function calculateDerivedMetrics(primary) {
  return {
    numAttacks: Math.round(primary.agentHarmScore * primary.overallAgentBench * 
      primary.sweBenchResolved * CONSTANTS.ATTACK_MULTIPLIER / 100),
    
    spearphishingProb: Math.min(Math.round(primary.agentHarmScore * 
      primary.overallAgentBench * CONSTANTS.SPEARPHISHING_MULTIPLIER), 100),
    
    malwareProb: Math.min(Math.round(primary.agentHarmScore * 
      primary.sweBenchResolved * CONSTANTS.MALWARE_MULTIPLIER / 100), 100),
    
    persistenceProb: Math.min(Math.round(primary.sweBenchResolved * 
      CONSTANTS.PERSISTENCE_MULTIPLIER), 100),
    
    financialSeverity: Math.max(Math.round(primary.agentHarmScore * 
      primary.overallAgentBench * primary.sweBenchResolved * 
      CONSTANTS.FINANCIAL_MULTIPLIER / 100), 1)
  };
}
```

### Rationale for Multipliers

The multipliers were chosen to create realistic ranges of derived parameters based on typical industry observations:

- **ATTACK_MULTIPLIER (0.7)**: Scaled to produce realistic attack frequencies ranging from single digits to several hundred per year
- **SPEARPHISHING_MULTIPLIER (3.5)**: Weighted to emphasize the importance of agent capabilities in social engineering attacks
- **MALWARE_MULTIPLIER (0.5)**: Balances the influence of harmful potential and code generation capabilities
- **PERSISTENCE_MULTIPLIER (0.57)**: Emphasizes the strong influence of code capabilities on persistence success
- **FINANCIAL_MULTIPLIER (0.025)**: Calibrated to produce financial severity values in the range of $1M to $50M

## Risk Calculation Model

### Breach Probability Calculation

```javascript
// Convert percentage values to decimal
const spearphishingProbDecimal = spearphishingProb / 100;
const malwareProbDecimal = malwareProb / 100;
const persistenceProbDecimal = persistenceProb / 100;

// Calculate breach probability per attack
const breachProbPerAttack = spearphishingProbDecimal * malwareProbDecimal * persistenceProbDecimal;

// Calculate annual breach probability (probability of at least one successful breach)
const annualBreachProbability = 1 - Math.pow((1 - breachProbPerAttack), numAttacks);

// Calculate expected annual breaches
const expectedAnnualBreaches = breachProbPerAttack * numAttacks;
```

### Annual Risk Exposure

```javascript
// Calculate annual risk exposure in millions
const annualRiskExposure = expectedAnnualBreaches * financialSeverity;
```

### Risk Score Calculation

```javascript
// Calculate risk score (0-100)
const riskScore = Math.min(
  Math.round(
    (numAttacks / 500) * 20 +
    spearphishingProbDecimal * 20 +
    malwareProbDecimal * 20 +
    persistenceProbDecimal * 20 +
    (financialSeverity / 50) * 20
  ), 
  100
);

// Determine risk level
let riskLevel;
if (riskScore < 40) {
  riskLevel = 'Low';
} else if (riskScore < 70) {
  riskLevel = 'Medium';
} else {
  riskLevel = 'High';
}
```

## Logarithmic Scale Implementation

The AgentBench Score uses a logarithmic scale to represent the non-linear nature of AI capability improvements. This is implemented via the `LogScaleSlider` component:

```javascript
// Convert the linear value to a logarithmic scale for internal representation
const internalValue = Math.log10(Math.max(value, min)) / Math.log10(max) * 100;

// Convert the logarithmic scale back to linear when the slider changes
const handleValueChange = (newValues) => {
  const logPosition = newValues[0];
  // Convert from log scale (0-100) back to original scale
  const linearValue = Math.pow(10, logPosition / 100 * Math.log10(max));
  // Round to the precision determined by the step
  const precision = step < 1 ? String(step).split('.')[1].length : 0;
  const roundedValue = Number(linearValue.toFixed(precision));
  
  // Ensure value is within bounds and a multiple of step
  const clampedValue = Math.max(
    min, 
    Math.min(max, Math.round(roundedValue / step) * step)
  );
  
  onChange(clampedValue);
};
```

This transformation provides more fine-grained control at lower values and reflects the exponential improvements that small numerical changes represent at the high end of AI capability scales.

## Visualization Components

### Radar Chart (Risk Visualization)

The radar chart visualizes the five risk parameters on a normalized scale to show the overall risk profile:

```javascript
// Normalize values for radar chart (0-100 scale)
const attacksNormalized = riskParameters.numAttacks / 5; // Scale to 0-100
const spearphishingNormalized = riskParameters.spearphishingProb;
const malwareNormalized = riskParameters.malwareProb;
const persistenceNormalized = riskParameters.persistenceProb;
const severityNormalized = riskParameters.financialSeverity * 2; // Scale to 0-100
```

### Financial Impact Bar Chart

The financial impact chart displays three key metrics for financial assessment:

```javascript
data: {
  labels: ['Expected Loss', 'Worst Case', 'Industry Average'],
  datasets: [{
    label: 'Financial Impact ($M)',
    data: [
      parseFloat(expectedLoss.toFixed(2)),
      parseFloat(worstCase.toFixed(2)),
      parseFloat(industryAverage.toFixed(2))
    ],
    // ... styling options
  }]
}
```

### Metrics Relationship Chart

This radar chart visualizes the relationships between primary metrics and derived parameters:

```javascript
data: {
  labels: [
    'AgentHarm Score',
    'AgentBench Score',
    'SWE-Bench % Resolved',
    'Number of Attacks',
    'Spearphishing Success',
    'Malware Success',
    'Persistence Success',
    'Financial Severity'
  ],
  datasets: [
    {
      label: 'Primary Metrics',
      data: [
        primaryMetrics.agentHarmScore,
        primaryMetrics.overallAgentBench * 10, // Scale 0-10 to 0-100
        primaryMetrics.sweBenchResolved,
        0, 0, 0, 0, 0 // Placeholders for derived metrics
      ],
      // ... styling options
    },
    {
      label: 'Derived Risk Parameters',
      data: [
        0, 0, 0, // Placeholders for primary metrics
        derivedMetrics.numAttacks / 5, // Scale to 0-100
        derivedMetrics.spearphishingProb,
        derivedMetrics.malwareProb,
        derivedMetrics.persistenceProb,
        derivedMetrics.financialSeverity * 2 // Scale to 0-100
      ],
      // ... styling options
    }
  ]
}
```

---

This technical reference is intended for developers and security specialists who wish to understand the underlying calculations and implementation details of the risk assessment tool. The formulas and parameters may be adjusted as more empirical data on AI security risks becomes available.