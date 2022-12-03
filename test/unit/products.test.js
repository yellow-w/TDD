const controller = require("../../controllers/product.controller");
const newProduct = require("../data/new_product.json");
const allProducts = require("../data/all_products.json");
const {
	sequelize: { models: Product },
} = require("../../sequelize/models/index");
const http = require("node-mocks-http");

let req,
	res,
	next = null;
beforeEach(() => {
	req = http.createRequest();
	res = http.createResponse();
	next = jest.fn();
});
Product.create = jest.fn();
Product.findAll = jest.fn();
Product.findOne = jest.fn();

describe("Product Controller Create", () => {
	it("create 함수를 가지고 있는가?", () => {
		expect(typeof controller.create).toBe("function");
	});

	it("create 실행 시. model.create가 실행되는가?", async () => {
		req.body = newProduct;
		await controller.create(req, res, next);
		expect(Product.create).toBeCalled();
		expect(Product.create).toBeCalledWith(newProduct);
	});

	it("응답이 잘 도착하는 가?", async () => {
		await controller.create(req, res, next);
		expect(res.statusCode).toBe(201);
		expect(res._isEndCalled()).toBeTruthy();
	});

	it("응답 데이터가 정확한가?", async () => {
		Product.create.mockReturnValue(newProduct);
		await controller.create(req, res, next);
		expect(res._getJSONData()).toStrictEqual(newProduct);
	});

	it("controller.create가 예외처리 되었는가?", async () => {
		const errorMessage = {
			message: "description property missing",
		};
		const reject = Promise.reject(errorMessage);
		Product.create.mockReturnValue(reject);
		await controller.create(req, res, next);
		expect(next).toBeCalledWith(errorMessage);
	});
});

describe("Product Controller get", () => {
	it("getProducts 함수를 가지고 있는가?", () => {
		expect(typeof controller.getProducts).toBe("function");
	});
	it("controller getProducts 실행 시, model.findAll이 실행되는가?", () => {
		controller.getProducts(req, res, next);
		expect(Product.findAll).toBeCalled();
	});
	it("응답이 코드 200으로 잘 도착하는가?", () => {
		controller.getProducts(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled).toBeTruthy();
	});
	it("응답데이터가 정확한가?", async () => {
		Product.findAll.mockReturnValue(allProducts);
		await controller.getProducts(req, res, next);
		expect(res._getJSONData()).toStrictEqual(allProducts);
	});
	it("controller.getProducts가 예외처리 되어 있는가?", async () => {
		const errorMessage = {
			message: "Error finding product data",
		};
		const reject = Promise.reject(errorMessage);
		Product.findAll.mockReturnValue(reject);
		await controller.getProducts(req, res, next);
		expect(next).toBeCalledWith(errorMessage);
	});
});

describe("Product Controller getById", () => {
	it("getProductById 함수를 가지고 있는가?", () => {
		expect(typeof controller.getProductById).toBe("function");
	});
	it("getProductById 실행 시 model.getProductById가 실행되는가?", () => {
		req.params.index = 1;
		controller.getProductById(req, res, next);
		expect(Product.findOne).toBeCalledWith({
			where: {
				index: req.params.index,
			},
		});
	});
	it("getProductById의 응답 내용과 응답 코드 확인", async () => {
		Product.findOne.mockReturnValue(newProduct);
		await controller.getProductById(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(newProduct);
	});
	it("getProductById 응답 실패 확인", async () => {
		Product.findOne.mockReturnValue(null);
		await controller.getProductById(req, res, next);
		expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
	});

	it("getProductById 에러 처리", async () => {
		const errorMessage = "";
		const reject = Promise.reject(errorMessage);
		Product.findOne.mockReturnValue(reject);
		await controller.getProductById(req, res, next);
		expect(next).toBeCalledWith(errorMessage);
	});
	it("", () => {});
});
