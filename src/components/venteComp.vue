<template>
    <div class="wrap">
      <div v-if="view == null && view1 == null && view2 == null" class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Commandes vente'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div v-if="!prior && !prior1" class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class="btn btn-primary" data-toggle="modal" data-target="#addcartvente">Ajouter</button>
              <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Visibilitè
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item pointer" @click="filter()" >Tous</a>
    <a class="dropdown-item pointer" @click="filter(0)">En attente</a>
    <a class="dropdown-item pointer" @click="filter(1)">Validè</a>
    <a class="dropdown-item pointer" @click="filter(2)">Refusè</a>
    <a class="dropdown-item pointer" @click="filter(3)">Supprimè</a>
    <a class="dropdown-item pointer" @click="filter(6)">Payé</a>
    <a class="dropdown-item pointer" @click="filter(7)">Non payé</a>
  </div>
</div>
              <button class='btn btn-danger' data-toggle="modal" data-target="#delcmdvente"><ic icon="trash" /> SUPPRIMER</button>
            </div>
          </div>
        </div>
        <div class="search">
          <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="start" class="weight">DU</label>
            <input type="date" v-model="pnd.start" @change="checker1"  id="start" class="form-control">
          </div>
          <div class="form-group col-lg-6">
            <label for="end" class="weight">AU</label>
            <input type="date" v-model="pnd.end" @change="checker1" id="end" class="form-control">
          </div>
        </div>
        <button :disabled="search" @click="srh" class="btn btn-primary form-control"><ic icon="search" /></button>
        </div>
        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Ref commande</th>
      <th scope="col">Date commande</th>
      <th scope="col">Date validation</th>
      <th scope="col">Nom client</th>
      <th scope="col">Mobile client</th>
      <th scope="col">Adresse livraison</th>
      <th scope="col">Statu</th>
      <th scope="col">Bon livraison</th>
      <th scope="col">Facture</th>
      <th scope="col">Payment</th>
      <th scope="col">Reçu</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(cmd,index) in cmds" :key="index">
      <td><input type="checkbox" @click="format(cmd)"></td>
      <td>{{cmd.ref_commande}}
        <div>
          <a :href="'?details=' + cmd.id_commande"><ic class='green' size="2x" icon="eye" /></a>
        <button v-if="cmd.statu == 0 && !prior1 && !prior" @click="format(cmd)" data-toggle="modal" data-target="#validcmdvente" class='pointer btnsp'><ic style='color:green;' size="2x" icon="check" /></button>
        <button v-if="cmd.payment == null && cmd.statu == 1 && !prior" @click="format(cmd)"  data-toggle="modal" data-target="#paymentvente" class='pointer btnsp'><ic style='color:green;' size="2x" icon="dollar-sign" /></button>
        <button v-if="cmd.statu == 0 && !prior1 && !prior" @click="format(cmd)" data-toggle="modal" data-target="#delcmdvente" class='pointer btnsp'><ic style='color:red;' size="2x" icon="trash" /></button>
        </div>
      </td>
      <td>{{cmd.date_cmd}}</td>
      <td>{{cmd.date_valid}}</td>
      <td>{{cmd.fname}}</td>
      <td>{{cmd.phone}}</td>
      <td> <span v-if="cmd.adresse_liv == null" class='yellow'>Sans livraison</span> <span v-if="cmd.adresse_liv != null">{{ cmd.adresse_liv }}</span> </td>
      <td><span v-if="cmd.statu == 0" class='yellow'>En attente</span> <span v-if="cmd.statu == 1" class='green'>Validè</span> <span v-if="cmd.statu == 2" class='red'>Refusè</span> <span v-if="cmd.statu == 3" class='red'>Supprimè</span>  </td>
      <td> <a :href="'?liv=' + cmd.id_commande" v-if="cmd.statu == 1" class='btn btn-success'><ic icon="file-invoice" /></a> </td>
      <td> <a :href="'?facture=' + cmd.id_commande" v-if="cmd.statu == 1" class='btn btn-success'><ic icon="file-invoice" /></a></td>
      <td><span v-if="cmd.payment == 0 && cmd.statu != 3" class="green">Payè
        <button data-toggle="modal" @click="format(cmd)" data-target="#viewvente" class='pointer btnsp'><ic icon="money-bill" /></button>
      </span>
      </td>
      <td><span v-if="cmd.receive == 1" class="green">Reçu</span> </td>
    </tr>
  </tbody>
</table>
<div class="infos">
  <p style='float:right;'><span class="weight">Total vente : </span> <span>{{totalVente}}.00 DA</span></p>
<p style="float:right;"> <span class="weight">Total commande payè : </span> <span>{{paid}}</span></p>
<p style="float:right;"> <span class="weight">Total commande Non payè : </span> <span>{{notpaid}}</span></p>
</div>
          </div>
        </div>
    </section>
    <addcartvente-comp />
    <delcmdvente-modal :ids="ids" />
    <validcmdvente-modal :detail="detail" />
    <paymentventeModal :cmd="detail.id_commande" />
    <viewpaymentvente-modal :cmd="detail.id_commande" />
  </div>
<!-- Content commande detail -->
  <div v-if="view != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/ventecart" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Commandes detail'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Dèsignation produit</th>
      <th scope="col">Code lot</th>
      <th scope="col">Qunatitè commandè</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(detail,index) in details" :key="index" v-if="index > 0">
      <td>{{detail.name_product}}
        <div>
          <button v-if="details[0].statu == 0" @click="format(detail)" data-toggle="modal" data-target="#dellotcart" class='pointer btnsp'><ic style='color:red;' size="2x" icon="trash" /></button>
          <button v-if="details[0].statu == 0" @click="format(detail)" data-toggle="modal" data-target="#uplotcart" class='pointer btnsp'><ic style='color:green;' size="2x" icon="recycle" /></button>
        </div>
      </td>
      <td>{{detail.code_lot}}</td>
      <td>{{detail.qt_cart}}</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <updatecommandevente-comp  :detail="detail" />
  </div>

  <div v-if="view1 != null && livs != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/ventecart" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Bon livraison'}" />
    <div  class="content-header center">
      <div class="container-fluid">
             <button v-print="'#printMe'" class='btn btn-success form-control'><ic icon="print" /></button>
      </div>
    </div>
    <!-- Main content -->
    <section id="printMe" class="content">
      <div class="all">
			<header>
				<h1 class="center">Bon livraison</h1>
				<address>
					<p>p-pharm</p>
					<p>101 rue<br>Chlef</p>
					<p>00000000000</p>
				</address>
				<span><img alt="" style='width:100px;height:100px;' src="http://localhost/ker/learn%20php/p-pharm/public/images/logo.jpg"></span>
			</header>
			<article>
				<h1>p-pharm</h1>
				<table class="meta">
					<tr>
						<th><span>N #</span></th>
						<td><span>{{livs[1].num_bon}}</span></td>
					</tr>
					<tr>
						<th><span>Date</span></th>
						<td><span>{{livs[0].date}}</span></td>
					</tr>
				</table>
				<table class="inventory">
					<thead>
						<tr>
							<th><span>Dèsignation produit</span></th>
							<th><span>Code lot</span></th>
							<th><span>Quantitè</span></th>
						</tr>
					</thead>
					<tbody>
            <tr v-for="(liv,index) in livs" :key="index" v-if="index > 1">
              <td class='center'>{{liv.name_product}}</td>
              <td class='center'>{{liv.code_lot}}</td>
              <td class='center'>{{liv.qt_cart}}</td>
            </tr>
					</tbody>
				</table>
			</article>
			<aside style='position: relative;top: 146px;'>
				<h1 class='center'><span>Notes</span></h1>
				<div>
					<p class='center'>Mobile</p>
					<p class='center'>Fax</p>
					<p class='center'>email</p>
					<p class='center'>lien site</p>
				</div>
			</aside>
		</div>
    </section>
  </div>

  <div v-if="view2 != null && facts != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/ventecart" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Facture'}" />
    <div  class="content-header center">
      <div class="container-fluid">
             <button v-print="'#printMe'" class='btn btn-success form-control'><ic icon="print" /></button>
      </div>
    </div>
    <!-- Main content -->
    <section id="printMe" class="content">
      <div class="all">
			<header>
				<h1 class="center">Facture</h1>
				<address>
					<p>p-pharm</p>
					<p>101 rue<br>Chlef</p>
					<p>00000000000</p>
				</address>
				<span><img alt="" style='width:100px;height:100px;' src="http://localhost/ker/learn%20php/p-pharm/public/images/logo.jpg"></span>
			</header>
			<article>
				<h1>p-pharm</h1>
				<table class="meta">
					<tr>
						<th><span>N #</span></th>
						<td><span>{{facts[1].num_facture}}</span></td>
					</tr>
					<tr>
						<th><span>Date</span></th>
						<td><span>{{facts[0].date}}</span></td>
					</tr>

          <tr>
						<th><span>Total</span></th>
						<td><span>{{total}}.00 DA</span></td>
					</tr>
				</table>
				<table class="inventory">
					<thead>
						<tr>
							<th><span>Dèsignation produit</span></th>
							<th><span>Code lot</span></th>
							<th><span>Quantitè</span></th>
              <th><span>Prix</span></th>
              <th><span>Sous total</span></th>
						</tr>
					</thead>
					<tbody>
            <tr v-for="(fact,index) in facts" :key="index" v-if="index > 1">
              <td class='center'>{{fact.name_product}}</td>
              <td class='center'>{{fact.code_lot}}</td>
              <td class='center'>{{fact.qt_cart}}</td>
              <td class='center'>{{fact.price}}.00 DA</td>
              <td class='center'>{{fact.price * fact.qt_cart}}.00 DA</td>
            </tr>
					</tbody>
				</table>
        <table class="balance">
					<tr>
						<th><span >Total</span></th>
						<td><span>{{total}}.00 DA</span></td>
					</tr>
				</table>
			</article>
			<aside style='position: relative;top: 146px;'>
				<h1 class='center'><span>Notes</span></h1>
				<div>
					<p class='center'>Mobile</p>
					<p class='center'>Fax</p>
					<p class='center'>email</p>
					<p class='center'>lien site</p>
				</div>
			</aside>
		</div>
    </section>
  </div>
  <confirmdellotcart-modal :detail="detail" />
    </div>
</template>

<script>
import dheaderComp from './dheaderComp'
import axios from 'axios'
import datatable from 'datatables.net-bs4'
import confirmdellotcartModal from '../modals/confirmdellotcartModal.vue'
import delcmdventeModal from '../modals/delcmdventeModal.vue'
import validcmdventeModal from '../modals/validcmdventeModal.vue'
import paymentventeModal from '../modals/paymentventeModal.vue'
import viewpaymentventeModal from '../modals/viewpaymentventeModal'
import addcartventeComp from '../modals/addcartventeComp'
import updatecommandeventeComp from '../modals/updatecommandeventeComp.vue'
import print from 'vue-print-nb'
export default {
    data : ()=>{
        return{
            cmds : null,
            tmps : [],
            view : null,
            view1 : null,
            view2 : null,
            details : null,
            detail : [],
            livs : null,
            facts : null,
            total : null,
            ids : [],
            prior : false,
            totalVente : null,
            paid : null,
            notpaid : null,
            prior1 : null,
            pnd : {
            start : null,
          end : null,
          },
          search : true,
        }
    },
    components : {
        dheaderComp,
        confirmdellotcartModal,
        delcmdventeModal,
        validcmdventeModal,
        paymentventeModal,
        viewpaymentventeModal,
        addcartventeComp,
        updatecommandeventeComp
    },
    directives : {
      print
    },
    methods : {
        table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          checker1()
          {
            this.search = (this.pnd.start == null || this.pnd.end == null) ? true : false
          },
          srh()
          {
            this.search = true
            var run = axios.post(this.link() + 'searchcommandevente',this.pnd,this.cors())
            run.then(e=>{
             this.cmds = e.data
            })
          },
          filter(value = "none")
          {
            if(value  == 6 || value == 7)
            {
              switch (value) {
                case 6: this.cmds = this.tmps.filter(val => val.payment == 0);  break;
                case 7:  this.cmds = this.tmps.filter(val => val.payment == null); break;
              }
            }else{
                this.cmds = (value != "none") ? this.tmps.filter(val => val.statu == value) : this.tmps
            }
          },
          format(value)
          {
            this.detail = value
            this.ids.push(value.id_commande)
          }
    },
    created()
    {
      this.prior = (this.$route.path == '/stockventecart') ? true : false
      this.prior1 = (this.$route.path == '/compventecart') ? true : false

      if(this.$route.query.details != null)
      {
        this.view = this.$route.query.details
        var run = axios.post(this.link() + 'lotsadmincommandesclient',{ref : this.view},this.cors())
        run.then(e=>{
          this.details = e.data
        })
        run.catch(e=>{
          console.log('err')
        })
      }else if(this.$route.query.liv != null)
      {
        this.view1 = this.$route.query.liv
        var run = axios.post(this.link() + 'getliv',{id : this.view1},this.cors())
        run.then(e=>{
         this.livs = e.data
        })
        run.catch(e=>{
          console.log('err')
        })
      }else if(this.$route.query.facture != null)
      {
        this.view2 = this.$route.query.facture
        var run = axios.post(this.link() + 'getfact',{id : this.view2},this.cors())
        run.then(e=>{
         this.facts = e.data
         let i = 0
         for (const fact of this.facts) {
            if(i > 1)
            {
              this.total += fact.price * fact.qt_cart
            }
            i++
         }
        })
        run.catch(e=>{
          console.log('err')
        })
      }else{

        var run = axios.get(this.link() + 'commandesclient',this.cors())
      run.then(e=>{
        this.cmds = e.data
        this.tmps = e.data
        this.table()
      })
      }

      var run1 = axios.get(this.link() + 'totalvente',this.cors())
      run1.then(e=>{
        this.totalVente = e.data
      })

      var run2 = axios.get(this.link() + 'TotalcommandesPaidandnotpaid',this.cors())
      run2.then(e=>{
        let tmp = e.data.split(',')
        this.paid = tmp[0]
        this.notpaid = tmp[1]
      })
      }
    
}
</script>