<template>
  <div>
    
<v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        
        :hide-no-data="!strict"
        :hide-selected="!strict"
        outlined
        :rules="rules"
        :search-input.sync="search"
        dense
       
        :item-text="text"
        :filter="customFilter"
        :placeholder="placeholder"

        :label="label"
        return-object
      ></v-autocomplete>
  </div>
</template>

<script>

export default {

props:['text','label','searchFn','value','rules','placeholder','mapFn','strict'],

data(){
return {
isLoading:false,
search:null,
items:[],
oldVal:'',
model:null,
timeout: null,
oldArgs:null
}
},
mounted(){
   this.internalSearch()
    // var vue=this;
    // setTimeout(()=>{
    // vue.internalSearch().bind(vue);
    // },100);
     
},
created() {
 
    if(this.value){
        this.model=this.clone(this.value);
        if(!this.model[this.text])
          this.model[this.text]="";
        this.items.push(this.model);
        this.oldVal= this.clone(this.model[this.text]);
    }
   
},methods:{
 debounce(fn,args,time){
     
     clearTimeout(this.timeout);
     var self = this;
     this.timeout = setTimeout(()=>{
         
         if(self.oldArgs==args)
         return;
      this.oldArgs=args;
         fn(args)
     }, time);
 },
     internalSearch(val){
        
         console.log("searching:",val);
         if(val==this.oldVal)
         return;
        this.oldVal=val;
         this.isLoading = true;
         if(!this.searchFn)
         return;
         this.searchFn(val).then(resp=>{
             
             if(this.mapFn){
                this.items=resp.data.map(e=>this.mapFn(e));
             }
             else
             this.items=resp.data;
             console.log(this.items);
             if(!this.items)
              this.items=[];
             if(this.items.length==0){
                 
                 if(val==null){

                     this.model=null;
                     console.log("reset model");
                     return;
                 }
                 var obj={};
                 obj[this.text]=`${this.search}`;
                 console.log("itemList",this.items);
              this.items.push(obj);
              this.model=this.clone(obj);
              
             }
             
         }) .catch(err => {
           console.log(err);
          })
          .finally(() => {
              this.isLoading = false;
              this.$emit('input', this.clone( this.model));
              })
              
        
         
    },
 customFilter(item, queryText, itemText){
 const textOne = item[this.text].toLowerCase()
        const textTwo = item[this.text]
        const searchText = queryText.toLowerCase()
        var res=textOne.indexOf(searchText) > -1 ||
          textTwo==queryText;
        return res;
 }
},watch:{
   search:function(value){
       
      if(value==this.oldVal||(this.model&&this.model[this.text]==value))
      return;
      return this.debounce(this.internalSearch.bind(this),this.clone(value),500);
   },
    model(newVal, oldVal){

         this.$emit('input', this.clone( this.model));
    }
}
}

</script>

<style>

</style>