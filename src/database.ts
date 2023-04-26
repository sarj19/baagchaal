import dotenv from 'dotenv';
import { Int32, MongoClient, ServerApiVersion, WithId } from 'mongodb';

dotenv.config({ path: "db.config" });

const mongoUrl = process.env.DB_URL!;
const RADIX = 35;
// to keep game code small and neat
const TIMESTAMP_OFFSET = 1672531261; //Sun, 01 Jan 2023 00:01:01 GMT

const dbName: string = process.env.DB_NAME!;
const mongoClient = new MongoClient(mongoUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const COUNTERS_COLLECTION = "counters";
const GAMES_COLLECTION = "game";

type Counters = { gamesPlayed: Int32 };
type GameFilter =
  | { createdAt: Int32; _id: Int32; goat?: string; tiger?: string }
  | { createdAt: Int32; _id: Int32 }
  | { _id: Int32 };
type Game = {
  _id: Int32;
  createdAt: Int32;
  moves: Move[];
  winner?: string;
  goat?: string;
  tiger?: string;
};
export type Move = { from: Int32; to: Int32 };
export type PieceType = "goat" | "tiger";

/**
 * counters
 * - gamesPlayed : number
 *
 * game
 * - createdAt : datetime
 * - _id : number
 * - winner? : string
 * - steps : array of embed documet
 * - goat? : string
 * - tiger? : string
 *
 */
export async function getNewGame(
  userId: string,
  designation: PieceType
): Promise<string | null> {
  await mongoClient.connect();
  try {
    const _id = await insertNewGame(userId, designation);
    if (_id == null) {
      console.log("creating game failed");
      return null;
    }

    const game = await getGame({ _id });
    if (game == null) {
      console.log("failed getting created game");
      return null;
    }

    return gameHash(game._id, game.createdAt);
  } finally {
    await mongoClient.close();
  }
}

export async function joinGame(
  userId: string,
  gameHash: string
): Promise<null | { goat?: string; tiger?: string; moves: Move[] }> {
  await mongoClient.connect();
  try {
    const userIdsAndMoves = await getUserIdsAndMoves(gameHash);
    if (userIdsAndMoves == null) {
      return null;
    }

    // verify userId is not already joined, if yes return designation
    if (userIdsAndMoves.goat == userId || userIdsAndMoves.tiger == userId) {
      return userIdsAndMoves;
    }

    if (
      userIdsAndMoves.goat != userId &&
      userIdsAndMoves.tiger != userId &&
      userIdsAndMoves.goat != null &&
      userIdsAndMoves.tiger != null
    ) {
      // game is already full
      return null;
    }

    const designation = userIdsAndMoves.goat == null ? "goat" : "tiger";
    if (
      await updateDesignation(
        gameHash,
        designation == "goat" ? { goat: userId } : { tiger: userId }
      )
    ) {
      return await getUserIdsAndMoves(gameHash);
    }

    return null;
  } finally {
    await mongoClient.close();
  }
}

export async function storeMove(
  gameHash: string,
  userId: string,
  moves: number[][]
): Promise<boolean> {
  await mongoClient.connect();
  try {
    let queryFilter = getFilter(gameHash);

    const turn = moves.length % 2 == 0 ? "goat" : "tiger";
    if (turn == "goat") {
      queryFilter = { ...queryFilter, tiger: userId };
    } else {
      queryFilter = { ...queryFilter, goat: userId };
    }

    // TODO verify length of moves, duplicacy, etc
    const lastMoveNum = moves.at(-1)!;
    const lastMove = {
      from: new Int32(lastMoveNum[0]),
      to: new Int32(lastMoveNum[1]),
    };

    const result = await mongoClient
      .db(dbName)
      .collection<Game>(GAMES_COLLECTION)
      .updateOne(queryFilter, {
        $addToSet: {
          moves: lastMove,
        },
      });

    return result.acknowledged;
  } finally {
    await mongoClient.close();
  }
}

async function getUserIdsAndMoves(
  gameHash: string
): Promise<null | { goat?: string; tiger?: string; moves: Move[] }> {
  const game = await getGame(getFilter(gameHash));
  if (game == null) {
    return null;
  }
  return {
    goat: game.goat,
    tiger: game.tiger,
    moves: game.moves,
  };
}

async function getGame(queryFilter: GameFilter): Promise<WithId<Game> | null> {
  console.log(queryFilter);
  const results = mongoClient
    .db(dbName)
    .collection<Game>(GAMES_COLLECTION)
    .findOne(queryFilter);
  return await results;//.next();
}

async function updateDesignation(
  gameHash: string,
  updateValues: { goat: string } | { tiger: string }
): Promise<boolean> {
  const result = await mongoClient
    .db(dbName)
    .collection<Game>(GAMES_COLLECTION)
    .updateOne(getFilter(gameHash), {
      $set: updateValues,
    });

  return result.acknowledged;
}

async function insertNewGame(
  userId: string,
  designation: PieceType
): Promise<Int32 | null> {
  const _id = await getId();
  if (_id == null) {
    return null;
  }

  let setValues;
  const ts = new Int32(Math.floor(new Date().getTime() / 1000));
  if (designation == "goat") {
    setValues = { _id, goat: userId, createdAt: ts, moves: [] };
  } else {
    setValues = { _id, tiger: userId, createdAt: ts, moves: [] };
  }
  const newGame = await mongoClient
    .db(dbName)
    .collection<Game>(GAMES_COLLECTION)
    .findOneAndUpdate({ _id }, { $set: setValues }, { upsert: true });

  if (newGame.ok == 1) {
    return _id;
  }
  return null;
}

async function getId(): Promise<Int32 | undefined> {
  const counters = await mongoClient
    .db(dbName)
    .collection<Counters>(COUNTERS_COLLECTION)
    .findOneAndUpdate({}, { $inc: { gamesPlayed: 1 } });
  return counters.value?.gamesPlayed;
}

function gameHash(_id: Int32, createdAt: Int32): string {
  // timestamp + z + _id to base 35 (0 - 9,a -y), z is separator
  return (
    (createdAt.valueOf() - TIMESTAMP_OFFSET).toString(RADIX) +
    "z" +
    _id.toString(RADIX)
  );
}

function getFilter(gameHash: string): GameFilter {
  const [createdAt, _id] = gameHash.toString().split("z");
  return {
    createdAt: new Int32(parseInt(createdAt, RADIX) + TIMESTAMP_OFFSET),
    _id: new Int32(parseInt(_id, RADIX)),
  };
}
