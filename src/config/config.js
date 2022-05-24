export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  allowedImageTypes: ['image/gif', 'image/jpeg', 'image/png', 'image/tiff', 'image/vnd.microsoft.icon', 'image/x-icon', 'image/vnd.djvu', 'image/svg+xml']
};
