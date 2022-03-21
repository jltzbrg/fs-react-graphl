const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("./models/Recipe");
const User = require("./models/User");

// GraphQL Express Middlewares
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Create GraphQL Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

//Database:
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error("Error: ", error));

// Initialize Application:
const app = express();

// Create GraphiQL Application:
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Conntect Schemas with GraphQL
app.use(
  "/graphql",
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User,
    },
  })
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`> Server is running on Port: ${PORT}`);
});
