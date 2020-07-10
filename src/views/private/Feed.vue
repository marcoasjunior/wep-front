<template>
    <div>
        <ToolBar/>
        <h1 class="alg-txt-c">Feed</h1>

        <div class="p15 mt-10" v-for="(item, i) in itens" :key="i">
            <v-card max-width="500" class="ac card-style-1">
                <img :src='item.imageEvent' class="img-size">
                
                <div class="p10 alg-txt-s">
                    <h4 class="clr-red">{{ item.date }}</h4>
                    <h1 class="mt-1">{{ item.title }}</h1>
                    <span class="mt-2 display-b">Criado por <strong>{{ item.user }}</strong> </span>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script>
import ToolBar from '@/components/cpmToolBar'

export default {
    data:() => ({
        imageURL:'./img-card-0.png',

        itens:[
            {id:'1',date:'SEX, 07 FEV - 20:00 ás --:--', title:'Design Party', user:'Pedro Lopes', imageEvent:'./img-card-0.png'},
            {id:'2',date:'SEG, 12 JAN - 19:40 ás --:--', title:'Design Party', user:'Marco Antônio', imageEvent:'./img-card-0.png'},
            {id:'3',date:'TER, 23 DEZ - 21:30 ás 23:30', title:'Design Party', user:'Liam Cabral', imageEvent:'./img-card-0.png'},
            {id:'4',date:'SEX, 07 FEV - 20:00 ás 23:30', title:'Design Party', user:'Pedro Lopes', imageEvent:'./img-card-0.png'},
            {id:'5',date:'SEX, 07 FEV - 20:00 ás 23:30', title:'Design Party', user:'Pedro Lopes', imageEvent:'./img-card-0.png'},
        ]
    }),


    components:{
        ToolBar
    }
}
</script>