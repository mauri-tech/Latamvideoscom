import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Asegúrese de que existan los directorios
const profileUploadDir = path.join(process.cwd(), 'uploads/profile-images');
const portfolioUploadDir = path.join(process.cwd(), 'uploads/portfolio');

if (!fs.existsSync(profileUploadDir)) {
  fs.mkdirSync(profileUploadDir, { recursive: true });
}

if (!fs.existsSync(portfolioUploadDir)) {
  fs.mkdirSync(portfolioUploadDir, { recursive: true });
}

// Configuración para imágenes de perfil
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, profileUploadDir);
  },
  filename: function (req, file, cb) {
    const userId = req.user?.id; // Usar el ID del usuario autenticado para nombrar el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, `user-${userId}-${uniqueSuffix}${fileExt}`);
  }
});

// Configuración para archivos de portafolio
const portfolioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, portfolioUploadDir);
  },
  filename: function (req, file, cb) {
    const userId = req.user?.id; // Usar el ID del usuario autenticado
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, `portfolio-${userId}-${uniqueSuffix}${fileExt}`);
  }
});

// Filtro de archivos para asegurar que solo se suban imágenes
const imageFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  
  cb(new Error('Error: Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
};

// Filtro de archivos para videos y miniaturas de portafolio
const portfolioFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov|wmv/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  
  cb(new Error('Error: Solo se permiten imágenes y videos en formatos comunes'));
};

// Crear los middlewares de multer
export const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
  fileFilter: imageFileFilter
});

export const uploadPortfolioFile = multer({
  storage: portfolioStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50MB para videos
  fileFilter: portfolioFileFilter
});