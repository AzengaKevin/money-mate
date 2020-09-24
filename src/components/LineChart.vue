<script>
import { Line } from "vue-chartjs";
export default {
    name: "LineChart",
    extends: Line,

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

        const dates = this.chartData.map(d => d.date)
        const totals = this.chartData.map(d => d.total)

        this.renderChart({
            labels: dates,
            datasets: [{
                label: this.label,
                data: totals
            }]
        }, this.options)
    }

}
</script>

<style scoped>

</style>