import Api from '../../shared/services/api'

const  baseUrl="books";
export default {
    query(options){
        const qParams = new URLSearchParams(options);
    return Api().get(baseUrl+"?"+qParams.toString());
    },
    get () {
        return Api().get(baseUrl);
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
    updateReceiver(id,data){
        return Api().put(baseUrl+`/${id}/receiver`,data);
    },updateState(id,data){
        return Api().put(baseUrl+`/${id}/state`,data);
    },
    delete(id){
        return Api().delete(baseUrl+`/${id}`);
    },
    getBookNum(manualNum){
        return Api().get(baseUrl+`/ShipmentNumber/${manualNum}`);
    }
}