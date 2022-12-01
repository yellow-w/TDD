const express = require("express");
const app = express();
const router = require("./routes/product.route");
const port = 3000;

app.use(express.json());
app.use("/api/product", router);

app.listen(port, () => {
	`server running on http://localhost:${port}`;
});
