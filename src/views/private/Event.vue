<template>
    <div>
        <ToolBar />

        <EventForm />

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