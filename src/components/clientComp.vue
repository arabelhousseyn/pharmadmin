<template>
    <div class="wrap">
      <div v-if="key1 == null && key2 == null" class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Clients'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' data-toggle="modal" data-target="#addclient">AJOUTER</button>
              <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Visibilitè
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item pointer" @click="filter()" >Tous</a>
    <a class="dropdown-item pointer" @click="filter(0)">Active</a>
    <a class="dropdown-item pointer" @click="filter(1)">Suspendu</a>
  </div>
</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Prènom</th>
      <th scope="col">Nom d'utilisateur</th>
      <th scope="col">Mobile</th>
      <th scope="col">Adresse</th>
      <th scope="col">Statu</th>
      <th scope="col">Crèè</th>
      <th scope="col">Commandes</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(client,index) in clients" :key="index">
      <td>{{client.fname}}
        <div>
          <button @click="parsee(client)" data-toggle="modal" data-target="#updateclient" class='pointer btnsp'><ic class="green" size="2x" icon="pen" /></button>
        <button class='pointer btnsp' v-if="client.active == 0" @click="parsee(client)" data-toggle="modal" data-target="#delclient"><ic size="2x" class="red" icon="stop" /></button>
        <button title="Re-active" class='pointer btnsp' v-if="client.active == 1" @click="parsee(client)" data-toggle="modal" data-target="#recyclient"><ic size="2x" class="green" icon="recycle" /></button>
        </div>
      </td>
      <td>{{client.lname}}</td>
      <td>{{client.username}}</td>
      <td>{{client.phone}}</td>
      <td>{{client.adresse}}</td>
      <td> <span v-if="client.active == 0" class="green">Active</span> <span v-if="client.active == 1" class="red">Suspendu</span></td>
      <td>{{client.date_creation}}</td>
      <td><a :href="'?page1=' + client.id_clients" class="btn btn-warning"><ic icon="box" /></a> </td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <addclient-modal />
    <updateclient-modal :client="client" />
    <confirmdelclient-modal :client="client" />
    <reactiveclient-modal :client="client" />
  </div>

  <div v-if="key1 != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/clients" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Commandes'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Visibilitè
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item pointer" @click="filter1()" >Tous</a>
    <a class="dropdown-item pointer" @click="filter1(0)">Payè</a>
    <a class="dropdown-item pointer" @click="filter1(null)">Non payè</a>
  </div>
</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmdss'>
  <thead>
    <tr>
      <th scope="col">Ref commande</th>
      <th scope="col">Date commande</th>
      <th scope="col">Date validation</th>
      <th scope="col">Livraison</th>
      <th scope="col">Statu</th>
      <th scope="col">Payment</th>
      <th scope="col">Reçu</th>
      <th scope="col">Produits</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(detail,index) in detailsCmd" :key="index">
      <td>{{detail.ref_commande}}</td>
      <td>{{detail.date_cmd}}</td>
      <td>{{detail.date_valid}}</td>
      <td><span v-if="detail.adresse_liv != null">{{detail.adresse_liv}}</span> <span v-else>Sans livraison</span> </td>
      <td><span v-if="detail.statu == 0" class='yellow'>En attente</span> <span v-if="detail.statu == 1" class='green'>Validè</span> <span v-if="detail.statu == 2" class='red'>Refusè</span> <span v-if="detail.statu == 3" class='red'>Supprimè</span>  </td>
      <td><span v-if="detail.payment == 0 && detail.statu != 3" class="green">Payè
        <button data-toggle="modal" @click="format(detail)" data-target="#viewvente" class='pointer btnsp'><ic icon="money-bill" /></button>
      </span>
      </td>
      <td> <span v-if="detail.receive == 1" class="green">Reçu</span> </td>
      <td><a :href="'?page2=' + detail.id_commande + '&sk=' + key1"  class="btn btn-warning"><ic icon="box" /></a></td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <viewpaymentvente-modal :cmd="idCommande" />
  </div>

  <div v-if="key2 != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a :href="'?page1=' + prp" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Produit'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmdss'>
  <thead>
    <tr>
      <th scope="col">Dèsignation produit</th>
      <th scope="col">Code lot</th>
      <th scope="col">Date fabrication</th>
      <th scope="col">Date expiration</th>
      <th scope="col">Prix</th>
      <th scope="col">Quantitè</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(pr,index) in productsCmds" :key="index">
      <td>{{pr.name_product}}</td>
      <td>{{pr.code_lot}}</td>
      <td>{{pr.date_fab}}</td>
      <td>{{pr.date_exp}}</td>
      <td>{{pr.price}}</td>
      <td>{{pr.qt_cart}}</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
  </div>
    </div>
</template>

<script>
import axios from 'axios'
import datatable from 'datatables.net-bs4'
import dheaderComp from './dheaderComp'
import addclientModal from '../modals/addclientModal'
import updateclientModal from '../modals/updateclientModal'
import confirmdelclientModal from '../modals/confirmdelclientModal'
import reactiveclientModal from '../modals/reactiveclientModal'
import viewpaymentventeModal from '../modals/viewpaymentventeModal'
export default {
  data : ()=>{
    return{
      clients: null,
      client : [],
      tmps : [],
      key1 : null,
      key2: null,
      prp : null,
      detailsCmd : null,
      tmpdetailCmd : null,
      idCommande : null,
      productsCmds : null,
    }
  },
  components : {
    dheaderComp,
    addclientModal,
    updateclientModal,
    confirmdelclientModal,
    reactiveclientModal,
    viewpaymentventeModal
  },
  methods : {
    table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          table1()
          {
              this.$nextTick(()=>{
                  $('#cmdss').DataTable();
              })
          },
          format(value)
          {
            this.idCommande = value.id_commande
          },
          parsee(value)
          {
            this.client = value
          },
          filter(value = "none")
          {
            this.clients = (value != "none") ? this.tmps.filter(val => val.active == value) : this.tmps
          },
          filter1(value = "none")
          {
            this.detailsCmd = (value != "none") ? this.tmpdetailCmd.filter(val => val.payment == value) : this.tmpdetailCmd
          }
  },
  created()
  {
    var run = axios.get(this.link() + 'allClients',this.cors())
    run.then(e=>{
      this.clients = e.data
      this.tmps =  e.data
      this.table()
    })
    run.catch(e=>{
      console.log('err')
    })

    if(this.$route.query.page1 != undefined)
    {
      this.key1 = this.$route.query.page1
      var run = axios.post(this.link() + 'getcmdbyclientall',{id : this.key1},this.cors())
      run.then(e=>{
        this.detailsCmd = e.data
        this.tmpdetailCmd = e.data
        this.table1()
      })
      run.catch(e=>{
        console.log('err')
      })
    }

    if(this.$route.query.page2 != undefined)
    {
      this.key2 = this.$route.query.page2
      this.prp = this.$route.query.sk
      var run = axios.post(this.link() + 'cartByCommande',{id : this.key2},this.cors())
      run.then(e=>{
        this.productsCmds = e.data
      })
      run.catch(e=>{
        console.log('err')
      })
    }
  }
}
</script>