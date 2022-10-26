export default class Product {
    constructor(id, code, timestamp, { title, description, url, price, stock }) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.code = code;
      this.url = url;
      this.price = price;
      this.stock = stock;
      this.timestamp = timestamp;
    }
  }