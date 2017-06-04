/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res, next) {
    Customer.create(req.params.all(), function customerCreated(err, customer){
      if(err)
        return next(err);
      res.redirect('/customer/show/' + customer.id);
    });
  },

  show: function(req, res, next){
    Customer.findOne(req.param('id')).populateAll().exec(function (err, customer) {
      if(err) return next(err);
      if(!customer) return next();

      // var http = require('http');
      //
      // function process_response(webservice_response, stock, callback){
      //   var webservice_data ='';
      //   webservice_response.on('error', function(e){
      //     console.log(e.message);
      //     callback('error in web request for' + stock.symbol);
      //   });
      //   webservice_response.on('data', function(chunk){
      //     webservice_data+= chunk;
      //   });
      //   webservice_response.on('end', function(){
      //     stock_data = JSON.parse(webservice_data);
      //     stock.current_price = stock_data.LastPrice;
      //     console.log('stock price' + stock.current_price);
      //
      //     //to ensure it has been finished
      //     callback();
      //   });
      // };
      //
      // function get_current_price(stock, callback) {
      //
      //   options = {
      //     host: 'dev.markitondemand.com',
      //     port: 80,
      //     path: 'MODApis/Api/v2/Quote/JSON?symbol='+ stock.symbol,
      //     method: 'get'
      //   };
      //
      //   var webservice_request = http.request(options, function (response) {
      //     process_response(response, stock, callback)
      //   });
      //   webservice_request.end();
      //   console.log(stock.symbol + '-' + stock.current_price);
      // };
      //
      // // this function has been added after install async package for checking is finished last function
      // async.each(customer.stocks, get_current_price, function(err){
      //   if(err) console.log(err);
      //
      //
      // });
      res.view({
        customer: customer
      });
    });
  },
  index: function(req, res, next){
    Customer.find(function foundCustomers(err, customers){
      if(err) return next(err);

      res.view({
        customers: customers
      })
    });
  },
  edit: function (req,res,next) {
    Customer.findOne(req.param('id'),function foundCustomer(err, customer){
      if(err) return next(err);
      if(!customer) return next();
      res.view({
        customer: customer
      });
    });
  },
  update: function (req, res, next) {
    Customer.update(req.param('id'), req.params.all(), function(err){
      if(err){
        return res.redirect('customer/edit/'+req.param('id'));
      }
      res.redirect('customer/show/'+req.param('id'));
    });
  },
  destroy: function (req, res, next) {
    Customer.destroy(req.param('id')).exec( function() {
      res.redirect('/customer/');
    });
  }
};
