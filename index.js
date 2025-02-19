
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
import { DbConnect } from './config/config.js';
import { schema } from './graphql/schema.js';
import { root } from './graphql/resolvers.js';
import { authenticate } from './middleware/authMiddleware.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// MongoDB connection
DbConnect();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/graphql', authenticate, graphqlHTTP((req) => ({
  schema,
  rootValue: root,
  graphiql: true,
  context: { user: req.user }, 
})));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


