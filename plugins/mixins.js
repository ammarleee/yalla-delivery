import FormRules from './form-rules';
import moment from 'moment';
export  default{
    data(){
        return{
         allRules:FormRules
        }
    },
    methods:{
      addToArr(arr,element){
        if (arr.length == 0) {
          arr=[element];
        }
        else
          this.$set(arr, arr.length, element);
      },
      updateArr(arr,element){
        var i= this.entities.indexOf(this.entities.filter(e=>e.id==element.id )[0]);
        if(arr.length==0)
          arr.push({});
      this.$set(arr, i, element);
    },  
  round:function(num,percesion){
    if(!percesion)
    percesion=2;
  var factor=Math.pow(10,percesion);
   return Math.round(num*factor)/factor;
 },
     clone:function(thing, opts) {
        var newObject = {};
        var vm=this;
        if (thing instanceof Array) {
            return thing.map(function (i) { return vm.clone(i, opts); });
        } else if (thing instanceof Date) {
            return new Date(thing);
        } else if (thing instanceof RegExp) {
            return new RegExp(thing);
        } else if (thing instanceof Function) {
            return opts && opts.newFns ?
                       new Function('return ' + thing.toString())() :
                       thing;
        } else if (thing instanceof Object) {
            Object.keys(thing).forEach(function (key) {
                newObject[key] = vm.clone(thing[key], opts);
            });
            return newObject;
        } else if ([ undefined, null ].indexOf(thing) > -1) {
            return thing;
        } else {
            if (thing.constructor.name === 'Symbol') {
                return Symbol(thing.toString()
                           .replace(/^Symbol\(/, '')
                           .slice(0, -1));
            }
            // return _.clone(thing);  // If you must use _ ;)
            return thing.__proto__.constructor(thing);
        }
    },
         getEnumMember:function(enumClass, enumValue) {
            for (var val in enumClass) {
                if (enumClass[val].value == enumValue) return enumClass[val];
            }
            return {};
        },
        formatDate:function(d){
  
            try {
              var date = new Date(Date.parse(d));
              const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
              const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
              const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
              return `${da} ${mo} ${ye}`;
            }
            catch{
                return 'unknown'
            }
              
          },
          formateDateWithMoment:function(date,formats){
            return moment(date).format(formats)
           },
           showToast:function(variant,title,content) {
            this.$bvToast.toast(content, {
              title: title,
              variant: variant,
              solid: true,
              content
            });
          },
    }
}