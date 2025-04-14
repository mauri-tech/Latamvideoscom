import { db } from "./db";
import { users } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { fileURLToPath } from 'url';
import path from 'path';
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

// Obtener el filename actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function createAdminUser() {
  try {
    // Verificar si el usuario admin ya existe
    const adminEmail = "mauricio.trevinon91@gmail.com";
    const [existingAdmin] = await db.select().from(users).where(eq(users.email, adminEmail));

    if (existingAdmin) {
      console.log("El usuario administrador ya existe");
      return;
    }

    // Crear usuario admin
    const hashedPassword = await hashPassword("Royal123");
    
    const [adminUser] = await db.insert(users).values({
      email: adminEmail,
      password: hashedPassword,
      name: "Mauricio Treviño",
      userType: "admin"
    }).returning();

    console.log("Usuario administrador creado exitosamente:", adminUser.id);
  } catch (error) {
    console.error("Error al crear usuario administrador:", error);
  }
}

// Ejecutar directamente si este script se ejecuta como módulo principal
if (import.meta.url === `file://${__filename}`) {
  createAdminUser()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
}