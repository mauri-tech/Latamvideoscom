import { storage } from "./storage";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function createAdminUser() {
  try {
    // Verificar si el usuario administrador ya existe
    const existingAdmin = await storage.getUserByEmail("mauricio.trevinon91@gmail.com");
    
    if (existingAdmin) {
      console.log("Usuario administrador ya existe");
      return existingAdmin;
    }
    
    // Crear usuario administrador si no existe
    const adminUser = await storage.createUser({
      email: "mauricio.trevinon91@gmail.com",
      password: await hashPassword("Royal123"),
      name: "Mauricio Treviño",
      userType: "admin"
    });
    
    console.log("Usuario administrador creado con éxito:", adminUser);
    return adminUser;
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
    throw error;
  }
}