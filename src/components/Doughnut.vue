<script>
import { Doughnut } from "vue-chartjs";
export default {
    name: "DoughnutChart",
    extends: Doughnut,

    data(){
        return {
        }
    },

    props: {
        label: String,
        chartData: Array,
        options: Object
    },

    mounted(){

        // const dates = this.chartData.map(d => d.date.format("MMM Do YY"))
        const totals = this.chartData.map(d => d.total)
        const colors = this.chartData.map(d => d.color)

        this.renderChart({
            datasets: [{
                label: this.label,
                data: totals,
                backgroundColor: colors
            }]
        }, this.options)
    }

}
</script>

<style scoped>

</style>