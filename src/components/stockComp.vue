<template>
    <div class="main">
      <div v-if="sk == null" class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Stocks'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' v-if="!vm" data-toggle="modal" data-target="#addstock">AJOUTER</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Dèsignation stock</th>
      <th scope="col">Produits</th>
      <th scope="col">Crèè</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(stock,index) in stocks" :key="index">
     <td>{{stock.name_stock}}
       <div>
         <button @click="format(stock)" v-if="!vm" data-toggle="modal" data-target="#updatestock" class='pointer btnsp'><ic class='green' size="2x" icon="pen" /></button>
       </div>
     </td>
     <td>
       <a :href="'?sk=' + stock.id_stock + '&name=' + stock.name_stock" class='btn btn-warning'><ic icon="box" /></a>
     </td>
     <td>{{stock.date_creation}}</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <addstock-modal />
    <updatestock-modal :stock="stock" />
  </div>

  <div v-if="sk != null" class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <a v-if="!vm" href="/stock" class='btn btn-warning'><ic icon="arrow-left" /></a>
            <a v-if="vm" href="/vente" class='btn btn-warning'><ic icon="arrow-left" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Produits stock ' + name}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div v-if="!vm" class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons center">
              <div class="form-group">
                <label for="products" class="weight">Produits</label>
                <select v-model="send.idprd" @change="handle"  id="products" class="form-control">
                  <option v-for="(prd,index) in prds" v-if="prd.id_stock != sk" :key="index" :value="prd.id_product">{{prd.name_product}}</option>
                </select>
              </div>

              <div v-if="view" class="form-group">
                <label for="lots" class="weight">Lots</label>
                <select @change="checker" v-model="send.idlot"  id="lots" class="form-control">
                  <option v-for="(lt,index) in lts" :key="index" :value="lt.id_lot">{{lt.code_lot}} / {{lt.price}}.00 DA</option>
                </select>
              </div>

              <div v-if="view" class="form-group">
                <label for="qt">Quantitè</label>
                <input v-model="send.qt" @keyup="checker" type="number" id="qt" placeholder="Qunatitè" class="form-control">
              </div>

              <button :disabled="dis" @click="add" class='btn btn-primary'>Ajouter</button>

            </div>
          </div>
        </div>
      <button data-toggle="modal" style='display: inline-flex;' v-if="view1" data-target="#forwardprdstk" class='pointer btnsp'><ic style="color:green;" icon="chevron-circle-right" size="2x" /></button>
        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th></th>
      <th scope="col">Dèsignation produit</th>
      <th scope="col">Code lot</th>
      <th scope="col">Date fabrication</th>
      <th scope="col">Date expiration</th>
      <th scope="col">Prix</th>
      <th scope="col">Statu</th>
      <th scope="col">Quantitè</th>
    </tr>
  </thead>
  <tbody>
   <tr v-for="(prod,index) in prods" :key="index">
     <td><input type="checkbox" @change="hand2(prod)"></td>
     <td>{{prod.name_product}}
       <div>
         <button class='pointer btnsp' @click="eye(prod.id_pls)"  v-if="prod.statu == 1"><ic style="color:green;" size="2x" icon="eye" /></button>
        <button class='pointer btnsp' @click="slash(prod.id_pls)" v-if="prod.statu == 0" ><ic style="color:red;" size="2x" icon="eye-slash" /></button>
       <button data-toggle="modal" @click="hand1(prod)" v-if="!vm" data-target="#forwardprdstk" class='pointer btnsp'><ic size="2x" style="color:green;" icon="chevron-circle-right" /></button>
       </div>
     </td>
     <td>{{prod.code_lot}}</td>
     <td>{{prod.date_fab}}</td>
     <td>{{prod.date_exp}}</td>
     <td>{{prod.price}}</td>
     <td> <span v-if="prod.statu == 0" class="green">Disponible</span> <span v-if="prod.statu == 1" class="red">Indisponible</span> </td>
     <td><input type="number" v-model="prod.qt_pls" class="btnsp" @keyup="upqt(prod)" ></td>
   </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
  </div>
  <forwardprdstock-modal v-if="ids.length > 0" :ids="ids" :sk="sk" />
    </div>
</template>

<script>
import axios from 'axios'
import datatable from 'datatables.net-bs4'
import dheaderComp from './dheaderComp'
import addstockModal from '../modals/addstockModal'
import updatestockModal from '../modals/updateStockModal'
import forwardprdstockModal from '../modals/forwardprdstockModal'
export default {
    data : ()=>{
        return{
          stocks : null,
          tmps : [],
          stock : [],
          sk : null,
          prods : [],
          send : {
            id : null,
            idprd : null,
            idlot : null,
            qt : null,
            stock : null,
          },
          prds : [],
          lts : [],
          view : false,
          dis : true,
          tmp : [],
          ids : [],
          view1 : false,
          name : null,
          vm : false,
        }
    },
    components : {
        dheaderComp,
        addstockModal,
        updatestockModal,
        forwardprdstockModal
    },
    methods : {
      table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          upqt(value)
          {
            var run = axios.post(this.link() + 'upqt',value,this.cors())
            run.then(e=>{
              this.statu('Opèration èffectuè','success')
            })
            run.catch(e=>{
              console.log('err')
            })
          },
          eye(value)
          {
            var run = axios.post(this.link() + 'eye',{id : value},this.cors())
            run.then(e=>{
              if(e.data == "yes")
              {
                this.alrt('Opèration èffectuè','','success')
                setTimeout(() => {
                  location.reload()
                }, 1000);
              }
            })
            run.catch(e=>{
               console.log('err')
            })
          },
          slash(value)
          {
             var run = axios.post(this.link() + 'slash',{id : value},this.cors())
            run.then(e=>{
              if(e.data == "yes")
              {
                this.alrt('Opèration èffectuè','','success')
                setTimeout(() => {
                  location.reload()
                }, 1000);
              }
            })
            run.catch(e=>{
               console.log('err')
            })
          },
          format(value)
          {
            this.stock = value
          },
          handle()
          {
            this.view = (this.send.idprd == null) ? false : true
            this.dis = (this.send.idprd == null || this.send.idlot == null) ? true : false
            if(this.view)
            {
              axios.post(this.link() + 'lotsprd2',this.send,this.cors())
              .then(e=>{
                this.lts = e.data
              })
              .catch(e=>{
                console.log('err')
              })
            }
          },
          checker()
          {
            this.dis = (this.send.idprd == null || this.send.idlot == null || this.send.qt == null) ? true : false
          },
          add()
          {
            this.dis = true
            this.send.id = this.sk
            var run = axios.post(this.link() + 'addprdlotforstock',this.send,this.cors())
            run.then(e=>{
              console.log(e.data)
              if(e.data == "yes")
              {
                this.alrt('Opèration èffectuè','','success')
                setInterval(() => {
                  location.reload()
                }, 1000);
              }else
              {
                this.statu('Entrèe un quantitè infèrieur a ' + e.data,'error')
                this.dis = false
              }
            })
            run.catch(e=>{
              console.log('err')
            })
          },
          hand1(value)
          {
            this.ids.push(value.id_pls)
          },
          hand2(value)
          {
            this.ids.push(value.id_pls)
            this.view1 = true
          }
    },
    created()
    {
      this.vm = (this.$route.path == '/stock') ? false : (this.$route.path == '/vente') ? true : false

      this.sk = (this.$route.query.sk != undefined) ? this.$route.query.sk : null

      if(this.sk != null)
      {
        this.name = this.$route.query.name

        this.send.stock = this.sk

        var run = axios.post(this.link() + 'lotsproducts',{id : this.sk},this.cors())
        run.then(e=>{
          this.prods = e.data
          this.table()
        })
        run.catch(e=>{
          console.log('err')
        })

        axios.get(this.link() + 'getallproducts',this.cors())
        .then(e=>{
          this.prds = e.data
        })
        .catch(e=>{
          console.log('err')
        })


      }else{
      var run = axios.get(this.link() + 'getstock',this.cors())
      run.then(e=>{
        this.stocks = e.data
        this.tmps = e.data
        this.table()
      })
      }
    }
}
</script>