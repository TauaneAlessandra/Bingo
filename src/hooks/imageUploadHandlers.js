import { setImage, deleteImage } from '../utils/indexedDB';

export function createImageHandlers(key, setState) {
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setState(reader.result);
      setImage(key, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setState(null);
    deleteImage(key);
  };

  return { handleUpload, reset };
}
