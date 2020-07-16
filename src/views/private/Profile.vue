<template>
    <div>
        <Toolbar />

        <h1 class="alg-txt-c">EDITAR INFORMAÇÔES</h1>

        <div>
            <v-card class="p10 ac" max-width="600">
                <v-card class="mb-3">
                    <h2 class="alg-txt-l ml-2">Foto de perfil</h2>

                    <v-col class="d-flex justify-center align-center">
                        <v-avatar class="mb-5 cp" size="80">
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="John"
                            >
                        </v-avatar>
                    </v-col>
                </v-card>


                <v-card class="mb-3">
                    <h2 class="alg-txt-l ml-2">Segurança</h2>

                    <v-col class="text-center" cols="1" sm="12">
                        <a href="#">
                            <v-btn
                                align="center"
                                class="ml-2" 
                                rounded 
                                color="blue" 
                                outlined 
                                dark
                            >
                                Solicitar troca de senha
                            </v-btn>
                        </a>
                    </v-col>

                    <v-col class="text-center" cols="1" sm="12">
                        <a href="#">
                            <v-btn
                                align="center"
                                class="ml-2" 
                                rounded 
                                color="blue" 
                                outlined 
                                dark
                            >
                                Solicitar troca de email
                            </v-btn>
                        </a>
                    </v-col>
                </v-card>

                

                <div>
                    <v-col class="text-center mt-7" cols="1" sm="12">
                        <v-btn
                            align="center"
                            class="ml-2"
                            color="red"  
                            dark
                        >
                            SAIR
                        </v-btn>
                    </v-col>
                </div>
            </v-card>           
        </div>
    </div>
</template>

<script>
import Toolbar from '@/components/cpmToolBar';

export default {
    components: {
        Toolbar,
    }
}
</script>