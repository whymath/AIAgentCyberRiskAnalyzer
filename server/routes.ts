import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRiskAssessmentSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API routes with /api prefix
  
  // Calculate Risk - This route handles the risk assessment calculation
  app.post("/api/risk/calculate", async (req, res) => {
    try {
      const currentDate = new Date().toISOString();
      
      // Define the expected schema for the request
      const requestSchema = z.object({
        numAttacks: z.number().int().min(1).max(500),
        spearphishingProb: z.number().int().min(0).max(100),
        malwareProb: z.number().int().min(0).max(100),
        persistenceProb: z.number().int().min(0).max(100),
        financialSeverity: z.number().int().min(1).max(50),
        userId: z.number().optional(),
      });
      
      // Validate the request
      const validatedData = requestSchema.parse(req.body);
      
      // Calculate breach probability
      const spearphishingProbDecimal = validatedData.spearphishingProb / 100;
      const malwareProbDecimal = validatedData.malwareProb / 100;
      const persistenceProbDecimal = validatedData.persistenceProb / 100;
      
      const breachProbPerAttack = spearphishingProbDecimal * malwareProbDecimal * persistenceProbDecimal;
      const annualBreachProbability = 1 - Math.pow((1 - breachProbPerAttack), validatedData.numAttacks);
      const expectedAnnualBreaches = breachProbPerAttack * validatedData.numAttacks;
      
      // Calculate annual risk exposure
      const annualRiskExposure = Math.round(expectedAnnualBreaches * validatedData.financialSeverity * 1000000);
      
      // Calculate risk score (0-100)
      const riskScore = Math.min(
        Math.round(
          (validatedData.numAttacks / 500) * 20 +
          spearphishingProbDecimal * 20 +
          malwareProbDecimal * 20 +
          persistenceProbDecimal * 20 +
          (validatedData.financialSeverity / 50) * 20
        ),
        100
      );
      
      // Determine risk level
      let riskLevel;
      if (riskScore < 40) {
        riskLevel = "Low";
      } else if (riskScore < 70) {
        riskLevel = "Medium";
      } else {
        riskLevel = "High";
      }
      
      // If userId is provided, save the assessment
      let savedAssessment = null;
      if (validatedData.userId) {
        const assessmentData = {
          userId: validatedData.userId,
          numAttacks: validatedData.numAttacks,
          spearphishingProb: validatedData.spearphishingProb,
          malwareProb: validatedData.malwareProb,
          persistenceProb: validatedData.persistenceProb,
          financialSeverity: validatedData.financialSeverity,
          annualRiskExposure,
          riskScore,
          riskLevel,
          createdAt: currentDate,
        };
        
        savedAssessment = await storage.createRiskAssessment(assessmentData);
      }
      
      // Return the calculated results
      res.status(200).json({
        annualRiskExposure: annualRiskExposure / 1000000, // Convert to millions
        riskScore,
        riskLevel,
        expectedAnnualBreaches,
        annualBreachProbability,
        assessmentId: savedAssessment?.id,
        worstCase: validatedData.financialSeverity * 3,
        industryAverage: 5.2,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid request data", 
          errors: error.errors 
        });
      } else {
        console.error("Error calculating risk:", error);
        res.status(500).json({ message: "Error calculating risk assessment" });
      }
    }
  });
  
  // Get saved risk assessments for a user
  app.get("/api/risk/assessments/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const assessments = await storage.getRiskAssessmentsByUserId(userId);
      res.status(200).json(assessments);
    } catch (error) {
      console.error("Error fetching risk assessments:", error);
      res.status(500).json({ message: "Error fetching risk assessments" });
    }
  });

  // Serve documentation files
  app.get("/docs/:filename", (req, res) => {
    const { filename } = req.params;
    const validFiles = ['user_manual.md', 'technical_reference.md', 'logarithmic_scale_guide.md'];
    
    if (!validFiles.includes(filename)) {
      return res.status(404).send('File not found');
    }
    
    const filePath = path.join(process.cwd(), 'documentation', filename);
    
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        res.set('Content-Type', 'text/markdown');
        res.send(content);
      } else {
        res.status(404).send('File not found');
      }
    } catch (error) {
      console.error(`Error serving documentation file ${filename}:`, error);
      res.status(500).send('Error serving documentation');
    }
  });

  // Route for client-side routing (SPA)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/docs')) {
      next();
    } else {
      // Let Vite handle the client-side routing
      next();
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
