<template>
    <div>
        <ToolBar/>

        <h1 class="alg-txt-c">CRIAR EVENTO</h1>

        <EventForm/>

      <div class="mx-3"></div>
    </div>
</template>
<script>
import EventForm from '@/components/cpmEventForm'
import ToolBar from '@/components/cpmToolBar'

export default {
    components: {
        ToolBar,
        EventForm,
    },
    data:() => ({}),

    mounted() {},

    methods: {},

}
</script>