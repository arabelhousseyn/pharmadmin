<template>
    <div class="wrap">
      <div v-if="key1 == null && key2 == null && key3 == null" class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Commandes fournisseur'}" />
    <!-- /.content-header -->
    <!-- Main content -->
    <section class="content">
        <div v-if="!prior && !prior1" class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' data-toggle="modal" data-target=".bd-example-modal-lg">AJOUTER</button>
              <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Visibilitè
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item pointer" @click="filter(5)" >Tous</a>
    <a class="dropdown-item pointer" @click="filter(3)">En attente</a>
    <a class="dropdown-item pointer" @click="filter(0)">En cours</a>
    <a class="dropdown-item pointer" @click="filter(1)">Validè</a>
    <a class="dropdown-item pointer" @click="filter(2)">Refusè</a>
    <a class="dropdown-item pointer" @click="filter(6)">Payé</a>
    <a class="dropdown-item pointer" @click="filter(7)">Non payé</a>
  </div>
</div>
              <button class='btn btn-danger' data-toggle="modal" data-target="#deleteachatcmd"><ic icon="trash" /> SUPPRIMER</button>
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
      <th scope="col">Ref Commande</th>
      <th scope="col">Date achat</th>
      <th scope="col">Date validation</th>
      <th scope="col">Nom fournisseur</th>
      <th scope="col">Statu</th>
      <th scope="col">Crèè par</th>
      <th scope="col">Bon commande</th>
      <th scope="col">Payment</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="(detail,index) in details" :key="index">
          <td><input @click="gets(detail)" type="checkbox"></td>
          <td>{{detail.ref_commandeachat}}
            <div>
              <button @click="deletee(detail)" data-toggle="modal" v-if="!prior && !prior1" data-target="#deleteachatcmdd" class='pointer btnsp'><ic style='color:red;' size="2x" icon="trash" /></button>
          <button v-if="detail.statu_achat == 0" @click="getss(detail)"  data-toggle="modal" data-target="#changestatu" class='pointer btnsp'><ic style='color:green;' size="2x" icon="check" /></button>
          <button v-if="detail.payment == null && detail.statu_achat == 1 && !prior" @click="getss(detail)"  data-toggle="modal" data-target="#paymentachat" class='pointer btnsp'><ic style='color:green;' size="2x" icon="dollar-sign" /></button>
          <a v-if="detail.statu_achat != 3" :href="'?page1=' + detail.id_commandeachat" exact><ic icon="eye" size="2x" /></a>
            </div>
          </td>
          <td>{{detail.date_achat}}</td>
          <td>{{detail.date_validachat}}</td>
          <td>{{detail.name_fournisseur}}</td>
          <td> <span v-if="detail.statu_achat == 0"  class='yellow'>En cours</span> <span v-if="detail.statu_achat == 1" class="green">Validè</span> <span v-if="detail.statu_achat == 2" class="red">Refusè</span> <span v-if="detail.statu_achat == 3" class='yellow flxbtn'>En attente
            <br><button @click="save(detail)" style="text-align:center;" v-if="!prior && !prior1" class='btn btn-success'> <ic icon="save" /> </button>
            <a style="margin-top:5px;" :href="'?page3=' + detail.id_commandeachat" v-if="!prior && !prior1" class="btn btn-success" name="modifier"><ic icon="pen" /> </a>
            </span> </td>
          <td> {{detail.username_user}} </td>
          <td> <a v-if="detail.statu_achat == 1" :href="'?page2=' + detail.id_commandeachat" class='btn btn-success'><ic icon="file-invoice"/></a> </td>
          <td>
            <span v-if="detail.payment == 0" class="green">Payè 
              <button data-toggle="modal" @click="getss(detail)" data-target="#viewachat" class='pointer btnsp'><ic icon="money-bill" /></button>
            </span>
          </td>
      </tr>
  </tbody>
</table>
<div class="infos">
<p style="float:right;"> <span class="weight">Total commande payè : </span> <span>{{paid}}</span></p>
<p style="float:right;"> <span class="weight">Total commande Non payè : </span> <span>{{notpaid}}</span></p>
</div>
          </div>
        </div>
    </section>
    <addcomandeachat-modal />
    <confirmdeletecmda-modal v-if="cmds.length > 0" :cmd="cmds" />
    <confirmdeletecma-modal :del="del" />
    <confirmvalidachat-modal :valid="valid" />
    <paymentachat-modal :cmd="valid.cmd" />
    <viewpaymentachatModal :cmd="valid.cmd" />
  </div>
  
  <div v-if="key1 != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">

        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/achatcart" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Detail commande'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Nom fournisseur</th>
      <th scope="col">Dèsignation produit</th>
      <th scope="col">Code lot</th>
      <th scope="col">Prix achat</th>
      <th scope="col">Quantitè achat</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(vi,index) in view" :key="index">
      <td>{{vi.name_fourni}}</td>
    <td>{{vi.name_product}}</td>
    <td>{{vi.code_lot}}</td>
    <td>{{vi.prix_achat}}.00 DA</td>
    <td>{{vi.qts_achat}}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td ><span class='weight'>Total</span></td>
      <td>{{total}}.00 DA</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
  </div>

  <div v-if="key2 != null && bonview != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/achatcart" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Bon commande'}" />
    <div  class="content-header center">
      <div class="container-fluid">
             <button v-print="'#printMe'" class='btn btn-success form-control'><ic icon="print" /></button>
      </div>
    </div>
    <!-- Main content -->
    <section id="printMe" class="content">
      <div class="all">
			<header>
				<h1 class="center">Bon commande</h1>
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
						<td><span>{{bonview[1].num_facture}}</span></td>
					</tr>
					<tr>
						<th><span>Date</span></th>
						<td><span>{{bonview[0].date}}</span></td>
					</tr>
					<tr>
						<th><span>Total</span></th>
						<td><span id="prefix"></span><span>{{total}}.00 DA</span></td>
					</tr>
				</table>
				<table class="inventory">
					<thead>
						<tr>
              <th><span>Nom fournisseur</span></th>
							<th><span>Dèsignation produit</span></th>
							<th><span>Code lot</span></th>
							<th><span>Prix achat</span></th>
							<th><span>Quantitè achat</span></th>
							<th><span>Sous total</span></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(bon,index) in bonview" :key="index" v-if="index > 1">
              <th>{{bon.name_fourni}}</th>
              <th>{{bon.name_product}}</th>
              <th>{{bon.code_lot}}</th>
              <th>{{bon.prix_achat}}.00 DA</th>
              <th>{{bon.qts_achat}}</th>
              <th>{{bon.qts_achat * bon.prix_achat}}.00 DA</th>
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

  <div v-if="key3 != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a href="/achatcart" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Commandes achat'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div v-if="!prior" class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' data-toggle="modal" data-target=".bd-example-modal-lg">AJOUTER</button>
              <button class='btn btn-danger' data-toggle="modal" data-target="#deletelotcmd"><ic icon="trash" /> SUPPRIMER</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th></th>
      <th scope="col">Ref Commande</th>
      <th scope="col">Nom fournisseur</th>
      <th scope="col">Nom produit</th>
      <th scope="col">code lot</th>
      <th scope="col">Prix achat</th>
      <th scope="col">Quantitè</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(dt,index) in detailedit" :key="index" >
      <td><input @click="getIdCartTmp(dt.id_cartachat)" type="checkbox"></td>
      <td>{{dt.ref_commandeachat}}
        <div>
          <button @click="getIdCartTmp(dt.id_cartachat)" data-toggle="modal" data-target="#deletelotcmd" class='pointer btnsp'><ic style='color:red;' size="2x" icon="trash" /></button>
        </div>
      </td>
      <td>{{dt.name_fournisseur}}</td>
      <td>{{dt.name_product}}</td>
      <td>{{dt.code_lot}}</td>
      <td>{{dt.prix_achat}}</td>
      <td>{{dt.qts_achat}}</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <addcomandeachat-modal v-if="key3 != null && fourni != null" :fourni="fourni" :cmd="key3" />
    <deletelotachat-modal v-if="dds.length > 0" :dds="dds" />
  </div>
    </div>
</template>



<script>
import dheaderComp from './dheaderComp'
import axios from 'axios'
import datatable from 'datatables.net-bs4'
import addcomandeachatModal from '../modals/addCommandeachatModal'
import deletelotachatModal from '../modals/deletelotachatModal'

import  confirmdeletecmdaModal from '../modals/confirmdeletecmdaModal'
import confirmdeletecmaModal from '../modals/confirmdeletecmaModal'
import confirmvalidachatModal from '../modals/confirmvalidachatModal'
import paymentachatModal from '../modals/paymentachatModal'
import print from 'vue-print-nb'
import viewpaymentachatModal from '../modals/viewpaymentachatModal.vue'
export default {
    data : ()=>{
        return{
          details : null,
          tmpdetail : null,
          da : {
            cmd : null
          },
          cmds : [],
          del : {
            cmd : null
          },
          valid : {
            cmd : null,
          },
          key1 : null,
          key2 : null,
          key3 : null,
          view : null,
          upview : null,
          total : null,
          bonview : null,
          prior : false,
          prior1 : false,
          detailedit : null,
          fourni : null,
          dds : [],
          paid : null,
          notpaid : null,
          pnd : {
            start : null,
          end : null,
          },
          search : true,
        }
    },
    components : {
        dheaderComp,
        addcomandeachatModal,
        deletelotachatModal,
        confirmdeletecmdaModal,
        confirmdeletecmaModal,
        confirmvalidachatModal,
        paymentachatModal,
        viewpaymentachatModal
    },
    directives: {
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
            var run = axios.post(this.link() + 'searchcommande',this.pnd,this.cors())
            run.then(e=>{
             this.details = e.data
            })
          },
          getIdCartTmp(value)
          {
            this.dds.push(value)
          },
          save(value)
          {
             this.da.cmd = value.id_commandeachat
             var run = axios.post(this.link() + 'valid',this.da,this.cors())
      run.then(e=>{
        if(e.data == "yes")
        {
          this.alrt('Opèration èffectuè','','success')
         setInterval(() => {
           location.reload()
         }, 1000);
        }
      })
      run.catch(e=>{
        console.log('err')
      })
          },
          filter(value)
          {
            if(value  == 6 || value == 7)
            {
              switch (value) {
                case 6: this.details = this.tmpdetail.filter(detail => detail.payment == 0);  break;
                case 7:  this.details = this.tmpdetail.filter(detail => detail.payment == null); break;
              }
            }else{
               this.details = (value != 5) ? this.tmpdetail.filter(detail => detail.statu_achat == value) : this.tmpdetail
            }
          },
          deletee(value)
          {
            this.del.cmd = value.id_commandeachat
          },
          gets(value)
          {
            this.cmds.push(value.id_commandeachat)
          },
          getss(value)
          {
            this.valid.cmd = value.id_commandeachat
          }
    },
    created()
    {
      this.prior = (this.$route.path == '/stockachatcart') ? true : false
      this.prior1 = (this.$route.path == '/compachatcart') ? true : false
      if(this.$route.query.page1 == null && this.$route.query.page2 == null && this.$route.query.page3 == null)
      {
        var run = axios.get(this.link() + 'getallcmds',this.cors())
        run.then(e=>{
            this.details = e.data
            this.tmpdetail = e.data
            this.table()
        })
        run.catch(e=>{
            console.log('err')
        })

        var run2 = axios.get(this.link() + 'TotalcommandesAchatPaidandnotpaid',this.cors())
      run2.then(e=>{
        let tmp = e.data.split(',')
        this.paid = tmp[0]
        this.notpaid = tmp[1]
      })
      }else{
        if(this.$route.query.page1 != null)
        {
            this.key1 = this.$route.query.page1
            var run = axios.post(this.link() + 'detailcommandeachat',{key1 : this.key1},this.cors())
            run.then(e=>{
              this.view = e.data
              for (const vi of this.view) {
                 this.total += vi.qts_achat * vi.prix_achat
              }
            })
            run.catch(e=>{
              console.log('err')
            })
        }else if(this.$route.query.page2 != null)
        {
          this.key2 = this.$route.query.page2
          var run  = axios.post(this.link() + 'detailbfacturecommandeachat',{key2 : this.key2},this.cors())
          run.then(e=>{
            this.bonview = e.data
            let i = 0;
            for (const bnv of this.bonview) {
              if(i > 1)
              {
              this.total += bnv.prix_achat * bnv.qts_achat 
              }
              i++;
            }
          })
          run.catch(e=>{
            console.log('err')
          })
        }else if(this.$route.query.page3 != null)
        {
          this.key3 = this.$route.query.page3
          var run = axios.post(this.link() + 'getdataforedit',{id : this.key3},this.cors())
          run.then(e=>{
            if(e.data[0].statu_achat != 3)
            {
              location.href = 'achatcart'
            }
           this.detailedit = e.data
           this.fourni = e.data[0].id_fournisseur
           this.table()
          })
          run.catch(e=>{
            console.log('err')
          })
        }
      }
    }
}
</script>
