export const examples = [
  'https://upload.wikimedia.org/wikipedia/commons/a/a5/Spring_-_Blender_Open_Movie.webm',
].map((url) => ({
  url,
  type: 'file',
  name: url.slice(url.lastIndexOf('/') + 1),
}));
