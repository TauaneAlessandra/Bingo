import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

function ImageUploadField({
  imageData,
  onUpload,
  onReset,
  accentColor = '#ffffff',
  uploadLabel,
  removeLabel = 'Remover Logo',
  placeholderText = 'Nenhum logotipo carregado',
  altText = 'Preview',
  imageSizeClass = 'w-24 h-24',
}) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 gap-4">
      {imageData ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={imageData}
            alt={altText}
            className={`${imageSizeClass} object-contain rounded-lg border border-slate-200 bg-white p-1`}
          />
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
          >
            <X className="w-3 h-3" /> {removeLabel}
          </button>
        </div>
      ) : (
        <div className="text-center flex flex-col items-center gap-2">
          <ImageIcon className="w-8 h-8 text-slate-400" />
          <p className="text-xs text-slate-500">{placeholderText}</p>
        </div>
      )}

      {!imageData && (
        <label
          className="text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer transition shadow-sm text-center"
          style={{
            background: accentColor === '#ffffff' ? '#1e293b' : accentColor,
            color: accentColor === '#ffffff' ? '#ffffff' : '#1e1b4b',
          }}
        >
          {uploadLabel}
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  );
}

export default ImageUploadField;
