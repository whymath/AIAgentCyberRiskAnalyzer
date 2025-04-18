import { RiskParameters, RiskResults } from "@/pages/Home";

export function calculateRisk(parameters: RiskParameters): RiskResults {
  const { numAttacks, spearphishingProb, malwareProb, persistenceProb, financialSeverity } = parameters;
  
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
  
  // Calculate annual risk exposure in millions
  const annualRiskExposure = expectedAnnualBreaches * financialSeverity;
  
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
  let riskLevel: 'Low' | 'Medium' | 'High';
  if (riskScore < 40) {
    riskLevel = 'Low';
  } else if (riskScore < 70) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }
  
  // Calculate worst case scenario (3x the financial severity)
  const worstCase = financialSeverity * 3;
  
  // Industry average (fixed at 5.2 million)
  const industryAverage = 5.2;
  
  return {
    annualRiskExposure,
    riskScore,
    riskLevel,
    expectedAnnualBreaches,
    annualBreachProbability,
    worstCase,
    industryAverage
  };
}
