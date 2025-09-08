import app from "../backend/src/server.js";

export default function handler(req, res) {
  return app(req, res); // Forward requests to your Express app
}
