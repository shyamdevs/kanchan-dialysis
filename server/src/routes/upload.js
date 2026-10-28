import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();
const maxMb = Math.min(Math.max(Number(process.env.MAX_UPLOAD_MB || 8), 1), 25);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxMb * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4'];
    if (!allowed.includes(file.mimetype)) return callback(new Error('Upload JPG, PNG, WebP, AVIF, or MP4 files only.'));
    callback(null, true);
  },
});

function detectAllowedSignature(buffer, mime) {
  if (!buffer || buffer.length < 12) return false;
  if (mime === 'image/jpeg') return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mime === 'image/png') return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mime === 'image/webp') return buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
  if (mime === 'image/avif') return buffer.toString('ascii', 4, 8) === 'ftyp' && /avif|avis/.test(buffer.toString('ascii', 8, 16));
  if (mime === 'video/mp4') return buffer.toString('ascii', 4, 8) === 'ftyp';
  return false;
}

function uploadBuffer(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => error ? reject(error) : resolve(result));
    stream.end(buffer);
  });
}

router.post('/', requireAdmin, (req, res, next) => {
  upload.single('file')(req, res, async (uploadError) => {
    if (uploadError) return res.status(400).json({ message: uploadError.message || 'Unable to upload this file.' });
    try {
      if (!req.file) return res.status(400).json({ message: 'Choose a file to upload.' });
      if (!detectAllowedSignature(req.file.buffer, req.file.mimetype)) return res.status(400).json({ message: 'The selected file content does not match its file type.' });
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return res.status(503).json({ message: 'Media upload is not configured yet. Add Cloudinary credentials to server/.env, or paste an existing HTTPS media URL.' });
      }
      cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });
      const isVideo = req.file.mimetype === 'video/mp4';
      const result = await uploadBuffer(req.file.buffer, {
        folder: 'kanchan-dialysis',
        resource_type: isVideo ? 'video' : 'image',
        filename_override: req.file.originalname,
        use_filename: false,
        unique_filename: true,
      });
      return res.status(201).json({ url: result.secure_url, publicId: result.public_id, mediaType: isVideo ? 'video' : 'image', bytes: result.bytes });
    } catch (error) { return next(error); }
  });
});

export default router;
