import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RiskInputForm from "@/components/RiskInputForm";
import PrimaryMetricsForm from "@/components/PrimaryMetricsForm";
import RiskResultsDisplay from "@/components/RiskResultsDisplay";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Secondary derived metrics
export type RiskParameters = {
  numAttacks: number;
  spearphishingProb: number;
  malwareProb: number;
  persistenceProb: number;
  financialSeverity: number;
};

// Primary metrics
export type PrimaryMetrics = {
  agentHarmScore: number;
  overallAgentBench: number;
  sweBenchResolved: number;
};

export type RiskResults = {
  annualRiskExposure: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedAnnualBreaches: number;
  annualBreachProbability: number;
  worstCase: number;
  industryAverage: number;
};

const defaultPrimaryMetrics: PrimaryMetrics = {
  agentHarmScore: 45, // 0-100 scale (percentage)
  overallAgentBench: 6.0, // 0.1-10 scale (real number with log scale slider)
  sweBenchResolved: 35 // 0-100 scale (percentage)
};

// These will be calculated from primary metrics
const defaultRiskParameters: RiskParameters = {
  numAttacks: 100,
  spearphishingProb: 15,
  malwareProb: 25, 
  persistenceProb: 20,
  financialSeverity: 5
};

// Constants for the conversion formulas
export const CONSTANTS = {
  ATTACK_MULTIPLIER: 0.7,
  SPEARPHISHING_MULTIPLIER: 3.5,
  MALWARE_MULTIPLIER: 0.5,
  PERSISTENCE_MULTIPLIER: 0.57,
  FINANCIAL_MULTIPLIER: 0.025
};

// Convert primary metrics to risk parameters
export function calculateDerivedMetrics(primary: PrimaryMetrics): RiskParameters {
  return {
    numAttacks: Math.round(primary.agentHarmScore * primary.overallAgentBench * primary.sweBenchResolved * CONSTANTS.ATTACK_MULTIPLIER / 100),
    spearphishingProb: Math.min(Math.round(primary.agentHarmScore * primary.overallAgentBench * CONSTANTS.SPEARPHISHING_MULTIPLIER), 100),
    malwareProb: Math.min(Math.round(primary.agentHarmScore * primary.sweBenchResolved * CONSTANTS.MALWARE_MULTIPLIER / 100), 100),
    persistenceProb: Math.min(Math.round(primary.sweBenchResolved * CONSTANTS.PERSISTENCE_MULTIPLIER), 100),
    financialSeverity: Math.max(Math.round(primary.agentHarmScore * primary.overallAgentBench * primary.sweBenchResolved * CONSTANTS.FINANCIAL_MULTIPLIER / 100), 1)
  };
}

const Home = () => {
  const [primaryMetrics, setPrimaryMetrics] = useState<PrimaryMetrics>(defaultPrimaryMetrics);
  const [riskParameters, setRiskParameters] = useState<RiskParameters>(calculateDerivedMetrics(defaultPrimaryMetrics));
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [riskResults, setRiskResults] = useState<RiskResults | null>(null);
  const [activeTab, setActiveTab] = useState<string>("primary");

  // Update derived metrics when primary metrics change
  const handlePrimaryMetricsChange = (newPrimaryMetrics: PrimaryMetrics) => {
    setPrimaryMetrics(newPrimaryMetrics);
    const newRiskParameters = calculateDerivedMetrics(newPrimaryMetrics);
    setRiskParameters(newRiskParameters);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="primary">AI Benchmark Metrics</TabsTrigger>
            <TabsTrigger value="derived">Risk Parameters</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <TabsContent value="primary" className="space-y-4">
                <PrimaryMetricsForm 
                  primaryMetrics={primaryMetrics} 
                  setPrimaryMetrics={handlePrimaryMetricsChange}
                  setRiskResults={setRiskResults}
                  setCalculationComplete={setCalculationComplete}
                  defaultPrimaryMetrics={defaultPrimaryMetrics}
                />
              </TabsContent>
              <TabsContent value="derived" className="space-y-4">
                <RiskInputForm 
                  riskParameters={riskParameters} 
                  setRiskParameters={setRiskParameters}
                  setRiskResults={setRiskResults}
                  setCalculationComplete={setCalculationComplete}
                  defaultParameters={defaultRiskParameters}
                  readOnly={activeTab === "primary"}
                />
              </TabsContent>
            </div>

            <RiskResultsDisplay 
              riskResults={riskResults} 
              riskParameters={riskParameters}
              calculationComplete={calculationComplete}
            />
          </div>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
