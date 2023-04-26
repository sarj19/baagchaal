import * as http from 'http';

export default function startListening(httpServer: http.Server) {
  // if not in production use the port 3000
  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log("started server on *:", PORT);
  });
}
