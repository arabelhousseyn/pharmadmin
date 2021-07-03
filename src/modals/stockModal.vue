<template>
    <div class="modal fade" id="stockModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Visibilitè</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <div v-for="(detail,index) in details" :key="index" class="infosBox">
                <div v-for="(view,ind) in detail.pls" :key="ind">
                    <h1>Stock {{view.name_stock}}</h1>
               <p>Code lot : {{detail.pl.code_lot}} /Date fabrication : {{detail.pl.date_fab}} /Date expiration : {{detail.pl.date_exp}} / Prix : {{detail.pl.price}}.00 DA</p>
               <p>Quantitè Stock : {{view.qt_pls}} </p>
               <select @change="format(view,$event)" class="custom-select">
  <option class="green" value="0" v-if="view.statu == 0" selected>Visible</option>
  <option class="green" value="0" v-else>Visible</option>
  <option value="1" class="red"  v-if="view.statu == 1" selected>Non visible</option>
  <option value="1" class="red"  v-else checked>Non visible</option>
</select>
                 
                </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="empty" data-dismiss="modal">Fermer</button>
        <button type="button" @click="update" class="btn btn-success">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['product'],
    data :()=>{
        return{
            details : [],
            push : [],
        }
    },
    methods : {
        format(data,event)
        {
            let send  = {
                id_pls : data.id_pls,
                statu : event.target.value
            }
            this.push.push(send)
        },
        update()
        {
            var run = axios.post(this.link() + 'updatePls',{'push' : this.push},this.cors())
            run.then(e=>{
               if(e.data == "yes")
               {
                   this.alrt('Opèration effectuée','','success')
                   location.reload()
               }
            })
            run.catch(e=>{
                console.log('err')
            })
        },
        empty()
        {
            this.$emit('empty')
            this.push = []
        }
    },
    created()
    {
        var run = axios.get(this.link() + 'detailProduct/' + this.product.id_product,this.cors())
        run.then(e=>{
            this.details = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>