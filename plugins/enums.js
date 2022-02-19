var enums ={};

enums.Sizes=
[
   {value:1,text:"كبير"},
   {value:2,text:"متوسط"},
   {value:3,text:"صغير"},
]
enums.PaymentTypes=
[
    {value:1,text:"نقدا"},
    {value:2,text:"الدفع عند الاستلام"},
]
enums.States= 
[{text:'مفتوح',icon:'mdi-lock-open-variant',color:'green',value:1},
{text:'مغلق',icon:'mdi-lock',color:'red',value:2},
{text:'تحت الانتظار',icon:'mdi-lock-clock',color:'orange',value:3},
]

export default enums;