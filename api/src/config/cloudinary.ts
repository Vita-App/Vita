import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUDINARY } from './keys';

cloudinary.config(CLOUDINARY);

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'Vita',
    allowedFormats: ['jpg', 'jpeg', 'png'],
  }),
});

export { cloudinary, storage };
