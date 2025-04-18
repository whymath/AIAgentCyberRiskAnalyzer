import { users, type User, type InsertUser, riskAssessments, type RiskAssessment, type InsertRiskAssessment } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Risk assessment methods
  createRiskAssessment(assessment: InsertRiskAssessment): Promise<RiskAssessment>;
  getRiskAssessment(id: number): Promise<RiskAssessment | undefined>;
  getRiskAssessmentsByUserId(userId: number): Promise<RiskAssessment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private riskAssessments: Map<number, RiskAssessment>;
  currentUserId: number;
  currentRiskAssessmentId: number;

  constructor() {
    this.users = new Map();
    this.riskAssessments = new Map();
    this.currentUserId = 1;
    this.currentRiskAssessmentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createRiskAssessment(assessment: InsertRiskAssessment): Promise<RiskAssessment> {
    const id = this.currentRiskAssessmentId++;
    const riskAssessment: RiskAssessment = { ...assessment, id };
    this.riskAssessments.set(id, riskAssessment);
    return riskAssessment;
  }

  async getRiskAssessment(id: number): Promise<RiskAssessment | undefined> {
    return this.riskAssessments.get(id);
  }

  async getRiskAssessmentsByUserId(userId: number): Promise<RiskAssessment[]> {
    return Array.from(this.riskAssessments.values()).filter(
      (assessment) => assessment.userId === userId
    );
  }
}

export const storage = new MemStorage();
