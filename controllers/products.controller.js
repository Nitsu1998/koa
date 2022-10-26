import crypto from "crypto";
import Product from "../classes/products.class.js";
import generateRandomCode from "../helpers/generateRandomCode.js";

const productsMap = {};

const createProduct = (ctx) => {
  const id = crypto.randomBytes(10).toString("hex");
  const code = generateRandomCode();
  const timestamp = new Date().getTime();
  const data = ctx.request.body;
  if (
    !data?.title ||
    !data?.description ||
    !data?.url ||
    !data?.price ||
    !data?.stock
  ) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter the data",
    };
  } else {
    const newProduct = new Product(id, code, timestamp, data);
    productsMap[id] = newProduct;
    ctx.response.status = 201;
    ctx.body = {
      status: "Created!",
      data: newProduct,
    };
  }
};

const getProduct = (ctx) => {
  if (!productsMap[ctx.params.id]) {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `Book with ID: ${ctx.params.id} not found`,
    };
  } else {
    ctx.body = {
      status: "Success",
      data: productsMap[ctx.params.id],
    };
  }
};

const getProducts = (ctx) => {
  ctx.body = {
    status: "Success",
    data: productsMap,
  };
};

const updateProduct = (ctx) => {
  const data = ctx.request.body;
  if (!productsMap[ctx.params.id]) {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `Book with ID: ${ctx.params.id} not found`,
    };
  } else if (
    !data?.title ||
    !data?.description ||
    !data?.url ||
    !data?.price ||
    !data?.stock
  ) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter the data",
    };
  } else {
    const productUpdated = new Product(ctx.params.id, data);
    productsMap[ctx.params.id] = productUpdated;
    ctx.response.status = 201;
    ctx.body = {
      status: "Updated!",
      data: productUpdated,
    };
  }
};

const deleteProduct = (ctx) => {
  if (!productsMap[ctx.params.id]) {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `Book with ID: ${ctx.params.id} not found`,
    };
  } else {
    const productDeleted = productsMap[ctx.params.id];
    delete productsMap[ctx.params.id];
    ctx.response.status = 200;
    ctx.body = {
      status: "Deleted!",
      data: productDeleted,
    };
  }
};

export default {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
