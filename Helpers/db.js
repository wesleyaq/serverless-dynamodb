'use strict';

const AWS = require('aws-sdk');

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDB;

if (IS_OFFLINE === 'true') {
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: "http://localhost:8000"
  });
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

const getAll = table => {
  const params = {
    TableName: table
  };

  return new Promise(function(resolve, reject) {
    dynamoDB.scan(params, (error, result) => {
      if (error) { reject(error); return ; }

      resolve(result);
    });
  });
};

const getById = (data, table) => {
  const params = {
    TableName: table,
    Key: data
  };

  return new Promise(function(resolve, reject) {
    dynamoDB.get(params, (error, result) => {
      if (error) { reject(error); return ; }

      resolve(result);
    });
  });
};

const create = (data, table) => {
  const params = {
    TableName: table,
    Item: data
  };

  return new Promise(function(resolve, reject) {
    dynamoDB.put(params, error => {
      if (error) { reject(error); return ; }

      resolve(data);
    });
  });
};

const update = (userId, data, table) => {
  const params = {
    TableName: table,
    Key: {
      userId
    },
    UpdateExpression: "set #name = :x",
    ExpressionAttributeNames: {
      "#name": "name"
    },
    ExpressionAttributeValues: {
      ":x": data.name
    }
  };

  return new Promise(function(resolve, reject) {
    dynamoDB.update(params, error => {
      if (error) { reject(error); return ; }

      resolve(data);
    });
  });
};

const remove = (data, table) => {
  const params = {
    TableName: table,
    Key: data
  };

  return new Promise(function(resolve, reject) {
    dynamoDB.delete(params, error => {
      if (error) { reject(error); return ; }

      resolve(data);
    });
  });
};

module.exports = { getAll, getById, create, update, remove };
