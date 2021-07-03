<template>
    <div class="modal fade" id="addcartvente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter commande</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="client" class="weight">Clients</label>
          <select @change="checker" v-if="send.clienttmp == null" id="client" v-model="send.client" class="form-control">
            <option disabled selected>Choisir</option>
            <option v-for="(client,index) in clients" :key="index" :value="client.id_clients">{{client.fname}} {{client.lname}}</option>
          </select>
          <select @change="checker" v-if="send.clienttmp != null" id="client" v-model="send.client" class="form-control">
            <option disabled selected>Choisir</option>
            <option v-for="(client,index) in clients" :key="index" v-if="client.id_clients == send.clienttmp" :value="client.id_clients">{{client.fname}} {{client.lname}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="prod" class="weight">Produits</label>
          <select @change="handle" class="form-control" v-model="send.prod" id="prod">
            <option  selected disabled>Choisir</option>
            <option v-for="(prod,index) in prods" :key="index" :value="prod.id_product">{{prod.name_product}}</option>
          </select>
        </div>
        <div v-if="send.id_commande == null" class="form-group">
          <label for="liv" class="weight">Livraison</label>
          <select class="form-control" v-model="send.adress" id="liv">
            <option disabled selected>Choisir</option>
            <option value="null">Sans livraison</option>
            <option value="0">Avec livraison</option>
          </select>
        </div>
        <div v-if="view" class="trriger">
          <div class="form-group">
          <label for="lots" class="weight">Lots</label>
          <select @change="checker" class="form-control" v-model="send.lot" id="lots">
            <option selected disabled>Choisir</option>
            <option v-for="(lot,index) in lots" :key="index"  :value="lot.id_lot">{{lot.code_lot}} / expiration : {{lot.date_exp}} / Quantitè : {{ lot.qt }} </option>
          </select>
        </div>
        <div class="form-group">
          <label for="qts" class="weight">Quantitè</label>
          <input @keypress="checker" type="number"  id="qts" class="form-control" placeholder="Quantitè" v-model="send.qts">
        </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="close" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="save" :disabled="dis1" class="btn btn-success"> <ic icon="save" /> Sauvgardez</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data : ()=>{
      return{
        clients : [],
        prods : [],
        lots : [],
        view : false,
        send : {
          id_commande : null,
          client : null,
          adress : null,
          clienttmp : null,
          prod : null,
          lot : null,
          qts : 0,
        },
        dis1 : true,
      }
    },
    methods : {
      close()
      {
        location.reload()
      },
      save()
      {
        var run = axios.post(this.link() + 'addcommandeclient',this.send,this.cors())
        run.then(e=>{
          let tmp = e.data.split(',')
          this.send.id_commande = tmp[0]
          this.send.clienttmp = tmp[1]
          this.send.prod = null
          this.send.lot = null
          this.send.qts = 0
          this.view = false
          this.statu('Opèration èffectuè','success')

        })
        run.catch(e=>{
          console.log('err')
        })
      },
      checker()
      {
         this.dis1 = (this.send.client == null || this.send.prod == null || this.send.lot == null
        || this.send.qts == 0) ? true : false
      },
      handle()
      {
         this.dis1 = (this.send.client == null || this.send.prod == null || this.send.lot == null
        || this.send.qts == 0) ? true : false

        var run = axios.post(this.link() + 'getlots',{id : this.send.prod},this.cors())
        run.then(e=>{
         this.lots = e.data
         this.view  = true
        })
      }
    },
    created()
    {
      var run = axios.get(this.link() + 'allClients',this.cors())
      run.then(e=>{
        this.clients = e.data.filter(val => val.active == 0)
      })
      run.catch(e=>{
        console.log('err')
      })

      var run1 = axios.get(this.link() + 'getSingleproductt',this.cors())
      run1.then(e=>{
        this.prods = e.data
      })
      run1.catch(e=>{
        console.log('err')
      })
    }
}
</script>