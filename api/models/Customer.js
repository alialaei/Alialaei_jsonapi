/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    creationDate: {
      columnName: 'cre_dt',
      type: 'datetime',
      defaultsTo: function() {return new Date();}
    },
    updateDate: {
      columnName: 'upd_dt',
      type: 'datetime',
      defaultsTo: function() {return new Date();}
    },
    name: {
      type: 'string',
      required: true
    },
    email:{
      type: 'string',
      email: true
    },
    state:{
      type:'string'
    }
  }
};
