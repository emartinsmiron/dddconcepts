import { Sequelize } from "sequelize-typescript";
import ProductRepository from "./product.repository";
import ProductModel from "../sequelize/product.model";
import Product from "../../../domain/product/entity/product";

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("TV");

    await productRepository.update(product);

    const updatedProductModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(updatedProductModel.toJSON()).toStrictEqual({
      id: "1",
      name: "TV",
      price: 100,
    });

  });

  it("should find one a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: {id: "1" } });
    const foundProduct = await productRepository.find(product.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

    it("should find all a product", async () => {
      const productRepository = new ProductRepository();
      const product = new Product("1", "Product 1", 100);
      const product2 = new Product("2", "Product 2", 200);
  
      await productRepository.create(product);
      await productRepository.create(product2);
  
      const productModels = await productRepository.findAll();
  
      expect(productModels.length).toBe(2);
    });

});