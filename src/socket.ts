import * as http from 'http';
import { Server, Socket } from 'socket.io';

import { storeMove } from './database';

type ServerData = {
  userId: string;
  gameHash: string;
  moves: number[][]; // this needs to be converted to Move[] which is Int32
};

export default async function setupSocket(httpServer: http.Server) {
  const io = new Server(httpServer);
  io.on("connection", async (socket: Socket) => {
    const gameHash = await getGameHash(socket);

    socket
      .onAny((event, args) => {
        console.log("received", event, args);
      })
      .onAnyOutgoing((event, args) => {
        console.log("sending", event, args);
      })
      .on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      })
      .on("disconnect", async () => {
        // TODO viewer can leave
        const hash = await getGameHash(socket);
        io.to(hash).emit("playerchanged", playersInRoom(io, socket));
      })
      .on("movepiece", async (data: ServerData) => {
        const success = await storeMove(data.gameHash, data.userId, data.moves);

        if (success) {
          socket.broadcast.to(data.gameHash).emit("movepiece", data);
        } else {
          // send server error to as a response to client
        }
      })
      .once("gamejoined", async ({ userId, gameHash }) => {
        // TODO verify opponent's ID
        socket.broadcast.to(gameHash).emit("opponentJoined", userId);
      })
      .join(gameHash);
  });
}

async function playersInRoom(io: Server, socket: Socket) {
  if (io == null) return 0;
  const rooms = io.sockets.adapter.rooms;
  const hash = await getGameHash(socket);
  return rooms.get(hash)?.size;
}

async function getGameHash(socket: Socket) {
  return await socket.handshake.auth.token;
}
