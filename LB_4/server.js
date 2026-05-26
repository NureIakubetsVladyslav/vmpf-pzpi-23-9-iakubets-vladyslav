const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

require("./models");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const studentRoutes = require("./routes/students");
const courseRoutes = require("./routes/courses");
const gradeRoutes = require("./routes/grades");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/grades", gradeRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send("University API is running");
});

sequelize.sync()
    .then(() => {
        console.log("Database connected and tables created");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });