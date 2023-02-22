// const URL_BASE = 'http://127.0.0.1:8010';
const URL_BASE = 'http://67.205.180.83:8080/';

// User URLs
const URL_LOGIN = '/user/login';

// Library URLs
const URL_ITEM = '/library/item';
const URL_AUTHOR = 'library/author';
const URL_ITEM_TYPES = 'library/type';
const URL_ITEM_FORMAT = 'library/format';
const URL_ITEM_SERIE = 'library/serie';
const URL_ITEM_COLLECTION = 'library/collection';
const URL_PUBLISHER = 'library/publisher';
const URL_LANGUAGE = 'library/language';

// Credit Card
const URL_CREDIT_CARD = '/finance/credit-card'
const URL_CREDIT_CARD_BILL = '/finance/credit-card/bill'
const URL_CREDIT_CARD_BILL_HISTORY = 'finance/credit-card/bill/history'

//Account
const URL_ACCOUNTS = '/finance/account'
const URL_ACCOUNT_STATEMENT = '/finance/account/statement'

//Investment
const URL_INVESTMENT = '/finance/investment'
const URL_INVESTMENT_STATEMENT = '/finance/investment/statement'

// Other finances
const URL_EXPENSES = '/finance/expenses'
const URL_CURRENCY = '/finance/currency'

// Files URLs
const URL_UPLOADS = 'file/upload'

// Core URLs
const URL_CATEGORIES = 'core/category'
const URL_STATUS = 'core/status'
const URL_COUNTRY = 'core/country'
const URL_PERIOD = 'core/period'


export {
    URL_BASE, URL_LOGIN, URL_ITEM,
    URL_AUTHOR, URL_ITEM_TYPES, URL_ITEM_FORMAT, URL_ITEM_SERIE, URL_ITEM_COLLECTION, URL_PUBLISHER, URL_LANGUAGE,
    URL_CREDIT_CARD_BILL, URL_ACCOUNTS, URL_ACCOUNT_STATEMENT, URL_INVESTMENT, URL_INVESTMENT_STATEMENT,
    URL_EXPENSES, URL_CREDIT_CARD, URL_CREDIT_CARD_BILL_HISTORY, URL_CURRENCY,
    URL_CATEGORIES, URL_STATUS, URL_COUNTRY, URL_PERIOD,
    URL_UPLOADS,
}