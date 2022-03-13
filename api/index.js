import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import { shoes } from './shoes.js';
import { categories } from './categories.js';

const port = 3000;

// Set up the express app
const app = express();

const upload = multer();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// Set up CORS
app.use(cors());

app.get('/api/shoes', async (req, res) => {
  try {
    console.log(req.body);

    // validate search object
    if (req.body?.categories?.length) {
      if (!req.body.categories.every((c) => !!categories[c])) {
        return res.status(400).send({
          message: 'Nonexistent category provided!',
        });
      }
    }

    if (!(!!req.body?.pageSize === !!req.body?.pageNumber)) {
      return res.status(400).send({
        message:
          'Page size and page number parameters have to be either all defined or all undefined!',
      });
    }

    const filteredCategories = [];
    if (req.body?.categories?.length) {
      filteredCategories.push(...req.body.categories);

      for (let i = 0; i < filteredCategories.length; i++) {
        const categoryId = filteredCategories[i];
        if (categories[categoryId].subCategories?.length) {
          filteredCategories.push(...categories[categoryId].subCategories);
        }
      }
    }

    let result = shoes.filter((s) => {
      if (!req.body) {
        return true;
      }

      if (req.body.search) {
        const doesTitleContainSearchExpression = s.title
          .toLowerCase()
          .includes(req.body.search.toLowerCase());

        const doesBrandContainSearchExpression = s.brand
          .toLowerCase()
          .includes(req.body.search.toLowerCase());

        if (
          !doesBrandContainSearchExpression &&
          !doesTitleContainSearchExpression
        ) {
          return false;
        }
      }

      if (req.body.minPrice && s.price < req.body.minPrice) {
        return false;
      }

      if (req.body.maxPrice && s.price > req.body.maxPrice) {
        return false;
      }

      if (
        filteredCategories.length &&
        !filteredCategories.includes(s.categoryId)
      ) {
        return false;
      }

      return true;
    });

    const totalResults = result.length;

    if (req.body?.pageSize && req.body?.pageNumber) {
      const startIndex = (req.body.pageNumber - 1) * req.body.pageSize;
      const endIndex = startIndex + req.body.pageSize;

      if (startIndex > result.length - 1) {
        return res.status(400).send({
          message: 'Page out of bounds',
        });
      }

      if (endIndex > result.length - 1) {
        endIndex = result.length - 1;
      }

      result = result.slice(startIndex, endIndex);
    }

    const mappedResult = result.map((s) => {
      return {
        id: s.id,
        title: s.title,
        brand: s.brand,
        price: s.price,
        categoryId: s.categoryId,
        imageUrl: s.images.length ? s.images[0] : null,
      };
    });

    await new Promise((r) => setTimeout(r, 2000));

    return res.status(201).send({ totalResults, result: mappedResult });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

app.get('/api/shoes/:id/', async (req, res) => {
  await new Promise((r) => setTimeout(r, 2000));

  const shoe = shoes.find((x) => x.id === +req.params.id);

  if (shoe) {
    return res.status(200).send(shoe);
  }

  return res.status(404).send({
    message: `No shoe with the id ${req.params.id} found.`,
  });
});

app.get('/api/categories', async (req, res) => {
  await new Promise((r) => setTimeout(r, 2000));
  return res.status(200).send(categories);
});

app.post('/api/purchase', async (req, res) => {
  await new Promise((r) => setTimeout(r, 2000));

  if (!req.body?.shoes?.length) {
    return res.status(400).send({
      message: 'No shoes were provided',
    });
  }

  return res.sendStatus(201);
});

app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Email app listening at http://localhost:${port}`);
});
