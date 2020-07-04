<template>
    <div>
        <h1>Feed</h1>

        <div class="p15">
            <v-card max-width="500" class="ac card-style-1">
                <img :src='imageURL' class="img-size">
                
                <div class="p10 alg-txt-s">
                    <h4 class="clr-red">SEX, 07 FEV - 20:00 ás 23:30</h4>
                    <h1 class="mt-1">Design Party</h1>
                    <span class="mt-2 display-b">Criado por <strong>Pedro Lopes</strong> </span>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script>
export default {
    data:() => ({
        imageURL:'./img-card-0.png'
    })
}
</script>