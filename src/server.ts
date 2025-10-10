import { app } from "./app";
import { petRouter } from "./routes/PetRouter";
app.use("/pets", petRouter);
import { userRouter } from "./routes/UserRouter";
app.use("/users", userRouter);
