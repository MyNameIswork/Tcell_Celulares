import multer from "multer";

const storage = multer.memoryStorage(); // Armazena a imagem na memória para upload direto

const upload = multer({ storage: storage });

export default upload;
