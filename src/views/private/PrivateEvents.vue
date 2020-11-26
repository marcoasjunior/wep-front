<template>
    <div>
        <ToolBar/>

            <div class="p15 mt-10 ac" v-for="(item, i) in filteredEventsByPrivacy" :key="i">

                {{ item }}

            </div>
    </div>
</template>
<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex';
import ToolBar from '@/components/cpmToolBar'


export default {
        components:{
            ToolBar
        },

       data: () => ({
           
        following: '',
        followers: '',
        followersArrayId: '',
        filteredEventsByPrivacy: '',

       }),

        async created() {
        
            this.getAllFollowing();
            this.getEvents();
        },

           computed: {

        ...mapGetters({
                userData: 'FeedVuex/userData',
                cardsEventData: 'FeedVuex/cardsEventData',
            }),

        },

        methods: {
            ...mapActions({
                getEvents: 'FeedVuex/getEvents',
                getFollowing: "ProfileVuex/getFollowing",
                getFollowers: "ProfileVuex/getFollowers",
            }),

            async getAllFollowing(){

                

                let responseFollowing = await this.getFollowing();
                let responseFollowers = await this.getFollowers();

                this.following = responseFollowing
                this.followers = responseFollowers
                this.getFollowersId();
                this.filterEventsByFollowers();
            },

            getFollowersId(){
                let result = this.followers.map((item) => {return item.id})
                this.followersArrayId = result
                // console.log(result)
            },

            filterEventsByFollowers(){
                console.log("!@#$%¨&*()")
                console.log(this.cardsEventData)
                let filteredEventList = this.cardsEventData.filter((item) => { return this.followersArrayId.includes(item.user.id) })
                console.log(filteredEventList)

                this.filteredEventsByPrivacy = filteredEventList
            }

        },

        watch:{
            cardsEventData(){
                if(this.cardsEventData != ''){
                    this.filterEventsByFollowers()   
                }
            }
        }
}
</script>