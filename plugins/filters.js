import Vue from 'vue';
import Enums from './enums';

function getEnumMember(enumClass, enumValue) {
    for (var val in enumClass) {
        if (enumClass[val].value == enumValue) return enumClass[val];
    }
    return {};
}

Vue.filter("SizeFilter",  function (enumValue) {
    
    var enumObj=getEnumMember(Enums.Sizes,enumValue.value);
      return enumObj.text;

  });

  Vue.filter("EnumMember",  function (enumValue,enumClass) {
    
   return getEnumMember(enumClass,enumValue.value);

  });
  Vue.filter("PaymentTypesFilter",  function (enumValue) {
    var enumObj=getEnumMember(Enums.PaymentTypes,enumValue);
      return enumObj.text;

  });
