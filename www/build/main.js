webpackJsonp([0],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlantService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sql_service__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};






let PlantService = class PlantService {
    constructor(http, configuration, storage, events) {
        this.in_progress = false;
        console.log('[PlantService] - constructor() :: ');
        this.http = http;
        this.configuration = configuration;
        this.storage = storage;
        this.events = events;
    }
    init() {
        console.log('[PlantService] - init() :: Preparing database table');
        return this.storage.executeSql('CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY, plant_id INTEGER, plant_no INTEGER, tail_no TEXT)');
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[PlantService] - load() :: Loading plants from the API');
            if (this.in_progress) {
                console.log('[PlantService] - load() :: Loading is already in progress, exit.');
                return null;
            }
            this.in_progress = true;
            let result = yield this.http
                .get(`${this.configuration.API_ENDPOINT}/plants-dep/${this.configuration.DEPARTMENT_ID}`)
                .toPromise();
            console.log('[PlantService] - load() :: Plants loaded from the API.');
            console.log('[PlantService] - load() :: Deleting plants from the cache.');
            yield this.deleteAll();
            console.log('[PlantService] - load() :: Plants deleted from the cache.');
            console.log('[PlantService] - load() :: Creating plants in the cache.');
            let promises = result.json().Plant.map((item) => __awaiter(this, void 0, void 0, function* () {
                // console.log('[PlantService] - load() :: Creating plant in the cache.', item);
                yield this.create(item);
            }));
            console.info('[PlantService] - load() :: Plants loaded from the API and cached.');
            this.events.publish('plants:loaded');
            console.info('[PlantService] - load() :: Event "plants:loaded" published.');
            this.in_progress = false;
            return Promise.all(promises);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT plant_id, plant_no, tail_no FROM plants';
            return this.storage.executeSql(query);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT plant_id, plant_no, tail_no FROM plants WHERE plant_id = (?)';
            return this.storage.executeSql(query, [id]);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[PlantService] - deleteAll() :: Deleting plants from the cache.');
            return Promise.all([
                this.storage.executeSql('DELETE FROM plants'),
                this.storage.executeSql('DELETE FROM SQLITE_SEQUENCE WHERE name="plants"')
            ]);
        });
    }
    create(plant) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'INSERT INTO plants (plant_id, plant_no, tail_no) VALUES (?, ?, ?)';
            return this.storage.executeSql(query, [plant.plant_id, plant.plant_no, plant.tail_no]);
        });
    }
};
PlantService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_5__sql_service__["a" /* SqlService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Events */]])
], PlantService);
//# sourceMappingURL=plant-service.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sql_service__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};






let TransactionService = class TransactionService {
    constructor(http, configuration, storage) {
        console.log('[TransactionService] - constructor() :: ');
        this.http = http;
        this.configuration = configuration;
        this.storage = storage;
    }
    init() {
        console.log('[TransactionService] - init() :: Preparing database table');
        return this.storage.executeSql(`CREATE TABLE IF NOT EXISTS transactions (
            transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
            pad_id TEXT,
            operator_id INTEGER,
            plant_id INTEGER,
            trailer_id INTEGER,
            odometer INTEGER,
            battery_percentage INTEGER,
            long TEXT,
            lat TEXT,
            end_value TEXT,
            end_total_value TEXT,
            transaction_end_date TEXT,
            synced_at TEXT
        )`);
    }
    initRefills() {
        console.log('[TransactionService] - init() :: Preparing database table 2');
        return this.storage.executeSql(`CREATE TABLE IF NOT EXISTS refills (
            transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
            operator_id INTEGER,
            from_trailer_id INTEGER,
            to_trailer_id INTEGER,
            amount TEXT,
            synced_at TEXT
        )`);
    }
    create(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TransactionService] - create() :: Creating transaction in the cache:', transaction);
            let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
            // transaction.transaction_end_date is a timestamp, but in local time ...
            let transaction_end_date = transaction.transaction_end_date;
            transaction_end_date = transaction_end_date + (new Date()).getTimezoneOffset() * 60;
            transaction.transaction_end_date = datePipe.transform(new Date(transaction_end_date * 1000), 'y-MM-dd HH:mm:ss');
            let insert_query = `INSERT INTO transactions (
            pad_id, 
            operator_id, 
            plant_id, 
            trailer_id, 
            odometer, 
            battery_percentage, 
            long, 
            lat, 
            end_value, 
            end_total_value, 
            transaction_end_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            let result = yield this.storage.executeSql(insert_query, [
                transaction.pad_id,
                transaction.operator_id,
                transaction.plant_id,
                transaction.trailer_id,
                transaction.odometer,
                transaction.battery_percentage,
                transaction.long,
                transaction.lat,
                transaction.end_value,
                transaction.end_total_value,
                transaction.transaction_end_date
            ]);
            console.log('[TransactionService] - create() :: Transaction created in the cache:', transaction);
            try {
                console.log('[TransactionService] - create() :: Uploading transaction in the API:', result);
                transaction.transaction_id = result.res.insertId;
                let api_result = yield this.http
                    .post(this.configuration.API_ENDPOINT + '/transaction/', transaction)
                    .toPromise();
                console.log('[TransactionService] - create() :: Transaction uploaded to the API:', api_result);
                console.log('[TransactionService] - create() :: Marking transaction in the cache as synced:', api_result);
                let update_query = 'UPDATE transactions SET synced_at = (?) WHERE transaction_id = (?)';
                result = yield this.storage.executeSql(update_query, [datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'), transaction.transaction_id]);
                console.log('[TransactionService] - create() :: Transaction marked in the cache as synced:', result);
                console.info('[TransactionService] - create() :: Transaction uploaded and marked as synced');
            }
            catch (exception) {
                console.warn('[TransactionService] - create() :: Failed to create transaction in the API:', transaction, exception);
            }
            return result;
        });
    }
    createRefill(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TransactionService] - create() :: Creating Refill in the cache:', transaction);
            let insert_query = 'INSERT INTO refills (operator_id, from_trailer_id, to_trailer_id, amount) VALUES (?, ?, ?, ?)';
            let result = yield this.storage.executeSql(insert_query, [
                transaction.operator_id,
                transaction.from_trailer_id,
                transaction.to_trailer_id,
                transaction.amount,
            ]);
            console.log('[TransactionService] - create() :: Transaction created in the cache:', result.res.insertId);
            try {
                console.log('[TransactionService] - create() :: Creating TransactionService in the API:', result);
                transaction.transaction_id = result.res.insertId;
                let api_result = yield this.http
                    .post(this.configuration.API_ENDPOINT + '/tank-refill/', transaction)
                    .toPromise();
                console.log('[TransactionService] - create() :: Transaction created in the API:', api_result);
                console.log('[TransactionService] - create() :: Updating Transaction in the cache as synced:', api_result);
                let update_query = `UPDATE refills SET synced_at = (?) WHERE transaction_id = (?)`;
                let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                result = yield this.storage.executeSql(update_query, [
                    datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'),
                    transaction.dipreading_id
                ]);
                console.log('[TransactionService] - create() :: Transaction updated in the cache as synced:', result);
                console.info('[TransactionService] - create() :: Transaction uploaded and marked as synced');
            }
            catch (exception) {
                console.warn('[TransactionService] - create() :: Failed to create Transaction in the API:', transaction, exception);
            }
            return result;
        });
    }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TransactionService] - upload() :: Finding non-synced transactions');
            let select_query = `SELECT 
                          transaction_id, 
                          pad_id, 
                          operator_id, 
                          plant_id, 
                          trailer_id, 
                          odometer, 
                          battery_percentage, 
                          long, 
                          lat, 
                          end_value, 
                          end_total_value, 
                          transaction_end_date, 
                          synced_at 
                          FROM transactions WHERE synced_at IS NULL`;
            let transactions = yield this.storage.executeSql(select_query).then((data) => __awaiter(this, void 0, void 0, function* () {
                console.log('[TransactionService] - upload() :: Found non-synced transaction:', data.res.rows.length);
                let promises = [];
                for (let i = 0; i < data.res.rows.length; i++) {
                    let transaction = data.res.rows.item(i);
                    yield this.http
                        .post(this.configuration.API_ENDPOINT + '/transaction/', transaction)
                        .toPromise();
                    let update_query = 'UPDATE transactions SET synced_at = (?) WHERE transaction_id = (?)';
                    let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                    let promise = yield this.storage.executeSql(update_query, [
                        datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'),
                        transaction.transaction_id
                    ]);
                    promises.push(promise);
                }
                return promises;
            }));
            let transactions2 = yield this.storage.executeSql("SELECT * FROM refills WHERE synced_at IS NULL").then((data) => __awaiter(this, void 0, void 0, function* () {
                console.log('[TransactionService] - upload() :: Found non-synced refill transaction:', data.res.rows.length);
                let promises = [];
                for (let i = 0; i < data.res.rows.length; i++) {
                    let transaction = data.res.rows.item(i);
                    yield this.http
                        .post(this.configuration.API_ENDPOINT + '/tank-refills/', transaction)
                        .toPromise();
                    let update_query = 'UPDATE refills SET synced_at = (?) WHERE transaction_id = (?)';
                    let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                    let promise = yield this.storage.executeSql(update_query, [
                        datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'),
                        transaction.transaction_id
                    ]);
                    promises.push(promise);
                }
                return promises;
            }));
            return Promise.all(transactions);
        });
    }
    uploadRefills() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TransactionService] - upload() :: Finding non-synced transactions');
            let select_query = `SELECT * FROM refills WHERE synced_at IS NULL`;
            let transactions = yield this.storage.executeSql(select_query).then((data) => __awaiter(this, void 0, void 0, function* () {
                console.log('[TransactionService] - upload() :: Found non-synced refill transaction:', data.res.rows.length);
                let promises = [];
                for (let i = 0; i < data.res.rows.length; i++) {
                    let transaction = data.res.rows.item(i);
                    yield this.http
                        .post(this.configuration.API_ENDPOINT + '/tank-refills/', transaction)
                        .toPromise();
                    let update_query = 'UPDATE refills SET synced_at = (?) WHERE transaction_id = (?)';
                    let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                    let promise = yield this.storage.executeSql(update_query, [
                        datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'),
                        transaction.transaction_id
                    ]);
                    promises.push(promise);
                }
                return promises;
            }));
            return Promise.all(transactions);
        });
    }
};
TransactionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_5__sql_service__["a" /* SqlService */]])
], TransactionService);
//# sourceMappingURL=transaction-service.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimesheetService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sql_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};






let TimesheetService = class TimesheetService {
    constructor(http, configuration, storage) {
        console.log('[TimesheetService] - constructor() :: ');
        this.http = http;
        this.configuration = configuration;
        this.storage = storage;
    }
    init() {
        console.log('[TimesheetService] - init() :: Preparing database table');
        return this.storage.executeSql(`CREATE TABLE IF NOT EXISTS timesheets (
      timesheet_id INTEGER PRIMARY KEY AUTOINCREMENT,
      operator_id INTEGER, 
      plant_id INTEGER, 
      start_date TEXT,
      end_date TEXT, 
      start_hours TEXT, 
      end_hours TEXT, 
      synced_at TEXT
    )`);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TimesheetService] - create() :: Creating timesheet in the cache:', data);
            let insert_query = 'INSERT INTO timesheets (operator_id, plant_id, start_date, end_date, start_hours, end_hours) VALUES (?, ?, ?, ?, ?, ?)';
            let result = yield this.storage.executeSql(insert_query, [
                data.operator_id,
                data.plant_id,
                data.start_date,
                data.end_date,
                data.start_hours,
                data.end_hours
            ]);
            console.log('[TimesheetService] - create() :: Timesheet created in the cache:', result.res.insertId);
            try {
                console.log('[TimesheetService] - create() :: Creating timesheetService in the API:', result);
                data.timesheet_id = result.res.insertId;
                let api_result = yield this.http
                    .post(this.configuration.API_ENDPOINT + '/air-trans/', data)
                    .toPromise();
                console.log('[TimesheetService] - create() :: Timesheet created in the API:', api_result);
                console.log('[TimesheetService] - create() :: Updating timesheet in the cache as synced:', api_result);
                let update_query = `UPDATE timesheets SET synced_at = (?) WHERE timesheet_id = (?)`;
                let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                result = yield this.storage.executeSql(update_query, [
                    datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'),
                    data.timesheet_id
                ]);
                console.log('[TimesheetService] - create() :: Timesheet updated in the cache as synced:', result);
                console.info('[TimesheetService] - create() :: Timesheet uploaded and marked as synced');
            }
            catch (exception) {
                console.warn('[TimesheetService] - create() :: Failed to create timesheet in the API:', data, exception);
            }
            return result;
        });
    }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TimesheetService] - upload() :: Finding non-synced timesheets');
            let select_query = 'SELECT timesheet_id, operator_id, plant_id, start_date, end_date, start_hours, end_hours, synced_at FROM timesheets WHERE synced_at IS NULL';
            let timesheets = yield this.storage.executeSql(select_query);
            console.log('[TimesheetService] - upload() :: Found non-synced timesheets:', timesheets.res.rows.length);
            let promises = Array.from(timesheets.res.rows).map((timesheet) => __awaiter(this, void 0, void 0, function* () {
                console.log('[TimesheetService] - upload() :: Updating non-synced timesheet', timesheet);
                yield this.http
                    .post(this.configuration.API_ENDPOINT + '/air-trans/', timesheet)
                    .toPromise();
                let update_query = 'UPDATE timesheets SET synced_at = (?) WHERE timesheet_id = (?)';
                let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                return yield this.storage.executeSql(update_query, [datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'), timesheet.timesheet_id]);
            }));
            return Promise.all(promises);
        });
    }
};
TimesheetService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_5__config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_4__sql_service__["a" /* SqlService */]])
], TimesheetService);
//# sourceMappingURL=timesheet-service.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BluetoothMessage {
}
/* unused harmony export BluetoothMessage */

BluetoothMessage.ESCAPE = String.fromCharCode(0x0A);
BluetoothMessage.FRAME_BOUNDARY = String.fromCharCode(0x1C);
class BluetoothUUID {
}
/* harmony export (immutable) */ __webpack_exports__["d"] = BluetoothUUID;

BluetoothUUID.SERVICE = "569A1101-B87F-490C-92CB-11BA5EA5167C";
BluetoothUUID.READ = "569A2000-B87F-490C-92CB-11BA5EA5167C";
BluetoothUUID.WRITE = "569A2001-B87F-490C-92CB-11BA5EA5167C";
class BluetoothTransactionRequest {
    toString() {
        return `${BluetoothMessage.FRAME_BOUNDARY}{"type":"transactionRequest"}${BluetoothMessage.FRAME_BOUNDARY}`;
    }
    toArrayBuffer() {
        let sendString = this.toString();
        var array = new Uint8Array(sendString.length);
        for (var i = 0, l = sendString.length; i < l; i++) {
            array[i] = sendString.charCodeAt(i);
        }
        return array.buffer;
    }
    toChunkedArrayBuffer() {
        let sendString = this.toString();
        let chunks = sendString.match(/.{1,10}/g);
        let chunkedBuffer = [];
        for (let chunk of chunks) {
            var array = new Uint8Array(chunk.length);
            for (var i = 0, l = chunk.length; i < l; i++) {
                array[i] = chunk.charCodeAt(i);
            }
            chunkedBuffer.push(array.buffer);
        }
        return chunkedBuffer;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = BluetoothTransactionRequest;

class BluetoothAcknowledgement {
    toString() {
        return `${BluetoothMessage.FRAME_BOUNDARY}{"type":"OK"}${BluetoothMessage.FRAME_BOUNDARY}`;
    }
    toArrayBuffer() {
        let sendString = this.toString();
        var array = new Uint8Array(sendString.length);
        for (var i = 0, l = sendString.length; i < l; i++) {
            array[i] = sendString.charCodeAt(i);
        }
        return array.buffer;
    }
    toChunkedArrayBuffer() {
        let sendString = this.toString();
        let chunks = sendString.match(/.{1,10}/g);
        let chunkedBuffer = [];
        for (let chunk of chunks) {
            var array = new Uint8Array(chunk.length);
            for (var i = 0, l = chunk.length; i < l; i++) {
                array[i] = chunk.charCodeAt(i);
            }
            chunkedBuffer.push(array.buffer);
        }
        return chunkedBuffer;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BluetoothAcknowledgement;

class BluetoothResponse {
    constructor(rawBuffer, isString) {
        this.data = null;
        this.type = null;
        //convert raw from array buffer to string as per BLE central plugin https://github.com/don/cordova-plugin-ble-central#typed-arrays
        let raw = "";
        if (!isString) {
            raw = this.bytesToString(rawBuffer);
        }
        else {
            raw = rawBuffer;
        }
        console.debug(`[BluetoothResponse] - constructor() :: "${raw}"`);
        if (raw != `${BluetoothMessage.FRAME_BOUNDARY}` && raw != `${BluetoothMessage.ESCAPE + BluetoothMessage.FRAME_BOUNDARY}` && raw != '') {
            try {
                raw = raw.replace(/\x1C/g, '').replace(/\x0A/g, '');
                let packet = JSON.parse(String(raw.slice(0, raw.length)));
                this.data = packet.data;
                this.type = packet.type;
            }
            catch (error) {
                console.error('[BluetoothResponse] - constructor() ::', error);
                throw error;
            }
        }
    }
    bytesToString(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }
    getData() {
        return this.data;
    }
    isBoundaryOnly() {
        return this.data == null;
    }
    isEmpty() {
        return Object.keys(this.data).length == 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = BluetoothResponse;

//# sourceMappingURL=bluetooth-message.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TankService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sql_service__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};






let TankService = class TankService {
    constructor(http, configuration, storage, events) {
        this.in_progress = false;
        console.log('[TankService] - constructor() :: ');
        this.http = http;
        this.configuration = configuration;
        this.storage = storage;
        this.events = events;
    }
    init() {
        console.log('[TankService] - init() :: Preparing database table');
        return this.storage.executeSql('CREATE TABLE IF NOT EXISTS tanks (id INTEGER PRIMARY KEY, trailer_id INTEGER, trailer_no INTEGER, trailer_name TEXT)');
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TankService] - load() :: Loading tanks from the API');
            if (this.in_progress) {
                console.log('[TankService] - load() :: Loading is already in progress, exit.');
                return null;
            }
            this.in_progress = true;
            let result = yield this.http
                .get(`${this.configuration.API_ENDPOINT}/tanks-dep/${this.configuration.DEPARTMENT_ID}`)
                .toPromise();
            console.log('[TankService] - load() :: Tanks loaded from the API.');
            console.log('[TankService] - load() :: Deleting tanks from the cache.');
            yield this.deleteAll();
            console.log('[TankService] - load() :: Tanks deleted from the cache.');
            console.log('[TankService] - load() :: Creating tanks in the cache.');
            let promises = result.json().Tank.map((item) => __awaiter(this, void 0, void 0, function* () {
                yield this.create(item);
            }));
            console.info('[TankService] - load() :: Tanks loaded from the API and cached.');
            this.events.publish('tanks:loaded');
            console.info('[TankService] - load() :: Event "tanks:loaded" published.');
            this.in_progress = false;
            return Promise.all(promises);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT trailer_id, trailer_no, trailer_name FROM tanks';
            return this.storage.executeSql(query);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT trailer_id, trailer_no, trailer_name FROM tanks WHERE trailer_id = (?)';
            return this.storage.executeSql(query, [id]);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[TankService] - deleteAll() :: Deleting tanks from the cache.');
            return Promise.all([
                this.storage.executeSql('DELETE FROM tanks'),
                this.storage.executeSql('DELETE FROM SQLITE_SEQUENCE WHERE name="tanks"')
            ]);
        });
    }
    create(tank) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'INSERT INTO tanks (trailer_id, trailer_no, trailer_name) VALUES (?, ?, ?)';
            return this.storage.executeSql(query, [tank.trailer_id, tank.trailer_no, tank.trailer_name]);
        });
    }
};
TankService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_5__sql_service__["a" /* SqlService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Events */]])
], TankService);
//# sourceMappingURL=tank-service.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BluetoothService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(186);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let BluetoothService = class BluetoothService {
    constructor(events, toastController, alertController, storage) {
        this.storage = storage;
        this.responses = [];
        //console.log('[BluetoothService] - constructor() :: ');
        this.events = events;
        this.toastController = toastController;
        this.alertCtrl = alertController;
        this.deviceCount = 0;
        this.connected = false;
        //this.deviceCheckInterval = setInterval(() => {
        //this.checkDevices();
        //},10000);        
        this.previouslyConnectedMeter = "";
        this.storage.get("previouslyConnectedMeter").then((uuid) => {
            if (uuid) {
                this.previouslyConnectedMeter = uuid;
            }
        });
        this.devices = [];
        this.chunkedResponse = "";
    }
    checkDevices() {
        this.scanDevices().then((devices) => {
            let count = devices.length;
            if (count !== this.deviceCount) {
                this.deviceCount = count;
                //prompt user if they want to connect to differant device
                this.changeDevice(devices);
            }
        });
    }
    connect(device) {
        //console.log('[BluetoothService] - connect() :: ');
        this.events.publish('meter:connecting');
        ble.isConnected(device.address, () => {
            this.onConnect(device, { status: "device was already connected" });
        }, () => {
            ble.connect(device.address, (deviceDetails) => this.onConnect(device, deviceDetails), (failure) => this.onFail(failure));
        });
    }
    list() {
        //console.log(`[BluetoothService] - list() :: List bound devices`);
        this.responses = new Array();
        this.events.publish('meter:listing');
        this.scanDevices().then((devices) => {
            if (devices.length === 1) {
                this.connect(devices[0]);
                this.storage.set("previouslyConnectedMeter", devices[0].address);
                return;
            }
            else {
                if (this.previouslyConnectedMeter) {
                    for (let device of devices) {
                        if (device.address === this.previouslyConnectedMeter) {
                            this.connect(device);
                            return;
                        }
                    }
                }
                else {
                    this.selectDevice(devices);
                }
            }
        });
    }
    scanDevices() {
        return new Promise((resolve, reject) => {
            let devices = [];
            let addedDevices = [];
            ble.scan([__WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["d" /* BluetoothUUID */].SERVICE], 5, (foundDevice) => {
                let newDevice = { address: foundDevice.id, name: foundDevice.name };
                if (newDevice.name && addedDevices.indexOf(newDevice.name) < 0) {
                    //alert(JSON.stringify(foundDevice))
                    devices.push(newDevice);
                    addedDevices.push(newDevice.name);
                }
            }, (failure) => this.onFail(failure));
            setTimeout(() => {
                resolve(devices);
            }, 5500);
        });
    }
    selectDevice(devices) {
        this.events.publish('meter:listingselect');
        this.deviceCount = devices.length;
        let inputs = [];
        let inputsIndexed = {};
        for (var index in devices) {
            let device = devices[index];
            inputs.push({
                type: "radio",
                name: "device" + index,
                value: index,
                label: device.name
            });
            inputsIndexed[index] = device;
        }
        let alert = this.alertCtrl.create({
            title: 'Select Device',
            inputs: inputs,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Connect',
                    handler: deviceIndex => {
                        if (deviceIndex) {
                            this.events.publish('meter:listingselected');
                            let device = inputsIndexed[deviceIndex];
                            this.storage.set("previouslyConnectedMeter", device.address);
                            this.connect(device);
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    changeDevice(devices) {
        let inputs = [];
        let inputsIndexed = {};
        for (var index in devices) {
            let device = devices[index];
            inputs.push({
                type: "radio",
                name: "device" + index,
                value: index,
                label: device.name
            });
            inputsIndexed[index] = device;
        }
        let alert = this.alertCtrl.create({
            title: 'Select Device',
            subTitle: 'The devices in your bluetooth network have changed',
            message: 'If you wish to change to another meter, select it from the list, otherwise press cancel to continue on the current meter.',
            inputs: inputs,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Connect',
                    handler: deviceIndex => {
                        if (deviceIndex) {
                            let device = inputsIndexed[deviceIndex];
                            this.events.publish('meter:connecting');
                            this.storage.set("previouslyConnectedMeter", device.address);
                            this.connect(device);
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    request(device) {
        //console.log('[BluetoothService] - request() :: Sending transaction request to the BT device');
        this.events.publish('meter:reading');
        let chunkedBuffer = (new __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["c" /* BluetoothTransactionRequest */]()).toChunkedArrayBuffer();
        for (let chunk of chunkedBuffer) {
            ble.write(device.address, __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["d" /* BluetoothUUID */].SERVICE, __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["d" /* BluetoothUUID */].WRITE, chunk, () => this.onRequestComplete(), (failure) => this.onFail(failure));
        }
    }
    requestAll() {
        //console.log('[BluetoothService] - requestAll() :: Sending transaction request to the BT device');
    }
    acknowledge(device) {
        //console.log('[BluetoothService] - acknowledge() :: Sending acknowledge to the BT device');
        let chunkedBuffer = (new __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["a" /* BluetoothAcknowledgement */]()).toChunkedArrayBuffer();
        for (let chunk of chunkedBuffer) {
            ble.write(device.address, __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["d" /* BluetoothUUID */].SERVICE, __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["d" /* BluetoothUUID */].WRITE, chunk, () => this.onAcknowledge(device), (failure) => this.onFail(failure));
        }
    }
    onConnect(device, deviceDetails) {
        //console.info(`[BluetoothService] - onConnect() :: Connected to BT device ${device.address}.`);
        let alertBox = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'You are now connected to ' + device.name,
            buttons: ['Dismiss']
        });
        alertBox.present();
        /*
         * for debugging purposes
        let alertBox2 = this.alertCtrl.create({
          title: 'Device Details',
          subTitle: JSON.stringify(deviceDetails),
          buttons: ['Dismiss']
        });
        alertBox2.present();
        
        */
        ble.startNotification(device.address, __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["d" /* BluetoothUUID */].SERVICE, __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["d" /* BluetoothUUID */].READ, (data) => this.onData(data, device), (failure) => this.onFail(failure));
        this.request(device);
        /*
        setTimeout(() => {
            let alertBox = this.alertCtrl.create({
              title: 'Request Again',
              subTitle: 'Make the request again',
              buttons: [      {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  this.events.publish('meter:complete');
                  ble.disconnect(device.address);
                }
              },
              {
                text: 'Request',
                handler: () => {
                    this.request(device);
                }
              }]
            });
            alertBox.present();
        },10000);
        
        */
    }
    onData(data, device) {
        /*
        let alertBox = this.alertCtrl.create({
          title: 'Response Received',
          subTitle: String.fromCharCode.apply(null, new Uint8Array(data)),
          buttons: ['Dismiss']
        });
        alertBox.present();
        
        */
        let response;
        try {
            response = new __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["b" /* BluetoothResponse */](data, false);
        }
        catch (error) {
            this.chunkedResponse = this.chunkedResponse + String.fromCharCode.apply(null, new Uint8Array(data));
            /*
            let alertBox2 = this.alertCtrl.create({
              title: 'Current Position',
              subTitle: this.chunkedResponse,
              buttons: ['Dismiss']
            });
            alertBox2.present();
            
            */
            try {
                response = new __WEBPACK_IMPORTED_MODULE_3__models_bluetooth_message__["b" /* BluetoothResponse */](this.chunkedResponse, true);
            }
            catch (error) {
                /*
                let alertBox3 = this.alertCtrl.create({
                  title: 'Error converting response',
                  subTitle: error,
                  buttons: ['Dismiss']
                });
                alertBox3.present();
                
                */
                return;
            }
            /*
          let alertBox = this.alertCtrl.create({
            title: 'Full Response Captured',
            subTitle: this.chunkedResponse,
            buttons: ['Dismiss']
          });
          alertBox.present();
          */
            this.chunkedResponse = "";
        }
        // If the response is just a boundary, drop the response.
        if (response.isBoundaryOnly()) {
            return;
        }
        // If the response is not empty, store it until we get an empty response
        if (!response.isEmpty()) {
            //console.log('[BluetoothService] - onData() :: Received data from the BT device', response);
            this.responses.push(response);
            this.acknowledge(device);
        }
        else {
            //console.log('[BluetoothService] - onData() :: Finished receiving data from the BT device.');
            if (this.responses && this.responses.length > 0) {
                //console.log('[BluetoothService] - onData() :: Publishing the received data.', this.responses);
                //console.info('[BluetoothService] - onData() :: Publishing the received data.');
                this.events.publish('meter:data', this.responses);
            }
            this.events.publish('meter:complete');
            ble.disconnect(device.address);
        }
    }
    onRequestComplete() {
        /*
        let alertBox = this.alertCtrl.create({
          title: 'Data Requested',
          subTitle: 'Data successfully requested from meter',
          buttons: ['Dismiss']
        });
        alertBox.present();
        
        */
        //console.log('[BluetoothService] - onRequestComplete() :: Transaction request sent to BT device');
    }
    onAcknowledge(device) {
        //console.log('[BluetoothService] - onAcknowledge() :: Acknowledge sent to BT device');      
        this.request(device);
    }
    onFail(failure) {
        let message = "";
        try {
            message = JSON.stringify(failure);
        }
        catch (e) {
            message = failure;
        }
        console.warn('[BluetoothService] - onFail() :: ', failure);
        this.events.publish('meter:complete');
        let toast = this.toastController.create({
            message: failure,
            duration: 5000,
            cssClass: 'toast-error'
        });
        this.events.publish('database:synced');
        toast.present();
        this.storage.get("previouslyConnectedMeter").then((uuid) => {
            if (uuid) {
                ble.disconnect(uuid);
            }
        });
    }
};
BluetoothService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* Storage */]])
], BluetoothService);
//# sourceMappingURL=bluetooth-service.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DipReadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sql_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};






let DipReadingService = class DipReadingService {
    constructor(http, configuration, storage) {
        console.log('[DipReadingService] - constructor() :: ');
        this.http = http;
        this.configuration = configuration;
        this.storage = storage;
    }
    init() {
        console.log('[DipReadingService] - init() :: Preparing database table');
        return this.storage.executeSql(`CREATE TABLE IF NOT EXISTS dipreadings (
      dipreading_id INTEGER PRIMARY KEY AUTOINCREMENT,
      operator_id INTEGER, 
      trailer_id INTEGER, 
      reading TEXT,
      synced_at TEXT
    )`);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[DipReadingService] - create() :: Creating DipReading in the cache:', data);
            let insert_query = 'INSERT INTO dipreadings (operator_id, trailer_id, reading) VALUES (?, ?, ?)';
            let result = yield this.storage.executeSql(insert_query, [
                data.operator_id,
                data.trailer_id,
                data.reading
            ]);
            console.log('[DipReadingService] - create() :: DipReading created in the cache:', result.res.insertId);
            try {
                console.log('[DipReadingService] - create() :: Creating DipReadingService in the API:', result);
                data.dipreading_id = result.res.insertId;
                let api_result = yield this.http
                    .post(this.configuration.API_ENDPOINT + '/tank-dip/', data)
                    .toPromise();
                console.log('[DipReadingService] - create() :: DipReading created in the API:', api_result);
                console.log('[DipReadingService] - create() :: Updating DipReading in the cache as synced:', api_result);
                let update_query = `UPDATE dipreadings SET synced_at = (?) WHERE dipreading_id = (?)`;
                let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                result = yield this.storage.executeSql(update_query, [
                    datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'),
                    data.dipreading_id
                ]);
                console.log('[DipReadingService] - create() :: DipReading updated in the cache as synced:', result);
                console.info('[DipReadingService] - create() :: DipReading uploaded and marked as synced');
            }
            catch (exception) {
                console.warn('[DipReadingService] - create() :: Failed to create DipReading in the API:', data, exception);
            }
            return result;
        });
    }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[DipReadingService] - upload() :: Finding non-synced DipReadings');
            let select_query = 'SELECT dipreading_id, operator_id, trailer_id, reading, synced_at FROM dipreadings WHERE synced_at IS NULL';
            let dipreadings = yield this.storage.executeSql(select_query);
            console.log('[DipReadingService] - upload() :: Found non-synced DipReading:', dipreadings.res.rows.length);
            let promises = Array.from(dipreadings.res.rows).map((dipreading) => __awaiter(this, void 0, void 0, function* () {
                console.log('[DipReadingService] - upload() :: Updating non-synced DipReading', dipreading);
                yield this.http
                    .post(this.configuration.API_ENDPOINT + '/tank-dip/', dipreading)
                    .toPromise();
                let update_query = 'UPDATE dipreadings SET synced_at = (?) WHERE dipreading_id = (?)';
                let datePipe = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */](this.configuration.LOCALE);
                return yield this.storage.executeSql(update_query, [datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'), dipreading.dipreading_id]);
            }));
            return Promise.all(promises);
        });
    }
};
DipReadingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_5__config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_4__sql_service__["a" /* SqlService */]])
], DipReadingService);
//# sourceMappingURL=dipreading-service.js.map

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 243;

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_configuration_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let LoginPage = class LoginPage {
    constructor(navigationController, builder, configurationService, operatorService) {
        this.navigationController = navigationController;
        this.builder = builder;
        this.state = 'default';
        this.loginForm = builder.group({
            'pin_no': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required]
        });
        this.navigation = navigationController;
        this.configurationService = configurationService;
        this.operatorService = operatorService;
        this.configurationService.get('operator').then(operator => {
            console.log('[LoginPage] constructor() :: ', operator);
            if (operator != null) {
                this.navigation.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            }
        });
    }
    onSubmit(data) {
        console.log('[LoginPage] - onSubmit() :: Attempt to login ', data);
        this.state = 'working';
        this.operatorService.findByPinCode(data.pin_no).then(operator => {
            if (operator.res.rows.length == 1) {
                console.log('[LoginPage] - onSubmit() :: Found operator for the provided PIN', operator.res.rows.item(0));
                this.configurationService.set('operator', operator.res.rows.item(0)).then(result => {
                    console.log('[LoginPage] - onSubmit() :: Current operator set in config to:', operator.res.rows.item(0));
                    this.state = 'default';
                    this.navigation.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }, failure => {
                    console.log('[LoginPage] - onSubmit() :: Failed to set the current operator to config:', failure);
                    this.state = 'default';
                    this.configurationService.remove('operator');
                });
            }
            else {
                console.log('[LoginPage] - onSubmit() :: Found incorrect number of operators for the provided PIN', operator.res.rows.length);
                this.state = 'default';
                this.configurationService.remove('operator');
            }
        }, failure => {
            console.log('[LoginPage] - onSubmit() :: Failed to find operator for the provided PIN', failure);
            this.state = 'default';
            this.configurationService.remove('operator');
        });
    }
};
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\login\login.html"*/'\n<ion-content padding class="form login">\n        <div class="logo-image"><img src="assets/img/logo.png"></div>\n        <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">\n            <ion-item>\n                <ion-label floating>PIN</ion-label>\n                <ion-input type="number" formControlName="pin_no" class="numeric-password text-centre"></ion-input>\n            </ion-item>\n            <ion-item>\n                <button type="submit" block ion-button [disabled]="state==\'working\'"><ion-icon name="log-in"></ion-icon> Login</button>\n            </ion-item>\n\n        </form>\n        \n		<div class="app-version">Version 0.0.19</div>\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\login\login.html"*/
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5__providers_configuration_service__["a" /* ConfigurationService */], __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__["a" /* OperatorService */]])
], LoginPage);
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transaction_transaction__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timesheet_timesheet__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dipreading_dipreading__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tanktotank_tanktotank__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let TabsPage = class TabsPage {
    constructor(popoverController) {
        this.popoverController = popoverController;
        this.transaction = __WEBPACK_IMPORTED_MODULE_2__transaction_transaction__["a" /* CreateTransactionPage */];
        this.timesheet = __WEBPACK_IMPORTED_MODULE_3__timesheet_timesheet__["a" /* CreateTimesheetPage */];
        this.dipreading = __WEBPACK_IMPORTED_MODULE_4__dipreading_dipreading__["a" /* CreateDipReadingPage */];
        this.tanktotank = __WEBPACK_IMPORTED_MODULE_5__tanktotank_tanktotank__["a" /* CreateTankToTankPage */];
    }
};
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\tabs\tabs.html"*/'<ion-tabs class="tabs-basic">\n    <ion-tab tabTitle="Transaction" [root]="transaction"></ion-tab>\n    <ion-tab tabTitle="Tank To Tank" [root]="tanktotank"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\tabs\tabs.html"*/
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
], TabsPage);
//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_configuration_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_plant_service__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_transaction_service__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_operator_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_timesheet_service__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_bluetooth_service__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_native__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















let CreateTransactionPage = class CreateTransactionPage {
    constructor(builder, loadingController, toastController, configurationService, plantService, transactionService, operatorService, timesheetService, bluetoothService, events, zone) {
        this.builder = builder;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.configurationService = configurationService;
        this.plantService = plantService;
        this.transactionService = transactionService;
        this.operatorService = operatorService;
        this.timesheetService = timesheetService;
        this.bluetoothService = bluetoothService;
        this.events = events;
        this.zone = zone;
        this.transactionForm = builder.group({
            'driver_name': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'trailer_id': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            'plant_id': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'start_value': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            'end_value': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            'transaction_end_date': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
        });
        this.events.subscribe('plants:loaded', event => this.populatePlants(event));
        this.populatePlants(null);
        this.configurationService.get('operator').then(operator => {
            console.log('[CreateTransactionPage] - constructor() :: operator:', operator);
            this.operator = operator;
            this.transactionForm.patchValue({ driver_name: `${this.operator.first_name}` });
        });
        this.configurationService.get('plant').then(plant_id => {
            console.log('[CreateTransactionPage] - constructor() :: plant_id:', plant_id);
            this.transactionForm.patchValue({ plant_id: plant_id });
        });
        this.onMeterData = (responses) => {
            this._onMeterData(responses);
        };
        this.onMeterComplete = () => {
            this._onMeterComplete();
        };
        this.onMeterListing = (event) => {
            this.loader.setContent('Listing meters.');
        };
        this.onMeterListingSelect = (event) => {
            this.loader.dismiss();
        };
        this.onMeterListingSelected = (event) => {
            this.loader.present();
            this.loader.setContent('Meter Selected.');
        };
        this.onMeterConnecting = (event) => {
            this.loader.setContent('Connecting to meter.');
        };
        this.onMeterConnected = (event) => {
            this.loader.setContent('Connected to meter.');
        };
        this.onMeterReading = (event) => {
            this.loader.setContent('Reading data.');
        };
    }
    populatePlants(events) {
        console.log(`[CreateTransactionPage] - populatePlants() :: Attempt to load plants from cache, with mode ${events}`);
        this.plantService.findAll().then(data => {
            console.log(`[CreateTransactionPage] - populatePlants() :: Found ${data.res.rows.length} plants in cache.`);
            this.plants = [];
            for (let i = 0; i < data.res.rows.length; i++) {
                this.plants.push({
                    "plant_id": data.res.rows.item(i).plant_id,
                    "tail_no": data.res.rows.item(i).tail_no,
                });
            }
            console.log(`[CreateTransactionPage] - populatePlants() :: Plants found are ${this.plants}`);
        });
    }
    openSettings(event) {
        console.log('[CreateTransactionPage] - openSettings()');
        this.events.publish('settings:open', event);
    }
    readMeter(event) {
        console.log('[CreateTransactionPage] - readMeter() :: ');
        this.events.subscribe('meter:listing', this.onMeterListing);
        this.events.subscribe('meter:listingselect', this.onMeterListingSelect);
        this.events.subscribe('meter:connecting', this.onMeterConnecting);
        this.events.subscribe('meter:connected', this.onMeterConnected);
        this.events.subscribe('meter:reading', this.onMeterReading);
        this.events.subscribe('meter:complete', this.onMeterComplete);
        this.events.subscribe('meter:data', this.onMeterData);
        this.loader = this.loadingController.create({ content: "Contacting meter." });
        this.loader.present();
        this.bluetoothService.list();
    }
    _onMeterComplete() {
        //this.events.unsubscribe('meter:complete',   this.onMeterComplete);
        this.loader.dismiss();
    }
    _onMeterData(responses) {
        console.log('[CreateTransactionPage] - _onMeterData() :: ', responses);
        // Unsubscribe of further BT data until the Read button pushed again
        this.events.unsubscribe('meter:data', this.onMeterData);
        this.events.unsubscribe('meter:listing', this.onMeterListing);
        this.events.unsubscribe('meter:connecting', this.onMeterConnecting);
        this.events.unsubscribe('meter:connected', this.onMeterConnected);
        this.events.unsubscribe('meter:reading', this.onMeterReading);
        // Grab the last response, which is the current one, and write it to the UI
        let response = responses.pop();
        if (!response) {
            console.warn('[CreateTransactionPage] - _onMeterData() :: Received empty response, exiting.', response);
            return;
        }
        this.zone.run(() => {
            this.transactionForm.patchValue({ trailer_id: response.getData().meterID });
            this.transactionForm.patchValue({ start_value: response.getData().startVolume });
            this.transactionForm.patchValue({ end_value: response.getData().endVolume });
            this.transactionForm.patchValue({ transaction_end_date: response.getData().endDateTime });
        });
        // The rest should be stored and uploaded to the API in the background, with blanking out data we don't know
        responses.forEach(element => {
            console.log('[CreateTransactionPage] - _onMeterData() :: Got BT data to upload in the background');
            let transaction = {
                pad_id: '-1',
                operator_id: this.operator.operator_id,
                battery_percentage: '-1',
                long: -1,
                lat: -1,
                transaction_end_date: element.getData().endDateTime,
                end_total_value: element.getData().endVolume,
                end_value: element.getData().startVolume,
                plant_id: this.transactionForm.controls['plant_id'].value,
                trailer_id: response.getData().meterID,
                odometer: '-1'
            };
            this.transactionService.create(transaction);
        });
        this.onSubmit(this.transactionForm.value);
    }
    onSubmit(data) {
        console.log('[CreateTransactionPage] - onSubmit() :: Attempt to create transaction from data ', data);
        this.configurationService.set('plant', data.plant_id);
        let timestampDate = new Date();
        let timestamp = timestampDate.getDate() + "/"
            + (timestampDate.getMonth() + 1) + "/"
            + timestampDate.getFullYear() + " "
            + timestampDate.getHours() + ":"
            + timestampDate.getMinutes() + ":"
            + timestampDate.getSeconds();
        let transaction = {
            pad_id: '-1',
            operator_id: this.operator.operator_id,
            battery_percentage: '-1',
            long: -1,
            lat: -1,
            transaction_end_date: data.transaction_end_date,
            end_total_value: data.end_value,
            end_value: data.start_value,
            plant_id: data.plant_id,
            trailer_id: data.trailer_id,
            odometer: '-1',
            local_timestamp: timestamp
        };
        let location_request = __WEBPACK_IMPORTED_MODULE_9_ionic_native__["b" /* Geolocation */].getCurrentPosition({ timeout: 10000 });
        location_request.then((response) => {
            console.log('[CreateTransactionPage] - onSubmit() :: Got geolocation data, creating transaction ', data);
            transaction.long = response.coords.longitude;
            transaction.lat = response.coords.latitude;
            this.createTransaction(transaction);
        }, (failure) => {
            console.log('[CreateTransactionPage] - onSubmit() :: Failed to get geolocation ', data);
            this.createTransaction(transaction);
        }).catch(() => {
            this.createTransaction(transaction);
        });
    }
    getGPS() {
        let location_request = __WEBPACK_IMPORTED_MODULE_9_ionic_native__["b" /* Geolocation */].getCurrentPosition({ timeout: 10000 });
        location_request.then((response) => {
            let res = JSON.stringify(response);
            console.log(response);
        }, (failure) => {
            console.log(failure);
            let fail = JSON.stringify(failure);
        }).catch((e) => {
            console.log(e);
        });
    }
    createTransaction(transaction) {
        this.transactionService.create(transaction).then(result => {
            this.transactionForm.patchValue({ start_value: null });
            this.transactionForm.patchValue({ end_value: null });
            this.transactionForm.patchValue({ trailer_id: null });
            let toast = this.toastController.create({
                message: 'Transaction saved!',
                duration: 2000
            });
            toast.present();
        }, failure => {
            let toast = this.toastController.create({
                message: 'Error saving transaction!',
                duration: 2000,
                cssClass: 'toast-error'
            });
            toast.present();
        });
    }
    aircraftChanged() {
        let toast = this.toastController.create({
            message: 'Aircraft Changed',
            duration: 2000
        });
        toast.present();
    }
};
CreateTransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\transaction\create.html"*/'<ion-header>\n\n    <ion-toolbar color="primary">\n        <ion-title>Transactions</ion-title>\n        <ion-buttons end>\n            <button royal (click)="openSettings($event)" ion-button>\n                <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n  \n</ion-header>\n\n<ion-content padding class="form" scroll="false">\n    <ion-list>\n        <form [formGroup]="transactionForm" (ngSubmit)="onSubmit(transactionForm.value)">\n\n            <ion-item>\n                <ion-label floating>Operator</ion-label>\n                <ion-input type="text" formControlName="driver_name" readonly="true"></ion-input>\n                <ion-input class="hide-input" type="hidden" formControlName="transaction_end_date" readonly="true"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>Aircraft number</ion-label>\n                <ion-select formControlName="plant_id" (ionChange)="aircraftChanged()">\n                    <ion-option *ngFor="let plant of plants" value="{{plant.plant_id}}">{{plant.tail_no}}</ion-option>\n                </ion-select>\n            </ion-item>\n\n            <ion-item>\n                <ion-label fixed>Loader number</ion-label>\n                <ion-input type="text" formControlName="trailer_id" readonly="true"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label fixed>Start value</ion-label>\n                <ion-input type="text" formControlName="start_value" readonly="true"></ion-input>            \n            </ion-item>\n\n            <ion-item>\n                <ion-label fixed>End value</ion-label>\n                <ion-input type="text" formControlName="end_value" readonly="true"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <button ion-button outline item-right (click)="readMeter($event)"  block [disabled]="!transactionForm.valid" type="button">Fuelling Completed</button>\n            </ion-item>\n\n        </form>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\transaction\create.html"*/
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_configuration_service__["a" /* ConfigurationService */], __WEBPACK_IMPORTED_MODULE_4__providers_plant_service__["a" /* PlantService */], __WEBPACK_IMPORTED_MODULE_5__providers_transaction_service__["a" /* TransactionService */], __WEBPACK_IMPORTED_MODULE_6__providers_operator_service__["a" /* OperatorService */], __WEBPACK_IMPORTED_MODULE_7__providers_timesheet_service__["a" /* TimesheetService */], __WEBPACK_IMPORTED_MODULE_8__providers_bluetooth_service__["a" /* BluetoothService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* NgZone */]])
], CreateTransactionPage);
//# sourceMappingURL=transaction.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTimesheetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_plant_service__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_timesheet_service__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_configuration_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










let CreateTimesheetPage = class CreateTimesheetPage {
    constructor(events, builder, toastController, plantService, operatorService, timesheetService, configurationService) {
        this.events = events;
        this.builder = builder;
        this.toastController = toastController;
        this.plantService = plantService;
        this.operatorService = operatorService;
        this.timesheetService = timesheetService;
        this.configurationService = configurationService;
        this.timesheetForm = builder.group({
            'plant_id': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'start_hours': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'end_hours': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'start_date': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            'end_date': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
        });
        this.timesheetForm.controls['start_hours'].valueChanges.subscribe(data => {
            console.log('[CreateTimesheetPage] - start_hours.valueChanges() :: Control "start_hours" is dirty, patch "start_date" timestamp');
            this.timesheetForm.patchValue({ start_date: Date.now() / 1000 });
        });
        this.timesheetForm.controls['end_hours'].valueChanges.subscribe(data => {
            console.log('[CreateTimesheetPage] - end_hours.valueChanges() :: Control "end_hours" is dirty, patch "end_date" timestamp');
            this.timesheetForm.patchValue({ end_date: Date.now() / 1000 });
        });
        this.events.subscribe('plants:loaded', event => this.populatePlants(event));
        this.populatePlants(null);
        configurationService.get('operator').then(operator => {
            this.operator = operator;
        });
        this.configurationService.get('plant').then(plant_id => {
            console.log('[CreateTimesheetPage] - constructor() :: plant_id: ', plant_id);
            this.timesheetForm.patchValue({ plant_id: plant_id });
        });
    }
    populatePlants(events) {
        console.log(`[CreateTimesheetPage] - populatePlants() :: Attempt to load plants from cache, with mode ${events}`);
        this.plantService.findAll().then(data => {
            console.log(`[CreateTimesheetPage] - populatePlants() :: Found ${data.res.rows.length} plants in cache.`);
            this.plants = [];
            for (let i = 0; i < data.res.rows.length; i++) {
                this.plants.push({
                    "plant_id": data.res.rows.item(i).plant_id,
                    "tail_no": data.res.rows.item(i).tail_no,
                });
            }
            console.log(`[CreateTimesheetPage] - populatePlants() :: Plants found are ${this.plants}`);
        });
    }
    openSettings(event) {
        console.log('[CreateTimesheetPage] - openSettings()');
        this.events.publish('settings:open', event);
    }
    onSubmit(data) {
        console.log('[CreateTimesheetPage] - onSubmit() :: Attempt to create timesheet from data ', data);
        let timesheet = {
            plant_id: data.plant_id,
            operator_id: this.operator.operator_id,
            start_date: data.start_date,
            end_date: data.end_date,
            start_hours: data.start_hours,
            end_hours: data.end_hours
        };
        this.timesheetService.create(timesheet).then(result => {
            this.timesheetForm.patchValue({ start_hours: null });
            this.timesheetForm.patchValue({ end_hours: null });
            let toast = this.toastController.create({
                message: 'Aircraft hour saved!',
                duration: 2000
            });
            toast.present();
        }, failure => {
            let toast = this.toastController.create({
                message: 'Error saving aircraft hour!',
                duration: 2000,
                cssClass: 'toast-error'
            });
            toast.present();
        });
    }
};
CreateTimesheetPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\timesheet\create.html"*/'<ion-header  color="primary">\n    <ion-toolbar default>\n        <ion-title>Aircraft hours</ion-title>\n        <ion-buttons end>\n            <button royal (click)="openSettings($event)" ion-button>\n                <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding class="form">\n    <ion-list>\n\n        <form [formGroup]="timesheetForm" (ngSubmit)="onSubmit(timesheetForm.value)">\n            \n            <ion-input type="hidden" formControlName="start_hours"></ion-input>\n            <ion-input type="hidden" formControlName="end_hours"></ion-input>                \n\n            <ion-item>\n                <ion-label floating>Aircraft number</ion-label>\n                <ion-select formControlName="plant_id">\n                    <ion-option *ngFor="let plant of plants" value="{{plant.plant_id}}">{{plant.tail_no}}</ion-option>\n                </ion-select>\n            </ion-item>\n\n            <ion-item>\n                <ion-label>Start hours</ion-label>\n                <ion-input type="number" formControlName="start_hours"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label>End hours</ion-label>\n                <ion-input type="number" formControlName="end_hours"></ion-input>                \n            </ion-item>\n\n            <ion-item>\n                <button type="submit" block [disabled]="!timesheetForm.valid" ion-button><ion-icon name="add"></ion-icon>Add</button>\n            </ion-item>\n        </form>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\timesheet\create.html"*/
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_plant_service__["a" /* PlantService */], __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__["a" /* OperatorService */], __WEBPACK_IMPORTED_MODULE_5__providers_timesheet_service__["a" /* TimesheetService */], __WEBPACK_IMPORTED_MODULE_6__providers_configuration_service__["a" /* ConfigurationService */]])
], CreateTimesheetPage);
//# sourceMappingURL=timesheet.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateDipReadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tank_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dipreading_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_configuration_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










let CreateDipReadingPage = class CreateDipReadingPage {
    constructor(events, builder, toastController, tankService, operatorService, dipReadingService, configurationService) {
        this.events = events;
        this.builder = builder;
        this.toastController = toastController;
        this.tankService = tankService;
        this.operatorService = operatorService;
        this.dipReadingService = dipReadingService;
        this.configurationService = configurationService;
        this.dipReadingForm = builder.group({
            'trailer_id': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'reading': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required)
        });
        this.events.subscribe('tanks:loaded', event => this.populateTanks(event));
        this.populateTanks(null);
        configurationService.get('operator').then(operator => {
            this.operator = operator;
        });
        this.configurationService.get('tank').then(trailer_id => {
            console.log('[CreateDipReadingPage] - constructor() :: trailer_id: ', trailer_id);
            this.dipReadingForm.patchValue({ trailer_id: trailer_id });
        });
    }
    populateTanks(events) {
        console.log(`[CreateDipReadingPage] - populateTanks() :: Attempt to load tanks from cache, with mode ${events}`);
        this.tankService.findAll().then(data => {
            console.log(`[CreateDipReadingPage] - populateTanks() :: Found ${data.res.rows.length} tanks in cache.`);
            this.tanks = [];
            for (let i = 0; i < data.res.rows.length; i++) {
                this.tanks.push({
                    "trailer_id": data.res.rows.item(i).trailer_id,
                    "trailer_no": data.res.rows.item(i).trailer_no,
                    "trailer_name": data.res.rows.item(i).trailer_name,
                });
            }
            console.log(`[CreateDipReadingPage] - populateTanks() :: Tanks found are ${this.tanks}`);
        });
    }
    openSettings(event) {
        console.log('[CreateDipReadingPage] - openSettings()');
        this.events.publish('settings:open', event);
    }
    onSubmit(data) {
        console.log('[CreateDipReadingPage] - onSubmit() :: Attempt to create DipReading from data ', data);
        let dipReading = {
            trailer_id: data.trailer_id,
            operator_id: this.operator.operator_id,
            reading: data.reading
        };
        this.dipReadingService.create(dipReading).then(result => {
            let toast = this.toastController.create({
                message: 'Dip reading saved!',
                duration: 2000
            });
            toast.present();
            this.dipReadingForm.patchValue({ trailer_id: null });
            this.dipReadingForm.patchValue({ reading: null });
        }, failure => {
            let toast = this.toastController.create({
                message: 'Error saving dip reading!',
                duration: 2000,
                cssClass: 'toast-error'
            });
            toast.present();
        });
    }
};
CreateDipReadingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        selector: 'page-dipreading',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\dipreading\create.html"*/'<ion-header  color="primary">\n    <ion-toolbar default>\n        <ion-title>Dip Readings</ion-title>\n        <ion-buttons end>\n            <button royal (click)="openSettings($event)" ion-button>\n                <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding class="form">\n    <ion-list>\n\n        <form [formGroup]="dipReadingForm" (ngSubmit)="onSubmit(dipReadingForm.value)">\n               \n\n            <ion-item>\n                <ion-label floating>Tank</ion-label>\n                <ion-select formControlName="trailer_id">\n                    <ion-option *ngFor="let tank of tanks" value="{{tank.trailer_id}}">{{tank.trailer_name}}</ion-option>\n                </ion-select>\n            </ion-item>\n\n            <ion-item>\n                <ion-label>Reading</ion-label>\n                <ion-input type="number" formControlName="reading"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <button type="submit" block [disabled]="!dipReadingForm.valid" ion-button><ion-icon name="add"></ion-icon>Add</button>\n            </ion-item>\n        </form>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\dipreading\create.html"*/
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_tank_service__["a" /* TankService */], __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__["a" /* OperatorService */], __WEBPACK_IMPORTED_MODULE_5__providers_dipreading_service__["a" /* DipReadingService */], __WEBPACK_IMPORTED_MODULE_6__providers_configuration_service__["a" /* ConfigurationService */]])
], CreateDipReadingPage);
//# sourceMappingURL=dipreading.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTankToTankPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tank_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_transaction_service__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_configuration_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










let CreateTankToTankPage = class CreateTankToTankPage {
    constructor(events, builder, toastController, tankService, operatorService, transactionService, configurationService) {
        this.events = events;
        this.builder = builder;
        this.toastController = toastController;
        this.tankService = tankService;
        this.operatorService = operatorService;
        this.transactionService = transactionService;
        this.configurationService = configurationService;
        this.tankToTankForm = builder.group({
            'from_trailer_id': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'to_trailer_id': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            'amount': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required)
        });
        this.events.subscribe('tanks:loaded', event => this.populateTanks(event));
        this.populateTanks(null);
        configurationService.get('operator').then(operator => {
            this.operator = operator;
        });
        this.configurationService.get('tank').then(trailer_id => {
            console.log('[CreateTankToTankPage] - constructor() :: trailer_id: ', trailer_id);
            this.tankToTankForm.patchValue({ from_trailer_id: trailer_id });
        });
    }
    populateTanks(events) {
        console.log(`[CreateTankToTankPage] - populateTanks() :: Attempt to load tanks from cache, with mode ${events}`);
        this.tankService.findAll().then(data => {
            console.log(`[CreateTankToTankPage] - populateTanks() :: Found ${data.res.rows.length} tanks in cache.`);
            this.tanks = [];
            for (let i = 0; i < data.res.rows.length; i++) {
                this.tanks.push({
                    "trailer_id": data.res.rows.item(i).trailer_id,
                    "trailer_no": data.res.rows.item(i).trailer_no,
                    "trailer_name": data.res.rows.item(i).trailer_name,
                });
            }
            console.log(`[CreateTankToTankPage] - populateTanks() :: Tanks found are ${this.tanks}`);
        });
    }
    openSettings(event) {
        console.log('[CreateTankToTankPage] - openSettings()');
        this.events.publish('settings:open', event);
    }
    onSubmit(data) {
        console.log('[CreateTankToTankPage] - onSubmit() :: Attempt to create TankToTank from data ', data);
        let refill = {
            from_trailer_id: data.from_trailer_id,
            to_trailer_id: data.to_trailer_id,
            operator_id: this.operator.operator_id,
            amount: data.amount
        };
        this.transactionService.createRefill(refill).then(result => {
            let toast = this.toastController.create({
                message: 'Transaction saved!',
                duration: 2000
            });
            toast.present();
            this.tankToTankForm.patchValue({ from_trailer_id: null });
            this.tankToTankForm.patchValue({ to_trailer_id: null });
            this.tankToTankForm.patchValue({ amount: null });
        }, failure => {
            alert(failure);
            alert(JSON.parse(failure));
            let toast = this.toastController.create({
                message: 'Error saving transaction!',
                duration: 2000,
                cssClass: 'toast-error'
            });
            toast.present();
        });
    }
};
CreateTankToTankPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        selector: 'page-tanktotank',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\tanktotank\create.html"*/'<ion-header>\n    <ion-toolbar   color="primary">\n        <ion-title>Tank To Tank Transaction</ion-title>\n        <ion-buttons end>\n            <button royal (click)="openSettings($event)" ion-button>\n                <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding class="form">\n    <ion-list>\n\n        <form [formGroup]="tankToTankForm" (ngSubmit)="onSubmit(tankToTankForm.value)">\n               \n\n            <ion-item>\n                <ion-label floating>From Tank</ion-label>\n                <ion-select formControlName="from_trailer_id">\n                    <ion-option *ngFor="let tank of tanks" value="{{tank.trailer_id}}">{{tank.trailer_name}}</ion-option>\n                </ion-select>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>To Tank</ion-label>\n                <ion-select formControlName="to_trailer_id">\n                    <ion-option *ngFor="let tank of tanks" value="{{tank.trailer_id}}">{{tank.trailer_name}}</ion-option>\n                </ion-select>\n            </ion-item>            \n            \n            \n            <ion-item>\n                <ion-label>Amount (L)</ion-label>\n                <ion-input type="number" formControlName="amount"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <button type="submit" block [disabled]="!tankToTankForm.valid" ion-button>Refill Complete</button>\n            </ion-item>\n        </form>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\tanktotank\create.html"*/
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_tank_service__["a" /* TankService */], __WEBPACK_IMPORTED_MODULE_4__providers_operator_service__["a" /* OperatorService */], __WEBPACK_IMPORTED_MODULE_5__providers_transaction_service__["a" /* TransactionService */], __WEBPACK_IMPORTED_MODULE_6__providers_configuration_service__["a" /* ConfigurationService */]])
], CreateTankToTankPage);
//# sourceMappingURL=tanktotank.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let SettingsPage = class SettingsPage {
    constructor(viewController, events) {
        this.viewController = viewController;
        this.events = events;
    }
    refresh() {
        console.log('[SettingsPage] - refresh() :: ');
        this.events.publish('database:sync');
        this.viewController.dismiss({ refresh: false });
    }
    logout() {
        console.log('[SettingsPage] - logout() :: ');
        this.events.publish('user:logout');
        this.viewController.dismiss({ refresh: true });
    }
    error() {
        console.log('[SettingsPage] - error() :: ');
        this.viewController.dismiss({ refresh: true });
        throw new Error('Something went booboo');
    }
};
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\settings\settings.html"*/'<ion-list>\n  <button ion-item (click)="refresh()">Sync data</button>\n  <button ion-item (click)="logout()">Logout</button>\n  <!--<button ion-item (click)="error()">Error</button>-->\n</ion-list>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\fuelit\fuelit-aeroworks\src\pages\settings\settings.html"*/,
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], SettingsPage);
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_22" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let Config = class Config {
    constructor() {
        // public API_ENDPOINT = '/api';
        this.API_ENDPOINT = 'https://www.fuel-it.co/AWS15/fitAPI/api';
        this.DATABASE_CONFIG = {
            name: 'fuelit.db',
            location: 'default'
        };
        this.LOCALE = 'en';
        this.DEPARTMENT_ID = 478;
    }
};
Config = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [])
], Config);
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};



let ConfigurationService = class ConfigurationService {
    constructor(storage) {
        console.log('[ConfigurationService] - constructor() ::');
        this.storage = storage;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[ConfigurationService] - get() :: ', key);
            let result = yield this.storage.get(key);
            return new Promise(resolve => {
                resolve(JSON.parse(result));
            });
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[ConfigurationService] - set() :: ', key, value);
            this.storage.set(key, JSON.stringify(value));
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storage.remove(key);
        });
    }
};
ConfigurationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["a" /* Storage */]])
], ConfigurationService);
//# sourceMappingURL=configuration-service.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_native__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_timesheet_timesheet__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_transaction_transaction__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_dipreading_dipreading__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tanktotank_tanktotank__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_configuration_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_operator_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_plant_service__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_tank_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_timesheet_service__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_dipreading_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_transaction_service__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_sql_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_bluetooth_service__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_rollbar_service__ = __webpack_require__(644);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* FuelITApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_timesheet_timesheet__["a" /* CreateTimesheetPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_transaction_transaction__["a" /* CreateTransactionPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_dipreading_dipreading__["a" /* CreateDipReadingPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_tanktotank_tanktotank__["a" /* CreateTankToTankPage */],
            __WEBPACK_IMPORTED_MODULE_13__pipes__["a" /* CapitalizePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* FuelITApp */], { scrollAssist: false }, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* FuelITApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_timesheet_timesheet__["a" /* CreateTimesheetPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_transaction_transaction__["a" /* CreateTransactionPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_dipreading_dipreading__["a" /* CreateDipReadingPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_tanktotank_tanktotank__["a" /* CreateTankToTankPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__providers_configuration_service__["a" /* ConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_16__providers_operator_service__["a" /* OperatorService */],
            __WEBPACK_IMPORTED_MODULE_17__providers_plant_service__["a" /* PlantService */],
            __WEBPACK_IMPORTED_MODULE_18__providers_tank_service__["a" /* TankService */],
            __WEBPACK_IMPORTED_MODULE_19__providers_timesheet_service__["a" /* TimesheetService */],
            __WEBPACK_IMPORTED_MODULE_20__providers_dipreading_service__["a" /* DipReadingService */],
            __WEBPACK_IMPORTED_MODULE_21__providers_transaction_service__["a" /* TransactionService */],
            __WEBPACK_IMPORTED_MODULE_22__providers_sql_service__["a" /* SqlService */],
            __WEBPACK_IMPORTED_MODULE_14__config__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["a" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_native__["e" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_native__["b" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_23__providers_bluetooth_service__["a" /* BluetoothService */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_24__providers_rollbar_service__["a" /* RollbarErrorHandler */] }
        ]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqlService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_native__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






const win = window;
let SqlService = class SqlService {
    constructor(http, configuration) {
        this.http = http;
        console.log('[SqlService] - constructor() :: ');
        this.configuration = configuration;
        if (win.sqlitePlugin) {
            console.log('[SqlService] - constructor() :: Creating SQLite service');
            this.storage = new __WEBPACK_IMPORTED_MODULE_3_ionic_native__["e" /* SQLite */]();
            Promise.all([
                __WEBPACK_IMPORTED_MODULE_3_ionic_native__["a" /* AppVersion */].getAppName(),
                __WEBPACK_IMPORTED_MODULE_3_ionic_native__["a" /* AppVersion */].getVersionCode(),
                __WEBPACK_IMPORTED_MODULE_3_ionic_native__["a" /* AppVersion */].getVersionNumber(),
            ]).then(result => {
                console.log(`[SqlService] - constructor() :: Opening database ${result[0]}.${result[1]}.${result[2]}.db`);
                this.storage.openDatabase({
                    name: `${result[0]}.${result[1]}.${result[2]}.db`,
                    location: 'default'
                });
            });
        }
        else {
            console.log('[SqlService] - constructor() :: Creating WebSQL service');
            this.storage = win.openDatabase(this.configuration.DATABASE_CONFIG.name, '1.0', 'database', 5 * 1024 * 1024);
        }
    }
    executeSql(statement, params = []) {
        return new Promise((resolve, reject) => {
            try {
                this.storage.transaction((tx) => {
                    tx.executeSql(statement, params, (tx, res) => resolve({ tx: tx, res: res }), (tx, err) => reject({ tx: tx, err: err }));
                }, (err) => reject({ err: err }));
            }
            catch (err) {
                console.warn('[SqlService] - executeSql() :: Error executing statement', statement);
                reject({ err: err });
            }
        });
    }
};
SqlService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__config__["a" /* Config */]])
], SqlService);
//# sourceMappingURL=sql-service.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};





let OperatorService = class OperatorService {
    constructor(http, configuration, storage) {
        this.in_progress = false;
        console.log('[OperatorService] - constructor() :: ');
        this.http = http;
        this.configuration = configuration;
        this.storage = storage;
    }
    init() {
        console.log('[OperatorService] - init() :: Preparing database table');
        return this.storage.executeSql('CREATE TABLE IF NOT EXISTS operators (operator_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, pin_no TEXT)');
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[OperatorService] - load() :: Loading operators from the API');
            if (this.in_progress) {
                console.log('[OperatorService] - load() :: Loading is already in progress, exit.');
                return null;
            }
            this.in_progress = true;
            let result = yield this.http
                .get(`${this.configuration.API_ENDPOINT}/operators-dep/${this.configuration.DEPARTMENT_ID}`)
                .toPromise();
            console.log('[OperatorService] - load() :: Operators loaded from the API');
            console.log('[OperatorService] - load() :: Deleting operators from the cache');
            yield this.deleteAll();
            console.log('[OperatorService] - load() :: Operators deleted from the cache');
            console.log('[OperatorService] - load() :: Creating operators in the cache.');
            let promises = result.json().Operators.map((item) => __awaiter(this, void 0, void 0, function* () {
                yield this.create(item);
            }));
            console.info('[OperatorService] - load() :: Operators loaded from the API and cached.');
            this.in_progress = false;
            return Promise.all(promises);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT operator_id, first_name, last_name, pin_no FROM operators WHERE operator_id = (?)';
            return this.storage.executeSql(query, [id]);
        });
    }
    findByPinCode(pin_no) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[OperatorService] - findByPinCode() :: Attempt to find operator with the PIN ${pin_no}`);
            let query = 'SELECT operator_id, first_name, last_name, pin_no FROM operators WHERE pin_no = (?)';
            return this.storage.executeSql(query, [pin_no]);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                this.storage.executeSql('DELETE FROM operators'),
                this.storage.executeSql('DELETE FROM SQLITE_SEQUENCE WHERE name="operators"')
            ]);
        });
    }
    create(operator) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'INSERT INTO operators (operator_id, first_name, last_name, pin_no) VALUES (?, ?, ?, ?)';
            return this.storage.executeSql(query, [operator.operator_id, operator.first_name, operator.last_name, operator.pin_no]);
        });
    }
};
OperatorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_3__sql_service__["a" /* SqlService */]])
], OperatorService);
//# sourceMappingURL=operator-service.js.map

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FuelITApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_plant_service__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_operator_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_configuration_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_transaction_service__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_tank_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_timesheet_service__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_dipreading_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_bluetooth_service__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















let FuelITApp = class FuelITApp {
    constructor(platform, toastController, popoverController, plantService, tankService, operatorService, transactionService, timesheetService, dipReadingService, configurationService, bluetoothService, events) {
        this.toastController = toastController;
        this.popoverController = popoverController;
        this.plantService = plantService;
        this.tankService = tankService;
        this.operatorService = operatorService;
        this.transactionService = transactionService;
        this.timesheetService = timesheetService;
        this.dipReadingService = dipReadingService;
        this.configurationService = configurationService;
        this.bluetoothService = bluetoothService;
        this.events = events;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */];
        this.events.subscribe('database:sync', event => {
            this.sync();
        });
        this.events.subscribe('user:logout', event => {
            this.logout();
        });
        this.events.subscribe('settings:open', event => {
            this.settings(event);
        });
        platform.ready().then(() => {
            if (platform.is("android")) {
                //this.statusBar.backgroundColorByHexString("#952517");
                //this.statusBar.styleLightContent();
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["g" /* StatusBar */].styleDefault();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["g" /* StatusBar */].styleLightContent();
            }
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["f" /* Splashscreen */].hide();
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["d" /* Rollbar */].init();
            console.log('[FuelITApp] - constructor() :: Detecting platforms:', platform.platforms());
            console.log('[FuelITApp] - constructor() :: Preparing services.');
            Promise.all([
                this.operatorService.init(),
                this.plantService.init(),
                this.tankService.init(),
                this.transactionService.init(),
                this.timesheetService.init(),
                this.dipReadingService.init()
            ]).then(result => {
                console.log('[FuelITApp] - constructor() :: Services prepared.');
                this.sync();
            });
            platform.pause.subscribe(() => {
                console.log('[FuelITApp] - constructor() :: App paused');
            });
            platform.resume.subscribe(() => {
                console.log('[FuelITApp] - constructor() :: App resumed');
            });
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* Network */].onConnect().subscribe(() => {
                this.onNetworkConnected();
            });
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* Network */].onDisconnect().subscribe(() => {
                this.onNetworkDisconnected();
            });
        });
    }
    onNetworkConnected() {
        console.log('[FuelITApp] - onNetworkConnected() :: Network connection detected.');
        this.events.publish('database:sync');
    }
    onNetworkDisconnected() {
        console.log('[FuelITApp] - onNetworkDisconnected() :: Network disconnected.');
    }
    settings(event) {
        let popover = this.popoverController.create(__WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__["a" /* SettingsPage */], {
            transactionService: this.transactionService,
            timesheetService: this.timesheetService,
            operatorService: this.operatorService,
            plantService: this.plantService,
            tankService: this.tankService,
            dipReadingService: this.dipReadingService,
            configurationService: this.configurationService,
        }, {
            cssClass: "popover-settings"
        });
        popover.onDidDismiss(value => {
            if (value && value.refresh) {
                this.navigationController.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
            }
        });
        popover.present({
            ev: event
        });
    }
    logout() {
        console.log('[FuelITApp] - logout() :: Logging out operator.');
        this.configurationService.remove('operator').then(result => {
            this.events.publish('user:logged_out');
        }, failuer => {
        });
    }
    sync() {
        console.log('[FuelITApp] - sync() :: Synchronizing databases.');
        Promise.all([
            // configurationService.get('operator'),
            this.transactionService.upload(),
            this.timesheetService.upload(),
            this.dipReadingService.upload(),
            this.operatorService.load(),
            this.plantService.load(),
            this.tankService.load(),
        ])
            .then(results => {
            console.log('[FuelITApp] - sync() :: Databases synchronized.');
            let toast = this.toastController.create({
                message: 'Database synced',
                duration: 2000
            });
            this.events.publish('database:synced');
            toast.present();
        }, reason => {
            console.warn('[FuelITApp] - sync() :: Failed to synchronize databases:', reason);
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('nav'), 
    __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */])
], FuelITApp.prototype, "navigationController", void 0);
FuelITApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
        template: `<ion-nav #nav [root]="rootPage"></ion-nav>`
    }), 
    __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_5__providers_plant_service__["a" /* PlantService */], __WEBPACK_IMPORTED_MODULE_9__providers_tank_service__["a" /* TankService */], __WEBPACK_IMPORTED_MODULE_6__providers_operator_service__["a" /* OperatorService */], __WEBPACK_IMPORTED_MODULE_8__providers_transaction_service__["a" /* TransactionService */], __WEBPACK_IMPORTED_MODULE_10__providers_timesheet_service__["a" /* TimesheetService */], __WEBPACK_IMPORTED_MODULE_11__providers_dipreading_service__["a" /* DipReadingService */], __WEBPACK_IMPORTED_MODULE_7__providers_configuration_service__["a" /* ConfigurationService */], __WEBPACK_IMPORTED_MODULE_12__providers_bluetooth_service__["a" /* BluetoothService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], FuelITApp);
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let CapitalizePipe = class CapitalizePipe {
    transform(value) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }
};
CapitalizePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Pipe */])({ name: 'capitalize' }), 
    __metadata('design:paramtypes', [])
], CapitalizePipe);
//# sourceMappingURL=pipes.js.map

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RollbarErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let RollbarErrorHandler = class RollbarErrorHandler {
    handleError(err) {
        console.error(err);
        throw Error(err);
    }
};
RollbarErrorHandler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Injectable */])(), 
    __metadata('design:paramtypes', [])
], RollbarErrorHandler);
//# sourceMappingURL=rollbar-service.js.map

/***/ })

},[496]);
//# sourceMappingURL=main.js.map