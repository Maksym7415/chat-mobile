export const typesActionBtn = {
  uploadCamera: 'uploadCamera',
  uploadGallery: 'uploadGallery',
  uploadFile: 'uploadFile',
};

export const actionsBtns = lang => [
  {
    id: 1,
    title: 'Camera',
    typeAction: typesActionBtn.uploadCamera,
  },
  {
    id: 2,
    title: 'Photo Library',
    typeAction: typesActionBtn.uploadGallery,
  },
  {
    id: 3,
    title: 'Document',
    typeAction: typesActionBtn.uploadFile,
  },
];
