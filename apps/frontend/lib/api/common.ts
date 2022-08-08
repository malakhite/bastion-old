const host = process.env.HOST;
const port = process.env.PORT;
const isDevelopment = process.env.NODE_ENV !== 'production';

export const baseUrl = `${isDevelopment ? 'http' : 'https'}://${host}:${port}`;
