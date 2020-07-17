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

                        <v-file-input hide-input="">
                            <button
                                type="button"
                                aria-label="prepend-icon"
                                class="v-icon notranslate v-icon--link mdi mdi-paperclip theme--light"
                            >
                            </button>
                        </v-file-input>   
                    </v-col>
                </v-card>   

                <v-card class="mb-3">
                    <h2 class="alg-txt-l ml-2">Preferência de eventos</h2>
                    <v-container fluid>
                        <v-row align="center">
                            <v-col>
                                <v-select
                                    v-model="MyEventTypes"
                                    :items="AllEventTypes"
                                    attach
                                    chips
                                    label="Escolha sua preferência"
                                    multiple
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>

                <div class="mb-3">
                    <h2 class="alg-txt-l ml-2">Raio de procura dos eventos</h2>
                    <SetMap/>
                </div>

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
import SetMap from '../../components/cpmSetMapPoints';

export default {
    components: {
        Toolbar,
        SetMap
    },

    data: () => ({
        AllEventTypes: ["Rock", "Funk", "Lual", "Gospel"],
        MyEventTypes: []
    }),
}
</script>