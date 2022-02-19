import Api from '../../shared/services/api'
import moment from 'moment';
const  baseUrl="trips";
export default {
    
    get () {
        return Api().get(baseUrl);
    },
    query(options){
        const qParams = new URLSearchParams(options);
    return Api().get(baseUrl+"?"+qParams.toString());
    },
    edit(entity){
        if(entity.id)
            return Api().put(baseUrl+`/${entity.id}`,entity);
        else
            return this.add(entity);
    },
    add(entity){
        return Api().post(baseUrl,entity);
    },
    delete(id){
        return Api().delete(baseUrl+`/${id}`);
    },
    formateDateWithMoment(date,formats){
        return moment(date).format(formats)
       //  return moment(date).format('LT')
       },
    setEntity(i){
        // debugger;
        try {
            i.actualArrive = this.formateDateWithMoment(i.actualArrive,'LT')
            i.arrive=this.formateDateWithMoment(i.arrive,'LT')
            i.departure = this.formateDateWithMoment(i.departure,'LT')
            i.date=this.formateDateWithMoment(i.date,'L')
        } catch (error) {
            return i;
        }
       return i;
    }
}