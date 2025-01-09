import dotenv from "dotenv";
dotenv.config();
import express, {
  type NextFunction,
  type Response,
  type Request,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import { auth, verify, resend, post, user } from "./routes/index";
import { connect } from "./lib/conUtils";
import { env } from "./env";

//Type Declarations
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: string;
    }
  }
}

connect();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
const port = env.PORT;

app.use("/auth", auth);
app.use("/user", user);
app.use("/post", post);

//outgoing services
app.use("/verification", verify);
app.use("/resend", resend);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message || "Internal Server Error",
    stack: env.NODE_ENV === "DEVELOPMENT" ? err.stack : undefined,
  });
  return;
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
