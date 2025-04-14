import { Request, Response } from 'express';
import { storage } from './storage';

export async function getEditorProfileForCurrentUser(req: Request, res: Response) {
  try {
    console.log('Start of debugged editor-profiles/user route');
    
    if (!req.isAuthenticated()) {
      console.log('User not authenticated');
      return res.status(401).json({ message: "Authentication required" });
    }
    
    console.log('req.user:', JSON.stringify(req.user));
    const userId = req.user?.id;
    console.log('Getting profile for userId:', userId);
    
    if (!userId) {
      console.log('userId is undefined or null');
      return res.status(400).json({ message: "User ID is missing" });
    }
    
    try {
      console.log('Calling storage.getEditorProfileByUserId with userId:', userId);
      const profile = await storage.getEditorProfileByUserId(userId);
      console.log('Profile found result:', profile ? 'yes' : 'no');
      console.log('Profile data:', JSON.stringify(profile));
      
      if (!profile) {
        console.log('Profile not found for userId:', userId);
        return res.status(404).json({ message: "Profile not found" });
      }
      
      console.log('Sending profile response');
      return res.json(profile);
    } catch (dbError: any) {
      console.error('Database error getting profile:', dbError);
      console.error('Error message:', dbError.message);
      console.error('Error stack:', dbError.stack);
      return res.status(500).json({ 
        message: "Database error", 
        details: dbError ? dbError.message : 'Unknown database error',
        stack: dbError ? dbError.stack : ''
      });
    }
  } catch (error: any) {
    console.error('Error getting editor profile for current user:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      message: "Server error", 
      details: error ? error.message : 'Unknown error',
      stack: error ? error.stack : ''
    });
  }
}