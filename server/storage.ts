import { 
  users, User, InsertUser,
  software, Software, InsertSoftware,
  editingStyles, EditingStyle, InsertEditingStyle,
  editorProfiles, EditorProfile, InsertEditorProfile,
  portfolioItems, PortfolioItem, InsertPortfolioItem,
  briefs, Brief, InsertBrief
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User Methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  
  // Software Methods
  getAllSoftware(): Promise<Software[]>;
  getSoftware(id: number): Promise<Software | undefined>;
  createSoftware(data: InsertSoftware): Promise<Software>;
  
  // Editing Styles Methods
  getAllEditingStyles(): Promise<EditingStyle[]>;
  getEditingStyle(id: number): Promise<EditingStyle | undefined>;
  createEditingStyle(data: InsertEditingStyle): Promise<EditingStyle>;
  
  // Editor Profile Methods
  getEditorProfile(id: number): Promise<EditorProfile | undefined>;
  getEditorProfileByUserId(userId: number): Promise<EditorProfile | undefined>;
  createEditorProfile(data: InsertEditorProfile): Promise<EditorProfile>;
  updateEditorProfile(id: number, data: Partial<EditorProfile>): Promise<EditorProfile | undefined>;
  searchEditorProfiles(filters: Record<string, any>): Promise<EditorProfile[]>;
  incrementProfileView(id: number): Promise<void>;
  incrementContactClick(id: number): Promise<void>;
  
  // Portfolio Methods
  getPortfolioItems(editorProfileId: number): Promise<PortfolioItem[]>;
  createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem | undefined>;
  deletePortfolioItem(id: number): Promise<boolean>;
  
  // Brief Methods
  getBrief(id: number): Promise<Brief | undefined>;
  getBriefsByClientId(clientId: number): Promise<Brief[]>;
  getBriefsByEditorId(editorId: number): Promise<Brief[]>;
  createBrief(data: InsertBrief): Promise<Brief>;
  updateBriefStatus(id: number, status: string): Promise<Brief | undefined>;
}

// Memory Storage Implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private software: Map<number, Software>;
  private editingStyles: Map<number, EditingStyle>;
  private editorProfiles: Map<number, EditorProfile>;
  private portfolioItems: Map<number, PortfolioItem>;
  private briefs: Map<number, Brief>;
  
  private currentUserId = 1;
  private currentSoftwareId = 1;
  private currentStyleId = 1;
  private currentProfileId = 1;
  private currentPortfolioId = 1;
  private currentBriefId = 1;
  
  constructor() {
    this.users = new Map();
    this.software = new Map();
    this.editingStyles = new Map();
    this.editorProfiles = new Map();
    this.portfolioItems = new Map();
    this.briefs = new Map();
    
    // Seed initial data
    this.seedInitialData();
  }
  
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async createUser(userData: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...userData, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Software Methods
  async getAllSoftware(): Promise<Software[]> {
    return Array.from(this.software.values());
  }
  
  async getSoftware(id: number): Promise<Software | undefined> {
    return this.software.get(id);
  }
  
  async createSoftware(data: InsertSoftware): Promise<Software> {
    const id = this.currentSoftwareId++;
    const software: Software = { ...data, id };
    this.software.set(id, software);
    return software;
  }
  
  // Editing Styles Methods
  async getAllEditingStyles(): Promise<EditingStyle[]> {
    return Array.from(this.editingStyles.values());
  }
  
  async getEditingStyle(id: number): Promise<EditingStyle | undefined> {
    return this.editingStyles.get(id);
  }
  
  async createEditingStyle(data: InsertEditingStyle): Promise<EditingStyle> {
    const id = this.currentStyleId++;
    const style: EditingStyle = { ...data, id };
    this.editingStyles.set(id, style);
    return style;
  }
  
  // Editor Profile Methods
  async getEditorProfile(id: number): Promise<EditorProfile | undefined> {
    return this.editorProfiles.get(id);
  }
  
  async getEditorProfileByUserId(userId: number): Promise<EditorProfile | undefined> {
    return Array.from(this.editorProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }
  
  async createEditorProfile(data: InsertEditorProfile): Promise<EditorProfile> {
    const id = this.currentProfileId++;
    const profile: EditorProfile = { 
      ...data, 
      id, 
      viewCount: 0, 
      contactClickCount: 0
    };
    this.editorProfiles.set(id, profile);
    return profile;
  }
  
  async updateEditorProfile(id: number, data: Partial<EditorProfile>): Promise<EditorProfile | undefined> {
    const profile = this.editorProfiles.get(id);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...data };
    this.editorProfiles.set(id, updatedProfile);
    return updatedProfile;
  }
  
  async searchEditorProfiles(filters: Record<string, any>): Promise<EditorProfile[]> {
    let results = Array.from(this.editorProfiles.values());
    
    // Apply filters (simplified for MVP)
    if (filters.software && filters.software.length > 0) {
      results = results.filter(profile => {
        const softwareIds = profile.software as number[];
        return filters.software.some((id: number) => softwareIds.includes(id));
      });
    }
    
    if (filters.editingStyles && filters.editingStyles.length > 0) {
      results = results.filter(profile => {
        const styleIds = profile.editingStyles as number[];
        return filters.editingStyles.some((id: number) => styleIds.includes(id));
      });
    }
    
    if (filters.maxRate) {
      results = results.filter(profile => 
        (profile.basicRate || 0) <= filters.maxRate
      );
    }
    
    return results;
  }
  
  async incrementProfileView(id: number): Promise<void> {
    const profile = this.editorProfiles.get(id);
    if (profile) {
      profile.viewCount += 1;
      this.editorProfiles.set(id, profile);
    }
  }
  
  async incrementContactClick(id: number): Promise<void> {
    const profile = this.editorProfiles.get(id);
    if (profile) {
      profile.contactClickCount += 1;
      this.editorProfiles.set(id, profile);
    }
  }
  
  // Portfolio Methods
  async getPortfolioItems(editorProfileId: number): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values())
      .filter(item => item.editorProfileId === editorProfileId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const item: PortfolioItem = { ...data, id };
    this.portfolioItems.set(id, item);
    return item;
  }
  
  async updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem | undefined> {
    const item = this.portfolioItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, ...data };
    this.portfolioItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deletePortfolioItem(id: number): Promise<boolean> {
    return this.portfolioItems.delete(id);
  }
  
  // Brief Methods
  async getBrief(id: number): Promise<Brief | undefined> {
    return this.briefs.get(id);
  }
  
  async getBriefsByClientId(clientId: number): Promise<Brief[]> {
    return Array.from(this.briefs.values())
      .filter(brief => brief.clientId === clientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getBriefsByEditorId(editorId: number): Promise<Brief[]> {
    return Array.from(this.briefs.values())
      .filter(brief => brief.editorId === editorId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createBrief(data: InsertBrief): Promise<Brief> {
    const id = this.currentBriefId++;
    const now = new Date();
    const brief: Brief = { 
      ...data, 
      id, 
      status: "pending", 
      createdAt: now 
    };
    this.briefs.set(id, brief);
    return brief;
  }
  
  async updateBriefStatus(id: number, status: string): Promise<Brief | undefined> {
    const brief = this.briefs.get(id);
    if (!brief) return undefined;
    
    const updatedBrief = { ...brief, status };
    this.briefs.set(id, updatedBrief);
    return updatedBrief;
  }
  
  // Seed initial data for demo purposes
  private seedInitialData() {
    // Seed software
    const software1 = this.createSoftware({ name: "Premiere Pro", icon: "adobe-premiere" });
    const software2 = this.createSoftware({ name: "Final Cut Pro", icon: "apple-final-cut" });
    const software3 = this.createSoftware({ name: "DaVinci Resolve", icon: "davinci-resolve" });
    const software4 = this.createSoftware({ name: "After Effects", icon: "adobe-after-effects" });
    const software5 = this.createSoftware({ name: "CapCut", icon: "capcut" });
    
    // Seed editing styles
    const style1 = this.createEditingStyle({ name: "YouTube" });
    const style2 = this.createEditingStyle({ name: "Reels/TikTok" });
    const style3 = this.createEditingStyle({ name: "Comerciales" });
    const style4 = this.createEditingStyle({ name: "Eventos" });
    const style5 = this.createEditingStyle({ name: "Corporativo" });
  }
}

export const storage = new MemStorage();
