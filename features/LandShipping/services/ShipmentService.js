import Api from '../../shared/services/api'

const  baseUrl="shipments";
export default {
    
    get () {
        return Api().get(baseUrl);
    },
    type(searchTerm,all) {
        return Api().get(`${baseUrl}/typeHead?${searchTerm}&all=${all}`);
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
    bulk(collection){
        return Api().post(baseUrl+`/bulk`,collection);
    },
    delete(id){
        return Api().delete(baseUrl+`/${id}`);
    },
    byTripId(id){
        return Api().get(baseUrl+`/trip/${id}`);
    },
    byClientId(id){
        return Api().get(baseUrl+`/client/${id}`);
    },
    bySalesmanId(id){
        return Api().get(baseUrl+`/salesman/${id}`);
    },
    newShipment(shipment){
        var newShipment={...shipment};
     newShipment.addedValueTax=parseFloat( shipment.addedValueTax|0);
     newShipment.insuranceValue=parseFloat( shipment.insuranceValue|0);
     newShipment.otherServicesPrice=parseFloat( shipment.otherServicesPrice|0);
     newShipment.totalPrice=parseFloat( shipment.totalPrice|0);
     newShipment.netPrice=parseFloat( shipment.netPrice|0);
     newShipment.duePrice=parseFloat( shipment.duePrice|0);
     newShipment.deliveryPrice=parseFloat( shipment.deliveryPrice|0);

      newShipment.senderId=shipment.sender?.id;
      newShipment.senderBranchId=shipment.senderBranch?.id;
      newShipment.senderInfo.name=shipment.sender?.name;
      newShipment.senderInfo.branch=shipment.senderBranch?.name;

      newShipment.receiverId=shipment.receiver?.id;
      newShipment.receiverBranchId=shipment.receiverBranch?.id;
       newShipment.receiverInfo.name=shipment.receiver?.name;
      newShipment.receiverInfo.branch=shipment.receiverBranch?.name;
      newShipment.items.forEach(item => {
          item.price=parseFloat(item.price);
          item.quantity=parseFloat(item.quantity);
          item.addedValueTax=parseFloat(item.addedValueTax|0);
      });
     return newShipment;
    }
}